import React from 'react';
import {
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  Activity,
  Globe,
  Gauge,
  Search,
  Play,
} from 'lucide-react';
import {
  AI_AUDIT_DATA,
  GA4_KPIS,
  GSC_KPIS,
  CRAWL_OVERVIEW,
} from '../data/mockData';
import { StatCard } from '../components/common/StatCard';
import { MenuId, TaskItem } from '../types';

interface OverviewPageProps {
  onNavigate: (menu: MenuId) => void;
  tasks: TaskItem[];
  onToggleTaskStatus: (taskId: string) => void;
  onRunAudit?: () => void;
  isAuditing?: boolean;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  onNavigate,
  tasks,
  onToggleTaskStatus,
  onRunAudit,
  isAuditing = false,
}) => {
  const openTasks = tasks.filter((t) => t.status !== 'Completed');
  const highPriorityTasks = openTasks.filter((t) => t.priority === 'High');
  const confirmedTasks = tasks.filter((t) => t.status === 'Completed');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. AI SITE AUDIT EXECUTIVE CARD (Trackly Monochrome Style) */}
      <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-5 sm:p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e2e8f0] pb-5 mb-5">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-[10px] bg-[#f8fafc] text-[#0f172a] border border-[#e2e8f0] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[17px] font-bold text-[#0f172a] tracking-tight">AI Site Audit Overview</h2>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
                  {AI_AUDIT_DATA.findingsCount} findings
                </span>
                <span className="text-xs text-[#64748b] font-mono">
                  Last run {AI_AUDIT_DATA.lastRun}
                </span>
              </div>
              <p className="text-xs text-[#64748b] mt-1 leading-relaxed">
                Reads the crawl, GA4, Search Console, PageSpeed and Clarity together, scores the site and files what it finds as tasks.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Run Audit · Pro button */}
            {onRunAudit && (
              <button
                onClick={onRunAudit}
                disabled={isAuditing}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-[8px] font-semibold text-xs transition-all shadow-xs active:scale-95 ${
                  isAuditing
                    ? 'bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed'
                    : 'bg-[#0f172a] hover:bg-[#1e293b] text-white'
                }`}
              >
                {isAuditing ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Auditing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run audit · Pro</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={() => onNavigate('task-db')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-xs font-semibold transition-colors shadow-xs"
            >
              <span>View Task DB</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#94a3b8]" />
            </button>
          </div>
        </div>

        {/* AI Synthesis Statement */}
        <div className="p-4 rounded-[10px] bg-[#f8fafc] border border-[#e2e8f0] text-[13px] text-[#475569] leading-relaxed">
          <p className="flex items-start gap-2.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#0f172a] mt-1.5 shrink-0" />
            <span>{AI_AUDIT_DATA.summary}</span>
          </p>
        </div>
      </div>

      {/* 2. FOUR PRIMARY AUDIT KPI CARDS (Trackly Pure Monochrome Style) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Open Tasks"
          value={openTasks.length}
          subtext="Issues awaiting action"
          badge="Audit Sync"
          onClick={() => onNavigate('task-db')}
        />
        <StatCard
          label="Confirmed & Closed"
          value={confirmedTasks.length}
          subtext="Issues verified & closed"
          badge="Completed"
          onClick={() => onNavigate('task-db')}
        />
        <StatCard
          label="High Priority Open"
          value={highPriorityTasks.length}
          subtext="Urgent technical/ads items"
          badge="Critical"
          onClick={() => onNavigate('actionable-items')}
        />
        <StatCard
          label="Active Connections"
          value={AI_AUDIT_DATA.activeConnections}
          subtext="GA4, GSC, PSI, SF, Clarity"
          badge="5/5 Synced"
          onClick={() => onNavigate('connections')}
        />
      </div>

      {/* 3. MULTI-CHANNEL HEALTH SNAPSHOT (GA4 & Screaming Frog) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* GA4 Traffic Snapshot */}
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[8px] bg-[#f8fafc] text-[#0f172a] border border-[#e2e8f0] flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0f172a]">GA4 Traffic & Engagement</h3>
                  <div className="text-xs text-[#64748b] font-mono">aizonemarketing.io · Last 28 days</div>
                </div>
              </div>
              <button
                onClick={() => onNavigate('website')}
                className="text-xs text-[#0f172a] hover:text-[#475569] font-semibold inline-flex items-center gap-1"
              >
                Deep Dive <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 my-4">
              <div className="p-3.5 rounded-[10px] bg-[#f8fafc] border border-[#e2e8f0]">
                <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Sessions</span>
                <div className="text-[24px] font-bold text-[#0f172a] mt-1">{GA4_KPIS.sessions.value}</div>
                <div className="text-xs text-[#16a34a] font-semibold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> {GA4_KPIS.sessions.change}
                </div>
              </div>

              <div className="p-3.5 rounded-[10px] bg-[#f8fafc] border border-[#e2e8f0]">
                <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Users</span>
                <div className="text-[24px] font-bold text-[#0f172a] mt-1">{GA4_KPIS.users.value}</div>
                <div className="text-xs text-[#16a34a] font-semibold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> {GA4_KPIS.users.change}
                </div>
              </div>

              <div className="p-3.5 rounded-[10px] bg-[#f8fafc] border border-[#e2e8f0]">
                <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Pageviews</span>
                <div className="text-[24px] font-bold text-[#0f172a] mt-1">{GA4_KPIS.pageviews.value}</div>
                <div className="text-xs text-[#16a34a] font-semibold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> {GA4_KPIS.pageviews.change}
                </div>
              </div>
            </div>

            <div className="text-xs text-[#475569] bg-[#f8fafc] p-3 rounded-[10px] border border-[#e2e8f0]">
              <span className="font-semibold text-[#0f172a]">Top Landing Page:</span>{' '}
              <code className="text-[#0f172a] font-mono font-semibold">/home-copy/</code> (31 sessions, 84% engagement rate)
            </div>
          </div>
        </div>

        {/* Screaming Frog Crawl Score & Health Snapshot */}
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[8px] bg-[#f8fafc] text-[#0f172a] border border-[#e2e8f0] flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0f172a]">Screaming Frog Crawl Health</h3>
                  <div className="text-xs text-[#64748b] font-mono">478 pages crawled · Sep 28, 2026</div>
                </div>
              </div>
              <button
                onClick={() => onNavigate('search-marketing')}
                className="text-xs text-[#0f172a] hover:text-[#475569] font-semibold inline-flex items-center gap-1"
              >
                Crawl Audit <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Score pill */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-baseline gap-1.5 bg-[#f8fafc] px-4 py-2.5 rounded-[10px] border border-[#e2e8f0]">
                <span className="text-[28px] font-bold text-[#0f172a]">{CRAWL_OVERVIEW.score}</span>
                <span className="text-xs text-[#64748b] font-medium">/ 100</span>
                <span className="ml-2 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
                  {CRAWL_OVERVIEW.scoreLabel}
                </span>
              </div>
              <div className="text-xs text-[#64748b] leading-tight">
                Avg crawl: <span className="text-[#0f172a] font-mono font-semibold">{CRAWL_OVERVIEW.avgTime}</span>
                <br />
                Non-indexable: <span className="text-[#0f172a] font-semibold">{CRAWL_OVERVIEW.nonIndexable} pages</span>
              </div>
            </div>

            {/* HTTP Status Breakdown bar (Monochrome Slate Shades) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-[#64748b] font-medium">
                <span>Healthy 2xx (100)</span>
                <span>3xx Redirects (226)</span>
                <span>Broken 4xx/5xx (151)</span>
              </div>
              <div className="h-2.5 w-full bg-[#f1f5f9] rounded-full overflow-hidden flex border border-[#e2e8f0]">
                <div style={{ width: '21%' }} className="bg-[#0f172a] h-full" title="Healthy 2xx" />
                <div style={{ width: '47%' }} className="bg-[#64748b] h-full" title="3xx Redirects" />
                <div style={{ width: '31%' }} className="bg-[#94a3b8] h-full" title="Broken 4xx/5xx" />
                <div style={{ width: '1%' }} className="bg-[#cbd5e1] h-full" title="Blocked" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SEARCH CONSOLE & PAGESPEED QUICK COMPARISON */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* GSC Quick Card */}
        <div className="p-5 rounded-[12px] bg-white border border-[#e2e8f0] flex items-center justify-between shadow-[0px_1px_3px_rgba(0,0,0,0.04)] hover:border-[#cbd5e1] transition-all">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-[8px] bg-[#f8fafc] text-[#0f172a] border border-[#e2e8f0] flex items-center justify-center shrink-0">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-[#64748b] font-medium">Google Search Console</div>
              <div className="text-[15px] font-bold text-[#0f172a] mt-0.5">
                {GSC_KPIS.impressions.value} Impressions <span className="text-xs text-[#16a34a] font-semibold">({GSC_KPIS.impressions.change})</span>
              </div>
              <div className="text-xs text-[#64748b]">Avg Position: <span className="text-[#0f172a] font-semibold">{GSC_KPIS.avgPosition.value}</span></div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('search-marketing')}
            className="p-2 rounded-[8px] bg-[#f8fafc] hover:bg-[#f1f5f9] text-[#64748b] border border-[#e2e8f0] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* PageSpeed Quick Card */}
        <div className="p-5 rounded-[12px] bg-white border border-[#e2e8f0] flex items-center justify-between shadow-[0px_1px_3px_rgba(0,0,0,0.04)] hover:border-[#cbd5e1] transition-all">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-[8px] bg-[#f8fafc] text-[#0f172a] border border-[#e2e8f0] flex items-center justify-center shrink-0">
              <Gauge className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-[#64748b] font-medium">PageSpeed Insights Score</div>
              <div className="text-[15px] font-bold text-[#0f172a] mt-0.5 flex items-center gap-2">
                <span>Desktop: 85</span>
                <span className="text-[#cbd5e1]">|</span>
                <span>Mobile: 67</span>
              </div>
              <div className="text-xs text-[#64748b]">Mobile LCP requires optimization (13.4s)</div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('website')}
            className="p-2 rounded-[8px] bg-[#f8fafc] hover:bg-[#f1f5f9] text-[#64748b] border border-[#e2e8f0] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5. TOP ACTIONABLE TASKS SECTION (Trackly Monochrome Table DNA) */}
      <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-5 sm:p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-[15px] font-bold text-[#0f172a] flex items-center gap-2">
              Action Items Requiring Attention
              <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
                {openTasks.length} pending
              </span>
            </h3>
            <p className="text-xs text-[#64748b] mt-0.5">
              High-impact generated tasks filed automatically by the AI audit.
            </p>
          </div>
          <button
            onClick={() => onNavigate('actionable-items')}
            className="text-xs text-[#0f172a] hover:text-[#475569] font-semibold inline-flex items-center gap-1 self-start sm:self-auto"
          >
            Manage All Actionable Items <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-[#e2e8f0] border border-[#e2e8f0] rounded-[10px] overflow-hidden">
          {tasks.slice(0, 5).map((task) => (
            <div
              key={task.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#f8fafc] transition-colors"
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={task.status === 'Completed'}
                  onChange={() => onToggleTaskStatus(task.id)}
                  className="mt-0.5 w-4 h-4 rounded-[4px] border-[#cbd5e1] text-[#0f172a] focus:ring-[#0f172a] cursor-pointer"
                />
                <div>
                  <div
                    className={`text-[13px] font-semibold ${
                      task.status === 'Completed'
                        ? 'line-through text-[#94a3b8]'
                        : 'text-[#0f172a]'
                    }`}
                  >
                    {task.task}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
                      {task.lane}
                    </span>
                    <span className="text-[11px] text-[#64748b] font-mono">Date: {task.date}</span>
                    {task.priority === 'High' && (
                      <span className="text-[10px] font-semibold text-[#0f172a] bg-[#f1f5f9] px-1.5 py-0.2 rounded-[4px] border border-[#e2e8f0]">
                        High Priority
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
