export type ProjectCategory =
  | "Cybersecurity"
  | "Cloud"
  | "IoT"
  | "Development"
  | "DevOps";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  /** Small label shown above the title, e.g. "Controlled lab environment". */
  context?: string;
  description: string;
  /** Bullet points shown in the details dialog. */
  highlights: string[];
  technologies: string[];
  /** Leave undefined when no public repository exists — never invent a URL. */
  github?: string;
  /** Leave undefined when no live demo exists. */
  liveDemo?: string;
  featured: boolean;
};

export const projectCategories: Array<"All" | ProjectCategory> = [
  "All",
  "Cybersecurity",
  "Cloud",
  "IoT",
  "Development",
  "DevOps",
];

export const projects: Project[] = [
  {
    id: "medox",
    title: "MEDOX — Hospital Appointment Platform",
    category: "Development",
    context: "Full-stack capstone project",
    description:
      "A hospital appointment platform with role-based access for patients, doctors and administrators, built with a Node.js backend and a relational database.",
    highlights: [
      "Role-based appointment booking and management flows",
      "REST API built with Node.js and Express.js",
      "Relational data modelling with Prisma and MySQL",
      "Security-aware development: input validation, access control on protected routes",
    ],
    technologies: ["Node.js", "Express.js", "Prisma", "MySQL", "JavaScript", "React"],
    featured: true,
  },
  {
    id: "metasploitable2",
    title: "Ethical Hacking Lab — Metasploitable2",
    category: "Cybersecurity",
    context: "Controlled lab environment — isolated virtual network",
    description:
      "A full reconnaissance-to-post-exploitation walkthrough performed against the intentionally vulnerable Metasploitable2 VM inside an isolated lab network.",
    highlights: [
      "Host discovery and service enumeration with Nmap",
      "Service-specific enumeration (SMB, FTP, web services)",
      "Vulnerability identification and verified exploitation in the lab VM",
      "Post-exploitation and Linux privilege-escalation practice",
      "Performed only on a self-hosted, deliberately vulnerable target",
    ],
    technologies: ["Kali Linux", "Nmap", "Metasploit", "Enum4linux", "Nikto", "Gobuster"],
    featured: true,
  },
  {
    id: "iot-security-lab",
    title: "IoT Security Lab",
    category: "IoT",
    context: "Controlled academic lab",
    description:
      "Hands-on study of IoT messaging and firmware security: securing an MQTT broker and inspecting embedded firmware images in a lab setup.",
    highlights: [
      "MQTT broker configuration: authentication, ACLs and TLS",
      "Observing the impact of unauthenticated broker access in the lab",
      "Firmware image extraction and inspection with Binwalk",
      "Network traffic analysis of device communication",
    ],
    technologies: ["MQTT", "Mosquitto", "TLS", "Binwalk", "Wireshark", "Linux"],
    featured: true,
  },
  {
    id: "aws-cloud-security-labs",
    title: "AWS Cloud Security Labs",
    category: "Cloud",
    context: "Hands-on cloud labs",
    description:
      "Practical labs covering core AWS security controls — identity, network isolation, encryption and auditability — built and torn down in a personal AWS account.",
    highlights: [
      "IAM users, groups, policies, least-privilege and MFA",
      "VPC design with subnets and security groups",
      "EC2 and S3 access controls, bucket policies and encryption",
      "KMS key usage and CloudTrail auditing",
      "Exposure to RDS and API Gateway configuration",
    ],
    technologies: ["AWS", "IAM", "VPC", "EC2", "S3", "KMS", "CloudTrail", "RDS"],
    featured: true,
  },
  {
    id: "cloudtrail-splunk",
    title: "AWS CloudTrail + Splunk Security Monitoring",
    category: "Cloud",
    context: "Lab-scale monitoring pipeline",
    description:
      "Forwarding AWS CloudTrail events into Splunk to practise log analysis, searching and dashboarding for cloud security visibility.",
    highlights: [
      "CloudTrail enabled and events shipped to a Splunk instance",
      "Search queries over API activity and identity events",
      "Simple dashboards for account activity visibility",
      "Understanding what normal versus notable cloud activity looks like",
    ],
    technologies: ["AWS CloudTrail", "Splunk", "SIEM", "S3", "IAM"],
    featured: true,
  },
  {
    id: "syn-recon",
    title: "SYN Recon",
    category: "Cybersecurity",
    context: "Reconnaissance project",
    /** TODO: replace with the real SYN Recon description once finalised. */
    description:
      "A reconnaissance-focused cybersecurity project. Detailed write-up and scope are being finalised and will be published here.",
    highlights: [
      "Focus area: network and host reconnaissance",
      "Full project details coming soon",
    ],
    technologies: ["Reconnaissance", "Networking", "Linux"],
    featured: true,
  },
];
