export type Artwork = {
  slug: string;
  number: number;
  image: string;
  title: { en: string; da: string };
  medium: { en: string; da: string };
  year: string | null;
  dimensions: string | null;
  available: boolean;
  orientation: "portrait" | "landscape" | "square";
};

export const artworks: Artwork[] = [
  {
    slug: "contemplation",
    number: 1,
    image: "/art/01-contemplation.jpg",
    title: { en: "Contemplation", da: "Kontemplation" },
    medium: { en: "Ink on paper", da: "Blæk på papir" },
    year: null,
    dimensions: null,
    available: true,
    orientation: "portrait",
  },
  {
    slug: "autoportrait-with-hat",
    number: 2,
    image: "/art/02-autoportrait-with-hat.jpg",
    title: { en: "Autoportrait with Hat", da: "Selvportræt med hat" },
    medium: { en: "Oil on linen", da: "Olie på lærred" },
    year: "2024",
    dimensions: null,
    available: true,
    orientation: "portrait",
  },
  {
    slug: "ginger-jar-moose-skull",
    number: 3,
    image: "/art/03-ginger-jar-moose-skull.jpg",
    title: {
      en: "Ginger Jar with Moose Skull",
      da: "Ingefærkrukke med elsdyrekranium",
    },
    medium: { en: "Oil on linen", da: "Olie på lærred" },
    year: null,
    dimensions: null,
    available: true,
    orientation: "landscape",
  },
  {
    slug: "storm-coming",
    number: 4,
    image: "/art/04-storm-coming.jpg",
    title: { en: "Storm Coming", da: "Storm i vente" },
    medium: { en: "Oil on linen", da: "Olie på lærred" },
    year: "2024",
    dimensions: null,
    available: true,
    orientation: "landscape",
  },
  {
    slug: "midnight-with-trees",
    number: 5,
    image: "/art/05-midnight-with-trees.jpg",
    title: { en: "Midnight with Trees", da: "Midnat med træer" },
    medium: { en: "Oil on oak", da: "Olie på eg" },
    year: null,
    dimensions: null,
    available: true,
    orientation: "portrait",
  },
  {
    slug: "filip",
    number: 6,
    image: "/art/06-filip.jpg",
    title: { en: "Filip", da: "Filip" },
    medium: { en: "Oil on oak", da: "Olie på eg" },
    year: "2026",
    dimensions: null,
    available: true,
    orientation: "portrait",
  },
  {
    slug: "shell-on-grey",
    number: 7,
    image: "/art/07-shell-grey-background.jpg",
    title: {
      en: "Shell on Grey Background",
      da: "Musling på grå baggrund",
    },
    medium: { en: "Ink wash on paper", da: "Blæklavering på papir" },
    year: null,
    dimensions: null,
    available: true,
    orientation: "square",
  },
  {
    slug: "memories-of-autumn",
    number: 8,
    image: "/art/08-memories-of-autumn.jpg",
    title: { en: "Memories of Autumn", da: "Efterårserindringer" },
    medium: { en: "Oil on linen", da: "Olie på lærred" },
    year: null,
    dimensions: null,
    available: true,
    orientation: "landscape",
  },
  {
    slug: "twisted-willow",
    number: 9,
    image: "/art/09-twisted-willow.jpg",
    title: { en: "The Twisted Willow", da: "Den forvredne pil" },
    medium: { en: "Oil on linen", da: "Olie på lærred" },
    year: "2024/25",
    dimensions: null,
    available: true,
    orientation: "portrait",
  },
  {
    slug: "bright-sun",
    number: 10,
    image: "/art/10-bright-sun.jpg",
    title: { en: "Bright Sun", da: "Skarp sol" },
    medium: { en: "Oil on canvas", da: "Olie på lærred" },
    year: null,
    dimensions: null,
    available: true,
    orientation: "landscape",
  },
];

export function getArtwork(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}
