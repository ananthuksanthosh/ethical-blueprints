import { Cloud, Cpu, ShieldCheck, Terminal } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const focus = [
  {
    icon: ShieldCheck,
    title: "Ethical Hacking",
    body: "Reconnaissance, enumeration and exploitation practised against intentionally vulnerable machines in an isolated lab network.",
  },
  {
    icon: Cloud,
    title: "Cloud Security",
    body: "IAM, network isolation, encryption and audit logging built and tested in a personal AWS account.",
  },
  {
    icon: Cpu,
    title: "IoT Security",
    body: "MQTT broker hardening, TLS, access control lists and firmware inspection on lab devices.",
  },
  {
    icon: Terminal,
    title: "Linux & Networking",
    body: "Daily Linux practice — permissions, services, logs — alongside packet-level network analysis.",
  },
];

const careerInterests = [
  "Penetration Testing / Ethical Hacking",
  "SOC / Security Analyst",
  "Cybersecurity & IT roles",
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Learning. Testing. Securing."
          title="About Me"
          subtitle="A BCA student building cybersecurity skills the practical way — by breaking and defending systems I own."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              I&apos;m studying for a Bachelor of Computer Applications and working toward a career
              in cybersecurity. Most of what I know comes from building labs rather than reading
              about them: standing up vulnerable machines, scanning them, understanding why a
              service exposes what it does, then closing the gap.
            </p>
            <p>
              That work spans three areas. In ethical hacking I run reconnaissance-to-post-exploitation
              exercises against deliberately vulnerable virtual machines. In cloud security I
              configure IAM policies, VPCs, encryption keys and CloudTrail auditing in AWS, then send
              those logs into Splunk to see what monitoring actually looks like. In IoT security I
              work with MQTT authentication, ACLs, TLS and firmware analysis.
            </p>
            <p>
              Alongside security I write software — the MEDOX hospital appointment platform is my
              full-stack capstone — which keeps my perspective on both sides of a vulnerability:
              how it gets introduced, and how it gets found.
            </p>

            <div className="rounded-lg border border-border bg-surface p-5">
              <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
                Career direction
              </p>
              <ul className="mt-3 space-y-2">
                {careerInterests.map((interest) => (
                  <li key={interest} className="flex items-start gap-2.5 text-sm text-foreground">
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                    {interest}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-muted-foreground">
                Open to internships and entry-level roles across security and IT.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {focus.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 70}
                className="group rounded-lg border border-border bg-surface p-5 transition-colors duration-300 hover:border-primary/45"
              >
                <item.icon className="size-5 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
