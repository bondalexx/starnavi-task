import React, { useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { GraphData } from "../features/graph/types";

type Props = { data: GraphData; heroName: string };

export default function GraphView({ data, heroName }: Props) {
  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = data.nodes.map((n, idx) => ({
      id: n.id,
      data: { label: n.label },
      position: { x: (idx % 5) * 220, y: Math.floor(idx / 5) * 120 },
      style:
        n.type === "person"
          ? { border: "2px solid #2563eb", borderRadius: 8, padding: 8 }
          : n.type === "film"
          ? { border: "2px solid #16a34a", borderRadius: 8, padding: 8 }
          : { border: "2px solid #eab308", borderRadius: 8, padding: 8 },
    }));

    const edges: Edge[] = data.edges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      animated: true,
    }));

    return { nodes, edges };
  }, [data]);

  return (
    <section className="flex flex-col gap-4 text-black  ">
      <header className="flex items-center justify-center relative">
        <h1 className="text-2xl font-bold text-[#868686] tracking-tight fixed left-[32px]">
          Hero Graph
        </h1>
        <h1 className="text-lg font-bold text-white text-[32px]">{heroName}</h1>
      </header>

      <div className="h-[70vh] rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </section>
  );
}
