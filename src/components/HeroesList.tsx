import { useEffect, useRef } from "react";
import { usePeopleInfinite } from "../features/heroes/hooks/usePeopleInfinite";
import HeroCard from "./HeroCard";
import Spinner from "./Spinner";
import ErrorState from "./ErrorState";

type Props = { onPick: (id: number) => void };

export default function HeroesList({ onPick }: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = usePeopleInfinite();
  const sentinel = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage)
        fetchNextPage();
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "error")
    return <ErrorState message={(error as Error).message} />;
  if (status === "pending") return <Spinner />;

  const people = data?.pages.flatMap((p) => p.results) ?? [];

  return (
    <main className="container mx-auto p-6 text-neutral-100">
      <h2 className="text-2xl font-bold mb-6 tracking-tight">
        Star Wars Heroes
      </h2>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
        {people.map((p) => (
          <HeroCard key={p.id} person={p} onClick={() => onPick(p.id)} />
        ))}
      </div>

      <div className="flex justify-center pt-8">
        {hasNextPage ? (
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="
          px-5 py-2 rounded-lg bg-blue-600 text-white font-medium
          hover:bg-blue-500 disabled:opacity-60 transition-colors
          border border-blue-500/40 shadow-sm
        "
          >
            {isFetchingNextPage ? "Loading…" : "Load more"}
          </button>
        ) : (
          <span className="text-sm text-neutral-400">No more heroes</span>
        )}
      </div>
    </main>
  );
}
