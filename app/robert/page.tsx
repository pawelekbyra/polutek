'use client'; 

import { useChat } from '@ai-sdk/react';
import React, { FormEvent, useEffect } from 'react'; 

export default function RobertPage() {
  // Pobieramy hooka z rzutowaniem na 'any' aby uniknąć problemów z typami
  const chatHook = useChat({
    api: '/api/robert',
    onError: (err: any) => { 
      console.error("[ROBERT-UI] Chat Hook Error:", err);
    }
  } as any) as any;

  const { 
    messages, 
    input, 
    setInput,
    handleInputChange, 
    handleSubmit, 
    status, 
    error, 
    reload,
    append 
  } = chatHook;

  // Fallback dla submit
  const handleSafeSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!input || input.trim() === '') return;

    if (typeof handleSubmit === 'function') {
      handleSubmit(e);
    } else if (typeof append === 'function') {
      console.warn("[ROBERT-UI] handleSubmit missing, using append fallback.");
      await append({ role: 'user', content: input });
      if (setInput) setInput('');
    } else {
      alert("BŁĄD KRYTYCZNY: Nie można wysłać wiadomości.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-green-500 font-mono p-4 overflow-hidden relative z-[100]">
      <div className="flex-1 overflow-y-auto mb-4 border border-green-900 p-4 rounded custom-scrollbar">
        
        {error && (
            <div className="text-red-500 mt-4 border border-red-900 p-4 whitespace-pre-wrap">
                CRITICAL ERROR: {error.message}
                <button onClick={() => reload()} className="block underline mt-2">RETRY</button>
            </div>
        )}

        {(messages || []).length === 0 && !error && (
          <div className="opacity-50 text-center mt-20">&gt; SYSTEM ONLINE. WAITING FOR INPUT...</div>
        )}
        
        {!error && (messages || []).map((m: any) => (
          <div key={m.id} className="mb-4 whitespace-pre-wrap">
            <span className="font-bold opacity-70">{m.role === 'user' ? 'USER > ' : 'ROBERT > '}</span>
            {m.content}
            {m.toolInvocations?.map((toolInvocation: any) => (
                <div key={toolInvocation.toolCallId} className="text-yellow-500 mt-1">
                   [TOOL: {toolInvocation.toolName}]
                   {'result' in toolInvocation ? <span className="text-green-400"> ✓ OK</span> : <span className="animate-pulse"> ...</span>}
                </div>
            ))}
          </div>
        ))}
        {status === 'streaming' && <div className="animate-pulse">&gt; PROCESSING...</div>}
      </div>

      <form onSubmit={handleSafeSubmit} className="flex gap-2"> 
        <span className="flex items-center text-green-500">&gt;</span>
        <input
          className="flex-1 bg-black border border-green-800 text-green-500 p-2 focus:outline-none rounded"
          value={input || ''}
          placeholder="Enter command..."
          onChange={handleInputChange}
          autoFocus
          disabled={!!error}
        />
        <button type="submit" className="bg-green-900 text-black px-4 py-2 hover:bg-green-700 font-bold rounded">
          EXECUTE
        </button>
      </form>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #14532d; border-radius: 4px; }
      `}</style>
    </div>
  );
}
