"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/context/LanguageContext';
import { authenticate } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { Loader2 } from 'lucide-react';

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const { t } = useTranslation();

  // Monitor errorMessage changes to handle UI feedback if needed,
  // but useFormState handles the return value from the server action.
  // We need to handle the success case.
  // Since `authenticate` calls `signIn`, it redirects on success by default.
  // If we want to stay or close modal, `signIn` behavior depends on `redirect` param.
  // In `lib/actions.ts`, `signIn` is called. If it succeeds, it redirects.
  // If we want to handle success without page reload (SPA feel), we might need a client-side signIn
  // OR rely on the server redirecting to the same page and the modal closing?
  // The prompt says: "Change logic in LoginForm.tsx to use signIn from NextAuth (or Server Action calling signIn)".
  // If the action redirects, the page reloads.
  // To avoid reload, we can use `signIn` from `next-auth/react`?
  // But the instructions emphasize Server Actions.
  // Let's stick to the Server Action `authenticate`.

  // To handle "onLoginSuccess" (closing modal), if the action redirects, the modal closes naturally (page reload).
  // If we want to avoid reload, we should use `redirect: false` in `signIn`?
  // But `authenticate` is a server action.

  // Let's assume redirect is fine or standard behavior.
  // However, for a better UX (SPA), `signIn` is often used client side.
  // The prompt explicitly mentioned: "Change logic... to use signIn from NextAuth (or Server Action...)"

  // I will wrap the form submission to handle loading state.

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);

    // Call the server action manually if not using form action directly to control loading?
    // But useFormState is tied to form action.
    // Let's use standard form action.
    // But I need to handle loading.
    // I can use `useFormStatus` inside a button component, but here I have state.

    // Fallback to manual invocation for simpler control over success callback?
    // No, `authenticate` redirects.

    // Let's try to just submit the form to the action.
    // But `authenticate` returns a string error.
    // If it redirects, it won't return.

    // If I want to close the modal, I assume the user stays on the page.
    // signIn defaults to redirecting to the referer.
  };

  return (
    <form action={dispatch} className="flex flex-col gap-3 px-4 pb-5">
      <Input
        type="text"
        name="login"
        placeholder="Email lub Pseudonim"
        required
        autoComplete="username"
        className="bg-white border-2 border-black text-black placeholder:text-gray-500 font-mono focus:ring-2 focus:ring-pink-500"
      />
      <Input
        type="password"
        name="password"
        placeholder={t('passwordPlaceholder')}
        required
        autoComplete="current-password"
        className="bg-white border-2 border-black text-black placeholder:text-gray-500 font-mono focus:ring-2 focus:ring-pink-500"
      />
      <LoginButton t={t} />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
      )}
    </form>
  );
};

import { useFormStatus } from 'react-dom';

function LoginButton({ t }: { t: any }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="default" disabled={pending} className="font-bold uppercase tracking-wider bg-pink-600 hover:bg-pink-700 flex items-center justify-center gap-2">
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {pending ? t('loggingIn') : 'ENTER'}
    </Button>
  );
}

export default LoginForm;
