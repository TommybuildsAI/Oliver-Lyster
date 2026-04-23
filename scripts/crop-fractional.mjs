import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

const [, , file, leftPct, topPct, rightPct, bottomPct] = process.argv;
if (!file) {
  console.error("usage: node crop-fractional.mjs <path> <left%> <top%> <right%> <bottom%>");
  process.exit(1);
}
const L = Number(leftPct), T = Number(topPct), R = Number(rightPct), B = Number(bottomPct);

const buf = await readFile(file);
const meta = await sharp(buf).metadata();
const left = Math.round((L / 100) * meta.width);
const top = Math.round((T / 100) * meta.height);
const width = Math.round(((R - L) / 100) * meta.width);
const height = Math.round(((B - T) / 100) * meta.height);

console.log(`${meta.width}x${meta.height} -> extract ${left},${top} ${width}x${height}`);

const out = await sharp(buf)
  .extract({ left, top, width, height })
  .jpeg({ quality: 92, mozjpeg: true })
  .toBuffer();

await writeFile(file, out);
const after = await sharp(out).metadata();
console.log(`final: ${after.width}x${after.height}`);
