module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/css": "css", "src/js": "js" });

  eleventyConfig.addFilter("postDate", (d) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
  );

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
