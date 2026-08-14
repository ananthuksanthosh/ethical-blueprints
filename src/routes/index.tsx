import { createFileRoute } from "@tanstack/react-router";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { Stats } from "@/components/portfolio/Stats";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Labs } from "@/components/portfolio/Labs";
import { Experience } from "@/components/portfolio/Experience";
import { Certifications } from "@/components/portfolio/Certifications";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

const TITLE = "Ananthu K Santhosh | Aspiring Cybersecurity Professional";
const DESCRIPTION =
  "Ananthu K Santhosh is a BCA student and aspiring cybersecurity professional focused on ethical hacking, cloud security and IoT security, with hands-on labs in Linux, networking, AWS and security tooling.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Ananthu K Santhosh",
          jobTitle: "Aspiring Cybersecurity Professional",
          description: DESCRIPTION,
          knowsAbout: [
            "Ethical Hacking",
            "Cloud Security",
            "IoT Security",
            "Linux",
            "Networking",
          ],
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Marian College Kuttikkanam (Autonomous)",
          },
          sameAs: [
            "https://github.com/ananthuksanthosh",
            "https://www.linkedin.com/in/ananthu-k-santhosh",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-dvh bg-background">
      <LoadingScreen />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <Labs />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
