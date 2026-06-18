"use client"

import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface NavbarProps { children: React.ReactNode; className?: string }

export const Navbar = ({ children, className }: NavbarProps) => (
  <div className={cn("sticky inset-x-0 top-0 z-40 w-full", className)}>{children}</div>
)

export const NavBody = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn(
    "mx-auto hidden w-full max-w-7xl items-center justify-between rounded-full px-4 py-2 lg:flex",
    "bg-white/90 backdrop-blur-md border-b",
    className
  )}>{children}</div>
)

export const NavItems = ({ items, className, onItemClick }: {
  items: { name: string; link: string }[]
  className?: string; onItemClick?: () => void
}) => (
  <div className={cn(
    "flex flex-1 items-center justify-center space-x-1 text-sm font-medium",
    className
  )}>
    {items.map((item, idx) => (
      <Link key={idx} href={item.link} onClick={onItemClick}
        className="px-4 py-2 text-ash hover:text-ink transition-colors rounded-full hover:bg-fog">
        {item.name}
      </Link>
    ))}
  </div>
)

export const MobileNav = ({ children }: { children: React.ReactNode; className?: string }) => (
  <div className="flex w-full px-4 lg:hidden">{children}</div>
)

export const MobileNavHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex w-full items-center justify-between py-2", className)}>{children}</div>
)

export const MobileNavMenu = ({ children, isOpen, className }: {
  children: React.ReactNode; isOpen: boolean; className?: string; onClose?: () => void
}) => {
  if (!isOpen) return null
  return (
    <div className={cn(
      "absolute inset-x-0 top-full z-50 flex w-full flex-col gap-4 rounded-2xl bg-white p-6 shadow-lg border mt-2",
      className
    )}>{children}</div>
  )
}

export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <button onClick={onClick} className="p-2 hover:bg-fog rounded-lg transition-colors">
    <svg className="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {isOpen
        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      }
    </svg>
  </button>
)

export const NavbarLogo = () => (
  <Link href="/" className="flex items-center space-x-2 px-2 py-1">
    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-ink">
      <Sparkles className="h-3.5 w-3.5 text-white" />
    </div>
    <span className="font-medium text-ink">Steep</span>
  </Link>
)

export const NavbarButton = ({ href, children, variant = "primary", className, ...props }: {
  href?: string; as?: React.ElementType; children: React.ReactNode; className?: string; variant?: "primary" | "secondary"
} & React.ComponentPropsWithoutRef<"a">) => {
  const styles = variant === "primary"
    ? "bg-ink text-white hover:opacity-90"
    : "bg-transparent text-ink hover:bg-fog"
  return (
    <Link href={href || "#"} className={cn(
      "px-4 py-2 rounded-md text-sm font-medium transition-all inline-block text-center",
      styles, className
    )} {...props as any}>{children}</Link>
  )
}
