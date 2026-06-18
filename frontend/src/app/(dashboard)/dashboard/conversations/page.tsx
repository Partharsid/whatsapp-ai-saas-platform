"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Clock } from "lucide-react"

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<any[]>([])

  useEffect(() => {
    api.get("/dashboard/conversations").then(setConversations).catch(console.error)
  }, [])

  return (
    <div className="space-y-8 flex flex-col h-[calc(100vh-140px)]">
      <div className="shrink-0">
        <h1 className="text-3xl font-semibold tracking-tight">Conversations</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your WhatsApp inbox and take over from AI.
        </p>
      </div>

      {conversations.length === 0 ? (
        <Card className="flex-1 flex flex-col items-center justify-center p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-6">
            <MessageSquare className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No active conversations</h2>
          <p className="text-sm text-muted-foreground max-w-sm">
            Once your customers start messaging your WhatsApp number, their conversations will appear here.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 overflow-y-auto">
          {conversations.map((conv) => (
            <Card key={conv.id} className="p-4 hover:border-ink transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium">
                  {conv.contact?.name || conv.contact?.phoneNumber}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {conv.messages?.[0]?.timestamp
                    ? new Date(conv.messages[0].timestamp).toLocaleDateString()
                    : ""}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {conv.messages?.[0]?.content || "No messages yet"}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
