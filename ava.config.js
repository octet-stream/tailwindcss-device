export default {
  failFast: true,
  extensions: {
    ts: "module"
  },
  nodeArguments: [
    "--no-warnings",
    "--loader=ts-node/esm"
  ],
  files: [
    "src/**/*.test.ts"
  ]
}
