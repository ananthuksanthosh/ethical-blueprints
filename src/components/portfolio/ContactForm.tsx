import { useState, type FormEvent } from "react";
import { AlertTriangle, CheckCircle2, Loader2, Send } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { isFormspreeConfigured, submitContactForm } from "@/lib/formspree";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter a valid email address.")
    .email("Please enter a valid email address.")
    .max(255, "Email is too long."),
  subject: z.string().trim().min(1, "Please enter a subject.").max(150, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(1, "Please enter your message.")
    .max(2000, "Message is too long."),
});

type Fields = z.infer<typeof contactSchema>;
type FieldErrors = Partial<Record<keyof Fields, string>>;

const emptyFields: Fields = { name: "", email: "", subject: "", message: "" };

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; title: string; detail: string };

export function ContactForm() {
  const [values, setValues] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [honeypot, setHoneypot] = useState("");

  const submitting = status.state === "submitting";

  function setField(key: keyof Fields, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    // Honeypot: bots fill hidden fields. Pretend success, send nothing.
    if (honeypot !== "") {
      setStatus({ state: "success" });
      return;
    }

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof Fields;
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      });
      setErrors(nextErrors);
      setStatus({ state: "idle" });
      return;
    }

    setErrors({});
    setStatus({ state: "submitting" });

    const result = await submitContactForm(parsed.data);

    if (result.ok) {
      setValues(emptyFields);
      setStatus({ state: "success" });
      return;
    }

    setStatus({
      state: "error",
      title:
        result.kind === "network"
          ? "Something went wrong while sending your message."
          : result.kind === "unconfigured"
            ? "The contact form isn't connected yet."
            : "Unable to send your message right now.",
      detail:
        result.kind === "network"
          ? "Please check your connection and try again."
          : result.kind === "unconfigured"
            ? "Set VITE_FORMSPREE_FORM_ID to enable submissions. In the meantime, email me directly."
            : "Please try again or contact me through LinkedIn or GitHub.",
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-busy={submitting}
      className="rounded-lg border border-border bg-surface p-6"
    >
      <fieldset disabled={submitting} className="contents">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              name="name"
              autoComplete="name"
              maxLength={100}
              value={values.name}
              onChange={(e) => setField("name", e.target.value)}
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
              value={values.email}
              onChange={(e) => setField("email", e.target.value)}
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
            value={values.subject}
            onChange={(e) => setField("subject", e.target.value)}
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
            value={values.message}
            onChange={(e) => setField("message", e.target.value)}
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
          <input
            id="contact-company"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <Button type="submit" className="mt-6 w-full sm:w-auto" disabled={submitting}>
          {submitting ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
          {submitting ? "Sending..." : "Send Message"}
        </Button>
      </fieldset>

      <div aria-live="polite" role="status" className="empty:hidden">
        {status.state === "success" ? (
          <div className="mt-5 flex gap-3 rounded-lg border border-primary/45 bg-primary/10 p-4">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Message sent successfully.</p>
              <p className="mt-1 text-muted-foreground">
                Thanks for reaching out. I&apos;ll get back to you as soon as possible.
              </p>
            </div>
          </div>
        ) : null}
        {status.state === "error" ? (
          <div className="mt-5 flex gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
            <AlertTriangle
              className="mt-0.5 size-4 shrink-0 text-destructive"
              aria-hidden="true"
            />
            <div className="text-sm">
              <p className="font-medium text-foreground">{status.title}</p>
              <p className="mt-1 text-muted-foreground">{status.detail}</p>
            </div>
          </div>
        ) : null}
      </div>

      {!isFormspreeConfigured && status.state === "idle" ? (
        <p className="mt-4 text-xs text-muted-foreground">
          Setup note: add <code className="font-mono">VITE_FORMSPREE_FORM_ID</code> to enable
          delivery to ananthuksanthosh2006@gmail.com.
        </p>
      ) : null}
    </form>
  );
}
