import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

const [, , file, thresholdArg, passesArg] = process.argv;
if (!file) {
  console.error("usage: node trim-one.mjs <path> [threshold=30] [passes=3]");
  process.exit(1);
}
const threshold = Number(thresholdArg ?? 30);
const passes = Number(passesArg ?? 3);

let current = await readFile(file);
const orig = await sharp(current).metadata();
for (let i = 0; i < passes; i++) {
  const before = await sharp(current).metadata();
  const out = await sharp(current)
    .trim({ threshold })
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer({ resolveWithObject: true });
  const dw = before.width - out.info.width;
  const dh = before.height - out.info.height;
  console.log(`pass ${i + 1}: ${before.width}x${before.height} -> ${out.info.width}x${out.info.height} (-${dw}w -${dh}h)`);
  if (dw < 3 && dh < 3) break;
  current = out.data;
}
await writeFile(file, current);
const after = await sharp(current).metadata();
console.log(`final: ${orig.width}x${orig.height} -> ${after.width}x${after.height}`);
