import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { fetchPeople, type Page, type Person } from "../../../api/people";

type PeoplePage = Page<Person>;

export function usePeopleInfinite() {
  return useInfiniteQuery<
    PeoplePage,
    Error,
    InfiniteData<PeoplePage, number>,
    ["people"],
    number
  >({
    queryKey: ["people"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchPeople(pageParam),
    // IMPORTANT: stop when there is no next page
    getNextPageParam: (lastPage, _all, lastParam) =>
      lastPage.next ? lastParam + 1 : undefined,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1, // avoid long retry loops
  });
}
