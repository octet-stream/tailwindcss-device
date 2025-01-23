import {AtRule} from "postcss"

export const isAtRule = (value: unknown): value is AtRule =>
  value instanceof AtRule
