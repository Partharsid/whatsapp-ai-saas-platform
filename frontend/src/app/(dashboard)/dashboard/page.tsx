"use client"

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

export default function DashboardOverview() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get("/dashboard/stats").then(setStats).catch(console.error);
  }, []);
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-signifier text-[44px] text-ink leading-[1.1] tracking-[-0.66px]">Overview</h1>
        <Button>New Broadcast</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Conversations", value: stats?.activeConversations ?? "-", delta: "" },
          { label: "Total Contacts", value: stats?.totalContacts ?? "-", delta: "" },
          { label: "AI Replies", value: stats?.aiRepliesSent ?? "-", delta: "" },
          { label: "WhatsApp Status", value: stats?.waStatus ?? "-", delta: "" }
        ].map((stat, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-3">
                <span className="font-signifier text-[32px] text-ink leading-none truncate max-w-[150px] inline-block align-bottom">{stat.value}</span>
                <span className="font-sohne text-[12px] text-[#10b981] font-[500]">{stat.delta}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Conversation Activity</CardTitle>
            <CardDescription>Messages sent and received over the last 30 days.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t border-dove/20 mt-4">
            <span className="font-sohne text-ash text-[15px]">Chart Placeholder</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Regions</CardTitle>
            <CardDescription>Where your messages are going.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 border-t border-dove/20 mt-4 pt-6">
            {[
              { country: "India", count: "12.4k", pct: 45 },
              { country: "United States", count: "5.2k", pct: 20 },
              { country: "United Kingdom", count: "3.1k", pct: 15 },
              { country: "Australia", count: "1.2k", pct: 8 }
            ].map((region, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 text-[13px] font-sohne text-graphite font-[500]">{i + 1}</div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-sohne text-[14px] text-ink">{region.country}</span>
                    <span className="font-sohne text-[14px] text-ash">{region.count}</span>
                  </div>
                  <div className="h-2 bg-fog rounded-full overflow-hidden">
                    <div className="h-full bg-ink" style={{ width: `${region.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
