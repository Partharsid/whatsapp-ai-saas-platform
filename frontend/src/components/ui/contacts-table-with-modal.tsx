"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ChevronDown, X, Mail, User } from "lucide-react";

export interface Contact {
  id: string;
  name: string;
  email: string;
  status: string;
  phone?: string;
  description?: string;
  groups?: string[];
}

interface ContactsTableProps {
  title?: string;
  contacts?: Contact[];
  onContactSelect?: (contactId: string) => void;
  className?: string;
}

const defaultContacts: Contact[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", status: "Active", phone: "+1-555-0101", groups: ["Customers"] },
  { id: "2", name: "Bob Smith", email: "bob@example.com", status: "Active", phone: "+1-555-0102", groups: ["Leads"] },
  { id: "3", name: "Carol Davis", email: "carol@example.com", status: "Inactive", phone: "+1-555-0103", groups: ["Customers"] },
  { id: "4", name: "David Wilson", email: "david@example.com", status: "Active", phone: "+1-555-0104", groups: ["VIP"] },
  { id: "5", name: "Eve Martinez", email: "eve@example.com", status: "Active", phone: "+1-555-0105", groups: ["Leads"] },
  { id: "6", name: "Frank Brown", email: "frank@example.com", status: "Inactive", phone: "+1-555-0106", groups: ["Customers"] },
  { id: "7", name: "Grace Lee", email: "grace@example.com", status: "Active", phone: "+1-555-0107", groups: ["VIP"] },
  { id: "8", name: "Henry Taylor", email: "henry@example.com", status: "Active", phone: "+1-555-0108", groups: ["Customers"] },
  { id: "9", name: "Ivy Chen", email: "ivy@example.com", status: "Inactive", phone: "+1-555-0109", groups: ["Leads"] },
  { id: "10", name: "Jack Anderson", email: "jack@example.com", status: "Active", phone: "+1-555-0110", groups: ["Customers"] },
];

export function ContactsTable({
  title = "Contacts",
  contacts = defaultContacts,
  onContactSelect,
  className,
}: ContactsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "email" | "status">("name");

  const filtered = useMemo(() => {
    let result = [...contacts];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    return result;
  }, [contacts, searchQuery, sortBy]);

  return (
    <div className={className}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground">{filtered.length} total</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-48 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="status">Status</option>
          </select>
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-input px-3 text-sm hover:bg-accent">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50 text-left text-sm font-medium text-muted-foreground">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Groups</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((contact, idx) => (
              <motion.tr
                key={contact.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="border-b last:border-0 hover:bg-muted/30"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                      {contact.name.charAt(0)}
                    </div>
                    <span className="font-medium">{contact.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{contact.email}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    contact.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                  }`}>
                    {contact.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{contact.phone}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {contact.groups?.map((g) => (
                      <span key={g} className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                        {g}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      setSelectedContact(contact);
                      onContactSelect?.(contact.id);
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    View
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setSelectedContact(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold">Contact Details</h3>
                <button onClick={() => setSelectedContact(null)} className="rounded-full p-1 hover:bg-muted">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-medium text-primary">
                    {selectedContact.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">{selectedContact.name}</h4>
                    <p className="text-sm text-muted-foreground">{selectedContact.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/50 p-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedContact.phone || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      selectedContact.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}>
                      {selectedContact.status}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground">Groups</p>
                    <div className="flex gap-1 mt-1">
                      {selectedContact.groups?.map((g) => (
                        <span key={g} className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                    <Mail className="h-4 w-4" />
                    Send Message
                  </button>
                  <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-sm font-medium hover:bg-accent">
                    <User className="h-4 w-4" />
                    View Profile
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
