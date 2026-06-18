"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Download, Users, MoreHorizontal, Phone, Mail, Tag } from "lucide-react"

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    api.get("/dashboard/contacts").then(setContacts).catch(console.error)
  }, [])

  const filtered = contacts.filter((c: any) =>
    (c.name || c.phoneNumber || "").toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Contacts</h1>
          <p className="text-sm text-ash mt-1">Manage your leads and customers synced via WhatsApp.</p>
        </div>
        <Button variant="outline" className="gap-2 rounded-full">
          <Download className="h-4 w-4" />
          Import
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ash" />
        <Input placeholder="Search contacts..." className="pl-10 rounded-full bg-white" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {filtered.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-fog mb-6">
              <Users className="h-8 w-8 text-ash" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No contacts yet</h2>
            <p className="text-sm text-ash max-w-sm">Connect your WhatsApp to start syncing contacts automatically.</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-fog/50">
                  <th className="text-left text-xs font-medium text-ash uppercase tracking-wider px-4 py-3">Name</th>
                  <th className="text-left text-xs font-medium text-ash uppercase tracking-wider px-4 py-3">Phone</th>
                  <th className="text-left text-xs font-medium text-ash uppercase tracking-wider px-4 py-3">Email</th>
                  <th className="text-left text-xs font-medium text-ash uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-ash uppercase tracking-wider px-4 py-3">Tags</th>
                  <th className="w-10 px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((c: any) => (
                  <tr key={c.id} className="hover:bg-fog/30 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium">{c.name || c.phoneNumber}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-ash flex items-center gap-1.5">
                        <Phone className="h-3 w-3" />{c.phoneNumber}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-ash flex items-center gap-1.5">
                        <Mail className="h-3 w-3" />{c.email || "-"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${c.isBlacklisted ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {c.isBlacklisted ? "Inactive" : "Active"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Tag className="h-3 w-3 text-ash" />
                        <span className="text-sm text-ash">{(c.tags || []).join(", ") || "-"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button className="p-1 hover:bg-fog rounded-md transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-ash" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
