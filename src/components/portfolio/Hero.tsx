import { ArrowRight, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NetworkVisualization } from "./NetworkVisualization";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 md:pb-24">
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-32 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            ~/security/portfolio
          </p>

          <h1 className="mt-6 font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
            Think Like an Attacker.{" "}
            <span className="block text-primary">Build Like a Defender.</span>
          </h1>

          <p className="mt-5 font-mono text-sm tracking-wide text-muted-foreground sm:text-base">
            Ethical Hacking. Cloud Security. IoT Security.
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            I&apos;m Ananthu K Santhosh, a BCA student and aspiring cybersecurity professional. I
            spend my time understanding how systems work, finding where they break, and practising
            both sides of security in controlled labs. My focus areas are ethical hacking, cloud
            security and IoT security, supported by Linux, networking and hands-on tooling.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="group">
              <a href="#projects">
                Explore My Work
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#contact">Get In Touch</a>
            </Button>
            <div className="flex items-center gap-1 sm:ml-2">
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="min-h-11 min-w-11 text-muted-foreground hover:text-primary"
              >
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                >
                  <Github className="size-5" aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="min-h-11 min-w-11 text-muted-foreground hover:text-primary"
              >
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="size-5" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <NetworkVisualization />
        </div>
      </div>
    </section>
  );
}
