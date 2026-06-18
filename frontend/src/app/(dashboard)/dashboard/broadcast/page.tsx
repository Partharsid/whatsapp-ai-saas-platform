"use client"

import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function BroadcastPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async (status: string) => {
    if (!name || !message) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await api.post("/dashboard/broadcasts", { name, message, status });
      toast.success(`Campaign ${status === "DRAFT" ? "Saved as Draft" : "Scheduled"}`);
      setName("");
      setMessage("");
    } catch (err: any) {
      toast.error(err.message || "Failed to save campaign");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-signifier text-[44px] text-ink leading-[1.1] tracking-[-0.66px]">Broadcast</h1>
        <p className="font-sohne text-[16px] text-ash leading-[1.38] mt-3">
          Send bulk WhatsApp template messages to your contacts.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Campaign</CardTitle>
          <CardDescription>Create a new broadcast campaign to send instantly or schedule for later.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <label className="font-sohne text-[14px] font-[500] text-ink">Campaign Name</label>
            <Input 
              placeholder="e.g., Summer Sale Announcement" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <label className="font-sohne text-[14px] font-[500] text-ink">Message Template</label>
            <Textarea 
              className="min-h-[150px]" 
              placeholder="Hi {{name}}, our summer sale starts today! Get 50% off on all items."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <p className="font-sohne text-[13px] text-graphite">Use {"{{name}}"} to personalize the message.</p>
          </div>

          <div className="space-y-3">
            <label className="font-sohne text-[14px] font-[500] text-ink">Target Audience</label>
            <div className="h-[44px] w-full rounded-inputs border border-dove/50 bg-fog px-4 flex items-center justify-between cursor-not-allowed opacity-70">
              <span className="font-sohne text-[15px] text-graphite">All Contacts (4,521)</span>
              <span className="text-[12px] uppercase font-[500] tracking-[0.5px]">Default</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => handleSave("DRAFT")} disabled={loading}>Save Draft</Button>
        <Button onClick={() => handleSave("SCHEDULED")} disabled={loading}>Review & Send</Button>
      </div>
    </div>
  );
}
