"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { User, Shield, Trash2 } from "lucide-react"

export default function SettingsPage() {
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    api.get("/dashboard/user/profile").then(setProfile).catch(console.error)
  }, [])

  if (!profile) return null

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account and workspace preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <User className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>Update your personal information and contact details.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-apricot-wash text-xl font-medium text-ink uppercase">
              {profile.name?.slice(0, 2) || "UN"}
            </div>
            <Button variant="outline">Change Avatar</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input defaultValue={profile.name} disabled className="bg-muted cursor-not-allowed" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input type="email" defaultValue={profile.email} disabled className="bg-muted cursor-not-allowed" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <Shield className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your password and security preferences.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button variant="outline">Change Password</Button>
        </CardContent>
      </Card>

      <Card className="border-red-200">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
              <Trash2 className="h-5 w-5 text-red-700" />
            </div>
            <div>
              <CardTitle className="text-red-700">Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Delete Account</h4>
              <p className="text-xs text-muted-foreground mt-1">Permanently remove your account and all data.</p>
            </div>
            <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
