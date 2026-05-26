import markdownIt from 'markdown-it';
import { dollarmathPlugin } from 'markdown-it-dollarmath';
import markdownItFootnote from 'markdown-it-footnote';
import makeBibliography from './src/scripts/make-bibliography.js';

/**
 * Core rule: convert bare \eqref{...} in prose text into math_inline tokens
 * so MathJax processes them as inline math.
 *
 * Ported verbatim from the eqnum prototype — do not alter the rule order
 * (must run after dollarmathPlugin, as a core rule not an inline rule).
 */
function eqrefPlugin(md) {
  md.core.ruler.push('eqref_to_math_inline', (state) => {
    for (const blockToken of state.tokens) {
      if (blockToken.type !== 'inline') continue;
      const newChildren = [];
      for (const token of blockToken.children ?? []) {
        if (token.type !== 'text' || !token.content.includes('\\eqref{')) {
          newChildren.push(token);
          continue;
        }
        const parts = token.content.split(/(\\eqref\{[^}]+\})/);
        for (const part of parts) {
          if (/^\\eqref\{[^}]+\}$/.test(part)) {
            const t = new state.Token('math_inline', '', 0);
            t.content = part;
            newChildren.push(t);
          } else if (part) {
            const t = new state.Token('text', '', 0);
            t.content = part;
            newChildren.push(t);
          }
        }
      }
      blockToken.children = newChildren;
    }
  });
}

export default function (eleventyConfig) {
  // Passthrough copies
  eleventyConfig.addPassthroughCopy('./src/styles.css');
  eleventyConfig.addPassthroughCopy('./src/markdown.css');
  eleventyConfig.addPassthroughCopy('./src/testimonial-theme.css');
  eleventyConfig.addPassthroughCopy('./img/');
  eleventyConfig.addPassthroughCopy('./src/CNAME');

  // {% year %} shortcode for copyright footers
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

  // Markdown-it: dollarmath protects $$/$  blocks; eqrefPlugin wraps bare
  // \eqref{} in math_inline tokens; footnote adds [^label] syntax.
  const md = markdownIt({ html: true, typographer: true })
    .use(dollarmathPlugin, {
      // Emit delimiters MathJax v4 recognises by default.
      // Do NOT add $...$ as a MathJax delimiter — dollar signs in shell
      // commands, prices, etc. would break. The pipeline is:
      //   $$...$$ → \[...\]  (display)
      //   $...$  → \(...\)  (inline)
      renderer(content, { displayMode }) {
        return displayMode ? `\\[${content}\\]` : `\\(${content}\\)`;
      },
    })
    .use(markdownItFootnote)
    .use(eqrefPlugin);

  eleventyConfig.setLibrary('md', md);

  // Render a frontmatter string as inline markdown (enables math/emphasis in subtitles).
  eleventyConfig.addFilter('mdInline', (s) => s ? md.renderInline(String(s)) : '');

  // Date helpers. UTC-pinned to avoid off-by-one-day in non-UTC timezones.
  // Note: frontmatter date strings should be quoted ("YYYY-MM-DD") to prevent
  // YAML from parsing them as UTC midnight Date objects.
  const toUTC = (d) => typeof d === 'string' ? new Date(d + 'T00:00:00Z') : new Date(d);
  eleventyConfig.addFilter('dateDisplay', (d) =>
    d ? toUTC(d).toLocaleDateString('en-GB', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' }) : ''
  );
  eleventyConfig.addFilter('dateISO', (d) =>
    d ? toUTC(d).toISOString().slice(0, 10) : ''
  );

  // Bibliography transform: replaces \cite{key} with numbered in-text citations
  // and appends a formatted reference list after <section class="article">.
  eleventyConfig.addTransform('makeBibliography', makeBibliography);

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: ['md', 'njk', 'html'],
  };
}
