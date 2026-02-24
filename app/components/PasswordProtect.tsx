"use client";

import { useState, type FC } from "react";
import { Lock, KeyRound } from "lucide-react";

interface PasswordProtectProps {
  onUnlock: (articleId: string) => void;
}

const PasswordProtect: FC<PasswordProtectProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const oldPassword = "pukpukktotamhipopotam";
  const elixirPasswords = ["ichtroje", "szaman"];
  const stypulkowskaPassword = "stypulkowska";
  const chmurkaPassword = "chmurka";

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(false);
    setMessage("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (elixirPasswords.includes(password)) {
      onUnlock('elixir');
      setError(false);
      setMessage("");
    } else if (password === stypulkowskaPassword) {
      onUnlock('stypulkowska');
      setError(false);
      setMessage("");
    } else if (password === chmurkaPassword) {
      onUnlock('chmurka');
      setError(false);
      setMessage("");
    } else if (password === "wiadomosci") {
      onUnlock('news');
      setError(false);
      setMessage("");
    } else if (password === oldPassword) {
      setError(false);
      setMessage("Zmienilem haslo. Zapytaj mnie o nowe haslo");
    } else {
      setError(true);
      setMessage("");
    }
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] p-10 border border-gray-100 flex flex-col items-center">
        <div className="w-20 h-20 bg-violet-100 rounded-[2rem] flex items-center justify-center text-violet-600 mb-8 shadow-sm">
            <Lock size={40} />
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-black tracking-tighter text-gray-900">Dostęp Zastrzeżony</h1>
          <p className="text-gray-400 font-bold mt-2 uppercase tracking-widest text-[10px]">Polutek Security Layer</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="relative">
            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={24} />
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Hasło dostępowe"
              className={
                "w-full h-16 bg-gray-50 border-2 border-gray-100 rounded-2xl pl-14 pr-4 text-gray-900 font-bold placeholder:text-gray-300 focus:outline-none focus:border-violet-600 focus:ring-4 focus:ring-violet-600/5 transition-all" +
                (error ? " border-red-500 focus:border-red-600 focus:ring-red-500/5" : "")
              }
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 text-xs font-black p-4 rounded-xl text-center border border-red-100 animate-in fade-in slide-in-from-top-2 uppercase tracking-wider">
                Nieprawidłowe hasło. Spróbuj ponownie.
            </div>
          )}

          {message && (
            <div className="bg-blue-50 text-blue-600 text-xs font-black p-4 rounded-xl text-center border border-blue-100 animate-in fade-in slide-in-from-top-2 uppercase tracking-wider">
                {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full h-16 bg-violet-600 hover:bg-violet-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-violet-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <span>ODBLOKUJ</span>
          </button>
        </form>

        <p className="mt-12 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} Polutek OS
        </p>
      </div>
    </div>
  );
};

export default PasswordProtect;
