import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-fog py-16 px-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <Link href="/" className="font-signifier text-[22px] font-medium tracking-tight text-ink block mb-4">
            Steep
          </Link>
          <p className="font-sohne text-[14px] text-graphite leading-[1.5]">
            © {new Date().getFullYear()} Steep, Inc.<br />
            All rights reserved.
          </p>
        </div>
        
        <div>
          <h4 className="font-sohne text-[14px] font-[500] text-ink mb-4">Product</h4>
          <ul className="space-y-3 font-sohne text-[14px] text-graphite">
            <li><Link href="#features" className="hover:text-ink transition-colors">Features</Link></li>
            <li><Link href="#pricing" className="hover:text-ink transition-colors">Pricing</Link></li>
            <li><Link href="#changelog" className="hover:text-ink transition-colors">Changelog</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-sohne text-[14px] font-[500] text-ink mb-4">Resources</h4>
          <ul className="space-y-3 font-sohne text-[14px] text-graphite">
            <li><Link href="#docs" className="hover:text-ink transition-colors">Documentation</Link></li>
            <li><Link href="#guides" className="hover:text-ink transition-colors">Guides</Link></li>
            <li><Link href="#api" className="hover:text-ink transition-colors">API Reference</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-sohne text-[14px] font-[500] text-ink mb-4">Company</h4>
          <ul className="space-y-3 font-sohne text-[14px] text-graphite">
            <li><Link href="#about" className="hover:text-ink transition-colors">About</Link></li>
            <li><Link href="#blog" className="hover:text-ink transition-colors">Blog</Link></li>
            <li><Link href="#contact" className="hover:text-ink transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
