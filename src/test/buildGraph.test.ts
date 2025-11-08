import { describe, it, expect } from "vitest";
import { buildGraph } from "../features/graph/buildGraph";
import person from "./fixtures/person.json";
import films from "./fixtures/films.json";
import starships from "./fixtures/starships.json";

describe("buildGraph", () => {
  it("creates person → films → starships edges only where person is a pilot and ship is in film", () => {
    const g = buildGraph(person as any, films as any, starships as any);

    // nodes
    expect(g.nodes.find((n) => n.id === "person:1")).toBeTruthy();
    expect(g.nodes.find((n) => n.id === "film:1")).toBeTruthy();
    expect(g.nodes.find((n) => n.id === "film:2")).toBeTruthy();
    // X-wing and Imperial shuttle should appear; Executor should not (no pilot)
    expect(g.nodes.find((n) => n.id === "starship:12")).toBeTruthy();
    expect(g.nodes.find((n) => n.id === "starship:22")).toBeTruthy();
    expect(g.nodes.find((n) => n.id === "starship:5")).toBeFalsy();

    // edges
    expect(
      g.edges.find((e) => e.source === "person:1" && e.target === "film:1")
    ).toBeTruthy();
    expect(
      g.edges.find((e) => e.source === "film:1" && e.target === "starship:12")
    ).toBeTruthy();
  });
});
