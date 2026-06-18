"use client";

import { cn } from "@/lib/utils";

interface GlowProps {
  variant?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Glow({ variant = "top", className }: GlowProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 select-none",
        variant === "top" && "bg-gradient-to-b from-primary/10 to-transparent",
        variant === "bottom" && "bg-gradient-to-t from-primary/10 to-transparent",
        variant === "left" && "bg-gradient-to-r from-primary/10 to-transparent",
        variant === "right" && "bg-gradient-to-l from-primary/10 to-transparent",
        className,
      )}
    />
  );
}
