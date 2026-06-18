"use client"

import { useState } from "react"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Save } from "lucide-react"

export default function BroadcastPage() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSave = async (status: string) => {
    if (!name || !message) {
      toast.error("Please fill in all fields")
      return
    }
    setLoading(true)
    try {
      await api.post("/dashboard/broadcasts", { name, message, status })
      toast.success(`Campaign ${status === "DRAFT" ? "saved as draft" : "scheduled"}`)
      setName("")
      setMessage("")
    } catch (err: any) {
      toast.error(err.message || "Failed to save campaign")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Broadcast</h1>
        <p className="text-sm text-ash mt-1">Send bulk WhatsApp template messages to your contacts.</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>New Campaign</CardTitle>
          <CardDescription>Create a new broadcast campaign to send instantly or schedule for later.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Campaign Name</label>
            <Input placeholder="e.g., Summer Sale Announcement" value={name} onChange={(e) => setName(e.target.value)} className="bg-white" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Message Template</label>
            <Textarea className="min-h-[150px] bg-white" placeholder='Hi {{name}}, our summer sale starts today! Get 50% off on all items.'
              value={message} onChange={(e) => setMessage(e.target.value)} />
            <p className="text-xs text-ash">Use {"{{name}}"} to personalize the message.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Target Audience</label>
            <div className="h-11 w-full rounded-lg border bg-fog/50 px-4 flex items-center text-sm text-ash">
              All Contacts (4,521)
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" className="gap-2 rounded-full" onClick={() => handleSave("DRAFT")} disabled={loading}>
          <Save className="h-4 w-4" />
          Save Draft
        </Button>
        <Button className="gap-2 rounded-full" onClick={() => handleSave("SCHEDULED")} disabled={loading}>
          <Send className="h-4 w-4" />
          Review & Send
        </Button>
      </div>
    </div>
  )
}
