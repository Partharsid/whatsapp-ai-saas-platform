'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ConnectPage() {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [status, setStatus] = useState<'DISCONNECTED' | 'QR_PENDING' | 'CONNECTED'>('DISCONNECTED');

  useEffect(() => {
    // In a real implementation, this would connect to the Socket.io server
    // and listen for 'qr-code' and 'connection-status' events
    
    /* 
    import { io } from 'socket.io-client';
    const socket = io('http://localhost:3001');
    
    socket.emit('join', 'user123'); // Join user room
    
    socket.on('qr-code', (qrDataUrl) => {
      setQrCode(qrDataUrl);
      setStatus('QR_PENDING');
    });
    
    socket.on('connection-status', (stat) => {
      setStatus(stat === 'connected' ? 'CONNECTED' : 'DISCONNECTED');
    });
    */
  }, []);

  const initConnection = async () => {
    // Simulate API call to backend
    setStatus('QR_PENDING');
    // In real app, you'd fetch POST /api/whatsapp/connect
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">WhatsApp Connection</h1>
      
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
        {status === 'DISCONNECTED' && (
          <div className="py-12">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📱</span>
            </div>
            <h2 className="text-xl font-bold mb-2">Connect your WhatsApp Number</h2>
            <p className="text-slate-400 max-w-md mx-auto mb-8">
              Link your WhatsApp account to start automating responses. You will need to scan a QR code from your WhatsApp mobile app.
            </p>
            <button 
              onClick={initConnection}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              Generate QR Code
            </button>
          </div>
        )}

        {status === 'QR_PENDING' && (
          <div className="py-8">
            <h2 className="text-xl font-bold mb-6">Scan QR Code</h2>
            <div className="bg-white p-4 rounded-xl inline-block mb-6">
              {/* Fallback placeholder since actual QR comes from backend */}
              {qrCode ? (
                <img src={qrCode} alt="WhatsApp QR Code" className="w-64 h-64" />
              ) : (
                <div className="w-64 h-64 bg-slate-200 flex items-center justify-center rounded-lg animate-pulse">
                  <span className="text-slate-500 font-medium">Loading QR...</span>
                </div>
              )}
            </div>
            <ol className="text-left text-slate-400 max-w-md mx-auto space-y-3 list-decimal pl-5">
              <li>Open WhatsApp on your phone</li>
              <li>Tap Menu or Settings and select Linked Devices</li>
              <li>Tap on Link a Device</li>
              <li>Point your phone to this screen to capture the code</li>
            </ol>
          </div>
        )}

        {status === 'CONNECTED' && (
          <div className="py-12">
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Successfully Connected!</h2>
            <p className="text-slate-400 mb-8">Your WhatsApp number is active and ready to automate.</p>
            <button 
              onClick={() => setStatus('DISCONNECTED')}
              className="px-6 py-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-lg font-medium transition-colors"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
