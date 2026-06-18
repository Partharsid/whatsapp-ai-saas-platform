"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { socketService } from "@/lib/socket"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Smartphone, QrCode, HelpCircle } from "lucide-react"

export default function ConnectPage() {
  const { user } = useAuth()
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [status, setStatus] = useState<string>("DISCONNECTED")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) return

    api.get("/dashboard/whatsapp/status").then((res) => {
      setStatus(res.status)
    }).catch(console.error)

    const socket = socketService.connect(user.id)
    if (!socket) return

    socket.on("qr-code", (dataUrl: string) => {
      setQrCode(dataUrl)
      setStatus("QR_PENDING")
      setLoading(false)
    })

    socket.on("connection-status", (newStatus: string) => {
      setStatus(newStatus.toUpperCase())
      if (newStatus === "connected") {
        toast.success("WhatsApp Connected!", {
          description: "Your account is now linked successfully.",
        })
      }
    })

    return () => {
      socket.off("qr-code")
      socket.off("connection-status")
    }
  }, [user])

  const handleGenerateQR = async () => {
    if (!user) return
    setLoading(true)
    try {
      await api.post("/whatsapp/connect", { userId: user.id })
      toast.info("Generating QR...", { description: "Please wait a moment." })
    } catch (err: any) {
      toast.error(err.message || "Failed to initialize session")
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">WhatsApp Connect</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Link your WhatsApp Business account to start automating conversations.
        </p>
      </div>

      <Card className="max-w-xl mx-auto mt-12 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-apricot-wash via-sky-wash to-apricot-wash" />
        <CardHeader className="text-center pt-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mx-auto mb-6">
            <Smartphone className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Connect your number</CardTitle>
          <CardDescription className="max-w-sm mx-auto mt-2">
            Scan the QR code via your WhatsApp mobile app to link your account securely.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-10">
          <div className="w-64 h-64 bg-muted rounded-xl border flex items-center justify-center relative overflow-hidden">
            {status === "CONNECTED" ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <span className="text-sm font-medium">Successfully Connected</span>
              </div>
            ) : qrCode ? (
              <img src={qrCode} alt="WhatsApp QR Code" className="w-[85%] h-[85%] object-contain z-10" />
            ) : (
              <div className="flex flex-col items-center gap-3">
                <QrCode className="h-12 w-12 text-muted-foreground/40" />
                <span className="text-xs text-muted-foreground">
                  {status === "QR_PENDING" ? "Generating..." : "Click to generate"}
                </span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 border-t py-4 flex justify-between">
          <Button variant="link" className="gap-1 text-xs text-muted-foreground">
            <HelpCircle className="h-3 w-3" />
            Having trouble?
          </Button>
          <Button onClick={handleGenerateQR} disabled={loading || status === "CONNECTED"} className="gap-2">
            <QrCode className="h-4 w-4" />
            {loading ? "Generating..." : status === "CONNECTED" ? "Connected" : "Generate QR Code"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
