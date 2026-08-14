import { Reveal, SectionHeading } from "./Reveal";
import { labs } from "@/data/labs";

export function Labs() {
  return (
    <section id="labs" className="scroll-mt-24 border-y border-border/60 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Hands-on practice"
          title="Security Research & Labs"
          subtitle="Short summaries of the lab work behind my projects. Everything here was performed on systems and accounts I control."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {labs.map((lab, index) => (
            <Reveal
              key={lab.id}
              as="li"
              delay={(index % 3) * 60}
              className="group flex h-full flex-col rounded-lg border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-base font-semibold tracking-tight">{lab.title}</h3>
                <span className="shrink-0 rounded border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-primary uppercase">
                  {lab.category}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {lab.description}
              </p>

              <dl className="mt-4 space-y-2 border-t border-border/70 pt-4 text-xs">
                <div className="flex gap-2">
                  <dt className="w-16 shrink-0 font-mono tracking-wider text-muted-foreground uppercase">
                    Tools
                  </dt>
                  <dd className="text-foreground/90">{lab.tools.join(", ")}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-16 shrink-0 font-mono tracking-wider text-muted-foreground uppercase">
                    Concepts
                  </dt>
                  <dd className="text-foreground/90">{lab.concepts.join(", ")}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
