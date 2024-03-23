import type { Config } from "jest";
import jestSharedConfig from "./jest.shared-config";

const config: Config = {
  ...jestSharedConfig,
  testMatch: ["<rootDir>/spec/e2e/**/*.spec.(t|j)s"],
  collectCoverageFrom: ["<rootDir>/dist/**/*.(t|j)s"],
  coverageDirectory: "./coverage-e2e",
  testTimeout: 10_000,
};

export default config;
