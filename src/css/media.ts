import postcss from "postcss"

export const createVariantMediaQuery = (params: string) =>
  postcss.atRule({
    params,
    name: "media",
    raws: {
      semicolon: true // This will add semicolon after @slot directive. This should be ignored in JS version of the plugin, because the rule has no child nodes.
    }
  })
