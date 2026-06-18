"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const mockupVariants = cva(
  "flex flex-col items-start gap-6 overflow-hidden rounded-lg border p-4",
  {
    variants: {
      type: {
        responsive: "w-full",
      },
    },
  },
);

export interface MockupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mockupVariants> {}

export function Mockup({ className, type, children, ...props }: MockupProps) {
  return (
    <div className={cn(mockupVariants({ type }), className)} {...props}>
      {children}
    </div>
  );
}

const frameVariants = cva("relative overflow-hidden rounded-lg", {
  variants: {
    size: {
      small: "max-w-4xl mx-auto",
      default: "max-w-6xl mx-auto",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface MockupFrameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof frameVariants> {}

export function MockupFrame({ className, size, children, ...props }: MockupFrameProps) {
  return (
    <div className={cn(frameVariants({ size }), className)} {...props}>
      <div className="rounded-lg border bg-background p-2 shadow-lg">
        {children}
      </div>
    </div>
  );
}
