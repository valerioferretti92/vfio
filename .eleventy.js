import prettier from "prettier";

export default function (eleventyConfig) {
  // Passthrough copy
  eleventyConfig.addPassthroughCopy("src/assets/");
  eleventyConfig.addPassthroughCopy("src/css/");
  eleventyConfig.addPassthroughCopy("src/js/");

  // Watch targets
  eleventyConfig.addWatchTarget("src/assets/");
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addWatchTarget("src/js/");

  // Prettier transform
  eleventyConfig.addTransform("prettier", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      const prettified = prettier.format(content, {
        bracketSameLine: true,
        printWidth: 512,
        parser: "html",
        tabWidth: 2,
      });
      return prettified;
    }
    return content;
  });

  // Eleventy configuration
  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site",
    },
    templateFormats: ["njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
}
