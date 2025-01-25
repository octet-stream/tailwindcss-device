import type {Config} from "postcss-load-config"

import tailwind from "tailwindcss"

export default {
  plugins: [tailwind()]
} satisfies Config
