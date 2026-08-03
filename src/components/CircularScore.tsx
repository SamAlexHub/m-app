import React from 'react';
import { Sparkles } from 'lucide-react';

interface CircularScoreProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export const CircularScore: React.FC<CircularScoreProps> = ({
  score,
  size = 110,
  strokeWidth = 8,
  label = 'AI Soulmate Match'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Glowing halo behind SVG */}
        <div className="absolute inset-0 rounded-full bg-[#D6A24A]/20 blur-lg animate-pulse" />
        
        <svg width={size} height={size} className="transform -rotate-90 relative z-10">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Path */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gold-gradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8E8CD" />
              <stop offset="50%" stopColor="#D6A24A" />
              <stop offset="100%" stopColor="#B88432" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center score text */}
        <div className="absolute flex flex-col items-center justify-center text-center z-20">
          <div className="flex items-center gap-0.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D6A24A]" />
            <span className="font-serif text-2xl font-bold text-white tracking-tight">{score}%</span>
          </div>
          <span className="text-[9px] uppercase tracking-wider text-[#D6A24A] font-semibold">Match</span>
        </div>
      </div>
      {label && <span className="mt-2 text-xs font-medium text-emerald-200/80 tracking-wide">{label}</span>}
    </div>
  );
};
