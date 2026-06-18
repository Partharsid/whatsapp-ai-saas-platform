"use client"

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { socketService } from "@/lib/socket";
import { api } from "@/lib/api";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ConnectPage() {
  const { user } = useAuth();
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("DISCONNECTED");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    // Fetch initial status
    api.get("/dashboard/whatsapp/status").then((res) => {
      setStatus(res.status);
    }).catch(console.error);

    // Connect socket
    const socket = socketService.connect(user.id);
    if (!socket) return;

    socket.on("qr-code", (dataUrl: string) => {
      setQrCode(dataUrl);
      setStatus("QR_PENDING");
      setLoading(false);
    });

    socket.on("connection-status", (newStatus: string) => {
      setStatus(newStatus.toUpperCase());
      if (newStatus === "connected") {
        toast.success("WhatsApp Connected!", {
          description: "Your account is now linked successfully.",
        });
      }
    });

    return () => {
      socket.off("qr-code");
      socket.off("connection-status");
    };
  }, [user]);

  const handleGenerateQR = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await api.post("/whatsapp/connect", { userId: user.id });
      toast.info("Generating QR...", { description: "Please wait a moment." });
    } catch (err: any) {
      toast.error(err.message || "Failed to initialize session");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-signifier text-[44px] text-ink leading-[1.1] tracking-[-0.66px]">WhatsApp Connect</h1>
        <p className="font-sohne text-[16px] text-ash leading-[1.38] mt-3">
          Link your WhatsApp Business account to start automating conversations.
        </p>
      </div>
      
      <Card className="max-w-xl mx-auto mt-12 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-apricot-wash via-sky-wash to-apricot-wash" />
        <CardHeader className="text-center pt-10">
          <div className="w-20 h-20 bg-fog rounded-full flex items-center justify-center mx-auto mb-6 border border-dove/30 shadow-sm">
            <span className="text-3xl opacity-70 grayscale">📱</span>
          </div>
          <CardTitle className="text-[28px]">Connect your number</CardTitle>
          <CardDescription className="text-[16px] max-w-sm mx-auto mt-2">
            Scan the QR code via your WhatsApp mobile app to link your account securely.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-10">
          <div className="w-64 h-64 bg-fog rounded-[16px] border border-dove/30 flex items-center justify-center shadow-subtle relative overflow-hidden">
            {status === "CONNECTED" ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-pure-white z-20">
                <div className="w-16 h-16 bg-[#d1fae5] rounded-full flex items-center justify-center mb-4 text-[24px]">
                  ✅
                </div>
                <span className="font-sohne text-[16px] font-[500] text-ink">Successfully Connected</span>
              </div>
            ) : qrCode ? (
              <img src={qrCode} alt="WhatsApp QR Code" className="w-[85%] h-[85%] object-contain z-10" />
            ) : (
              <>
                {/* Mock QR Code Pattern */}
                <div className="absolute inset-4 grid grid-cols-6 grid-rows-6 gap-2 opacity-20">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className={`bg-ink rounded-sm ${(i * 7) % 5 > 1 ? 'opacity-100' : 'opacity-0'}`} />
                  ))}
                </div>
                {/* Corners */}
                <div className="absolute top-4 left-4 w-12 h-12 border-4 border-ink rounded-sm opacity-50" />
                <div className="absolute top-4 right-4 w-12 h-12 border-4 border-ink rounded-sm opacity-50" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-4 border-ink rounded-sm opacity-50" />
                
                <span className="font-sohne text-[15px] font-[500] text-ink bg-pure-white/80 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm relative z-10">
                  {status === "QR_PENDING" ? "Generating..." : "Click to generate"}
                </span>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="bg-fog/50 border-t border-dove/20 py-4 flex justify-between items-center">
          <Button variant="link" className="text-ash hover:text-ink">Having trouble?</Button>
          <Button onClick={handleGenerateQR} disabled={loading || status === "CONNECTED"}>
            {loading ? "Generating..." : status === "CONNECTED" ? "Connected" : "Generate QR Code"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
