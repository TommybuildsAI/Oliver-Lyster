// Real pixel dimensions of each file in /public/art/.
// Used to set correct width/height props on next/image so the
// implicit aspect-ratio matches the file (prevents distortion
// when a file has been re-cropped).

export const artDims: Record<string, { w: number; h: number }> = {
  "/art/01-contemplation.jpg": { w: 883, h: 1396 },
  "/art/02-autoportrait-with-hat.jpg": { w: 1125, h: 1045 },
  "/art/03-ginger-jar-moose-skull.jpg": { w: 4031, h: 2713 },
  "/art/04-storm-coming.jpg": { w: 3663, h: 2697 },
  "/art/05-midnight-with-trees.jpg": { w: 3530, h: 2217 },
  "/art/06-a-young-woman.jpg": { w: 1080, h: 1392 },
  "/art/07-shell-grey-background.jpg": { w: 2430, h: 3461 },
  "/art/08-memories-of-autumn.jpg": { w: 3539, h: 2569 },
  "/art/09-twisted-willow.jpg": { w: 2887, h: 4032 },
  "/art/10-bright-sun.jpg": { w: 2938, h: 3743 },
  "/art/11-autoportrait-red-cap.jpg": { w: 1080, h: 1364 },
  "/art/12-vanitas.jpg": { w: 819, h: 971 },
  "/art/13-apples-pomegranate.jpg": { w: 1440, h: 940 },
  "/art/14-still-life-roman-bowl.jpg": { w: 3643, h: 2453 },
  "/art/15-night-landscape.jpg": { w: 1525, h: 1005 },
  "/art/16-trees-at-dusk.jpg": { w: 826, h: 596 },
  "/art/17-summer-meadow.jpg": { w: 3000, h: 2194 },
  "/art/18-evening-landscape.jpg": { w: 2666, h: 1834 },
  "/art/19-landscape-study.jpg": { w: 4289, h: 3063 },
  "/art/20-girl-and-oak.jpg": { w: 767, h: 1090 },
  "/art/21-figures-old-tree.jpg": { w: 1896, h: 2729 },
  "/art/22-edge-of-forest.jpg": { w: 2042, h: 2701 },
  "/art/23-willows.jpg": { w: 932, h: 607 },
  "/art/24-old-tree.jpg": { w: 844, h: 578 },
  "/art/25-pastoral-scene.jpg": { w: 2162, h: 2073 },
  "/art/26-poplar.jpg": { w: 559, h: 668 },
  "/art/27-portrait-young-woman.jpg": { w: 817, h: 1214 },
  "/art/28-portrait-study-man.jpg": { w: 354, h: 444 },
  "/art/29-young-woman-profile.jpg": { w: 2278, h: 3237 },
  "/art/30-self-portrait-study.jpg": { w: 826, h: 911 },
  "/art/31-jackal-skull.jpg": { w: 1198, h: 1017 },
  "/art/32-memento-mori.jpg": { w: 2114, h: 1648 },
  "/art/33-nude-studies.jpg": { w: 3600, h: 1905 },
  "/art/34-self-portrait-circle.jpg": { w: 2091, h: 2374 },
  "/art/35-relief-cast.jpg": { w: 2334, h: 1149 },
  "/art/36-still-life-green-jar.jpg": { w: 5875, h: 3956 },
  "/art/37-vanitas-skull-and-mug.jpg": { w: 4032, h: 3024 },
};

export function dimsFor(src: string) {
  return artDims[src] ?? { w: 1600, h: 1200 };
}
