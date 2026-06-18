'use client';
import { useState, useEffect } from 'react';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    activeConversations: 12,
    messagesToday: 145,
    aiReplies: 130,
    avgResponseTime: '1.2s'
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Conversations', value: stats.activeConversations, color: 'text-blue-400' },
          { label: 'Messages Today', value: stats.messagesToday, color: 'text-indigo-400' },
          { label: 'AI Replies', value: stats.aiReplies, color: 'text-purple-400' },
          { label: 'Avg AI Response', value: stats.avgResponseTime, color: 'text-emerald-400' }
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/30 transition-colors">
            <h3 className="text-slate-400 text-sm font-medium mb-2">{stat.label}</h3>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Connection Status */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">WhatsApp Connected</h3>
            <p className="text-slate-400 text-sm">+91 98765 43210</p>
          </div>
        </div>
        <button className="px-4 py-2 border border-slate-700 hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">
          Manage Connection
        </button>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { msg: 'User asked about rental prices', ai: 'Replied with pricing catalog', time: '2 mins ago' },
            { msg: 'New contact joined from Website', ai: 'Sent welcome message', time: '15 mins ago' },
            { msg: 'User asked for location', ai: 'Sent Google Maps link', time: '1 hour ago' },
          ].map((activity, i) => (
            <div key={i} className="flex justify-between items-start pb-4 border-b border-slate-800/50 last:border-0 last:pb-0">
              <div>
                <p className="text-white text-sm">{activity.msg}</p>
                <p className="text-indigo-400 text-xs mt-1">AI: {activity.ai}</p>
              </div>
              <span className="text-slate-500 text-xs">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
