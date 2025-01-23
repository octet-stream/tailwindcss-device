import type {Config} from "tailwindcss"

import device from "./src/device.js"

// Tailwindcss test config
export default {
  content: ["tests/browser/**/*.test.ts", "tests/fixtures/**/*.ts"],
  plugins: [device]
} satisfies Config
