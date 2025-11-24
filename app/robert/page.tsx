'use client'; 

import { useChat } from '@ai-sdk/react';
import React, { FormEvent, useState, useEffect } from 'react'; 

export default function RobertPage() {
  // 1. Używamy useChat standardowo, bez agresywnych rzutowań na początku
  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    status, 
    error, 
    reload,
    setInput // Ważne: pobieramy setInput do ręcznego sterowania
  } = useChat({
    api: '/api/robert',
    onError: (err) => { 
      console.error("🔴 [ROBERT UI ERROR]:", err);
      alert("Błąd połączenia: " + err.message);
    },
    // Zabezpieczenie: jeśli input jest undefined, hook użyje pustego ciągu
    initialInput: '' 
  });

  // 2. Dodatkowy stan lokalny, gdyby useChat zawiódł przy inicjalizacji
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    console.log("🟢 [ROBERT UI]: Komponent załadowany. Status:", status);
  }, [status]);

  // 3. Bezpieczna funkcja wysyłania
  const handleSafeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    console.log("🔵 [ROBERT UI]: Wysyłanie wiadomości:", input);
    handleSubmit(e);
  };

  // Jeśli JS jeszcze nie ruszył, pokazujemy loader (unikamy "martwego" inputa)
  if (!isReady) return <div className="bg-black h-screen text-green-500 p-4">Inicjalizacja terminala...</div>;

  return (
    <div className="flex flex-col h-screen bg-black text-green-500 font-mono p-4 overflow-hidden relative z-[100]">
      
      {/* LOGI BŁĘDÓW NA EKRANIE (żebyś widział co się dzieje bez konsoli) */}
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-white p-2 mb-2 text-sm">
          ⚠️ BŁĄD: {error.message} 
          <button onClick={() => reload()} className="ml-4 underline font-bold">SPRÓBUJ PONOWNIE</button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto mb-4 border border-green-900 p-4 rounded custom-scrollbar">
        {messages.length === 0 && !error && (
          <div className="opacity-50 text-center mt-10">
            &gt; SYSTEM ROBERT ONLINE. <br/>
            &gt; CZEKAM NA ROZKAZY...
          </div>
        )}
        
        {messages.map((m) => (
          <div key={m.id} className="mb-4 whitespace-pre-wrap">
            <span className={`font-bold ${m.role === 'user' ? 'text-blue-400' : 'text-green-400'}`}>
              {m.role === 'user' ? 'TY > ' : 'ROBERT > '}
            </span>
            <span>{m.content}</span>
            {m.toolInvocations?.map((tool: any) => (
               <div key={tool.toolCallId} className="text-yellow-500 text-sm mt-1 pl-4 border-l-2 border-yellow-500">
                 [TOOL: {tool.toolName}] {JSON.stringify(tool.args)}
                 {'result' in tool ? <span className="text-green-300"> ✓ OK</span> : <span className="animate-pulse"> ...</span>}
               </div>
            ))}
          </div>
        ))}
        
        {status === 'streaming' && (
          <div className="animate-pulse text-green-700">&gt; Przetwarzanie danych...</div>
        )}
      </div>

      {/* FORMULARZ */}
      <form onSubmit={handleSafeSubmit} className="flex gap-2 border-t border-green-900 pt-4"> 
        <span className="flex items-center text-green-500 animate-pulse">&gt;</span>
        <input
          className="flex-1 bg-black border border-green-800 text-green-400 p-2 focus:outline-none focus:border-green-500 rounded font-bold"
          value={input}
          onChange={handleInputChange}
          placeholder="Wpisz polecenie..."
          autoFocus
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={status === 'streaming' || !input.trim()}
          className="bg-green-900 text-green-100 px-6 py-2 hover:bg-green-700 font-bold rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
