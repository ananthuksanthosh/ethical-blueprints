import { useState, type FormEvent } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal, SectionHeading } from "./Reveal";
import { ResumeActions } from "./ResumeActions";
import { contactFormEndpoint, site } from "@/data/site";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email is too long"),
  subject: z.string().trim().min(3, "Please add a subject").max(150, "Subject is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters")
    .max(2000, "Message is too long"),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

export function Contact() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

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
            <form onSubmit={onSubmit} noValidate className="rounded-lg border border-border bg-surface p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    maxLength={100}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                  />
                  {errors.name ? (
                    <p id="contact-name-error" className="text-xs text-destructive">
                      {errors.name}
                    </p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={255}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                  />
                  {errors.email ? (
                    <p id="contact-email-error" className="text-xs text-destructive">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <Label htmlFor="contact-subject">Subject</Label>
                <Input
                  id="contact-subject"
                  name="subject"
                  maxLength={150}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                />
                {errors.subject ? (
                  <p id="contact-subject-error" className="text-xs text-destructive">
                    {errors.subject}
                  </p>
                ) : null}
              </div>

              <div className="mt-5 space-y-2">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  maxLength={2000}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                />
                {errors.message ? (
                  <p id="contact-message-error" className="text-xs text-destructive">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              {/* honeypot */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-company">Company</label>
                <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
              </div>

              <Button type="submit" className="mt-6 w-full sm:w-auto" disabled={submitting}>
                <Send className="size-4" aria-hidden="true" />
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
