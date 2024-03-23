import type { Config } from "jest";

const config: Config = {
  moduleFileExtensions: ["js", "ts"],
  rootDir: ".",
  testEnvironment: "node",
  roots: ["<rootDir>"],
  preset: "ts-jest",
};

export default config;
