import type { Config } from "jest";
import jestSharedConfig from "./jest.shared-config";

const config: Config = {
  ...jestSharedConfig,
  testMatch: ["<rootDir>/spec/unit/**/*.spec.(t|j)s"],
  collectCoverageFrom: ["<rootDir>/src/**/*.(t|j)s"],
  coverageDirectory: "./coverage-unit",
  testTimeout: 1000,
};

export default config;
