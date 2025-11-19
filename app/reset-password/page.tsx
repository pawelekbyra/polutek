"use client";

import { Suspense } from 'react';
import ResetPasswordForm from './ResetPasswordForm';
import { useSearchParams } from 'next/navigation';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    return (
      <div className="w-full max-w-md p-8 text-center bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-red-500">Invalid Link</h1>
        <p className="mt-4 text-gray-400">
          The password reset link is missing a token. Please request a new one.
        </p>
      </div>
    );
  }

  return <ResetPasswordForm token={token} />;
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      {/* Suspense is required for useSearchParams in Pages router, good practice in App router */}
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}
