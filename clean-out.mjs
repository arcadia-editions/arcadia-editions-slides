import { rmSync } from "node:fs";

const name = process.argv[2];
if (!name || !/^[a-z0-9-]+$/.test(name)) {
  console.error("Pass an output folder name made of letters, numbers, and hyphens.");
  process.exit(1);
}

rmSync(new URL(`../output/${name}`, import.meta.url), { recursive: true, force: true });
