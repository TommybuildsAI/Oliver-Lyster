// Consent state lives in localStorage (it's not itself a cookie).
// `null` = no decision yet → banner is shown.
// "accepted" / "declined" = banner is hidden until reset.

export const CONSENT_KEY = "ol_cookie_consent";
export const CONSENT_EVENT = "ol-consent-change";

export type ConsentState = "accepted" | "declined" | null;

export function readConsent(): ConsentState {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(CONSENT_KEY);
  return v === "accepted" || v === "declined" ? v : null;
}

export function writeConsent(state: "accepted" | "declined") {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, state);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
}

export function clearConsent() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CONSENT_KEY);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
}
