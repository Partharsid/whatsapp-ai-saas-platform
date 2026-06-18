"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, Clock, Search } from "lucide-react"

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<any[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    api.get("/dashboard/conversations").then(setConversations).catch(console.error)
  }, [])

  const filtered = conversations.filter((c) =>
    (c.contact?.name || c.contact?.phoneNumber || "").toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-120px)]">
      <div className="shrink-0">
        <h1 className="text-3xl font-semibold tracking-tight">Conversations</h1>
        <p className="text-sm text-ash mt-1">Manage your WhatsApp inbox and take over from AI.</p>
      </div>

      <div className="relative max-w-sm shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ash" />
        <Input placeholder="Search conversations..." className="pl-10 rounded-full bg-white" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {filtered.length === 0 ? (
        <Card className="flex-1 border-0 shadow-sm">
          <CardContent className="flex flex-col items-center justify-center h-full text-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-fog mb-6">
              <MessageSquare className="h-8 w-8 text-ash" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No active conversations</h2>
            <p className="text-sm text-ash max-w-sm">
              Once your customers start messaging your WhatsApp number, their conversations will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-3 overflow-y-auto flex-1">
          {filtered.map((conv) => (
            <Card key={conv.id} className="p-4 border-0 shadow-sm hover:shadow-md hover:border-ink/20 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-1.5">
                <span className="font-medium text-sm">
                  {conv.contact?.name || conv.contact?.phoneNumber}
                </span>
                <span className="flex items-center gap-1 text-xs text-ash shrink-0">
                  <Clock className="h-3 w-3" />
                  {conv.messages?.[0]?.timestamp
                    ? new Date(conv.messages[0].timestamp).toLocaleDateString()
                    : ""}
                </span>
              </div>
              <p className="text-sm text-ash truncate">
                {conv.messages?.[0]?.content || "No messages yet"}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
