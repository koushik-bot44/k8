import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PanelShellProps {
  /** DOM id used for scroll targeting, e.g. "panel-0". */
  id: string;
  children: ReactNode;
  /** Extra classes for the inner content column (e.g. max-width). */
  contentClassName?: string;
  /** The decorative right-edge divider (auto-hidden in vertical mode via CSS). */
  showDivider?: boolean;
}

/**
 * Shared frame for every story panel. Layout (horizontal vs vertical) is driven
 * by the parent track's `.is-horizontal` / `.is-vertical` class, so the panel
 * itself stays layout-agnostic and fully responsive.
 */
export default function PanelShell({
  id,
  children,
  contentClassName,
  showDivider = true,
}: PanelShellProps) {
  return (
    <section id={id} className="h-panel">
      {showDivider && <div className="panel-divider" />}
      <div
        className={cn(
          "relative z-10 flex w-full flex-col items-center justify-center px-5 text-center sm:px-8",
          contentClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
