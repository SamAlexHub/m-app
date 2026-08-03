import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  borderGold?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glow = false,
  borderGold = true,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        clsx(
          'relative rounded-3xl p-5 backdrop-blur-xl bg-[#0E453F]/65 border transition-all duration-300 shadow-glass',
          borderGold ? 'border-[#D6A24A]/30 hover:border-[#D6A24A]/70' : 'border-white/10',
          glow && 'shadow-[0_0_30px_rgba(214,162,74,0.25)] border-[#D6A24A]/60',
          onClick && 'cursor-pointer active:scale-[0.98]'
        ),
        className
      )}
    >
      {/* Subtle ambient light gradient background glow inside card */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 via-transparent to-[#D6A24A]/5 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
