import { Github, Linkedin, Mail } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { ResumeActions } from "./ResumeActions";
import { ContactForm } from "./ContactForm";
import { site } from "@/data/site";

export function Contact() {

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill hidden fields.
    if (String(data.get("company") ?? "") !== "") return;

    const parsed = contactSchema.safeParse({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    });

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FieldErrors;
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      });
      setErrors(nextErrors);
      return;
    }

    setErrors({});

    if (!contactFormEndpoint) {
      toast.info("Message form isn't connected yet", {
        description: site.email
          ? `In the meantime, email ${site.email}.`
          : "Please reach out on LinkedIn or GitHub in the meantime.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(contactFormEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      form.reset();
      toast.success("Message sent", { description: "Thanks — I'll get back to you soon." });
    } catch {
      toast.error("Message could not be sent", {
        description: "Please try again, or reach out on LinkedIn.",
      });
    } finally {
      setSubmitting(false);
    }
  }

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
