"use client";

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/password/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage('If an account with that email exists, a password reset link has been sent.');
        setEmail('');
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
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center">Forgot Your Password?</h1>
        <p className="text-center text-gray-400">
          No problem. Enter your email address below and we&apos;ll send you a link to reset it.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 font-semibold text-white bg-pink-600 rounded-md hover:bg-pink-700 disabled:bg-gray-500 transition-colors"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        {message && <p className="text-green-400 text-center">{message}</p>}
        {error && <p className="text-red-400 text-center">{error}</p>}
      </motion.div>
    </div>
  );
}
