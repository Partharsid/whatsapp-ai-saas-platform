"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ContactsPage() {
  const contacts = [
    { id: 1, name: "Alice Smith", phone: "+1 (555) 123-4567", status: "Active", lastActive: "2 mins ago" },
    { id: 2, name: "Bob Jones", phone: "+1 (555) 987-6543", status: "Inactive", lastActive: "1 day ago" },
    { id: 3, name: "Charlie Davis", phone: "+1 (555) 456-7890", status: "Active", lastActive: "Just now" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Contacts</h1>
        <p className="text-gray-400 mt-2">Manage your WhatsApp contacts and leads.</p>
      </div>

      <Card className="bg-white/5 border-white/10 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white">All Contacts</CardTitle>
          <CardDescription className="text-gray-400">View and manage all people interacting with your bot.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="w-4 h-4 text-gray-400" />
            <Input placeholder="Search contacts..." className="max-w-sm bg-white/5 border-white/10 text-white" />
          </div>
          <div className="rounded-md border border-white/10">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Phone</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400 text-right">Last Active</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id} className="border-white/10 hover:bg-white/5 transition-colors">
                    <TableCell className="font-medium text-white">{contact.name}</TableCell>
                    <TableCell className="text-gray-300">{contact.phone}</TableCell>
                    <TableCell>
                      <Badge variant={contact.status === "Active" ? "default" : "secondary"} className={contact.status === "Active" ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" : ""}>
                        {contact.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-gray-400">{contact.lastActive}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
