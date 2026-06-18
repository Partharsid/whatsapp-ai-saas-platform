import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight">ParakeetClone</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Log in
            </Link>
            <Link href="/signup" className="text-sm font-medium bg-white text-slate-950 px-4 py-2 rounded-full hover:bg-slate-200 transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-8 border border-indigo-500/20">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
            Introducing AI WhatsApp Automation
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Automate your WhatsApp <br className="hidden md:block" />
            with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">OpenRouter AI</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Connect your number, configure your AI system prompt, and let our platform handle your customer conversations 24/7 with isolated chat memory.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/25">
              Get Started for Free
            </Link>
            <Link href="#pricing" className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-semibold transition-colors border border-slate-700">
              View Pricing
            </Link>
          </div>

          {/* Feature Grid */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { title: 'AI Auto-Replies', desc: 'Connect any OpenRouter model to automatically reply to inbound messages with intelligent context.', icon: '🤖' },
              { title: 'Isolated Memory', desc: 'Each customer conversation maintains its own context window, ensuring accurate, topic-specific replies.', icon: '🧠' },
              { title: 'Google Sheets Sync', desc: 'Automatically log chat summaries, contact info, and sentiment analysis directly to your spreadsheets.', icon: '📊' }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-colors">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
