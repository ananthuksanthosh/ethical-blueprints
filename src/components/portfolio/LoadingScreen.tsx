import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/hooks/use-reveal";

const LINES = [
  "initializing security portfolio...",
  "loading systems...",
  "loading projects...",
  "loading experience...",
  "access granted.",
];

const STEP_MS = 180;
const HOLD_MS = 260;

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(false);
      return;
    }
    const timers: Array<ReturnType<typeof setTimeout>> = [];
    LINES.forEach((_, index) => {
      timers.push(setTimeout(() => setStep(index + 1), index * STEP_MS));
    });
    timers.push(setTimeout(() => setFading(true), LINES.length * STEP_MS + HOLD_MS));
    timers.push(setTimeout(() => setVisible(false), LINES.length * STEP_MS + HOLD_MS + 320));
    return () => timers.forEach(clearTimeout);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-100 flex items-center justify-center bg-background px-6 transition-opacity duration-300"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative w-full max-w-md rounded-lg border border-border bg-surface p-5 font-mono text-xs sm:text-sm">
        <div className="mb-4 flex items-center gap-2 text-muted-foreground">
          <span className="size-2 rounded-full bg-primary" />
          <span className="tracking-[0.18em] uppercase">~/security/portfolio</span>
        </div>
        <div className="space-y-1.5">
          {LINES.slice(0, step).map((line, index) => (
            <p
              key={line}
              className={index === LINES.length - 1 ? "text-primary" : "text-muted-foreground"}
            >
              <span className="text-primary">&gt;</span> {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
