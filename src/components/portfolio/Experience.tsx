import { GraduationCap } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { experience } from "@/data/experience";
import { site } from "@/data/site";

export function Experience() {
  const graduation = site.education.expectedGraduationYear;

  return (
    <section id="experience" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Timeline"
          title="Experience & Education"
          subtitle="Structured, hands-on exposure through an internship and an ongoing computer applications degree."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <ol className="relative space-y-8 border-l border-border pl-6">
            {experience.map((item) => (
              <Reveal as="li" key={item.id}>
                <span
                  className="absolute -left-[5px] mt-2 size-2.5 rounded-full border border-primary bg-background"
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-primary uppercase">
                    {item.type}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{item.period}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight sm:text-xl">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm text-primary">{item.organisation}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                <ul className="mt-4 space-y-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm">
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70"
                        aria-hidden="true"
                      />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded border border-border/80 bg-surface px-2 py-0.5 text-[11px] text-foreground/85"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>

          <Reveal>
            <div
              id="education"
              className="scroll-mt-24 rounded-lg border border-border bg-surface p-6"
            >
              <GraduationCap className="size-5 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">Education</h3>
              <p className="mt-4 text-base font-medium">{site.education.degree}</p>
              <p className="mt-1 text-sm text-muted-foreground">{site.education.institution}</p>
              <p className="mt-4 font-mono text-xs text-muted-foreground">
                expected graduation: {graduation || "to be updated"}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
