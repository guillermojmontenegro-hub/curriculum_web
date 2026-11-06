"use client";
import { useState } from "react";
export type Expertise = { title: string; description: string; tools: string[] };

export function ExpertiseExplorer({
  groups,
  label,
}: {
  groups: Expertise[];
  label: string;
}) {
  const [active, setActive] = useState(0);
  const group = groups[active];
  return (
    <div className="expertise-explorer">
      <div className="expertise-options" role="group" aria-label={label}>
        {groups.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-pressed={index === active}
            aria-controls="expertise-detail"
            onClick={() => setActive(index)}
          >
            <span>0{index + 1}</span>
            {item.title}
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <div
        id="expertise-detail"
        className="expertise-detail"
        aria-live="polite"
      >
        <div key={group.title} className="expertise-content">
          <p className="eyebrow">{group.title}</p>
          <p className="expertise-description">{group.description}</p>
          <div className="editorial-tools">
            {group.tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
