import { readFileSync } from 'fs';
import bibjson from 'bibtex-bibjson';

const { parse } = bibjson;

export default (content) => {
  const citationRegex = /\\cite{([^}]*)}/g;
  const matches = content.matchAll(citationRegex);

  const references = readFileSync('./src/blog/references.bib').toString();
  const entries = parse(references);

  let citedKeys = {};
  let citationCounter = 1;

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
      content = content.replace(match[0].toString(), `[${citedKeys[keys[0]]}–${citedKeys[keys[keys.length-1]]}]`);
    }
  }

  return insertBibliography(content, citedKeys, entries);
};

function insertBibliography(content, citedKeys, entries) {
  let formattedEntries = {};

  for (const key in citedKeys) {
    let authors = entries[key]['author'];
    if (authors.length == 1) {
      authors = formatName(authors[0]['name']);
    } else if (authors.length == 2) {
      authors = `${formatName(authors[0]['name'])} and ${formatName(authors[1]['name'])}`;
    } else if (authors.length >= 3) {
      authors = `${formatName(authors[0]['name'])} et al.`;
    }

    const year = entries[key]['year'];
    const title = entries[key]['title'];
    const publisher = entries[key]['publisher'];
    formattedEntries[key] = `${authors} (${year}). ${title}. `;

    if ('journal' in entries[key]) {
      const { journal, volume, number, pages } = entries[key];
      formattedEntries[key] += `<i>${journal}, ${volume}</i>(${number}), ${pages}`;
    } else if ('howpublished' in entries[key]) {
      const url = entries[key]['howpublished'];
      formattedEntries[key] = formattedEntries[key].replace(title, `<a href="${url}">${title}</a>`);
    } else if ('publisher' in entries[key]) {
      formattedEntries[key] += `<i>${publisher}</i>.`;
    }
  }

  const regex = /(<section class="article">[\s\S]*?<\/section>)(?=[\s\S]*<\/main>)/;
  const bibliography = `
  <section class="bibliography">
    <ol id="bibliography">
    ${Object.keys(formattedEntries).map(key => `<li>${formattedEntries[key]}</li>`).join('\n')}
    </ol>
  </section>
  `;
  return content.replace(regex, `$1${bibliography}`);
}

function formatName(fullName) {
  const names = fullName.split(' ');
  const lastName = names.pop();
  const isCorrectFormat = names.every(name => name.charAt(1) === '.');
  if (isCorrectFormat) return fullName;
  const initials = names.map(name => name.charAt(0) + '.').join(' ');
  return `${initials} ${lastName}`;
}
