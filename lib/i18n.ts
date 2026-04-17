export const locales = ["da", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "da";

export const dict = {
  da: {
    nav: {
      works: "Værker",
      about: "Om",
      contact: "Kontakt",
    },
    home: {
      signature: "Oliver Lyster",
      subtitle: "Maler. Funen, Danmark.",
      lead:
        "Et kunstnerskab rodfæstet i den klassiske tradition — landskaber, portrætter og stilleben malet i olie, med respekt for de gamle mestres håndværk.",
      viewWorks: "Se værker",
      readAbout: "Læs om kunstneren",
      selected: "Udvalgte værker",
      all: "Alle værker",
    },
    works: {
      title: "Værker",
      intro:
        "En samling af nylige værker i olie og blæk. For henvendelser om køb eller udstilling, skriv til kunstneren.",
      medium: "Teknik",
      year: "År",
      dimensions: "Mål",
      availability: "Status",
      available: "Tilgængelig",
      sold: "Solgt",
      inquire: "Forespørg om værket",
      back: "Tilbage til værker",
    },
    about: {
      title: "Om kunstneren",
      instagram: "Følg på Instagram",
    },
    contact: {
      title: "Kontakt",
      intro:
        "For henvendelser om værker, udstillinger, bestillingsarbejde eller presse — skriv direkte.",
      name: "Navn",
      email: "E-mail",
      message: "Besked",
      send: "Send",
      subjectInquiry: "Forespørgsel om",
      preferEmail: "Skriv hellere direkte",
    },
    footer: {
      rights: "Alle værker © Oliver Lyster",
      site: "Hjemmeside af RiverAI",
    },
    language: { da: "Dansk", en: "English", short: "DA" },
  },
  en: {
    nav: {
      works: "Works",
      about: "About",
      contact: "Contact",
    },
    home: {
      signature: "Oliver Lyster",
      subtitle: "Painter. Funen, Denmark.",
      lead:
        "A practice rooted in the classical tradition — landscapes, portraits, and still lifes in oil, made with respect for the craft of the Old Masters.",
      viewWorks: "View works",
      readAbout: "Read about the artist",
      selected: "Selected works",
      all: "All works",
    },
    works: {
      title: "Works",
      intro:
        "A selection of recent works in oil and ink. For acquisition or exhibition enquiries, please write directly.",
      medium: "Medium",
      year: "Year",
      dimensions: "Dimensions",
      availability: "Status",
      available: "Available",
      sold: "Sold",
      inquire: "Enquire about this work",
      back: "Back to works",
    },
    about: {
      title: "About the artist",
      instagram: "Follow on Instagram",
    },
    contact: {
      title: "Contact",
      intro:
        "For enquiries about works, exhibitions, commissions, or press — write directly.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send",
      subjectInquiry: "Enquiry about",
      preferEmail: "Prefer to write directly",
    },
    footer: {
      rights: "All works © Oliver Lyster",
      site: "Website by RiverAI",
    },
    language: { da: "Dansk", en: "English", short: "EN" },
  },
} as const;

export function t(locale: Locale) {
  return dict[locale];
}

export const aboutText: Record<Locale, string[]> = {
  da: [
    "Oliver Lyster (f. 1998) er klassisk uddannet oliemaler, og hans kunstneriske rejse begyndte i Helsingør, hvor han voksede op i roen fra det omkringliggende landskab. Naturen har fulgt ham fra barnsben og givet ham en dyb sans for lys, stemning og form — kvaliteter, der stadig præger hans arbejde i dag.",
    "Lyster arbejder primært i olie og maler landskaber, portrætter og stilleben med rod i de gamle mestres tradition, hvis teknikker og tankegang han har studeret siden begyndelsen af sin karriere. Hans værker bærer præg af klassisk håndværk kombineret med en stille, iagttagende tilgang til den natur, han gengiver.",
    "Han er uddannet ved Swedish Academy of Realist Art, hvor han forfinede sit tekniske fundament, og fortsatte siden sin oplæring hos den amerikanske maler Charles Weed. Disse formative år forankrede hans dedikation til realismen og til de traditionelle malemetoders disciplin.",
    "I dag bor Lyster på landet på Fyn, hvor han kombinerer sit kunstneriske virke med deltidsarbejde som graver. Den dobbelthed — mellem skabelse og forgængelighed — ligger stille og mærkbart under hans malerier.",
  ],
  en: [
    "Oliver Lyster (b. 1998) is a traditionally trained oil painter whose artistic journey began in Helsingør, where he was raised in the quiet stillness of the surrounding countryside. Immersed in nature from an early age, he developed a deep sensitivity to light, atmosphere, and form — elements that continue to shape his work today.",
    "Working primarily in oil, Lyster creates landscapes, portraits, and still lifes, drawing heavily on the traditions of the Old Masters, whose techniques and philosophies he has studied since the beginning of his career. His paintings reflect a commitment to classical craftsmanship, combined with a contemplative approach to observing the natural world.",
    "Lyster studied at the Swedish Academy of Realist Art, where he refined his technical foundation, and later continued his training under the American painter Charles Weed. These formative experiences strengthened his dedication to realism and the discipline of traditional painting methods.",
    "Currently based in the countryside of Funen, Lyster balances his artistic practice with part-time work as a gravedigger. This duality — between creation and mortality — quietly informs his work.",
  ],
};
