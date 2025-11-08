import React from "react";
import { type Person } from "../api/people";

type Props = { person: Person; onClick: () => void };

export default function HeroCard({ person, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        group flex flex-col justify-center items-center
        rounded-xl border border-neutral-800 bg-neutral-900/80
        hover:bg-neutral-800 hover:shadow-[0_0_0_1px_rgba(59,130,246,0.25)]
        focus:outline-none focus:ring-2 focus:ring-blue-500
        transition-all duration-200
        p-4
      "
      aria-label={`Open details for ${person.name}`}
    >
      <div
        className="
          text-lg font-semibold text-neutral-100 mb-1
          group-hover:text-blue-400 transition-colors
        "
      >
        {person.name}
      </div>
      <p className="text-sm text-neutral-400">View details →</p>
    </button>
  );
}
