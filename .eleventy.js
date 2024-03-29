const { DateTime } = require("luxon");
const fs = require("fs");
const makeBibliography = require("./src/scripts/make-bibliography.js");

module.exports = function(eleventyConfig) {
  //Pass through files
  eleventyConfig.addPassthroughCopy("./src/styles.css");  
  eleventyConfig.addPassthroughCopy("./src/markdown.css");
  eleventyConfig.addPassthroughCopy("./src/testimonial-theme.css");
  eleventyConfig.addPassthroughCopy("./img/");
  eleventyConfig.addPassthroughCopy("./src/CNAME");

  // Add {% year %} shortcode (useful for setting copyright dates)
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Get file creation and last modification dates
  //   usage: {{ page | fileCreationDate | postDate }}
  //   usage: {{ page | fileLastModifiedDate | postDate }}
  eleventyConfig.addFilter("fileCreationDate", function (post) {
    const stats = fs.statSync(post.inputPath);
    return stats.birthtime;
  });
  eleventyConfig.addFilter("fileLastModifiedDate", function (post) {
    const stats = fs.statSync(post.inputPath);
    return stats.mtime;
  });

  // Add bibliography to blog posts
  eleventyConfig.addTransform("makeBibliography", makeBibliography);

  // reformat post.date to from e.g. 2023-05-20 to 20 May 2023.
  //   useage: {{ date | postDate }} in the file where the date is 
  // declared, as in src/_includes/blog-post.njk template,  or 
  //   {{ post.Date | postDate }} when looping over files, as in src/blog/index.html 
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).setLocale("en-gb").toLocaleString(DateTime.DATE_FULL);
  });

  // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    templateFormats: ["md", "njk", "html"] 
  }
};
