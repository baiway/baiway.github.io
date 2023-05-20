// Import Luxon (date and time library)
const { DateTime } = require("luxon");
const fs = require("fs");

module.exports = function(eleventyConfig) {
  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: true,
  });

  //Pass through files
  eleventyConfig.addPassthroughCopy("./src/styles.css");  
  eleventyConfig.addPassthroughCopy("./src/markdown.css");
  eleventyConfig.addPassthroughCopy({ "./img/favicon.png": "/" });  

  // Add {% year %} shortcode (useful for setting copyright dates)
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Get file creation and last modification dates
  // usage: {{ page.inputPath | fileCreationDate | postDate }}
  // usage: {{ page.inputPath | fileLastModifiedDate | postDate }}
  eleventyConfig.addFilter("fileCreationDate", function (post) {
    const stats = fs.statSync(post.inputPath);
    return stats.birthtime;
  });
  eleventyConfig.addFilter("fileLastModifiedDate", function (post) {
    const stats = fs.statSync(post.inputPath);
    return stats.mtime;
  });  


  // reformat post.date to from e.g. 2023-05-20 to 20 May 2023.
  // useage: 
  //  {{ date | postDate }} in the file where the date is declared, as in 
  //       src/_includes/blog-post.njk template,  or 
  // {{ post.Date | postDate }} when looping over files, as in src/blog/index.html 
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
