/**
 * SITE CONFIGURATION
 * ------------------
 * Every editable value for the portfolio lives here.
 * Items marked TODO are intentionally empty — fill them in and the UI updates.
 */

export const site = {
  name: "Ananthu K Santhosh",
  title: "Aspiring Cybersecurity Professional",
  secondaryTitle: "Ethical Hacker & Cybersecurity Enthusiast",
  domains: ["Ethical Hacking", "Cloud Security", "IoT Security"],

  links: {
    github: "https://github.com/ananthuksanthosh",
    linkedin: "https://www.linkedin.com/in/ananthu-k-santhosh",
  },

  /** TODO: add the contact email here (e.g. "you@example.com"). Empty = hidden. */
  email: "",

  /**
   * TODO: place resume.pdf in /public and set this to "/resume.pdf".
   * While empty, the resume buttons show a "Resume coming soon" state.
   */
  resumePath: "",

  education: {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Marian College Kuttikkanam (Autonomous)",
    /** TODO: set the expected graduation year, e.g. "2027". Empty = "To be updated". */
    expectedGraduationYear: "",
  },

  /** Internship duration used by the stats section. */
  internshipHours: 240,
} as const;

/**
 * Contact form endpoint (Formspree or any compatible POST-JSON form service).
 * Set VITE_CONTACT_FORM_ENDPOINT in the environment; never hardcode secrets.
 */
export const contactFormEndpoint: string =
  (import.meta.env["VITE_CONTACT_FORM_ENDPOINT"] as string | undefined) ?? "";

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "labs", label: "Labs" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

/** Flip to true once real certifications exist (see src/data/certifications.ts). */
export const featureFlags = {
  showCertifications: false,
} as const;
