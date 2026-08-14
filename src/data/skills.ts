export type SkillGroup = {
  id: string;
  title: string;
  summary: string;
  skills: string[];
};

/** No proficiency percentages by design — grouped capability areas only. */
export const skillGroups: SkillGroup[] = [
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    summary: "Core offensive and defensive concepts practised in lab environments.",
    skills: [
      "Ethical Hacking",
      "Penetration Testing",
      "Vulnerability Assessment",
      "Network Security",
      "Web Security",
      "IoT Security",
      "Cloud Security",
      "Security Monitoring",
      "SIEM",
      "Incident Response",
      "Digital Forensics",
    ],
  },
  {
    id: "tools",
    title: "Security Tools",
    summary: "Tooling used across reconnaissance, testing and analysis labs.",
    skills: [
      "Kali Linux",
      "Nmap",
      "Wireshark",
      "Metasploit",
      "Burp Suite",
      "Gobuster",
      "Nikto",
      "Enum4linux",
      "Binwalk",
      "Splunk",
    ],
  },
  {
    id: "cloud",
    title: "Cloud",
    summary: "Cloud platforms and the services behind hands-on security labs.",
    skills: ["AWS", "Azure", "IAM", "EC2", "S3", "VPC", "KMS", "CloudTrail", "API Gateway", "RDS"],
  },
  {
    id: "development",
    title: "Development",
    summary: "Building applications with security-aware engineering practices.",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "Prisma",
      "MySQL",
    ],
  },
  {
    id: "devops",
    title: "DevOps",
    summary: "Automation, delivery and infrastructure tooling from internship work.",
    skills: [
      "Docker",
      "Docker Compose",
      "Git",
      "GitHub",
      "GitHub Actions",
      "Jenkins",
      "Nginx",
      "PM2",
      "Ansible",
      "Terraform",
    ],
  },
];
