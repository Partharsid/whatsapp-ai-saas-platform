import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-pure-white h-[64px] md:h-[72px] flex items-center border-b border-dove border-opacity-30">
      <div className="max-w-[1200px] w-full mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="font-signifier text-[22px] font-medium tracking-tight text-ink">
            Steep
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-[15px] font-sohne font-[450] text-ink">
            <Link href="#product" className="hover:text-graphite transition-colors">Product</Link>
            <Link href="#resources" className="hover:text-graphite transition-colors">Resources</Link>
            <Link href="#customers" className="hover:text-graphite transition-colors">Customers</Link>
            <Link href="#pricing" className="hover:text-graphite transition-colors">Pricing</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="text-[15px] font-sohne font-[450] text-ink hover:text-graphite transition-colors hidden sm:block"
          >
            Log in
          </Link>
          <Link 
            href="/signup" 
            className="h-[36px] px-5 bg-ink text-pure-white text-[15px] font-sohne font-[450] rounded-buttons flex items-center justify-center tracking-[-0.009em] hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
