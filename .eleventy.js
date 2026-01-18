import prettier from "prettier";
import { DateTime } from "luxon";

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

  eleventyConfig.addFilter("date", (date, format = "dd LLL yyyy") => {
    console.log(date);
    return DateTime.fromISO(date).toFormat(format);
  });

  eleventyConfig.addFilter("truncate", (content, length = 200) => {
    if (!content) return "";

    return content.length > length ? content.slice(0, length) + "…" : content;
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
