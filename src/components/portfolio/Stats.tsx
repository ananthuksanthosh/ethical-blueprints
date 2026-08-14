import { useCountUp } from "@/hooks/use-reveal";
import { projects } from "@/data/projects";
import { labs } from "@/data/labs";
import { site } from "@/data/site";

const stats = [
  { value: projects.length, suffix: "", label: "Security & Dev Projects" },
  { value: labs.length, suffix: "", label: "Hands-on Security Labs" },
  { value: site.internshipHours, suffix: "", label: "Internship Hours" },
  { value: site.domains.length, suffix: "", label: "Primary Security Domains" },
];

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: current } = useCountUp(value);

  return (
    <div
      ref={ref}
      className="border-t border-border pt-5 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6"
    >
      <p className="font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl">
        {current}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function Stats() {
  return (
    <section aria-label="Portfolio statistics" className="relative py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-0">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          status: learning · focus: cybersecurity
        </p>
      </div>
    </section>
  );
}
