import React from 'react';
import { LucideIcon, PlusCircle, ExternalLink, HelpCircle } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  category: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
  tips?: string[];
  suggestedFromAudit?: {
    title: string;
    description: string;
  }[];
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  category,
  description,
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
  tips,
  suggestedFromAudit,
}) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header banner card (Trackly UI Kit Style) */}
      <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-8 sm:p-12 text-center shadow-[0px_1px_3px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col items-center">
        {/* Top Centered Circular Icon (Trackly Signature Empty Icon) */}
        <div className="w-16 h-16 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-[#475569] flex items-center justify-center mb-4 shadow-xs">
          <Icon className="w-7 h-7" />
        </div>

        {/* Category badge */}
        <div className="mb-3">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[10px] font-semibold bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0] uppercase tracking-wide">
            {category} · Placeholder Page
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a] mb-2 tracking-tight">{title}</h2>
        <p className="text-[#64748b] max-w-lg mx-auto text-sm leading-relaxed mb-6">
          {description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {actionText && (
            <button
              onClick={onAction}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] bg-[#0f172a] hover:bg-[#1e293b] text-white font-medium text-xs transition-colors shadow-xs active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              {actionText}
            </button>
          )}

          {secondaryActionText && (
            <button
              onClick={onSecondaryAction}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] font-medium text-xs transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.02)] active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#64748b]" />
              {secondaryActionText}
            </button>
          )}
        </div>
      </div>

      {/* Audit Suggestions / Pending Connections if any */}
      {suggestedFromAudit && suggestedFromAudit.length > 0 && (
        <div className="mt-6 bg-white border border-[#e2e8f0] rounded-[12px] p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
          <h3 className="text-xs font-semibold text-[#0f172a] uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
            Relevant Tasks & Notes from Current Audit
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestedFromAudit.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#cbd5e1] transition-colors"
              >
                <div className="text-xs font-semibold text-[#0f172a] mb-1">{item.title}</div>
                <div className="text-xs text-[#64748b] leading-relaxed">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Informative Tips */}
      {tips && tips.length > 0 && (
        <div className="mt-4 p-4 rounded-[10px] bg-[#f8fafc] border border-[#e2e8f0] flex items-start gap-3 text-xs text-[#64748b]">
          <HelpCircle className="w-4 h-4 text-[#94a3b8] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-[#0f172a]">Why is this page empty?</span>
            <ul className="list-disc list-inside space-y-0.5 text-[#64748b] text-[11px]">
              {tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
