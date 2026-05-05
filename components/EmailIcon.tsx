type Props = { className?: string };

/**
 * Envelope glyph — pure SVG, inherits currentColor.
 */
export function EmailIcon({ className }: Props) {
  return (
    <svg
      role="img"
      aria-label="Email"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M3.2 6.5 L12 13 L20.8 6.5" />
    </svg>
  );
}
