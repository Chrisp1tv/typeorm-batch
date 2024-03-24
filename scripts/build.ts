import { execSync } from "child_process";
import { rmSync, copyFileSync } from "fs";

function removeDistDirectory() {
  rmSync("./dist", { recursive: true, force: true });
}

function buildProject() {
  execSync("tsc --project tsconfig.build.json", { stdio: "inherit" });
}

function copyFilesToDist() {
  copyFileSync("./package.json", "./dist/package.json");
  copyFileSync("./README.md", "./dist/README.md");
}

removeDistDirectory();
buildProject();
copyFilesToDist();
