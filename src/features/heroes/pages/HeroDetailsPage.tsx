import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useHeroGraph } from "../hooks/useHeroGraph";
import GraphView from "../../../components/GraphView";
import Spinner from "../../../components/Spinner";
import ErrorState from "../../../components/ErrorState";

export default function HeroDetailsPage() {
  const { id } = useParams();
  const heroId = Number(id);
  const query = useHeroGraph(heroId);

  const heroName = useMemo(() => {
    const personNode = query.data?.nodes.find((n) => n.type === "person");
    return personNode?.label ?? "";
  }, [query.data]);

  return (
    <main className="container mx-auto p-6  h-full bg-[#000000]">
      <Link to="/" className="text-blue-400 hover:underline">
        &larr; Back
      </Link>
      <h1 className="sr-only text-white">Hero Graph</h1>

      {query.isLoading && <Spinner />}
      {query.isError && (
        <ErrorState message={(query.error as Error)?.message || "Error"} />
      )}

      {query.data && <GraphView data={query.data} heroName={heroName} />}
    </main>
  );
}
