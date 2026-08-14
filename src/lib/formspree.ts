/**
 * FORMSPREE CONFIGURATION
 * -----------------------
 * Only the PUBLIC Formspree form ID is used here (it is safe in the browser).
 * Never place Formspree private API keys or any secret token in this file.
 *
 * Set VITE_FORMSPREE_FORM_ID to the form ID from your Formspree dashboard
 * (the last path segment of https://formspree.io/f/XXXXXXX) for the form whose
 * notification email is ananthuksanthosh2006@gmail.com.
 */

export const formspreeFormId: string = (
  (import.meta.env["VITE_FORMSPREE_FORM_ID"] as string | undefined) ?? "mvkpqddj"
).trim();

export const isFormspreeConfigured = formspreeFormId.length > 0;

export const formspreeEndpoint = isFormspreeConfigured
  ? `https://formspree.io/f/${formspreeFormId}`
  : "";

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type SubmitResult =
  | { ok: true }
  | { ok: false; kind: "network" | "server" | "unconfigured"; message: string };

export async function submitContactForm(payload: ContactPayload): Promise<SubmitResult> {
  if (!isFormspreeConfigured) {
    return {
      ok: false,
      kind: "unconfigured",
      message: "The contact form isn't connected yet (missing Formspree form ID).",
    };
  }

  let response: Response;
  try {
    response = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        subject: payload.subject,
        message: payload.message,
        // Formspree uses these to set a useful subject line and reply-to address.
        _subject: `Portfolio contact: ${payload.subject}`,
        _replyto: payload.email,
      }),
    });
  } catch {
    return {
      ok: false,
      kind: "network",
      message:
        "Something went wrong while sending your message. Please check your connection and try again.",
    };
  }

  if (!response.ok) {
    return {
      ok: false,
      kind: "server",
      message: "Unable to send your message right now.",
    };
  }

  return { ok: true };
}
