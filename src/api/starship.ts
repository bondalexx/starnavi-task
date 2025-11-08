export type Starship = {
  id: number;
  name: string;
  pilots: number[];
};

import { http } from "./client";
export function fetchStarship(id: number) {
  return http<Starship>(`/starships/${id}/`);
}
