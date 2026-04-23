import sharp from "sharp";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

const ART_DIR = new URL("../public/art/", import.meta.url).pathname.replace(/^\//, "");
const files = (await readdir(ART_DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();

const map = {};
for (const f of files) {
  const m = await sharp(join(ART_DIR, f)).metadata();
  map[f] = { w: m.width, h: m.height };
}
console.log(JSON.stringify(map, null, 2));
