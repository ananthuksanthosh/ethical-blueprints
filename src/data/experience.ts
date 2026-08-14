export type ExperienceItem = {
  id: string;
  role: string;
  organisation: string;
  period: string;
  type: string;
  summary: string;
  points: string[];
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "ipsr-internship",
    role: "AI-Integrated Cloud, DevOps & Cybersecurity Intern",
    organisation: "IPSR Solutions Ltd.",
    period: "8 Weeks / 240 Hours",
    type: "Internship",
    summary:
      "Structured internship covering cloud platforms, DevOps automation and cybersecurity fundamentals, with AI tooling applied across the workflow.",
    points: [
      "Cloud practice on AWS and Azure: identity, compute, storage and networking",
      "DevOps workflow exposure: CI/CD, Azure DevOps, Ansible and containerised deployments",
      "Cybersecurity fundamentals, networking and Linux administration",
      "Web application security concepts and secure development practices",
      "MEDOX hospital appointment platform delivered as the capstone project",
    ],
    tags: ["AWS", "Azure", "Ansible", "CI/CD", "Azure DevOps", "Linux", "Networking"],
  },
];
