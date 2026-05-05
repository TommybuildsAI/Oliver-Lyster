import type { Locale } from "./i18n";

export type LegalSection = {
  heading: string;
  body: string[]; // paragraphs
};

export type LegalDoc = {
  title: string;
  updated: string; // human-readable date
  intro: string;
  sections: LegalSection[];
};

export const privacyText: Record<Locale, LegalDoc> = {
  da: {
    title: "Privatlivspolitik",
    updated: "5. maj 2026",
    intro:
      "Denne hjemmeside drives af Oliver Lyster (kunstner, Fyn, Danmark) som dataansvarlig. Webudviklingen er udført af RiverAI ApS (CVR 45906523).",
    sections: [
      {
        heading: "1. Hvilke oplysninger indsamles?",
        body: [
          "Kontaktformular. Hjemmesidens kontaktformular åbner din egen e-mailklient med en forudfyldt besked. Når du sender beskeden, går den direkte fra din e-mail til Olivers indbakke. Hjemmesiden lagrer ikke dine oplysninger.",
          "Server-logfiler. Hjemmesiden hostes hos Vercel Inc. (USA), som af sikkerheds- og driftsmæssige hensyn opretholder logfiler over besøg. Logs kan indeholde din IP-adresse, browsertype og tidspunkt for besøget. Disse logs slettes typisk efter 30 dage. Vercel overfører data til USA under EU-Kommissionens standardkontraktbestemmelser.",
          "Webanalyse. Hvis Google Analytics 4 er aktiveret på siden, indsamles anonymiseret information om dit besøg (sider du har set, varighed, omtrentlig geografisk placering ud fra IP-adresse, der anonymiseres før lagring). Detaljer findes i cookiepolitikken.",
        ],
      },
      {
        heading: "2. Hvad bruges oplysningerne til?",
        body: [
          "At besvare henvendelser sendt via e-mail.",
          "At sikre stabil drift af hjemmesiden.",
          "At forstå besøgsmønstre på et samlet, ikke-personhenførbart niveau (kun ved aktiv webanalyse).",
          "Oplysninger sælges ikke videre og bruges ikke til markedsføring.",
        ],
      },
      {
        heading: "3. Dine rettigheder",
        body: [
          "Du har ret til indsigt i hvilke oplysninger der eventuelt behandles om dig, berigtigelse af forkerte oplysninger, sletning (“retten til at blive glemt”) og indsigelse mod behandlingen.",
          "Du kan klage til Datatilsynet (datatilsynet.dk).",
          "Henvendelser om dine rettigheder kan rettes til den kontaktadresse, der er angivet på kontaktsiden.",
        ],
      },
      {
        heading: "4. Cookies",
        body: [
          "Se den separate cookiepolitik for detaljer om de cookies, hjemmesiden bruger.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    updated: "5 May 2026",
    intro:
      "This website is operated by Oliver Lyster (artist, Funen, Denmark) as data controller. The site was developed by RiverAI ApS (Danish CVR 45906523).",
    sections: [
      {
        heading: "1. What data is collected?",
        body: [
          "Contact form. The contact form opens your own email client with a pre-filled message. When you send it, the email goes directly from you to Oliver's inbox. The website does not store any of your data.",
          "Server logs. The website is hosted by Vercel Inc. (USA), which maintains server logs for security and operational purposes. Logs may include your IP address, browser type, and visit timestamp. These are typically retained for under 30 days. Vercel transfers data to the United States under the European Commission's Standard Contractual Clauses.",
          "Web analytics. If Google Analytics 4 is enabled on the site, anonymised information about your visit is collected (pages viewed, time on page, approximate region derived from your IP, which is anonymised before storage). See the cookie policy for details.",
        ],
      },
      {
        heading: "2. How the data is used",
        body: [
          "To respond to inquiries sent via email.",
          "To keep the website running smoothly.",
          "To understand aggregate visit patterns (only while web analytics is active).",
          "Data is never sold and is never used for marketing.",
        ],
      },
      {
        heading: "3. Your rights",
        body: [
          "You have the right to access the data that may be held about you, to have inaccurate data corrected, to have your data erased (the “right to be forgotten”), and to object to the processing.",
          "You may lodge a complaint with the Danish Data Protection Agency (datatilsynet.dk).",
          "Requests regarding your rights can be sent to the contact address shown on the contact page.",
        ],
      },
      {
        heading: "4. Cookies",
        body: [
          "See the separate cookie policy for details about the cookies this website uses.",
        ],
      },
    ],
  },
};

export const cookiesText: Record<Locale, LegalDoc> = {
  da: {
    title: "Cookiepolitik",
    updated: "5. maj 2026",
    intro:
      "Cookies er små tekstfiler, der gemmes i din browser, når du besøger en hjemmeside. De bruges blandt andet til at huske indstillinger og til at forstå, hvordan en hjemmeside benyttes.",
    sections: [
      {
        heading: "Funktionelle cookies",
        body: [
          "Ingen. Sprogvalg (dansk/engelsk) gemmes ikke i en cookie, men aflæses fra din browsers sprogindstilling og URL'en.",
        ],
      },
      {
        heading: "Analyse",
        body: [
          "Hvis Google Analytics 4 er aktiveret på siden (i øjeblikket: ikke aktiv), sætter Google følgende cookies:",
          "_ga (varighed: 2 år) — bruges til at skelne brugere fra hinanden.",
          "_ga_<id> (varighed: 2 år) — bruges af Google Analytics 4 til at gemme sessionstilstand.",
          "IP-adresser anonymiseres før lagring.",
        ],
      },
      {
        heading: "Tredjeparts-cookies",
        body: [
          "Ingen markedsførings- eller sporings-cookies fra tredjepart.",
        ],
      },
      {
        heading: "Sådan slår du cookies fra",
        body: [
          "De fleste browsere lader dig blokere eller slette cookies via indstillingerne. Vejledninger findes hos din browserudbyder (Google Chrome, Mozilla Firefox, Apple Safari m.fl.).",
        ],
      },
    ],
  },
  en: {
    title: "Cookie Policy",
    updated: "5 May 2026",
    intro:
      "Cookies are small text files stored in your browser when you visit a website. They are used to remember settings and to understand how a website is used.",
    sections: [
      {
        heading: "Functional cookies",
        body: [
          "None. Your language preference (Danish/English) is not saved to a cookie — it is derived from your browser's language settings and the page URL.",
        ],
      },
      {
        heading: "Analytics",
        body: [
          "If Google Analytics 4 is enabled on the site (currently: not active), Google sets the following cookies:",
          "_ga (lifetime: 2 years) — used to distinguish users.",
          "_ga_<id> (lifetime: 2 years) — used by Google Analytics 4 to store session state.",
          "IP addresses are anonymised before storage.",
        ],
      },
      {
        heading: "Third-party cookies",
        body: [
          "No marketing or tracking cookies from third parties.",
        ],
      },
      {
        heading: "Disabling cookies",
        body: [
          "Most browsers allow you to block or delete cookies via their settings. Instructions can be found on your browser provider's website (Google Chrome, Mozilla Firefox, Apple Safari, etc.).",
        ],
      },
    ],
  },
};
