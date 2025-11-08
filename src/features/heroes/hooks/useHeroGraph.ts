import { useQueries, type UseQueryResult } from "@tanstack/react-query";
import { fetchPerson, type Person } from "../../../api/people";
import { fetchFilm, type Film } from "../../../api/films";
import { fetchStarship, type Starship } from "../../../api/starship";
import { buildGraph } from "../../graph/buildGraph";
import type { GraphData } from "../../graph/types";

export function useHeroGraph(personId: number): UseQueryResult<GraphData> {
  const personQuery = useQueries({
    queries: [
      {
        queryKey: ["person", personId],
        queryFn: () => fetchPerson(personId),
        staleTime: 300_000,
      },
    ],
  })[0] as UseQueryResult<Person>;

  const filmsQueries = useQueries({
    queries: (personQuery.data?.films || []).map((id) => ({
      queryKey: ["film", id],
      queryFn: () => fetchFilm(id),
      staleTime: 300_000,
    })),
  }) as UseQueryResult<Film>[];

  const starshipsQueries = useQueries({
    queries: (personQuery.data?.starships || []).map((id) => ({
      queryKey: ["starship", id],
      queryFn: () => fetchStarship(id),
      staleTime: 300_000,
    })),
  }) as UseQueryResult<Starship>[];

  const isLoading =
    personQuery.isLoading ||
    filmsQueries.some((q) => q.isLoading) ||
    starshipsQueries.some((q) => q.isLoading);

  const isError =
    personQuery.isError ||
    filmsQueries.some((q) => q.isError) ||
    starshipsQueries.some((q) => q.isError);

  if (isLoading) return { ...personQuery, isLoading, data: undefined } as any;
  if (isError || !personQuery.data)
    return { ...personQuery, isError: true, error: personQuery.error } as any;

  const films = filmsQueries.map((q) => q.data!).filter(Boolean);
  const starships = starshipsQueries.map((q) => q.data!).filter(Boolean);

  return {
    ...personQuery,
    data: buildGraph(personQuery.data, films, starships),
  } as any;
}
