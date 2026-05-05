export type PressItem = {
  slug: string;
  publication: string;
  date: { en: string; da: string };
  dateIso: string;
  title: { en: string; da: string };
  url: string;
  excerpt: { en: string; da: string };
  image: string;
  imageDims: { w: number; h: number };
  imageAlt: { en: string; da: string };
};

export const press: PressItem[] = [
  {
    slug: "ud-og-se-gode-gamle-dage",
    publication: "UD & SE",
    date: { en: "February 23, 2026", da: "23. februar 2026" },
    dateIso: "2026-02-23",
    title: {
      en: "Gode gamle dage",
      da: "Gode gamle dage",
    },
    url: "https://www.udogse.dk/gode-gamle-dage/",
    excerpt: {
      da: "Selvom kunstig intelligens kan danne et kunstværk hurtigere, end du kan sige 'centralperspektiv', insisterer Oliver Lyster på at male med møjsommelig penselføring.",
      en: "Though artificial intelligence can generate a work of art faster than you can say 'central perspective', Oliver Lyster insists on painting with painstaking brushwork.",
    },
    image: "/press/ud-og-se-gode-gamle-dage.jpg",
    imageDims: { w: 825, h: 423 },
    imageAlt: {
      da: "Selvportræt af Oliver Lyster — fra UD & SE artiklen",
      en: "Self-portrait of Oliver Lyster — from the UD & SE feature",
    },
  },
  {
    slug: "helsingor-dagblad-ensomt-menneske",
    publication: "Helsingør Dagblad",
    date: { en: "April 2, 2019", da: "2. april 2019" },
    dateIso: "2019-04-02",
    title: {
      da: "Daniel, 20 år",
      en: "Daniel, 20",
    },
    url: "https://helsingordagblad.dk/bolig-og-livsstil/daniel-20-aar-jeg-er-et-ensomt-menneske-med-et-utroligt-givende-liv",
    excerpt: {
      da: "Jeg er et ensomt menneske med et utroligt givende liv.",
      en: "I am a lonely person with an incredibly rewarding life.",
    },
    image: "/press/helsingor-dagblad-ensomt-menneske.jpg",
    imageDims: { w: 1920, h: 1280 },
    imageAlt: {
      da: "Oliver Lyster i sit atelier — fra Helsingør Dagblad",
      en: "Oliver Lyster in his studio — from Helsingør Dagblad",
    },
  },
];
