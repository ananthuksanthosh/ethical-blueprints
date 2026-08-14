export type Lab = {
  id: string;
  title: string;
  category: "Offensive" | "Defensive" | "Cloud" | "IoT" | "Systems";
  description: string;
  tools: string[];
  concepts: string[];
};

export const labs: Lab[] = [
  {
    id: "reconnaissance",
    title: "Reconnaissance",
    category: "Offensive",
    description:
      "Mapping a lab network: identifying live hosts, open ports and exposed services before any deeper testing.",
    tools: ["Nmap", "Kali Linux"],
    concepts: ["Host discovery", "Port scanning", "Attack surface mapping"],
  },
  {
    id: "nmap",
    title: "Nmap Scanning Techniques",
    category: "Offensive",
    description:
      "Comparing scan types and timing options, and reading service/version output accurately.",
    tools: ["Nmap", "NSE scripts"],
    concepts: ["TCP/SYN scans", "Service detection", "Scan tuning"],
  },
  {
    id: "enumeration",
    title: "Service Enumeration",
    category: "Offensive",
    description:
      "Extracting shares, users and configuration details from exposed services on a vulnerable lab host.",
    tools: ["Enum4linux", "Gobuster", "Nikto"],
    concepts: ["SMB enumeration", "Directory discovery", "Banner analysis"],
  },
  {
    id: "vulnerability-assessment",
    title: "Vulnerability Assessment",
    category: "Defensive",
    description:
      "Correlating enumeration output with known weaknesses and ranking findings by practical impact.",
    tools: ["Nikto", "Nmap NSE"],
    concepts: ["Finding validation", "Severity reasoning", "False positives"],
  },
  {
    id: "exploitation",
    title: "Exploitation (Lab Only)",
    category: "Offensive",
    description:
      "Verifying vulnerabilities on the intentionally vulnerable Metasploitable2 VM inside an isolated network.",
    tools: ["Metasploit", "Kali Linux"],
    concepts: ["Exploit selection", "Payloads", "Safe lab practice"],
  },
  {
    id: "privilege-escalation",
    title: "Privilege Escalation",
    category: "Systems",
    description:
      "Enumerating a compromised lab Linux host for misconfigurations that allow higher privileges.",
    tools: ["Linux CLI", "Kali Linux"],
    concepts: ["SUID binaries", "Weak permissions", "Cron misconfiguration"],
  },
  {
    id: "web-security",
    title: "Web Application Security",
    category: "Offensive",
    description:
      "Intercepting and modifying requests to understand common web weaknesses in deliberately vulnerable apps.",
    tools: ["Burp Suite", "Gobuster"],
    concepts: ["Request interception", "Input validation flaws", "OWASP basics"],
  },
  {
    id: "mqtt-security",
    title: "MQTT Security",
    category: "IoT",
    description:
      "Hardening an MQTT broker with authentication, access control lists and TLS transport.",
    tools: ["Mosquitto", "TLS"],
    concepts: ["Broker auth", "Topic ACLs", "Encrypted transport"],
  },
  {
    id: "firmware-analysis",
    title: "Firmware Analysis",
    category: "IoT",
    description:
      "Unpacking embedded firmware images and reviewing extracted filesystems for insecure defaults.",
    tools: ["Binwalk", "Linux CLI"],
    concepts: ["Image extraction", "Filesystem review", "Hardcoded secrets"],
  },
  {
    id: "aws-security",
    title: "AWS Security Controls",
    category: "Cloud",
    description:
      "Building least-privilege identities and isolated networks in a personal AWS account.",
    tools: ["AWS IAM", "VPC", "KMS"],
    concepts: ["Least privilege", "MFA", "Network isolation", "Encryption at rest"],
  },
  {
    id: "cloudtrail",
    title: "CloudTrail Auditing",
    category: "Cloud",
    description:
      "Enabling account-wide API logging and reading trails to reconstruct who did what, and when.",
    tools: ["AWS CloudTrail", "S3"],
    concepts: ["Audit logging", "Event history", "Log retention"],
  },
  {
    id: "siem",
    title: "SIEM & Log Analysis",
    category: "Defensive",
    description:
      "Searching, filtering and dashboarding security events to build monitoring intuition.",
    tools: ["Splunk"],
    concepts: ["Log parsing", "Search queries", "Dashboards", "Alert thinking"],
  },
  {
    id: "linux-security",
    title: "Linux Security",
    category: "Systems",
    description:
      "Day-to-day hardening practice: users, permissions, services and system logs on Linux hosts.",
    tools: ["Linux", "Kali Linux"],
    concepts: ["Permissions", "Service hardening", "Log review"],
  },
];
