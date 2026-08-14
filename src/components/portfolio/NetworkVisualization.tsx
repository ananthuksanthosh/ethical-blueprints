import { useEffect, useMemo, useState } from "react";
import { prefersReducedMotion } from "@/hooks/use-reveal";

type Node = { id: string; x: number; y: number; r: number; label?: string };

const NODES: Node[] = [
  { id: "core", x: 50, y: 50, r: 5.5 },
  { id: "n1", x: 20, y: 22, r: 3 },
  { id: "n2", x: 80, y: 24, r: 3.4 },
  { id: "n3", x: 15, y: 62, r: 2.6 },
  { id: "n4", x: 84, y: 68, r: 3 },
  { id: "n5", x: 50, y: 12, r: 2.6 },
  { id: "n6", x: 34, y: 84, r: 3.2 },
  { id: "n7", x: 68, y: 88, r: 2.4 },
  { id: "n8", x: 30, y: 44, r: 2.2 },
  { id: "n9", x: 72, y: 46, r: 2.4 },
];

const EDGES: Array<[string, string]> = [
  ["core", "n1"],
  ["core", "n2"],
  ["core", "n3"],
  ["core", "n4"],
  ["core", "n5"],
  ["core", "n6"],
  ["core", "n7"],
  ["core", "n8"],
  ["core", "n9"],
  ["n1", "n5"],
  ["n2", "n5"],
  ["n3", "n6"],
  ["n4", "n7"],
  ["n1", "n8"],
  ["n2", "n9"],
];

const PULSES: Array<[string, string, number]> = [
  ["n1", "core", 0],
  ["core", "n4", 1.6],
  ["n6", "core", 3.1],
  ["core", "n2", 4.4],
];

function byId(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export function NetworkVisualization() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(!prefersReducedMotion());
  }, []);

  const edges = useMemo(
    () => EDGES.map(([a, b]) => ({ a: byId(a), b: byId(b), key: `${a}-${b}` })),
    [],
  );

  return (
    <div className="relative aspect-square w-full max-w-[520px]" aria-hidden="true">
      <div className="absolute inset-[12%] rounded-full bg-primary/10 blur-3xl" />
      <svg
        viewBox="0 0 100 100"
        className="relative size-full"
        role="img"
        aria-label="Abstract network security visualization"
      >
        <defs>
          <radialGradient id="nv-core" cx="50%" cy="50%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.15" />
          </radialGradient>
        </defs>

        {/* outer rings */}
        {[42, 32, 22].map((r, i) => (
          <circle
            key={r}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="var(--color-primary)"
            strokeOpacity={0.14 - i * 0.03}
            strokeDasharray="1.5 3"
          >
            {animate ? (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={i % 2 === 0 ? "0 50 50" : "360 50 50"}
                to={i % 2 === 0 ? "360 50 50" : "0 50 50"}
                dur={`${70 + i * 25}s`}
                repeatCount="indefinite"
              />
            ) : null}
          </circle>
        ))}

        {/* shield outline */}
        <path
          d="M50 30 L64 36 V50 C64 59 57.5 65.5 50 69 C42.5 65.5 36 59 36 50 V36 Z"
          fill="var(--color-primary)"
          fillOpacity="0.05"
          stroke="var(--color-primary)"
          strokeOpacity="0.3"
          strokeWidth="0.5"
        />

        {edges.map(({ a, b, key }) => (
          <line
            key={key}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="var(--color-primary)"
            strokeOpacity="0.22"
            strokeWidth="0.35"
          />
        ))}

        {animate
          ? PULSES.map(([from, to, delay]) => {
              const a = byId(from);
              const b = byId(to);
              return (
                <circle key={`${from}-${to}`} r="0.9" fill="var(--color-primary)">
                  <animate
                    attributeName="cx"
                    values={`${a.x};${b.x}`}
                    dur="2.6s"
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values={`${a.y};${b.y}`}
                    dur="2.6s"
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur="2.6s"
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              );
            })
          : null}

        {NODES.map((node) => (
          <g key={node.id}>
            {node.id === "core" ? (
              <circle cx={node.x} cy={node.y} r={node.r * 3} fill="url(#nv-core)" />
            ) : null}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill="var(--color-background)"
              stroke="var(--color-primary)"
              strokeWidth="0.6"
              strokeOpacity="0.8"
            />
            <circle cx={node.x} cy={node.y} r={node.r * 0.4} fill="var(--color-primary)">
              {animate ? (
                <animate
                  attributeName="opacity"
                  values="0.5;1;0.5"
                  dur={`${3 + (node.x % 3)}s`}
                  repeatCount="indefinite"
                />
              ) : null}
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}
