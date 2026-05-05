type Schema = Record<string, unknown>;

/**
 * Inline JSON-LD <script> for structured data. Pass a single schema or an
 * array (will render multiple <script> blocks). React's safe-by-default JSX
 * would escape angle brackets and quotes, breaking the JSON; we use
 * dangerouslySetInnerHTML and only ever stringify trusted, server-built
 * objects, so XSS surface is nil.
 */
export function JsonLd({ data }: { data: Schema | Schema[] }) {
  const arr = Array.isArray(data) ? data : [data];
  return (
    <>
      {arr.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
