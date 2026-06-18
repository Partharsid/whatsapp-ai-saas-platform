import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full bg-pure-white py-32 px-6 border-b border-dove border-opacity-30">
      <div className="max-w-[800px] mx-auto text-center">
        <h2 className="font-signifier text-[64px] text-ink mb-6 leading-[1.1] tracking-[-1.6px]">
          Ready to automate?
        </h2>
        <p className="font-sohne text-[18px] text-ash mb-10 leading-[1.35] tracking-[-0.16px] max-w-[500px] mx-auto">
          Join hundreds of businesses scaling their customer support and sales with Steep.
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <Link 
            href="/signup" 
            className="h-[44px] px-8 bg-ink text-pure-white text-[15px] font-sohne font-[450] rounded-buttons flex items-center justify-center tracking-[-0.009em] hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
          <Link 
            href="#pricing" 
            className="h-[44px] px-6 text-ink text-[15px] font-sohne font-[450] flex items-center justify-center tracking-[-0.009em] hover:text-graphite transition-colors"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
