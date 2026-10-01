import React from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  AlertOctagon,
  Activity,
} from 'lucide-react';
import { NOTIFICATIONS } from '../data/mockData';

export const NotificationsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* 1. Header card */}
      <div className="flex items-center justify-between p-5 rounded-[12px] bg-white border border-[#e2e8f0] shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
        <div>
          <h2 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#0f172a]" />
            Audit & System Notifications
          </h2>
          <p className="text-xs text-[#64748b] mt-1 leading-relaxed">
            Automated event logs generated from weekly scheduled crawls, PageSpeed audits, and task approvals.
          </p>
        </div>
        <button className="text-xs text-[#0f172a] hover:underline font-semibold">
          Mark all as read
        </button>
      </div>

      {/* 2. CRAWL STATION AUDIT & CHANGE LOG */}
      <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#e2e8f0]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[8px] bg-[#f8fafc] text-[#0f172a] border border-[#e2e8f0] flex items-center justify-center shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-[#0f172a] uppercase tracking-wide">
                  Crawl Station — Weekly Audit Log
                </h3>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0]">
                  Done · 478 Pages
                </span>
              </div>
              <p className="text-xs text-[#64748b] mt-0.5 font-mono">
                Runs every Sun ~05:30 UTC when crawl station is online. (PDF Page 3)
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-[#475569] bg-[#f8fafc] px-3 py-1.5 rounded-[8px] border border-[#e2e8f0] self-start sm:self-center">
            Scan Period: 2026-09-27 → 2026-09-28
          </div>
        </div>

        {/* Change metrics grid from PDF Page 3 */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-center">
          <div className="p-3 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
            <span className="text-[10px] text-[#64748b] font-semibold block uppercase">New Broken</span>
            <span className="text-sm font-bold text-[#0f172a] font-mono mt-0.5 block">0</span>
          </div>

          <div className="p-3 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
            <span className="text-[10px] text-[#64748b] font-semibold block uppercase">Fixed</span>
            <span className="text-sm font-bold text-[#0f172a] font-mono mt-0.5 block">0</span>
          </div>

          <div className="p-3 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
            <span className="text-[10px] text-[#64748b] font-semibold block uppercase">New Pages</span>
            <span className="text-sm font-bold text-[#0f172a] font-mono mt-0.5 block">0</span>
          </div>

          <div className="p-3 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
            <span className="text-[10px] text-[#64748b] font-semibold block uppercase">Removed</span>
            <span className="text-sm font-bold text-[#0f172a] font-mono mt-0.5 block">0</span>
          </div>

          <div className="p-3 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
            <span className="text-[10px] text-[#64748b] font-semibold block uppercase">Titles Changed</span>
            <span className="text-sm font-bold text-[#0f172a] font-mono mt-0.5 block">0</span>
          </div>

          <div className="p-3 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
            <span className="text-[10px] text-[#64748b] font-semibold block uppercase">Meta Lost</span>
            <span className="text-sm font-bold text-[#0f172a] font-mono mt-0.5 block">0</span>
          </div>
        </div>
      </div>

      {/* 3. System & Audit Notification Feed */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-[#64748b] uppercase tracking-wider px-1">
          Recent Event Feed
        </h3>

        {NOTIFICATIONS.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-[12px] border flex items-start gap-3.5 transition-all ${
              item.read
                ? 'bg-white border-[#e2e8f0] text-[#64748b]'
                : 'bg-white border-[#cbd5e1] shadow-[0px_1px_3px_rgba(0,0,0,0.04)] text-[#0f172a]'
            }`}
          >
            <div className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 mt-0.5 bg-[#f8fafc] text-[#0f172a] border border-[#e2e8f0]">
              {item.type === 'warning' && <AlertTriangle className="w-4 h-4" />}
              {item.type === 'alert' && <AlertOctagon className="w-4 h-4" />}
              {item.type === 'success' && <CheckCircle2 className="w-4 h-4" />}
              {item.type === 'info' && <Info className="w-4 h-4" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#0f172a]">{item.title}</span>
                <span className="text-xs text-[#94a3b8] font-mono shrink-0">
                  {item.timestamp}
                </span>
              </div>
              <p className="text-xs text-[#64748b] mt-1 leading-relaxed">{item.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
