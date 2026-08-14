import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

/** Renders real resume actions when site.resumePath is set; a clean placeholder otherwise. */
export function ResumeActions() {
  const path = site.resumePath as string;

  if (!path) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" disabled aria-disabled="true">
          <FileText className="size-4" aria-hidden="true" /> View Resume
        </Button>
        <Button variant="outline" disabled aria-disabled="true">
          <Download className="size-4" aria-hidden="true" /> Download Resume
        </Button>
        <p className="font-mono text-xs text-muted-foreground">Resume coming soon</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button asChild variant="outline">
        <a href={path} target="_blank" rel="noreferrer">
          <FileText className="size-4" aria-hidden="true" /> View Resume
        </a>
      </Button>
      <Button asChild variant="outline">
        <a href={path} download>
          <Download className="size-4" aria-hidden="true" /> Download Resume
        </a>
      </Button>
    </div>
  );
}
