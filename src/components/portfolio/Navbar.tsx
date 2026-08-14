import { useEffect, useState } from "react";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { navItems, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-background/20 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#home"
          className="group flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="flex size-8 items-center justify-center rounded-md border border-primary/40 bg-primary/10 font-display text-sm font-bold text-primary">
            A
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">
            Ananthu K Santhosh
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active === item.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300",
                      active === item.id && "scale-x-100",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hidden min-h-11 min-w-11 text-muted-foreground hover:text-foreground sm:inline-flex"
          >
            <a href={site.links.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <Github className="size-[18px]" aria-hidden="true" />
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hidden min-h-11 min-w-11 text-muted-foreground hover:text-foreground sm:inline-flex"
          >
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="size-[18px]" aria-hidden="true" />
            </a>
          </Button>
          <ThemeToggle />
          <Button asChild size="sm" className="ml-1 hidden md:inline-flex">
            <a href="#contact">Get In Touch</a>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="min-h-11 min-w-11 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
        >
          <ul className="mx-auto flex w-full max-w-7xl flex-col px-5 py-3 sm:px-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex min-h-11 items-center rounded-md px-2 text-sm font-medium transition-colors",
                    active === item.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-3 flex items-center gap-2 border-t border-border pt-3">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <a href={site.links.github} target="_blank" rel="noreferrer">
                  <Github className="size-4" aria-hidden="true" /> GitHub
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="flex-1">
                <a href={site.links.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="size-4" aria-hidden="true" /> LinkedIn
                </a>
              </Button>
            </li>
            <li className="mt-2">
              <Button asChild className="w-full">
                <a href="#contact" onClick={() => setOpen(false)}>
                  Get In Touch
                </a>
              </Button>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
