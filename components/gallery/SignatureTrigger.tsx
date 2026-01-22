"use client";

import { ScanText } from "lucide-react";

type SignatureTriggerProps = {
  onClick: () => void;
  signature: string;
};

export const SignatureTrigger = ({ onClick, signature }: SignatureTriggerProps) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-2 py-1 text-sm font-mono bg-yellow-900/20 text-yellow-300 border border-yellow-700/50 rounded-sm hover:bg-yellow-900/40 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
    >
      <ScanText className="w-4 h-4" />
      <span>{signature}</span>
    </button>
  );
};
