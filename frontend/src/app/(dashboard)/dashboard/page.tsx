"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { MessageSquare, Users, Bot, Smartphone, TrendingUp } from "lucide-react"

export default function DashboardOverview() {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    api.get("/dashboard/stats").then(setStats).catch(console.error)
  }, [])

  const statCards = [
    { label: "Active Conversations", value: stats?.activeConversations ?? "-", icon: MessageSquare, color: "bg-blue-100 text-blue-700" },
    { label: "Total Contacts", value: stats?.totalContacts ?? "-", icon: Users, color: "bg-green-100 text-green-700" },
    { label: "AI Replies", value: stats?.aiRepliesSent ?? "-", icon: Bot, color: "bg-purple-100 text-purple-700" },
    { label: "WhatsApp Status", value: stats?.waStatus ?? "-", icon: Smartphone, color: "bg-orange-100 text-orange-700" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Your dashboard at a glance</p>
        </div>
        <Button className="gap-2">
          <MessageSquare className="h-4 w-4" />
          New Broadcast
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => {
          const Icon = stat.icon
          return (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Conversation Activity</CardTitle>
            <CardDescription>Messages sent and received over the last 30 days.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t pt-6">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Chart coming soon</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Regions</CardTitle>
            <CardDescription>Where your messages are going.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { country: "India", count: "12.4k", pct: 45 },
              { country: "United States", count: "5.2k", pct: 20 },
              { country: "United Kingdom", count: "3.1k", pct: 15 },
              { country: "Australia", count: "1.2k", pct: 8 },
            ].map((region, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{region.country}</span>
                  <span className="text-muted-foreground">{region.count}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-ink rounded-full" style={{ width: `${region.pct}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
