type Props = { message?: string; onRetry?: () => void };

export default function ErrorState({
  message = "Something went wrong",
  onRetry,
}: Props) {
  return (
    <div role="alert" className="rounded-lg border p-4">
      <div className="font-semibold mb-2">Error</div>
      <p className="mb-3">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Retry
        </button>
      )}
    </div>
  );
}
