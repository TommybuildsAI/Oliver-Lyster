"use client";

import { useState } from "react";
import { type Locale, t } from "@/lib/i18n";

export function ContactForm({
  locale,
  initialSubject = "",
}: {
  locale: Locale;
  initialSubject?: string;
}) {
  const d = t(locale);
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@oliverlyster.com";
  const [subject] = useState(initialSubject);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string) ?? "";
    const from = (data.get("email") as string) ?? "";
    const message = (data.get("message") as string) ?? "";
    const subj = (data.get("subject") as string) ?? "";

    const body = `${message}\n\n— ${name} (${from})`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subj || "Website enquiry"
    )}&body=${encodeURIComponent(body)}`;
  }

  const label =
    "smallcaps text-base text-graphite md:text-lg lg:text-xl";
  const field =
    "mt-3 w-full border-0 border-b border-rule bg-transparent py-3 font-serif text-xl focus:border-ink focus:outline-none placeholder:text-graphite/50 md:text-2xl";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div>
        <label className={label} htmlFor="c-name">
          {d.contact.name}
        </label>
        <input id="c-name" name="name" required className={field} />
      </div>
      <div>
        <label className={label} htmlFor="c-email">
          {d.contact.email}
        </label>
        <input id="c-email" name="email" type="email" required className={field} />
      </div>
      {subject && (
        <input type="hidden" name="subject" defaultValue={subject} />
      )}
      <div>
        <label className={label} htmlFor="c-message">
          {d.contact.message}
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={6}
          required
          className={`${field} resize-none`}
          defaultValue={subject ? `${subject}\n\n` : ""}
        />
      </div>
      <button
        type="submit"
        className="smallcaps self-start text-base link-underline md:text-lg lg:text-xl"
        data-active="true"
      >
        — {d.contact.send}
      </button>
    </form>
  );
}
