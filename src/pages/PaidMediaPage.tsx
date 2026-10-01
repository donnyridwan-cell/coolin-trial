import React from 'react';
import {
  Megaphone,
  CheckCircle,
  ArrowRight,
  Target,
} from 'lucide-react';
import { MenuId, TaskItem, TaskStatus } from '../types';

interface PaidMediaPageProps {
  onNavigate: (menu: MenuId) => void;
  tasks?: TaskItem[];
  onUpdateStatus?: (taskId: string, newStatus: TaskStatus) => void;
}

export const PaidMediaPage: React.FC<PaidMediaPageProps> = ({
  onNavigate,
  tasks = [],
  onUpdateStatus,
}) => {
  // Extract the 3 specific Ads tasks from PDF Page 6
  const adsTasks = tasks.filter(
    (t) =>
      t.task.toLowerCase().includes('ads') ||
      t.task.toLowerCase().includes('google ads')
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header status card */}
      <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-5 sm:p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-[10px] bg-[#fffbeb] text-[#d97706] border border-[#fef3c7] flex items-center justify-center shrink-0">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-bold text-[#0f172a] tracking-tight">
                Paid Media — Pre-Launch Setup
              </h2>
              <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#fffbeb] text-[#d97706] border border-[#fef3c7] uppercase tracking-wide">
                Strategy & Setup Phase
              </span>
            </div>
            <p className="text-xs text-[#64748b] mt-1 leading-relaxed">
              Live campaign telemetry will populate once ad accounts and conversion tracking are configured.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('connections')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-semibold transition-colors shadow-xs active:scale-95"
          >
            <span>Connect Ad Accounts</span>
          </button>
        </div>
      </div>

      {/* 2. Projected Campaign KPI Placeholders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-[12px] bg-white border border-[#e2e8f0] shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
          <span className="text-xs font-medium text-[#64748b]">Total Ad Spend</span>
          <div className="text-[30px] font-bold text-[#0f172a] tracking-tight leading-none my-2.5">$0.00</div>
          <span className="text-xs text-[#94a3b8]">Awaiting campaign activation</span>
        </div>

        <div className="p-5 rounded-[12px] bg-white border border-[#e2e8f0] shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
          <span className="text-xs font-medium text-[#64748b]">Target Blended ROAS</span>
          <div className="text-[30px] font-bold text-[#0f172a] tracking-tight leading-none my-2.5">3.5x</div>
          <span className="text-xs text-[#16a34a] font-semibold">Estimated benchmark</span>
        </div>

        <div className="p-5 rounded-[12px] bg-white border border-[#e2e8f0] shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
          <span className="text-xs font-medium text-[#64748b]">Conversion Actions</span>
          <div className="text-[30px] font-bold text-[#0f172a] tracking-tight leading-none my-2.5">0</div>
          <span className="text-xs text-[#94a3b8]">GA4 Key events linked</span>
        </div>
      </div>

      {/* 3. Pre-Launch Action Checklist (Directly from PDF Page 6) */}
      <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-5 sm:p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#e2e8f0]">
          <div>
            <h3 className="text-xs font-bold text-[#0f172a] uppercase tracking-wide flex items-center gap-2">
              <Target className="w-4 h-4 text-[#2563eb]" />
              Pre-Launch Setup & Approval Checklist (From PDF Audit Page 6)
            </h3>
            <p className="text-xs text-[#64748b] mt-0.5">
              These 3 core tasks must be completed and approved before running paid search or social ads.
            </p>
          </div>

          <button
            onClick={() => onNavigate('task-db')}
            className="text-xs text-[#2563eb] hover:underline font-semibold inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View in Task DB</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-[#e2e8f0]">
          {adsTasks.length > 0 ? (
            adsTasks.map((t) => (
              <div
                key={t.id}
                className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-3.5 first:pt-0 last:pb-0"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono font-bold text-[#64748b]">{t.id}</span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#f1f5f9] border border-[#e2e8f0] font-semibold text-[#475569]">
                      {t.lane}
                    </span>
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${
                        t.status === 'Completed'
                          ? 'bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]'
                          : t.status === 'Assigned'
                          ? 'bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe]'
                          : 'bg-[#fffbeb] text-[#d97706] border border-[#fef3c7]'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-[#0f172a]">{t.task}</div>
                  <div className="text-xs text-[#64748b] mt-1">
                    Raised: <span className="font-mono text-[#475569]">{t.date}</span> · Priority: <span className="text-[#dc2626] font-semibold">{t.priority}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  {onUpdateStatus && t.status !== 'Completed' && (
                    <button
                      onClick={() => onUpdateStatus(t.id, 'Completed')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-semibold transition-colors shadow-xs"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Mark Ready</span>
                    </button>
                  )}
                  {t.status === 'Completed' && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#16a34a] font-semibold bg-[#f0fdf4] px-2.5 py-1 rounded-full border border-[#bbf7d0]">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Ready for Launch</span>
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-6 text-center text-xs text-[#64748b]">
              No ads tasks found in the database.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
