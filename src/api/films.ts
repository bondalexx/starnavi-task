export type Film = {
  id: number;
  title: string;
  starships: number[];
};

import { http } from "./client";
export function fetchFilm(id: number) {
  return http<Film>(`/films/${id}/`);
}
