import {fromHtml} from "hast-util-from-html"
import {toDom} from "hast-util-to-dom"

/**
 * Parses given HTML fragment string into DOM node(s) using hast utilities.
 *
 * Returns DOM element(s).
 */
export const parse = (html: string) =>
  toDom(fromHtml(html, {fragment: true}), {fragment: true})
