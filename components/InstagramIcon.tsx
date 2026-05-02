type Props = { className?: string };

/**
 * Instagram glyph — pure SVG, inherits currentColor.
 * Sized via parent's font-size or via className width/height utilities.
 */
export function InstagramIcon({ className }: Props) {
  return (
    <svg
      role="img"
      aria-label="Instagram"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.6" cy="6.4" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
