import { Reveal, SectionHeading } from "./Reveal";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-y border-border/60 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Capabilities"
          title="Skills & Toolkit"
          subtitle="Grouped by area rather than rated with numbers — these are the tools and concepts I work with in labs and projects."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal
              key={group.id}
              delay={index * 60}
              className="group flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-semibold tracking-tight">{group.title}</h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{group.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-border/80 bg-background/60 px-2.5 py-1 text-xs text-foreground/90 transition-colors duration-200 hover:border-primary/50 hover:text-primary"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
