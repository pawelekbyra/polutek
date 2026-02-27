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
  const elixirPasswords = ["szaman", "vibe", "polutek"];
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
    <div className="bg-gray-100 text-gray-800 min-h-screen flex items-center justify-center p-4 font-serif">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div className="text-center mb-8">
          <Lock size={48} className="mx-auto text-gray-400" />
          <h1 className="text-3xl font-serif mt-4 text-gray-900">Dostęp Zastrzeżony</h1>
          <p className="text-gray-500 mt-2">Wymagana autoryzacja w celu uzyskania dostępu.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Wprowadź hasło..."
              className={
                "w-full bg-gray-50 border border-gray-300 rounded-lg py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all" +
                (error ? " ring-2 ring-red-500/50 border-red-500/50" : "")
              }
            />
          </div>
          {error && <p className="text-red-600 text-sm mt-3 text-center">Nieprawidłowe hasło. Spróbuj ponownie.</p>}
          {message && <p className="text-blue-600 text-sm mt-3 text-center">{message}</p>}
          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg mt-6 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Odblokuj Dostęp
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordProtect;
