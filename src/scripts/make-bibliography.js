const { readFileSync } = require("fs");
const { parse } = require("bibtex-bibjson");

module.exports = (content) => {
  // Regular expression to match \cite{...} tags
  const citationRegex = /\\cite{([^}]*)}/g;
  const matches = content.matchAll(citationRegex);

  // Read the contents of the references.bib file
  const references = readFileSync("./src/blog/references.bib").toString();
  const entries = parse(references);

  let citedKeys = {};
  let citationCounter = 1;

  // Replace `\cite{...}` with in-text citations like [1], [1, 2], [1–N].
  for (const match of matches) {
    const keys = match[1].split(/\s*,\s*/);
    for (const key of keys) {
      if (key in citedKeys == false) {
        citedKeys[key] = citationCounter;
        citationCounter++;
      }
    }
    if (keys.length == 1) {
      content = content.replace(match[0].toString(), `[${citedKeys[keys[0]]}]`);
    } else if (keys.length == 2) {
      content = content.replace(match[0].toString(), `[${citedKeys[keys[0]]}, ${citedKeys[keys[1]]}]`);
    } else if (keys.length >= 3) {
      // note: this implementation requires some discipline from the writer
      // e.g. if I cite oliveira2022validation, lyu2014elementary and liboff2003kinetic
      // earlier in a blog, then cite all three again but in a different order, say,
      // lyu2014elementary, oliveira2022validation, liboff2003kinetic, then this will render as [2–3]
      // even though it should really be rendered as either [1–3] or [2, 1, 3] if the order of citation is 
      // deemed important. 
      // you should probably change this to create an ordered list of citations, as the citation order
      // in a run of e.g. 5 citations is likely not important. 
      content = content.replace(match[0].toString(), `[${citedKeys[keys[0]]}\u2013${citedKeys[keys[keys.length-1]]}]`);
    }
  }

  // Print bibliography
  content = insertBibliography(content, citedKeys, entries);

  return content;
};

const insertBibliography = (content, citedKeys, entries) => {
  let formattedEntries = {}

  for (const key in citedKeys) {
    // Display single-author publications as `J. Smith (2023)...`
    // For two authors, display as `J. Smith and J. Bloggs (2023)...`
    // For three or more, display as `J. Smith et al. (2023)...`
    let authors = entries[key]["author"]
    if (authors.length == 1) {
      authors = formatName(authors[0]["name"]);
    } else if (authors.length == 2) {
      const author1 = formatName(authors[0]["name"]);
      const author2 = formatName(authors[1]["name"]);
      authors = `${author1} and ${author2}`;
    }
    else if (authors.length >= 3) {
      authors = `${formatName(authors[0]["name"])} et al.`;
    }

    const year = entries[key]["year"];
    const title = entries[key]["title"];
    const publisher = entries[key]["publisher"];
    formattedEntries[key] = `${authors} (${year}). ${title}. `;

    // Apply different formatting to journals, books and websites
    // This is slightly botched and may need to be revisited, but it works
    // for my purposes as of 03/06/2023.
    if ("journal" in entries[key]) {
      const journal = entries[key]["journal"];
      const volume = entries[key]["volume"];
      const number = entries[key]["number"];
      const pages = entries[key]["pages"];
      formattedEntries[key] = formattedEntries[key] + `<i>${journal}, ${volume}</i>(${number}), ${pages}`;
    }
    else if ("howpublished" in entries[key]) {
      const url = entries[key]["howpublished"];
      formattedEntries[key] = formattedEntries[key].replace(`${title}`, `<a href="${url}">${title}</a>`);
    }
    else if ("publisher" in entries[key] || !("journal" in entries[key])) {
      formattedEntries[key] = formattedEntries[key] + `<i>${publisher}</i>.`
    }
  }

  // Add bibliography after the `article` section
  const regex = /(<section class="article">[\s\S]*?<\/section>)(?=[\s\S]*<\/main>)/;
  const bibliography = `
  <section class="bibliography">
    <ol id="bibliography">
    ${Object.keys(formattedEntries).map(key => `<li>${formattedEntries[key]}</li>`).join('\n')}
    </ol>
  </section>
  `
  const insertedContent = content.replace(regex, `$1${bibliography}`);

  return insertedContent;
};

function formatName(fullName) {
  // `bibtex-bibjson` reads full names given in BibTeX format as e.g. John Smith
  // this function reformats all names to e.g. `J. Smith`.
  const names = fullName.split(' ');
  const lastName = names.pop();

  const isCorrectFormat = names.every(name => name.charAt(1) === '.');

  if (isCorrectFormat) {
    return fullName; // Already in correct format
  }

  const initials = names.map(name => name.charAt(0) + '.').join(' ');

  return `${initials} ${lastName}`;
}

