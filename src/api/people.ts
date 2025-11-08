export type Person = {
  id: number;
  name: string;
  films: number[];
  starships: number[];
};

export type Page<T> = {
  results: T[];
  next: string | null;
  previous: string | null;
};

import { http } from "./client";

export function fetchPeople(page = 1) {
  console.log("[fetchPeople] page=", page);
  return http<Page<Person>>(`/people/?page=${page}`);
}
export function fetchPerson(id: number) {
  return http<Person>(`/people/${id}/`);
}
