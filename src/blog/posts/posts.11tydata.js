export default {
  layout: 'blog-post.njk',
  tags: 'posts',
  math: true,
  eleventyComputed: {
    // Unpublished posts produce no output file and are excluded from collections.
    // Set publish: false in a post's frontmatter to draft it without building it.
    permalink(data) {
      if (data.publish === false) return false;
      return data.permalink;
    },
    eleventyExcludeFromCollections(data) {
      return data.publish === false;
    },
  },
};
