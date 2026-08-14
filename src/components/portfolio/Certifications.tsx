import { Reveal, SectionHeading } from "./Reveal";
import { certifications } from "@/data/certifications";
import { featureFlags } from "@/data/site";

/**
 * Ready but not rendered. Add entries to src/data/certifications.ts and set
 * featureFlags.showCertifications = true in src/data/site.ts to enable.
 */
export function Certifications() {
  if (!featureFlags.showCertifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Credentials" title="Certifications" />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((certification, index) => (
            <Reveal
              as="li"
              key={certification.id}
              delay={(index % 3) * 60}
              className="rounded-lg border border-border bg-surface p-6 transition-colors hover:border-primary/45"
            >
              <h3 className="font-display text-base font-semibold">{certification.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{certification.issuer}</p>
              <p className="mt-3 font-mono text-xs text-muted-foreground">{certification.year}</p>
              {certification.credentialUrl ? (
                <a
                  className="mt-3 inline-block text-sm text-primary underline-offset-4 hover:underline"
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View credential
                </a>
              ) : null}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
