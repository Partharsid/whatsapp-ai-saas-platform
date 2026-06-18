import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-ink text-pure-white hover:opacity-90 rounded-buttons font-sohne text-[15px] font-[450] tracking-[-0.009em]",
        outline: "bg-transparent text-ink border border-dove/50 hover:bg-fog rounded-buttons font-sohne text-[15px] font-[450]",
        link: "bg-transparent text-ink hover:text-graphite font-sohne text-[15px] font-[450]",
      },
      size: {
        default: "h-[40px] px-5 py-2",
        sm: "h-[32px] px-4 py-1.5 text-[14px]",
        lg: "h-[48px] px-8 py-3 text-[16px]",
        link: "h-auto px-0 py-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
