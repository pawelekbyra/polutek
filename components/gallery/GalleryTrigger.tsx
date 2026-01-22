"use client";

type GalleryTriggerProps = {
  onClick: () => void;
  label: string;
};

export const GalleryTrigger = ({ onClick, label }: GalleryTriggerProps) => {
  return (
    <button
      onClick={onClick}
      className="inline font-bold text-yellow-400 hover:text-yellow-300 underline transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
    >
      {label}
    </button>
  );
};
