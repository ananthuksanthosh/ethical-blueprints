import { useMemo, useState } from "react";
import { ExternalLink, Github, Search, ShieldQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Reveal, SectionHeading } from "./Reveal";
import { projectCategories, projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

function matches(project: Project, query: string) {
  const haystack = [
    project.title,
    project.description,
    project.category,
    project.context ?? "",
    ...project.technologies,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query.trim().toLowerCase());
}

export function Projects() {
  const [category, setCategory] = useState<(typeof projectCategories)[number]>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(
    () =>
      projects.filter(
        (project) =>
          (category === "All" || project.category === category) &&
          (query.trim() === "" || matches(project, query)),
      ),
    [category, query],
  );

  return (
    <section id="projects" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Featured Projects"
            subtitle="Security labs and software projects built end to end. Links are only shown where a real repository or demo exists."
          />
          <Reveal className="w-full lg:max-w-xs">
            <label htmlFor="project-search" className="sr-only">
              Search projects
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="project-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects, tech, category"
                className="h-10 bg-surface pl-9 text-sm"
              />
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-8 -mx-1 flex flex-wrap gap-2 px-1">
          {projectCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={cn(
                "rounded-md border px-3.5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm",
                category === item
                  ? "border-primary/60 bg-primary/12 text-primary"
                  : "border-border bg-surface text-muted-foreground hover:border-primary/35 hover:text-foreground",
              )}
            >
              {item}
            </button>
          ))}
        </Reveal>

        {filtered.length === 0 ? (
          <p className="mt-12 rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No projects match that search.
          </p>
        ) : (
          <ul className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((project, index) => (
              <Reveal
                key={project.id}
                as="li"
                delay={(index % 3) * 60}
                className="group flex h-full animate-fade-in flex-col rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/45"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-primary uppercase">
                    {project.category}
                  </span>
                  <ShieldQuestion
                    className="size-4 text-muted-foreground/60 transition-colors group-hover:text-primary"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-4 font-display text-lg leading-snug font-semibold tracking-tight">
                  {project.title}
                </h3>
                {project.context ? (
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                    {project.context}
                  </p>
                ) : null}
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded border border-border/80 bg-background/60 px-2 py-0.5 text-[11px] text-foreground/85"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4">
                  <Button size="sm" variant="secondary" onClick={() => setSelected(project)}>
                    View details
                  </Button>
                  {project.github ? (
                    <Button asChild size="sm" variant="ghost">
                      <a href={project.github} target="_blank" rel="noreferrer">
                        <Github className="size-4" aria-hidden="true" /> GitHub
                      </a>
                    </Button>
                  ) : null}
                  {project.liveDemo ? (
                    <Button asChild size="sm" variant="ghost">
                      <a href={project.liveDemo} target="_blank" rel="noreferrer">
                        <ExternalLink className="size-4" aria-hidden="true" /> Live demo
                      </a>
                    </Button>
                  ) : null}
                  {!project.github && !project.liveDemo ? (
                    <span className="font-mono text-[11px] text-muted-foreground">
                      Documentation coming soon
                    </span>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </ul>
        )}
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          {selected ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl">{selected.title}</DialogTitle>
                <DialogDescription>
                  {selected.context ? `${selected.context} · ` : ""}
                  {selected.category}
                </DialogDescription>
              </DialogHeader>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {selected.description}
              </p>

              <div>
                <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
                  What I did
                </p>
                <ul className="mt-3 space-y-2">
                  {selected.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm">
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
                  Technologies
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {selected.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded border border-border bg-surface px-2 py-0.5 text-[11px]"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {!selected.github && !selected.liveDemo ? (
                <p className="font-mono text-xs text-muted-foreground">
                  Documentation coming soon.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selected.github ? (
                    <Button asChild size="sm" variant="outline">
                      <a href={selected.github} target="_blank" rel="noreferrer">
                        <Github className="size-4" aria-hidden="true" /> Repository
                      </a>
                    </Button>
                  ) : null}
                  {selected.liveDemo ? (
                    <Button asChild size="sm" variant="outline">
                      <a href={selected.liveDemo} target="_blank" rel="noreferrer">
                        <ExternalLink className="size-4" aria-hidden="true" /> Live demo
                      </a>
                    </Button>
                  ) : null}
                </div>
              )}
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
