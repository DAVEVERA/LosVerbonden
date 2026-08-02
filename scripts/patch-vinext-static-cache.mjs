import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const target = fileURLToPath(
  new URL(
    "../node_modules/vinext/dist/server/static-file-cache.js",
    import.meta.url,
  ),
);
const windowsPathLookup = "relativePath: path.relative(base, batch[j]),";
const urlPathLookup =
  'relativePath: path.relative(base, batch[j]).split(path.sep).join("/"),';
const source = await readFile(target, "utf8");

if (source.includes(urlPathLookup)) {
  process.exit(0);
}

if (!source.includes(windowsPathLookup)) {
  throw new Error("Vinext static-file cache implementation changed; review the patch.");
}

await writeFile(target, source.replace(windowsPathLookup, urlPathLookup));
