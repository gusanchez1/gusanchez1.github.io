// Monograma "G" desenhado com traços (o mesmo do favicon, em public/favicon.svg).
export default function Logo({ size = 28 }) {
  return (
    <svg className="logo" width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="8" fill="var(--surface)" />
      <path
        d="M21.66 10.34A8 8 0 1 0 24 16h-6.5"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
