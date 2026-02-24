"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/context/LanguageContext';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { t } = useTranslation();
  const router = useRouter();
  const { setUser } = useUser();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    const formData = new FormData(event.currentTarget);
    const login = formData.get('login') as string;
    const password = formData.get('password') as string;

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      // Parsowanie odpowiedzi
      let data;
      try {
        data = await res.json();
      } catch (e) {
        // Fallback jeśli JSON nieprawidłowy (np. redirect HTML)
        data = { success: false, message: 'Invalid server response' };
      }

      if (res.ok && data.success) {
        // 1. Update Context immediately
        setUser(data.user);

        // 2. Redirect
        router.push('/');

        // 3. Refresh in background
        router.refresh();

        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        setErrorMessage(data.message || t('loginFailed') || 'Login failed');
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(t('loginError') || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 pb-8">
      <div className="space-y-4">
        <Input
            type="text"
            name="login"
            placeholder="Twój adres email"
            required
            autoComplete="username"
            className="h-14 bg-gray-50 border-2 border-gray-100 text-gray-900 placeholder:text-gray-300 font-bold rounded-2xl px-4 focus:border-violet-600 focus:ring-4 focus:ring-violet-600/5 transition-all shadow-sm"
        />
        <Input
            type="password"
            name="password"
            placeholder={t('passwordPlaceholder') || 'Hasło'}
            required
            autoComplete="current-password"
            className="h-14 bg-gray-50 border-2 border-gray-100 text-gray-900 placeholder:text-gray-300 font-bold rounded-2xl px-4 focus:border-violet-600 focus:ring-4 focus:ring-violet-600/5 transition-all shadow-sm"
        />
      </div>

      <Button
        type="submit"
        variant="default"
        disabled={isLoading}
        className="h-14 font-black uppercase tracking-widest bg-violet-600 hover:bg-violet-700 text-white rounded-2xl shadow-lg shadow-violet-200 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 mt-2"
      >
        {isLoading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
            'ZALOGUJ SIĘ'
        )}
      </Button>

      {errorMessage && (
        <div className="bg-red-50 text-red-500 text-sm font-bold p-4 rounded-xl text-center border border-red-100 animate-in fade-in slide-in-from-top-2">
            {errorMessage}
        </div>
      )}
    </form>
  );
};

export default LoginForm;
