import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const cwd = process.cwd();
const norm = (p) => p.replace(/\\/g, "/").toLowerCase();

if (norm(cwd) !== norm(projectRoot)) {
  console.error(`
remi-care: wrong working directory.

  Your shell is in:  ${cwd}
  Project root is:   ${projectRoot}

Open this folder in your editor and run commands from there (PowerShell):

  cd "${projectRoot}"
  npm install
  npm run dev
`);
  process.exit(1);
}

const pkg = JSON.parse(readFileSync(join(projectRoot, "package.json"), "utf8"));
if (pkg.name !== "remi") {
  console.error("remi-care: unexpected package.json in this folder.");
  process.exit(1);
}
