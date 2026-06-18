"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot } from "lucide-react";

export default function ConversationsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Live Conversations</h1>
        <p className="text-gray-400 mt-2">Monitor AI interactions and take over manually.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-[500px]">
        <Card className="col-span-1 bg-white/5 border-white/10 backdrop-blur-md flex flex-col">
          <CardHeader>
            <CardTitle className="text-white text-lg">Active Chats</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-medium text-white">+1 (555) 000-{1000 + i}</h4>
                  <span className="text-xs text-gray-500">2m</span>
                </div>
                <p className="text-xs text-gray-400 truncate mt-1">Yes, I would like to know more about pricing.</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-2 bg-white/5 border-white/10 backdrop-blur-md flex flex-col">
          <CardHeader className="border-b border-white/5 pb-4">
            <CardTitle className="text-white text-lg flex items-center justify-between">
              <span>+1 (555) 000-1001</span>
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary font-medium">AI Active</span>
              </div>
            </CardTitle>
            <CardDescription className="text-gray-400">Bot is currently handling this conversation.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-end p-6 space-y-4">
            <div className="flex flex-col space-y-4 w-full">
              <div className="flex w-full justify-start">
                <div className="bg-white/10 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                  <p className="text-sm text-gray-200">Hi! I need help with my account.</p>
                </div>
              </div>
              <div className="flex w-full justify-end">
                <div className="bg-primary/20 border border-primary/30 rounded-2xl rounded-tr-sm p-3 max-w-[80%]">
                  <p className="text-sm text-white">Hello! I am the AuraChat AI. I&apos;d be happy to help you with your account. What specifically do you need assistance with?</p>
                </div>
              </div>
            </div>
            <div className="pt-4 mt-auto border-t border-white/5">
              <div className="flex items-center justify-center p-4 border border-dashed border-white/20 rounded-lg text-gray-500 text-sm">
                Takeover input disabled while AI is active. Toggle AI off to reply manually.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
