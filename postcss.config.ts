import type {Config} from "postcss-load-config"

import tailwind from "@tailwindcss/postcss"

export default {
  plugins: [tailwind()]
} satisfies Config
