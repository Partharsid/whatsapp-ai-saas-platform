import Link from 'next/link'
import { MessageCircle, Send, Sparkles } from 'lucide-react'

const links = [
  { title: 'Features', href: '#features' },
  { title: 'Solution', href: '#solution' },
  { title: 'Customers', href: '#customers' },
  { title: 'Pricing', href: '#pricing' },
  { title: 'Help', href: '#help' },
  { title: 'About', href: '#about' },
]

export default function FooterSection() {
  return (
    <footer className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Link href="/" aria-label="go home" className="mx-auto block size-fit">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-semibold">Steep</span>
          </div>
        </Link>

        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-muted-foreground hover:text-ink block duration-150"
            >
              <span>{link.title}</span>
            </Link>
          ))}
        </div>

        <div className="my-8 flex items-center justify-center gap-4">
          <a href="#" className="rounded-full border p-2.5 text-muted-foreground hover:text-ink hover:border-ink duration-150">
            <MessageCircle className="h-4 w-4" />
          </a>
          <a href="#" className="rounded-full border p-2.5 text-muted-foreground hover:text-ink hover:border-ink duration-150">
            <Send className="h-4 w-4" />
          </a>
        </div>

        <span className="block text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Steep AI. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
