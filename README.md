# baileycook.co.uk

Source code for [baileycook.co.uk](https://baileycook.co.uk), my personal website advertising academic and tutoring work.

Built with [Eleventy 3](https://www.11ty.dev), deployed to GitHub Pages via GitHub Actions.

---

## Quick start

**Requirements:** [Node.js](https://nodejs.org/en/download) 18 or later.

```bash
# Install dependencies
npm install

# Serve locally with live reload at http://localhost:8080
npm run dev

# One-shot production build to _site/
npm run build
```

The `_site/` directory is gitignored — it is produced by the build and deployed by CI.

---

## Project layout

```
├── eleventy.config.js        # Eleventy config: markdown-it plugins, filters, transforms
├── src/
│   ├── index.html            # Home page
│   ├── about/index.html      # About page
│   ├── blog/
│   │   ├── index.html        # Post listing
│   │   └── posts/
│   │       ├── posts.11tydata.js   # Directory defaults: layout, tags, math, publish gating
│   │       └── *.md                # Blog posts (Markdown + LaTeX)
│   ├── CV/index.html         # CV
│   ├── tutoring/
│   │   ├── index.html        # Tutoring info
│   │   └── tutoring.11tydata.js  # Directory defaults: social preview image
│   ├── _includes/
│   │   ├── base.njk          # Root HTML template: CSS, MathJax, interactive JS
│   │   ├── blog-post.njk     # Post layout: title, subtitle, dates, topic chips
│   │   ├── header.njk
│   │   ├── footer.njk
│   │   └── title-and-meta.njk  # <title>, description, social preview tags
│   ├── scripts/
│   │   └── make-bibliography.js  # \cite{} → [n] transform; appends reference list
│   ├── styles.css
│   └── CNAME
├── design/social-cards/      # Source for the social preview images (see its README)
└── img/                      # Static images (passed through to _site/)
```

---

## Writing blog posts

Create a Markdown file under `src/blog/posts/`. The directory data file (`posts.11tydata.js`) injects sensible defaults so you only need to specify what differs.

### Frontmatter reference

```yaml
---
title: "Title"             # required
subtitle: "A short summary"        # optional; supports $inline math$ and *emphasis*
date: "2026-05-24"                 # publication date — must be a quoted string
modified: "2026-06-01"             # last-edited date; shown only when different from date
author: "Bailey Cook"              # optional; goes into <meta name="author">
topics: ["plasma physics", "gyrokinetics"]   # optional; displayed as tag chips
description: "Plain-text summary"  # optional; used in <meta name="description">
math: true                         # default true (injected by posts.11tydata.js)
publish: false                     # set to draft a post without building it
---
```

> **Date format:** Always quote date strings (`"2026-05-24"`) to prevent YAML from
> parsing them as UTC midnight Date objects, which can cause off-by-one-day errors
> in non-UTC timezones.

### Mathematics

Write LaTeX inside `$$...$$` (display) or `$...$` (inline). `markdown-it-dollarmath`
protects `$$...$$` / `$...$` from Markdown processing and converts them to
`\[...\]` / `\(...\)`. This choice was made to align with
[Obsidian](https://obsidian.md/) (a note-taking app that operates on Markdown files).
MathJax v4 renders the output client-side with `tex.tags: 'ams'`.

**Numbered equations and cross-references:**

```markdown
The rest energy is defined as

$$
\begin{equation}
  E = mc^2
  \label{eq:einstein}
\end{equation}
$$

As shown in \eqref{eq:einstein}, energy and mass are equivalent.
```

- `\begin{equation}` auto-numbers the equation.
- `\eqref{label}` renders as a clickable link `(1)` that smooth-scrolls to the equation, shows a hover preview, and places a `↩` backlink in the right margin pointing back to the reference site.
- `\begin{align}`, `\begin{align*}`, and `\nonumber` all work as in LaTeX.

**Footnotes:**

```markdown
Here is a claim[^note].

[^note]: This is the footnote text.
```

### Bibliography

Use `\cite{bibtex-key}` in post content. Add the corresponding BibTeX entry to `src/blog/references.bib`. The build transform replaces `\cite{key}` with `[n]` in-text citations and appends a formatted reference list at the end of the post.

---

## Deployment

Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/build.yml`), which:

1. Installs dependencies (`npm ci`)
2. Runs `npm run build`
3. Pushes `_site/` to the `gh-pages` branch via `peaceiris/actions-gh-pages`

GitHub Pages is configured to serve from the `gh-pages` branch. The `src/CNAME` file (passed through to `_site/`) sets the custom domain.

---

## Tech stack

| Piece | Version | Role |
|---|---|---|
| [Eleventy](https://www.11ty.dev) | 3.x | Static site generator |
| [markdown-it](https://github.com/markdown-it/markdown-it) | 14.x | Markdown parser |
| [markdown-it-dollarmath](https://github.com/executablebooks/markdown-it-dollarmath) | 0.5.x | Protects `$$`/`$` math from Markdown; converts to `\[...\]` / `\(...\)` |
| [markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote) | 4.x | Pandoc-style footnotes with auto-generated backlinks |
| [MathJax](https://www.mathjax.org) | 4.1.2 (CDN) | Client-side LaTeX rendering |
| [bibtex-bibjson](https://github.com/ORCID/bibtex-bibjson) | 0.2.x | BibTeX parsing for the `\cite{}` transform |
| Nunjucks | bundled with 11ty | Template engine |

---

## Inspiration

CSS design language originally borrowed from [Gregory Gunderson's research blog](https://gregorygundersen.com) (see [his post](https://gregorygundersen.com/blog/2020/06/21/blog-theme/) for details).
