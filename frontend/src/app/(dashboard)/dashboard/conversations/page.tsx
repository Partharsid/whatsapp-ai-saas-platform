"use client"

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

import { Card, CardContent } from "@/components/ui/card";

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    api.get("/dashboard/conversations").then(setConversations).catch(console.error);
  }, []);
  return (
    <div className="space-y-8 flex flex-col h-[calc(100vh-140px)]">
      <div className="shrink-0">
        <h1 className="font-signifier text-[44px] text-ink leading-[1.1] tracking-[-0.66px]">Conversations</h1>
        <p className="font-sohne text-[16px] text-ash leading-[1.38] mt-3">
          Manage your WhatsApp inbox and take over from AI.
        </p>
      </div>

      {conversations.length === 0 ? (
        <Card className="flex-1 flex flex-col items-center justify-center p-12 text-center overflow-hidden">
          <div className="w-16 h-16 bg-fog rounded-full flex items-center justify-center mb-6 border border-dove/30 shadow-sm">
            <span className="text-2xl opacity-70 grayscale">💬</span>
          </div>
          <h2 className="font-sohne text-[22px] font-[500] text-ink mb-3">No active conversations</h2>
          <p className="font-sohne text-[16px] text-ash leading-[1.38] max-w-sm">
            Once your customers start messaging your WhatsApp number, their conversations will appear here.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 overflow-y-auto">
          {conversations.map((conv) => (
            <Card key={conv.id} className="p-4 hover:border-ink transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <span className="font-sohne text-[16px] font-[500] text-ink">{conv.contact?.name || conv.contact?.phoneNumber}</span>
                <span className="font-sohne text-[12px] text-graphite">
                  {conv.messages?.[0]?.timestamp ? new Date(conv.messages[0].timestamp).toLocaleDateString() : ""}
                </span>
              </div>
              <p className="font-sohne text-[14px] text-ash truncate">
                {conv.messages?.[0]?.content || "No messages yet"}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
