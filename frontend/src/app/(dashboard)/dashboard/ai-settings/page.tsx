"use client"

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function AISettingsPage() {
  const [provider, setProvider] = useState("openrouter");
  const [model, setModel] = useState("gpt-4o");
  const [apiKey, setApiKey] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [useServerKey, setUseServerKey] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/dashboard/ai/config").then((res) => {
      setProvider("openrouter"); // MVP hardcode
      setModel(res.config?.selectedModel || "gpt-4o");
      setApiKey(res.config?.openRouterKey || "");
      setSystemPrompt(res.prompt?.content || "");
      setUseServerKey(res.config?.useServerKey ?? true);
    }).catch(console.error);
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.put("/dashboard/ai/config", {
        provider,
        apiKey,
        model,
        systemPrompt,
        useServerKey
      });
      toast.success("Settings Saved", {
        description: "Your AI configuration has been updated successfully.",
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-signifier text-[44px] text-ink leading-[1.1] tracking-[-0.66px]">AI Settings</h1>
        <p className="font-sohne text-[16px] text-ash leading-[1.38] mt-3">
          Configure your LLM provider and master system prompt.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Model Configuration</CardTitle>
          <CardDescription>Select the model that powers your WhatsApp automations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <label className="font-sohne text-[14px] font-[500] text-ink">Provider</label>
            <Select value={provider} onValueChange={setProvider}>
              <SelectTrigger>
                <SelectValue placeholder="Select a provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openrouter">OpenRouter</SelectItem>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="anthropic">Anthropic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="font-sohne text-[14px] font-[500] text-ink">API Key</label>
            <Input 
              type="password" 
              placeholder="sk-or-v1-..." 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)} 
              disabled={useServerKey}
            />
            <div className="flex items-center gap-2 mt-2">
              <Switch checked={useServerKey} onCheckedChange={setUseServerKey} />
              <span className="font-sohne text-[13px] text-graphite">Use platform's default API key (Trial)</span>
            </div>
            <p className="font-sohne text-[13px] text-graphite">Your API key is securely encrypted and stored.</p>
          </div>

          <div className="space-y-3">
            <label className="font-sohne text-[14px] font-[500] text-ink">Model</label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger>
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

      <Card>
        <CardHeader>
          <CardTitle>System Prompt</CardTitle>
          <CardDescription>Instruct the AI on how to behave, its personality, and constraints.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea 
            className="min-h-[200px]" 
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="You are a helpful customer support agent for Steep. You help users understand how to use the platform. Keep your answers concise and friendly. Never hallucinate pricing."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Isolated Context Memory</CardTitle>
              <CardDescription>Maintain independent conversation memory per user phone number.</CardDescription>
            </div>
            <Switch defaultChecked />
          </div>
        </CardHeader>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
