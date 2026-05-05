import type { Locale } from "./i18n";

export type FaqEntry = { question: string; answer: string };

export type FaqDoc = {
  title: string;
  intro: string;
  entries: FaqEntry[];
};

export const faqText: Record<Locale, FaqDoc> = {
  da: {
    title: "Ofte stillede spørgsmål",
    intro:
      "Korte svar på de spørgsmål, der oftest stilles om kunstneren, hans uddannelse og hans værker.",
    entries: [
      {
        question: "Hvem er Oliver Lyster?",
        answer:
          "Oliver Daniel Lyster (f. 1998 i Helsingør) er klassisk skolet oliemaler bosat på Fyn. Han arbejder primært i olie og blæk i den klassiske realismes tradition — landskaber, portrætter og stillebener efter de gamle mestres forbilleder.",
      },
      {
        question: "Hvor er Oliver Lyster uddannet?",
        answer:
          "Ved Swedish Academy of Realist Art og senere som privatelev hos den amerikanske maler Charles Weed.",
      },
      {
        question: "Hvor bor og arbejder Oliver Lyster?",
        answer:
          "På landet på Fyn, Danmark. Han kombinerer sit kunstneriske virke med deltidsarbejde som graver.",
      },
      {
        question: "Hvad maler Oliver Lyster?",
        answer:
          "Primært i olie — landskaber, portrætter og stillebener. Sideløbende arbejder han med pen, blæk og blyant. Værkerne er bygget op langsomt med traditionelle metoder.",
      },
      {
        question: "Er Oliver Lysters værker til salg?",
        answer:
          "Ja. Tilgængelige værker er markeret “Tilgængelig” på værksiden. For forespørgsler, brug kontaktformularen eller skriv direkte til oliverdaniel.info@gmail.com.",
      },
      {
        question: "Hvor har Oliver Lyster udstillet?",
        answer:
          "Blandt andet ved Frederiksborg Slot (Portrait Now, 2021), SAK Svendborg, Lundeborg Sognehus og Espergærde Bibliotek. Den fulde liste står på udstillingssiden.",
      },
      {
        question: "Er Oliver Lyster på sociale medier?",
        answer:
          "Ja — Instagram: @oliverlyster.",
      },
      {
        question: "Tager Oliver Lyster imod bestillingsarbejde?",
        answer:
          "Ja, herunder portrætopgaver. Henvendelser modtages via kontaktsiden.",
      },
    ],
  },
  en: {
    title: "Frequently asked questions",
    intro:
      "Brief answers to the questions most often asked about the artist, his training, and his work.",
    entries: [
      {
        question: "Who is Oliver Lyster?",
        answer:
          "Oliver Daniel Lyster (b. 1998, Helsingør, Denmark) is a classically trained oil painter based in Funen. He works primarily in oil and ink in the tradition of classical realism — landscapes, portraits, and still lifes after the example of the Old Masters.",
      },
      {
        question: "Where did Oliver Lyster train?",
        answer:
          "At the Swedish Academy of Realist Art, and later as a private student of the American painter Charles Weed.",
      },
      {
        question: "Where does Oliver Lyster live and work?",
        answer:
          "In the countryside of Funen, Denmark. He combines his studio practice with part-time work as a gravedigger.",
      },
      {
        question: "What does Oliver Lyster paint?",
        answer:
          "Primarily in oil — landscapes, portraits, and still lifes. Alongside that, a continuous practice of pen, ink, and pencil drawing. The works are built up slowly using traditional methods.",
      },
      {
        question: "Are Oliver Lyster's works for sale?",
        answer:
          "Yes. Available works are marked “Available” on the works page. For enquiries, use the contact form or write directly to oliverdaniel.info@gmail.com.",
      },
      {
        question: "Where has Oliver Lyster exhibited?",
        answer:
          "Venues include Frederiksborg Slot (Portrait Now, 2021), SAK Svendborg, Lundeborg Sognehus, and Espergærde Bibliotek. The full list is on the exhibitions page.",
      },
      {
        question: "Is Oliver Lyster on social media?",
        answer:
          "Yes — Instagram: @oliverlyster.",
      },
      {
        question: "Does Oliver Lyster take commissions?",
        answer:
          "Yes, including portrait commissions. Enquiries are received via the contact page.",
      },
    ],
  },
};
