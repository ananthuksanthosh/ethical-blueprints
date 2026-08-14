export type Certification = {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
};

/**
 * Intentionally empty — no certifications yet.
 * Add entries here and set featureFlags.showCertifications = true in src/data/site.ts
 * to render the Certifications section. No redesign required.
 */
export const certifications: Certification[] = [];
