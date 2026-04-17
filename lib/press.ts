export type PressItem = {
  slug: string;
  publication: string;
  date: { en: string; da: string };
  dateIso: string;
  title: { en: string; da: string };
  url: string;
  excerpt: { en: string; da: string };
  image: string;
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
      da: "Selvom kunstig intelligens kan danne et kunstværk hurtigere, insisterer Oliver Lyster på at male med møjsommelig penselføring.",
      en: "Though artificial intelligence can generate a work of art faster, Oliver Lyster insists on painting with painstaking brushwork.",
    },
    image: "/press/ud-og-se-gode-gamle-dage.jpg",
    imageAlt: {
      da: "Selvportræt af Oliver Lyster — fra UD & SE artiklen",
      en: "Self-portrait of Oliver Lyster — from the UD & SE feature",
    },
  },
];
