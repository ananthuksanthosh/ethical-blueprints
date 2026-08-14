import { Github, Linkedin } from "lucide-react";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-base font-semibold tracking-tight">{site.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{site.title}</p>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {site.domains.join(" · ")}
          </p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <nav aria-label="Footer" className="flex items-center gap-4 text-sm">
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="size-4" aria-hidden="true" /> GitHub
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
            >
              <Linkedin className="size-4" aria-hidden="true" /> LinkedIn
            </a>
            <a
              href="#contact"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Contact
            </a>
          </nav>
          <p className="text-xs text-muted-foreground">
            © 2026 {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
