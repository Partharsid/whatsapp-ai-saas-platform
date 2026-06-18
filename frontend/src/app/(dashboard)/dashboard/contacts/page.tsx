"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { ContactsTable } from "@/components/ui/contacts-table-with-modal"
import { Download } from "lucide-react"

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([])

  useEffect(() => {
    api.get("/dashboard/contacts").then(setContacts).catch(console.error)
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Contacts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your leads and customers synced via WhatsApp.
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Import Contacts
        </Button>
      </div>

      <ContactsTable
        title="All Contacts"
        contacts={
          contacts.length > 0
            ? contacts.map((c: any) => ({
                id: c.id,
                name: c.name || c.phoneNumber,
                email: c.email || "",
                status: c.isBlacklisted ? "Inactive" : "Active",
                phone: c.phoneNumber,
                groups: c.tags || [],
              }))
            : undefined
        }
      />
    </div>
  )
}
