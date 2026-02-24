import { cn } from "@/lib/utils";

type UserRole = 'user' | 'admin' | 'patron' | 'verified';

interface UserBadgeProps {
  role?: string;
  className?: string;
}

export default function UserBadge({ role = 'user', className }: UserBadgeProps) {
  if (role === 'user') return null;

  const getBadgeConfig = (role: string) => {
    switch (role) {
      case 'admin':
        return {
          text: 'ADMIN',
          styles: 'bg-red-50 text-red-600 border border-red-100'
        };
      case 'patron':
        return {
          text: 'PATRON',
          styles: 'bg-orange-50 text-orange-600 border border-orange-100'
        };
      case 'verified':
        return {
          text: 'VERIFIED',
          styles: 'bg-blue-50 text-blue-600 border border-blue-100'
        };
      default:
        return null;
    }
  };

  const config = getBadgeConfig(role);
  if (!config) return null;

  return (
    <span className={cn(
      "px-2 py-0.5 text-[9px] font-black tracking-widest rounded-full leading-none h-fit self-center shadow-sm uppercase",
      config.styles,
      className
    )}>
      {config.text}
    </span>
  );
}
