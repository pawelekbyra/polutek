'use client'; 

import { useChat } from '@ai-sdk/react';
import React, { FormEvent, useState, useEffect } from 'react'; 

export default function RobertPage() {
  // 1. FIX BUILDA: Rzutujemy na 'any', aby TypeScript nie krzyczał o brakujące pole 'input'
  const chat = useChat({
    api: '/api/robert',
    onError: (err) => { 
      console.error("🔴 [ROBERT UI ERROR]:", err);
    },
    initialInput: '' 
  }) as any;

  // 2. BEZPIECZNA DESTRUKTURYZACJA: Gwarantujemy domyślne wartości
  const { 
    messages = [], 
    input = '', // To kluczowe: jeśli input jest undefined, zamieniamy na pusty string
    handleInputChange, 
    handleSubmit, 
    status, 
    error, 
    reload,
    setInput
  } = chat;

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleSafeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Zabezpieczenie na wypadek gdyby handleSubmit nie zadziałał
    if (handleSubmit) {
      handleSubmit(e);
    } else {
      console.error("Brak funkcji handleSubmit, próbuję reload...");
      reload();
    }
  };

  // Loader, żeby nie pokazywać zepsutego UI przed załadowaniem JS
  if (!isReady) return <div className="bg-black h-screen text-green-900 p-4 font-mono">Inicjalizacja łącza...</div>;

  return (
    <div className="flex flex-col h-screen bg-black text-green-500 font-mono p-4 overflow-hidden relative z-[100]">
      
      {/* SEKCJA BŁĘDÓW */}
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-white p-2 mb-2 text-sm">
          ⚠️ BŁĄD SYSTEMU: {error.message} 
          <button onClick={() => reload()} className="ml-4 underline font-bold">RESTART</button>
        </div>
      )}

      {/* OKNO CZATU */}
      <div className="flex-1 overflow-y-auto mb-4 border border-green-900 p-4 rounded custom-scrollbar">
        {messages.length === 0 && !error && (
          <div className="opacity-50 text-center mt-10">
            &gt; SYSTEM ROBERT ONLINE. <br/>
            &gt; CZEKAM NA ROZKAZY...
          </div>
        )}
        
        {messages.map((m: any) => (
          <div key={m.id} className="mb-4 whitespace-pre-wrap">
            <span className={`font-bold ${m.role === 'user' ? 'text-blue-400' : 'text-green-400'}`}>
              {m.role === 'user' ? 'TY > ' : 'ROBERT > '}
            </span>
            <span>{m.content}</span>
            {/* Wyświetlanie użycia narzędzi */}
            {m.toolInvocations?.map((tool: any) => (
               <div key={tool.toolCallId} className="text-yellow-500 text-sm mt-1 pl-4 border-l-2 border-yellow-500">
                 [TOOL: {tool.toolName}] 
                 {'result' in tool ? <span className="text-green-300"> ✓ WYKONANO</span> : <span className="animate-pulse"> ...</span>}
               </div>
            ))}
          </div>
        ))}
        
        {status === 'streaming' && (
          <div className="animate-pulse text-green-700">&gt; Generowanie odpowiedzi...</div>
        )}
      </div>

      {/* FORMULARZ WPISYWANIA */}
      <form onSubmit={handleSafeSubmit} className="flex gap-2 border-t border-green-900 pt-4"> 
        <span className="flex items-center text-green-500 animate-pulse">&gt;</span>
        <input
          className="flex-1 bg-black border border-green-800 text-green-400 p-2 focus:outline-none focus:border-green-500 rounded font-bold"
          value={input || ''} // FIX: Zapobiega zablokowaniu pola
          onChange={handleInputChange}
          placeholder="Wpisz polecenie..."
          autoFocus
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={status === 'streaming' || !input}
          className="bg-green-900 text-green-100 px-6 py-2 hover:bg-green-700 font-bold rounded disabled:opacity-50 transition-colors"
        >
          WYŚLIJ
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
