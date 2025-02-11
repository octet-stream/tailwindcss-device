import {defineConfig} from "vitest/config"

export default defineConfig({
  test: {
    reporters: ["default", "junit"],
    outputFile: "./vitest-report.junit.xml",
    coverage: {
      provider: "istanbul",
      include: ["src/**/*.ts"]
    }
  }
})
