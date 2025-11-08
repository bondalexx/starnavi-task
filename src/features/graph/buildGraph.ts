import type { GraphData } from "./types";
import type { Person } from "../../api/people";
import type { Film } from "../../api/films";
import type { Starship } from "../../api/starship";

export function buildGraph(
  person: Person,
  films: Film[],
  starships: Starship[]
): GraphData {
  const nodes: GraphData["nodes"] = [
    { id: `person:${person.id}`, label: person.name, type: "person" },
  ];

  const edges: GraphData["edges"] = [];

  for (const film of films) {
    nodes.push({ id: `film:${film.id}`, label: film.title, type: "film" });
    edges.push({
      id: `e:${person.id}->film:${film.id}`,
      source: `person:${person.id}`,
      target: `film:${film.id}`,
    });

    const filmShipIds = new Set(film.starships);
    for (const ship of starships) {
      const heroIsPilot = ship.pilots?.includes(person.id);
      if (heroIsPilot && filmShipIds.has(ship.id)) {
        nodes.push({
          id: `starship:${ship.id}`,
          label: ship.name,
          type: "starship",
        });
        edges.push({
          id: `e:film:${film.id}->starship:${ship.id}`,
          source: `film:${film.id}`,
          target: `starship:${ship.id}`,
        });
      }
    }
  }
  const uniqueNodes = Array.from(new Map(nodes.map((n) => [n.id, n])).values());
  const uniqueEdges = Array.from(new Map(edges.map((e) => [e.id, e])).values());

  return { nodes: uniqueNodes, edges: uniqueEdges };
}
