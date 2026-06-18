'use client';
import { useState } from 'react';

export default function AISettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const [useServerKey, setUseServerKey] = useState(true);
  const [selectedModel, setSelectedModel] = useState('meta-llama/llama-3.1-8b-instruct:free');
  const [systemPrompt, setSystemPrompt] = useState(
    'You are a helpful customer support agent for our business. Keep responses concise and friendly. If you do not know the answer, ask the user to wait for a human agent.'
  );

  const models = [
    { id: 'meta-llama/llama-3.1-8b-instruct:free', name: 'Llama 3.1 8B (Free)' },
    { id: 'google/gemma-2-9b-it:free', name: 'Gemma 2 9B (Free)' },
    { id: 'mistralai/mistral-7b-instruct:free', name: 'Mistral 7B (Free)' },
    { id: 'openai/gpt-4o', name: 'GPT-4o (Paid)' },
    { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet (Paid)' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate save
    console.log('Saved settings:', { useServerKey, apiKey, selectedModel, systemPrompt });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">AI Configuration</h1>
      
      <form onSubmit={handleSave} className="space-y-8">
        {/* OpenRouter API Key Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">OpenRouter API Access</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 border border-slate-700 rounded-xl bg-slate-800/50 cursor-pointer" onClick={() => setUseServerKey(true)}>
              <input 
                type="radio" 
                checked={useServerKey} 
                onChange={() => setUseServerKey(true)}
                className="w-4 h-4 text-indigo-600 bg-slate-900 border-slate-600 focus:ring-indigo-600" 
              />
              <div>
                <p className="font-medium text-white">Use Server API Key (Shared)</p>
                <p className="text-sm text-slate-400">Pay per message via your platform subscription. Free models cost ₹0.05/msg.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 border border-slate-700 rounded-xl bg-slate-800/50 cursor-pointer" onClick={() => setUseServerKey(false)}>
              <input 
                type="radio" 
                checked={!useServerKey} 
                onChange={() => setUseServerKey(false)}
                className="w-4 h-4 text-indigo-600 bg-slate-900 border-slate-600 focus:ring-indigo-600" 
              />
              <div className="flex-1">
                <p className="font-medium text-white">Use Custom OpenRouter Key</p>
                <p className="text-sm text-slate-400 mb-3">AI messages are free on our platform; you pay OpenRouter directly.</p>
                
                {!useServerKey && (
                  <input
                    type="password"
                    placeholder="sk-or-v1-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Model Selection */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">AI Model Selection</h2>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-3 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
          >
            {models.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
          <p className="text-sm text-slate-400 mt-2">
            The free models are highly capable for standard customer support queries.
          </p>
        </div>

        {/* System Prompt */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">System Prompt</h2>
            <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded">Core Instruction</span>
          </div>
          <p className="text-sm text-slate-400 mb-4">
            This is the master instruction given to the AI before every conversation. Define the persona, business rules, and how it should respond.
          </p>
          <textarea
            rows={8}
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-indigo-500 resize-y"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20">
            Save AI Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
