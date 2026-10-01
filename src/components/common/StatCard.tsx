import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeDirection?: 'up' | 'down' | 'neutral';
  subtext?: string;
  icon?: LucideIcon;
  badge?: string;
  badgeColor?: string;
  onClick?: () => void;
  accentColor?: string; // Kept for backwards compatibility, rendered monochrome
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  changeDirection,
  subtext,
  icon: Icon,
  badge,
  badgeColor = 'bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#e2e8f0] rounded-[12px] p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.04)] transition-all duration-150 ${
        onClick
          ? 'cursor-pointer hover:border-[#cbd5e1] hover:shadow-[0px_3px_8px_rgba(0,0,0,0.06)] group'
          : ''
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-[#64748b] tracking-tight">{label}</span>

        <div className="flex items-center gap-1.5">
          {badge && (
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}>
              {badge}
            </span>
          )}
          {Icon && (
            <Icon className="w-4 h-4 text-[#94a3b8] transition-colors group-hover:text-[#0f172a]" />
          )}
        </div>
      </div>

      <div className="text-[32px] sm:text-[36px] font-bold text-[#0f172a] tracking-tight leading-none my-2.5">
        {value}
      </div>

      <div className="flex items-center flex-wrap gap-1.5 pt-0.5">
        {change && (
          <div
            className={`inline-flex items-center text-xs font-semibold ${
              changeDirection === 'up'
                ? 'text-[#16a34a]'
                : changeDirection === 'down'
                ? 'text-[#dc2626]'
                : 'text-[#64748b]'
            }`}
          >
            {changeDirection === 'up' && <TrendingUp className="w-3.5 h-3.5 mr-1" />}
            {changeDirection === 'down' && <TrendingDown className="w-3.5 h-3.5 mr-1" />}
            {changeDirection === 'neutral' && <Minus className="w-3.5 h-3.5 mr-1" />}
            {change}
          </div>
        )}

        {subtext && (
          <span className="text-xs text-[#94a3b8] font-normal truncate">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};
