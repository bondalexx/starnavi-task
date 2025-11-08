export type Node = {
  id: string;
  label: string;
  type: "person" | "film" | "starship";
};
export type Edge = { id: string; source: string; target: string };
export type GraphData = { nodes: Node[]; edges: Edge[] };
