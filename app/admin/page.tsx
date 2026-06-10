"use client";

// Oliver's self-serve admin. Fully client-side (the site is a static
// export — there is no server). Auth, storage, and data all go straight
// to Supabase from the browser; write access is enforced by RLS.
// Publishing bumps a file in the GitHub repo via an edge function, which
// makes Cloudflare rebuild the site with the latest data (~2-3 min).

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import {
  supabase,
  ART_BUCKET,
  PUBLISH_FN_URL,
} from "@/lib/supabase-browser";

type Row = {
  id: string;
  slug: string;
  number: number;
  image: string;
  image_w: number | null;
  image_h: number | null;
  title_en: string;
  title_da: string;
  medium_en: string;
  medium_da: string;
  year: string | null;
  dimensions: string | null;
  description_en: string | null;
  description_da: string | null;
  available: boolean;
  orientation: string;
  category: string;
};

const MEDIUMS: Array<{ en: string; da: string }> = [
  { en: "Oil on linen", da: "Olie på lærred" },
  { en: "Oil on canvas", da: "Olie på lærred" },
  { en: "Oil on panel", da: "Olie på plade" },
  { en: "Oil on paper", da: "Olie på papir" },
  { en: "Oil on oak", da: "Olie på eg" },
  { en: "Oil on wood", da: "Olie på træ" },
  { en: "Ink on paper", da: "Blæk på papir" },
  { en: "Ink wash on paper", da: "Blæklavering på papir" },
  { en: "Pencil on paper", da: "Blyant på papir" },
  { en: "Pen on paper", da: "Pen på papir" },
];

const MAX_EDGE = 2400;

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replaceAll("æ", "ae")
    .replaceAll("ø", "oe")
    .replaceAll("å", "aa")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function orientationFor(w: number, h: number): string {
  const r = w / h;
  if (r > 1.08) return "landscape";
  if (r < 0.926) return "portrait";
  return "square";
}

// Downscale + re-encode in the browser so a 60 MB scan never hits
// storage. Returns the final blob and its pixel size.
async function processImage(
  file: File
): Promise<{ blob: Blob; w: number; h: number }> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new window.Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Could not read image file"));
      el.src = url;
    });
    const { naturalWidth: w, naturalHeight: h } = img;
    const longEdge = Math.max(w, h);
    if (longEdge <= MAX_EDGE && file.size <= 3 * 1024 * 1024) {
      return { blob: file, w, h };
    }
    const scale = Math.min(1, MAX_EDGE / longEdge);
    const cw = Math.round(w * scale);
    const ch = Math.round(h * scale);
    const canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");
    ctx.drawImage(img, 0, 0, cw, ch);
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Image encoding failed"))),
        "image/jpeg",
        0.87
      );
    });
    return { blob, w: cw, h: ch };
  } finally {
    URL.revokeObjectURL(url);
  }
}

const input =
  "w-full border border-rule bg-transparent px-3 py-2 font-serif text-base text-ink outline-none focus:border-ink";
const label = "smallcaps mb-1 block text-xs text-graphite";
const btn =
  "smallcaps cursor-pointer border border-ink px-5 py-2.5 text-sm transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-40";

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) return null;

  return (
    <div className="mx-auto min-h-screen max-w-[900px] px-6 py-16 md:px-12">
      <header className="mb-12 flex items-baseline justify-between border-b border-rule pb-4">
        <h1 className="display-serif text-3xl md:text-4xl">Admin</h1>
        {session && (
          <button
            onClick={() => supabase.auth.signOut()}
            className="smallcaps text-xs text-graphite link-underline"
          >
            Log out
          </button>
        )}
      </header>
      {session ? <Dashboard /> : <Login />}
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    setBusy(false);
  }

  return (
    <form onSubmit={submit} className="max-w-sm">
      <div className="mb-4">
        <label className={label} htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={input}
        />
      </div>
      <div className="mb-6">
        <label className={label} htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={input}
        />
      </div>
      {error && <p className="mb-4 font-serif text-sm text-red-900">{error}</p>}
      <button type="submit" disabled={busy} className={btn}>
        {busy ? "Logging in…" : "Log in"}
      </button>
    </form>
  );
}

function Dashboard() {
  const [rows, setRows] = useState<Row[]>([]);
  const [dirty, setDirty] = useState(false);
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("oliver_artworks")
      .select("*")
      .order("number", { ascending: false });
    if (!error && data) setRows(data as Row[]);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const markDirty = useCallback(() => {
    setDirty(true);
    setNotice("");
  }, []);

  return (
    <div className="flex flex-col gap-16">
      <PublishBar dirty={dirty} onPublished={() => setDirty(false)} />
      <UploadForm
        rows={rows}
        onUploaded={() => {
          load();
          markDirty();
        }}
      />
      <WorksList rows={rows} onChanged={() => {
        load();
        markDirty();
      }} />
      {notice && <p className="font-serif text-sm">{notice}</p>}
    </div>
  );
}

function PublishBar({
  dirty,
  onPublished,
}: {
  dirty: boolean;
  onPublished: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function publish() {
    setBusy(true);
    setMsg("");
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) throw new Error("Not logged in");
      const res = await fetch(PUBLISH_FN_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error ?? `Publish failed (${res.status})`);
      setMsg("Site update started — your changes will be live in a few minutes.");
      onPublished();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Publish failed");
    }
    setBusy(false);
  }

  return (
    <section className="border border-rule p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-serif text-base">
          {dirty
            ? "You have changes that aren't on the website yet."
            : "Changes only appear on the website after you publish."}
        </p>
        <button onClick={publish} disabled={busy} className={btn}>
          {busy ? "Publishing…" : "Publish to website"}
        </button>
      </div>
      {msg && <p className="mt-3 font-serif text-sm text-ink-soft">{msg}</p>}
    </section>
  );
}

function UploadForm({
  rows,
  onUploaded,
}: {
  rows: Row[];
  onUploaded: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [titleEn, setTitleEn] = useState("");
  const [titleDa, setTitleDa] = useState("");
  const [mediumIdx, setMediumIdx] = useState(0);
  const [customEn, setCustomEn] = useState("");
  const [customDa, setCustomDa] = useState("");
  const [year, setYear] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descDa, setDescDa] = useState("");
  const [category, setCategory] = useState("painting");
  const [available, setAvailable] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const isCustomMedium = mediumIdx === MEDIUMS.length;
  const existingSlugs = useMemo(() => new Set(rows.map((r) => r.slug)), [rows]);

  function reset() {
    setFile(null);
    setTitleEn("");
    setTitleDa("");
    setYear("");
    setDimensions("");
    setDescEn("");
    setDescDa("");
    setAvailable(true);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!file) return setError("Choose an image file.");
    const tEn = titleEn.trim() || titleDa.trim();
    const tDa = titleDa.trim() || titleEn.trim();
    if (!tEn) return setError("Give the work a title (either language is fine).");
    const mEn = isCustomMedium ? customEn.trim() || customDa.trim() : MEDIUMS[mediumIdx].en;
    const mDa = isCustomMedium ? customDa.trim() || customEn.trim() : MEDIUMS[mediumIdx].da;
    if (!mEn) return setError("Fill in the medium.");

    setBusy(true);
    try {
      const { blob, w, h } = await processImage(file);

      let slug = slugify(tEn) || "untitled";
      let n = 2;
      while (existingSlugs.has(slug)) slug = `${slugify(tEn)}-${n++}`;

      const path = `${slug}.jpg`;
      const { error: upErr } = await supabase.storage
        .from(ART_BUCKET)
        .upload(path, blob, { contentType: blob.type || "image/jpeg" });
      if (upErr) throw new Error(`Image upload failed: ${upErr.message}`);

      const { data: pub } = supabase.storage.from(ART_BUCKET).getPublicUrl(path);

      const number = rows.reduce((m, r) => Math.max(m, r.number), 0) + 1;
      const dEn = descEn.trim() || descDa.trim();
      const dDa = descDa.trim() || descEn.trim();

      const { error: insErr } = await supabase.from("oliver_artworks").insert({
        slug,
        number,
        image: pub.publicUrl,
        image_w: w,
        image_h: h,
        title_en: tEn,
        title_da: tDa,
        medium_en: mEn,
        medium_da: mDa,
        year: year.trim() || null,
        dimensions: dimensions.trim() || null,
        description_en: dEn || null,
        description_da: dDa || null,
        available,
        orientation: orientationFor(w, h),
        category,
      });
      if (insErr) throw new Error(`Saving failed: ${insErr.message}`);

      reset();
      onUploaded();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    }
    setBusy(false);
  }

  return (
    <section>
      <h2 className="smallcaps mb-6 border-b border-rule pb-3 text-base">
        — Add a new work
      </h2>
      <form onSubmit={submit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className={label} htmlFor="file">Image</label>
          <input
            id="file"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="block w-full font-serif text-sm file:mr-4 file:cursor-pointer file:border file:border-ink file:bg-transparent file:px-4 file:py-2 file:font-serif file:text-sm"
          />
          <p className="mt-1 font-serif text-xs text-graphite">
            Large photos are fine — they're resized automatically before upload.
          </p>
        </div>

        <div>
          <label className={label} htmlFor="titleEn">Title (English)</label>
          <input id="titleEn" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="titleDa">Titel (dansk)</label>
          <input id="titleDa" value={titleDa} onChange={(e) => setTitleDa(e.target.value)} className={input} />
          <p className="mt-1 font-serif text-xs text-graphite">
            Leave one empty and the other is used for both languages.
          </p>
        </div>

        <div>
          <label className={label} htmlFor="medium">Medium</label>
          <select
            id="medium"
            value={mediumIdx}
            onChange={(e) => setMediumIdx(Number(e.target.value))}
            className={input}
          >
            {MEDIUMS.map((m, i) => (
              <option key={m.en} value={i}>
                {m.en} / {m.da}
              </option>
            ))}
            <option value={MEDIUMS.length}>Other…</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor="category">Type</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className={input}>
            <option value="painting">Painting</option>
            <option value="drawing">Drawing</option>
          </select>
        </div>

        {isCustomMedium && (
          <>
            <div>
              <label className={label} htmlFor="customEn">Medium (English)</label>
              <input id="customEn" value={customEn} onChange={(e) => setCustomEn(e.target.value)} className={input} placeholder="e.g. Charcoal on paper" />
            </div>
            <div>
              <label className={label} htmlFor="customDa">Teknik (dansk)</label>
              <input id="customDa" value={customDa} onChange={(e) => setCustomDa(e.target.value)} className={input} placeholder="f.eks. Kul på papir" />
            </div>
          </>
        )}

        <div>
          <label className={label} htmlFor="year">Year (optional)</label>
          <input id="year" value={year} onChange={(e) => setYear(e.target.value)} className={input} placeholder="2026" />
        </div>
        <div>
          <label className={label} htmlFor="dimensions">Dimensions (optional)</label>
          <input id="dimensions" value={dimensions} onChange={(e) => setDimensions(e.target.value)} className={input} placeholder="40 × 50 cm" />
        </div>

        <div>
          <label className={label} htmlFor="descEn">Description (English, optional)</label>
          <textarea id="descEn" rows={3} value={descEn} onChange={(e) => setDescEn(e.target.value)} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="descDa">Beskrivelse (dansk, valgfri)</label>
          <textarea id="descDa" rows={3} value={descDa} onChange={(e) => setDescDa(e.target.value)} className={input} />
        </div>

        <div className="flex items-center gap-2 md:col-span-2">
          <input
            id="available"
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
          <label htmlFor="available" className="font-serif text-sm">
            Available for sale
          </label>
        </div>

        {error && (
          <p className="font-serif text-sm text-red-900 md:col-span-2">{error}</p>
        )}

        <div className="md:col-span-2">
          <button type="submit" disabled={busy} className={btn}>
            {busy ? "Uploading…" : "Add to gallery"}
          </button>
        </div>
      </form>
    </section>
  );
}

function WorksList({
  rows,
  onChanged,
}: {
  rows: Row[];
  onChanged: () => void;
}) {
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");

  async function toggleAvailable(r: Row) {
    setBusyId(r.id);
    setError("");
    const { error } = await supabase
      .from("oliver_artworks")
      .update({ available: !r.available })
      .eq("id", r.id);
    if (error) setError(error.message);
    else onChanged();
    setBusyId("");
  }

  async function remove(r: Row) {
    if (!window.confirm(`Delete "${r.title_en}" from the gallery? This can't be undone.`)) return;
    setBusyId(r.id);
    setError("");
    const { error } = await supabase.from("oliver_artworks").delete().eq("id", r.id);
    if (error) {
      setError(error.message);
      setBusyId("");
      return;
    }
    // New uploads live in storage; repo-era images ("/art/…") don't.
    const marker = `/object/public/${ART_BUCKET}/`;
    const i = r.image.indexOf(marker);
    if (i !== -1) {
      await supabase.storage
        .from(ART_BUCKET)
        .remove([decodeURIComponent(r.image.slice(i + marker.length))]);
    }
    onChanged();
    setBusyId("");
  }

  return (
    <section>
      <h2 className="smallcaps mb-6 border-b border-rule pb-3 text-base">
        — Works in the gallery ({rows.length})
      </h2>
      {error && <p className="mb-4 font-serif text-sm text-red-900">{error}</p>}
      <ul className="flex flex-col">
        {rows.map((r) => (
          <li
            key={r.id}
            className="flex items-center gap-4 border-b border-rule py-3"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={r.image}
              alt=""
              className="h-14 w-14 shrink-0 object-cover"
              loading="lazy"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-base">
                <span className="text-graphite">
                  № {String(r.number).padStart(2, "0")}
                </span>{" "}
                {r.title_en}
              </p>
              <p className="smallcaps text-[0.65rem] text-graphite">
                {r.medium_en} · {r.year ?? "—"} ·{" "}
                {r.available ? "available" : "sold"}
              </p>
            </div>
            <button
              onClick={() => toggleAvailable(r)}
              disabled={busyId === r.id}
              className="smallcaps shrink-0 text-xs link-underline disabled:opacity-40"
            >
              {r.available ? "Mark sold" : "Mark available"}
            </button>
            <button
              onClick={() => remove(r)}
              disabled={busyId === r.id}
              className="smallcaps shrink-0 text-xs text-red-900 link-underline disabled:opacity-40"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
