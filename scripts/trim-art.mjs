import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const ART_DIR = new URL("../public/art/", import.meta.url).pathname.replace(/^\//, "");

const THRESHOLD = 18;
const MAX_PASSES = 3;
const MIN_TRIM_PIXELS = 12;

async function trimOnce(buf, threshold) {
  const img = sharp(buf);
  const before = await img.metadata();
  const out = await img
    .trim({ threshold, background: undefined })
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer({ resolveWithObject: true });
  return { buf: out.data, w: out.info.width, h: out.info.height, bw: before.width, bh: before.height };
}

async function processFile(path) {
  const { readFile, writeFile } = await import("node:fs/promises");
  let current = await readFile(path);
  const origMeta = await sharp(current).metadata();
  let totalTrimmed = 0;

  for (let pass = 0; pass < MAX_PASSES; pass++) {
    const before = await sharp(current).metadata();
    let result;
    try {
      result = await trimOnce(current, THRESHOLD);
    } catch (e) {
      break;
    }
    const dw = before.width - result.w;
    const dh = before.height - result.h;
    if (dw < MIN_TRIM_PIXELS && dh < MIN_TRIM_PIXELS) break;
    current = result.buf;
    totalTrimmed += Math.max(dw, dh);
  }

  const finalMeta = await sharp(current).metadata();
  const deltaW = origMeta.width - finalMeta.width;
  const deltaH = origMeta.height - finalMeta.height;
  const pctW = ((deltaW / origMeta.width) * 100).toFixed(1);
  const pctH = ((deltaH / origMeta.height) * 100).toFixed(1);

  if (deltaW < MIN_TRIM_PIXELS && deltaH < MIN_TRIM_PIXELS) {
    console.log(`  skip   ${path.split(/[\\/]/).pop()}  ${origMeta.width}x${origMeta.height} (no letterbox)`);
    return false;
  }

  if (!DRY) await writeFile(path, current);
  console.log(`  ${DRY ? "DRY " : "TRIM"}  ${path.split(/[\\/]/).pop()}  ${origMeta.width}x${origMeta.height} -> ${finalMeta.width}x${finalMeta.height}  (-${pctW}% W, -${pctH}% H)`);
  return true;
}

const DRY = process.argv.includes("--dry");
const ONLY = process.argv.filter((a) => a.startsWith("--only=")).map((a) => a.slice(7))[0];

const files = (await readdir(ART_DIR))
  .filter((f) => /\.(jpe?g|png)$/i.test(f))
  .filter((f) => !ONLY || f.includes(ONLY));
files.sort();
console.log(`Scanning ${files.length} files in ${ART_DIR}\n`);

let trimmed = 0;
for (const f of files) {
  const p = join(ART_DIR, f);
  const s = await stat(p);
  if (!s.isFile()) continue;
  if (await processFile(p)) trimmed++;
}

console.log(`\nDone. ${trimmed}/${files.length} files trimmed.`);
