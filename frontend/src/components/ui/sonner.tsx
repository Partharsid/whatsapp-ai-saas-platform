"use client"

import {
  CircleCheck,
  Info,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
} from "lucide-react"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group font-sohne"
      icons={{
        success: <CircleCheck className="h-5 w-5 text-[#10b981]" />,
        info: <Info className="h-5 w-5 text-ink" />,
        warning: <TriangleAlert className="h-5 w-5 text-[#f59e0b]" />,
        error: <OctagonX className="h-5 w-5 text-rust" />,
        loading: <LoaderCircle className="h-5 w-5 animate-spin text-ink" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-pure-white group-[.toaster]:text-ink group-[.toaster]:border-dove/30 group-[.toaster]:shadow-subtle rounded-cards p-4",
          description: "group-[.toast]:text-ash font-sohne text-[14px]",
          actionButton:
            "group-[.toast]:bg-ink group-[.toast]:text-pure-white rounded-buttons px-4 py-2 font-[450]",
          cancelButton:
            "group-[.toast]:bg-fog group-[.toast]:text-ink rounded-buttons px-4 py-2 font-[450]",
          title: "font-sohne text-[15px] font-[500]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
