"use client"

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    api.get("/dashboard/contacts").then(setContacts).catch(console.error);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-signifier text-[44px] text-ink leading-[1.1] tracking-[-0.66px]">Contacts</h1>
          <p className="font-sohne text-[16px] text-ash leading-[1.38] mt-3">
            Manage your leads and customers synced via WhatsApp.
          </p>
        </div>
        <Button>Import Contacts</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Contacts</CardTitle>
          <CardDescription>A list of all users who have interacted with your WhatsApp bot.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Seen</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-ash">No contacts found.</TableCell>
                </TableRow>
              ) : (
                contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-[500] text-ink">{contact.name}</TableCell>
                    <TableCell>{contact.phoneNumber}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-[12px] font-[500] ${contact.isBlacklisted ? "bg-rust/10 text-rust" : "bg-[#d1fae5] text-[#065f46]"}`}>
                        {contact.isBlacklisted ? "Blacklisted" : "Active"}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(contact.lastMessageAt || contact.firstContactAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="link" className="text-ink h-auto p-0">View</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
