import type { ReactNode } from "react";

export function FocusWord({ children }: { children: ReactNode }) {
  return <strong className="font-bold text-text-primary">{children}</strong>;
}
