export default {
  failFast: true,
  environmentVariables: {
    TS_NODE_PROJECT: "tsconfig.ava.json"
  },
  extensions: {
    ts: "module"
  },
  nodeArguments: ["--no-warnings", "--loader=ts-node/esm"],
  files: ["src/**/*.test.ts"]
}
