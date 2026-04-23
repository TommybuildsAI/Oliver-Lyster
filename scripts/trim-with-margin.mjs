import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

const [, , file, marginPctArg, thresholdArg] = process.argv;
if (!file) {
  console.error("usage: node trim-with-margin.mjs <path> [marginPct=8] [threshold=18]");
  process.exit(1);
}
const marginPct = Number(marginPctArg ?? 8);
const threshold = Number(thresholdArg ?? 18);

const origBuf = await readFile(file);
const orig = await sharp(origBuf).metadata();

// First, find the tight trim bounds by trimming and measuring.
let working = origBuf;
for (let i = 0; i < 3; i++) {
  const meta = await sharp(working).metadata();
  const out = await sharp(working)
    .trim({ threshold })
    .jpeg({ quality: 95, mozjpeg: true })
    .toBuffer({ resolveWithObject: true });
  if (meta.width - out.info.width < 10 && meta.height - out.info.height < 10) break;
  working = out.data;
}
const trimmed = await sharp(working).metadata();

// Compute where the trimmed region sits inside the original.
// sharp.trim removes from edges symmetrically in direction of uniform color, so we need the original-coord bounds.
// We'll re-run trim on original and read the trimmed offset from the `trimOffsetsLeft/Top` metadata.
// Simpler: compute assuming centered trim (accurate enough for letterbox).
const trimmedW = trimmed.width;
const trimmedH = trimmed.height;
const cutW = orig.width - trimmedW;
const cutH = orig.height - trimmedH;
const leftCut = Math.round(cutW / 2);
const topCut = Math.round(cutH / 2);

// Expand outward by marginPct of the trimmed painting size, clamped to original bounds.
const marginX = Math.round(trimmedW * (marginPct / 100));
const marginY = Math.round(trimmedH * (marginPct / 100));

const newLeft = Math.max(0, leftCut - marginX);
const newTop = Math.max(0, topCut - marginY);
const newRight = Math.min(orig.width, leftCut + trimmedW + marginX);
const newBottom = Math.min(orig.height, topCut + trimmedH + marginY);
const newW = newRight - newLeft;
const newH = newBottom - newTop;

console.log(`${file.split(/[\\/]/).pop()}: ${orig.width}x${orig.height}, tight ${trimmedW}x${trimmedH}, with ${marginPct}% margin -> extract ${newLeft},${newTop} ${newW}x${newH}`);

const out = await sharp(origBuf)
  .extract({ left: newLeft, top: newTop, width: newW, height: newH })
  .jpeg({ quality: 92, mozjpeg: true })
  .toBuffer();

await writeFile(file, out);
