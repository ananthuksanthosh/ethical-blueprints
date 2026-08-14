import { Github, Linkedin, Mail } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { ResumeActions } from "./ResumeActions";
import { ContactForm } from "./ContactForm";
import { site } from "@/data/site";

export function Contact() {

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Connect"
          subtitle="Recruiters, security teams and fellow learners — I'm open to internships, entry-level cybersecurity and IT roles, and collaboration on security projects."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal className="space-y-6">
            <ul className="space-y-3">
              {site.email ? (
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 text-sm transition-colors hover:border-primary/45"
                  >
                    <Mail className="size-4 text-primary" aria-hidden="true" />
                    {site.email}
                  </a>
                </li>
              ) : (
                <li className="flex items-center gap-3 rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
                  <Mail className="size-4 text-primary" aria-hidden="true" />
                  Email coming soon
                </li>
              )}
              <li>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 text-sm transition-colors hover:border-primary/45"
                >
                  <Github className="size-4 text-primary" aria-hidden="true" />
                  github.com/ananthuksanthosh
                </a>
              </li>
              <li>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 text-sm transition-colors hover:border-primary/45"
                >
                  <Linkedin className="size-4 text-primary" aria-hidden="true" />
                  Ananthu K Santhosh
                </a>
              </li>
            </ul>

            <div className="rounded-lg border border-border bg-surface p-5">
              <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">Resume</p>
              <div className="mt-4">
                <ResumeActions />
              </div>
            </div>
          </Reveal>

          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
