"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Brain, Key, MessageSquare, Save } from "lucide-react"

export default function AISettingsPage() {
  const [provider, setProvider] = useState("openrouter")
  const [model, setModel] = useState("gpt-4o")
  const [apiKey, setApiKey] = useState("")
  const [systemPrompt, setSystemPrompt] = useState("")
  const [useServerKey, setUseServerKey] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get("/dashboard/ai/config").then((res) => {
      setProvider("openrouter")
      setModel(res.config?.selectedModel || "gpt-4o")
      setApiKey(res.config?.openRouterKey || "")
      setSystemPrompt(res.prompt?.content || "")
      setUseServerKey(res.config?.useServerKey ?? true)
    }).catch(console.error)
  }, [])

  const handleSave = async () => {
    setLoading(true)
    try {
      await api.put("/dashboard/ai/config", { provider, apiKey, model, systemPrompt, useServerKey })
      toast.success("Settings Saved", {
        description: "Your AI configuration has been updated successfully.",
      })
    } catch (err: any) {
      toast.error(err.message || "Failed to save settings")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">AI Settings</h1>
        <p className="text-sm text-ash mt-1">Configure your LLM provider and master system prompt.</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle>Model Configuration</CardTitle>
              <CardDescription>Select the model that powers your WhatsApp automations.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Provider</label>
            <Select value={provider} onValueChange={setProvider}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select a provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openrouter">OpenRouter</SelectItem>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="anthropic">Anthropic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">API Key</label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ash" />
              <Input type="password" placeholder="sk-or-v1-..." className="pl-10 bg-white"
                value={apiKey} onChange={(e) => setApiKey(e.target.value)} disabled={useServerKey} />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Switch checked={useServerKey} onCheckedChange={setUseServerKey} />
              <span className="text-xs text-ash">Use platform&apos;s default API key (Trial)</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Model</label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem value="meta-llama/llama-3.1-8b-instruct:free">Llama 3.1 8B (Free)</SelectItem>
                <SelectItem value="claude-3-5-sonnet-20241022">Claude 3.5 Sonnet</SelectItem>
                <SelectItem value="meta-llama/llama-3.3-70b-instruct">Llama 3.3 70B</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <MessageSquare className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle>System Prompt</CardTitle>
              <CardDescription>Instruct the AI on how to behave, its personality, and constraints.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea className="min-h-[200px] bg-white" value={systemPrompt} onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="You are a helpful customer support agent for Steep. You help users understand how to use the platform." />
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <Brain className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <CardTitle>Isolated Context Memory</CardTitle>
                <CardDescription>Maintain independent conversation memory per user phone number.</CardDescription>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardHeader>
      </Card>

      <div className="flex justify-end">
        <Button className="gap-2 rounded-full" onClick={handleSave} disabled={loading}>
          <Save className="h-4 w-4" />
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  )
}
