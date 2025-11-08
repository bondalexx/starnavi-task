export default function Spinner() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center py-6"
    >
      <svg
        className="animate-spin h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="4"
        />
        <path
          d="M22 12a10 10 0 0 1-10 10"
          stroke="currentColor"
          strokeWidth="4"
        />
      </svg>
      <span className="ml-3">Loading…</span>
    </div>
  );
}
