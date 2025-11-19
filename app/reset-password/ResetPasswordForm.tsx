"use client";

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/password/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage('Your password has been reset successfully! Redirecting to login...');
        setTimeout(() => {
          router.push('/?showLogin=true'); // Redirect to home with login modal open
        }, 2000);
      } else {
        setError(data.message || 'An unexpected error occurred.');
      }
    } catch (err) {
      setError('Failed to send request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-lg"
    >
      <h1 className="text-2xl font-bold text-center">Reset Your Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password">New Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-1 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter new password"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 mt-1 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Confirm new password"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !!message}
          className="w-full px-4 py-2 font-semibold text-white bg-pink-600 rounded-md hover:bg-pink-700 disabled:bg-gray-500 transition-colors"
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      {message && <p className="text-green-400 text-center">{message}</p>}
      {error && <p className="text-red-400 text-center">{error}</p>}
    </motion.div>
  );
}
