// Builds every talk in talks/ into dist/<talk>/ plus dist/index.html.
// BASE: public base path (GitHub Pages: /<repo>/). Default "/".
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = import.meta.dirname;
const dist = resolve(root, "dist");
const base = (process.env.BASE ?? "/").replace(/\/?$/, "/");
const slidev = resolve(root, "node_modules/@slidev/cli/bin/slidev.mjs");

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

const talks = readdirSync(join(root, "talks"), { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== "theme-showcase" && existsSync(join(root, "talks", d.name, "slides.md")))
  .map((d) => d.name)
  .sort((a, b) => /^\d/.test(b) - /^\d/.test(a) || b.localeCompare(a));

for (const talk of talks) {
  console.log(`\n▶ ${talk}`);
  execFileSync(
    process.execPath,
    [slidev, "build", `talks/${talk}/slides.md`, "--base", `${base}${talk}/`, "--out", join(dist, talk)],
    { cwd: root, stdio: "inherit" },
  );
}

const label = (talk) => {
  const readme = join(root, "talks", talk, "README.md");
  const h1 = existsSync(readme) && readFileSync(readme, "utf8").match(/^#\s+(.+)$/m);
  return h1 ? h1[1] : talk;
};
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

writeFileSync(
  join(dist, "index.html"),
  `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Arcadia Editions slides</title>
<style>body{font-family:system-ui,sans-serif;max-width:640px;margin:48px auto;padding:0 16px;line-height:1.6}a{color:#00abc5}</style>
</head><body>
<h1>Arcadia Editions slides</h1>
<ul>
${talks.map((t) => `<li><a href="./${t}/">${esc(label(t))}</a></li>`).join("\n")}
</ul>
<p><a href="https://github.com/arcadia-editions/arcadia-editions-slides">Source</a></p>
</body></html>
`,
);
writeFileSync(join(dist, ".nojekyll"), "");
console.log(`\n✔ ${talks.length} talks → dist/`);
