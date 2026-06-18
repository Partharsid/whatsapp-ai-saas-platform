export default function FeaturesSection() {
  const features = [
    {
      title: "AI Auto-Replies",
      desc: "Connect any OpenRouter model to automatically reply to inbound messages with intelligent context.",
      icon: (
        <svg className="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Isolated Memory",
      desc: "Each customer conversation maintains its own context window, ensuring accurate, topic-specific replies.",
      icon: (
        <svg className="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Google Sheets Sync",
      desc: "Automatically log chat summaries, contact info, and sentiment analysis directly to your spreadsheets.",
      icon: (
        <svg className="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Broadcast Campaigns",
      desc: "Send personalized, template-based WhatsApp messages to segments of your audience in bulk.",
      icon: (
        <svg className="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      )
    },
    {
      title: "Scheduled Messages",
      desc: "Plan ahead. Draft messages and set them to send at the perfect time for maximum engagement.",
      icon: (
        <svg className="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Team Collaboration",
      desc: "Invite agents to view conversations, take over from the AI, and manage your WhatsApp inbox together.",
      icon: (
        <svg className="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <section id="product" className="w-full bg-fog py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-signifier text-[44px] text-ink mb-4 tracking-[-0.66px]">Everything you need to scale.</h2>
          <p className="font-sohne text-[18px] text-ash tracking-[-0.16px]">Powerful features wrapped in a calm, focused interface.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="bg-pure-white p-8 rounded-cards shadow-subtle">
              <div className="w-10 h-10 rounded-full border border-dove flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="font-sohne text-[18px] font-[500] text-ink mb-3">{feature.title}</h3>
              <p className="font-sohne text-[16px] text-ash leading-[1.38]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
