"use client";

import { useState, type FC, type ReactNode } from "react";
import { Lock, KeyRound } from "lucide-react";

interface PasswordProtectProps {
  children: ReactNode;
}

const PasswordProtect: FC<PasswordProtectProps> = ({ children }) => {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const correctPassword = "pukpukktotamhipopotam";

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="bg-stone-950 text-stone-300 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-stone-900 rounded-lg shadow-2xl shadow-stone-950/50 p-8 border border-stone-800">
        <div className="text-center mb-6">
          <Lock size={48} className="mx-auto text-stone-500" />
          <h1 className="text-2xl font-serif mt-4 text-stone-200">Dostęp Zastrzeżony</h1>
          <p className="text-stone-400 mt-2">Wymagana autoryzacja w celu uzyskania dostępu do akt sprawy.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Wprowadź hasło..."
              className={
                "w-full bg-stone-800 border border-stone-700 rounded-md py-3 pl-12 pr-4 text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all" +
                (error ? " ring-2 ring-red-500/50" : "")
              }
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2 text-center">Nieprawidłowe hasło. Spróbuj ponownie.</p>}
          <button
            type="submit"
            className="w-full bg-stone-700 hover:bg-stone-600 text-stone-200 font-bold py-3 px-4 rounded-md mt-6 transition-colors duration-300"
          >
            Odblokuj Dostęp
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordProtect;
