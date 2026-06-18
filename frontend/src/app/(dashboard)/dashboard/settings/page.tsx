"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function SettingsPage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    api.get("/dashboard/user/profile").then(setProfile).catch(console.error);
  }, []);

  if (!profile) return null;
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-signifier text-[44px] text-ink leading-[1.1] tracking-[-0.66px]">Settings</h1>
        <p className="font-sohne text-[16px] text-ash leading-[1.38] mt-3">
          Manage your account and workspace preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>Update your personal information and contact details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-avatars bg-apricot-wash flex items-center justify-center text-ink text-[20px] font-[500] uppercase">
              {profile.name?.slice(0, 2) || "UN"}
            </div>
            <Button variant="outline">Change Avatar</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="font-sohne text-[14px] font-[500] text-ink">Name</label>
              <Input defaultValue={profile.name} disabled className="bg-fog cursor-not-allowed" />
            </div>
            <div className="space-y-3 md:col-span-2">
              <label className="font-sohne text-[14px] font-[500] text-ink">Email Address</label>
              <Input type="email" defaultValue={profile.email} disabled className="bg-fog cursor-not-allowed" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-rust/20">
        <CardHeader>
          <CardTitle className="text-rust">Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-sohne text-[15px] font-[500] text-ink">Delete Account</h4>
              <p className="font-sohne text-[14px] text-ash mt-1">Permanently remove your account and all data.</p>
            </div>
            <Button variant="outline" className="text-rust border-rust/30 hover:bg-rust/10 hover:text-rust">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
