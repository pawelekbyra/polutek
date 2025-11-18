"use client";

import { useStore } from '@/store/useStore';

export default function Home() {
  const setActiveModal = useStore((state) => state.setActiveModal);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">My App</h1>
      <p className="mb-4">Welcome to the app!</p>
      <button
        onClick={() => setActiveModal('comments')}
        aria-label="Komentarze"
        className="px-4 py-2 bg-pink-500 text-white rounded-lg"
      >
        Open Comments
      </button>
    </main>
  );
}
