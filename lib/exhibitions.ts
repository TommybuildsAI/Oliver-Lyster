export type Exhibition = {
  year: string;
  title: { en: string; da: string };
  venue: { en: string; da: string };
};

export const exhibitions: Exhibition[] = [
  {
    year: "2025",
    title: { en: "Landscapes", da: "Landskaber" },
    venue: { en: "Lundeborg Sognehus", da: "Lundeborg Sognehus" },
  },
  {
    year: "2024",
    title: { en: "Jettes Diner", da: "Jettes Diner" },
    venue: { en: "", da: "" },
  },
  {
    year: "2024",
    title: { en: "SAK Christmas Bazaar", da: "SAK Julebazar" },
    venue: { en: "SAK, Svendborg", da: "SAK, Svendborg" },
  },
  {
    year: "2022",
    title: { en: "Coming of Age", da: "Coming of Age" },
    venue: { en: "SAK, Svendborg", da: "SAK, Svendborg" },
  },
  {
    year: "2021",
    title: { en: "Portrait Now", da: "Portrait Now" },
    venue: { en: "Frederiksborg Slot", da: "Frederiksborg Slot" },
  },
  {
    year: "2012",
    title: { en: "Early Works", da: "Tidlige værker" },
    venue: { en: "Espergærde Bibliotek", da: "Espergærde Bibliotek" },
  },
];
