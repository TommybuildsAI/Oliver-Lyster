import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-[1400px] flex-col items-center justify-center gap-8 px-6 text-center md:px-12">
      <p className="smallcaps text-xs text-graphite">— 404</p>
      <h1 className="display-serif text-5xl italic md:text-7xl">
        Lost in the landscape.
      </h1>
      <Link
        href="/"
        className="smallcaps text-xs link-underline"
        data-active="true"
      >
        — Return home
      </Link>
    </main>
  );
}
