import React, { useState } from 'react';
import {
  Download,
  Search,
  RefreshCw,
  Plus,
  Smartphone,
  Monitor,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Gauge,
} from 'lucide-react';
import {
  GA4_KPIS,
  GA4_PAGES,
  PAGESPEED_MOBILE,
  PAGESPEED_DESKTOP,
  TRACKED_PAGES,
} from '../data/mockData';
import { StatCard } from '../components/common/StatCard';
import { Dropdown } from '../components/common/Dropdown';
import { TrackedPageItem } from '../types';

export const WebsitePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [activeTab, setActiveTab] = useState<'ga4' | 'pagespeed' | 'tracked'>('ga4');
  const [trackedPagesList, setTrackedPagesList] = useState<TrackedPageItem[]>(TRACKED_PAGES);
  const [newUrlInput, setNewUrlInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter sources
  const filteredPages = GA4_PAGES.filter((item) => {
    const matchesSearch =
      item.page.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sourceMedium.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource =
      sourceFilter === 'All'
        ? true
        : sourceFilter === 'organic'
        ? item.sourceMedium.includes('organic')
        : sourceFilter === 'referral'
        ? item.sourceMedium.includes('referral')
        : sourceFilter === 'direct'
        ? item.sourceMedium.includes('direct')
        : true;
    return matchesSearch && matchesSource;
  });

  const totalPages = Math.ceil(filteredPages.length / itemsPerPage);
  const displayedPages = filteredPages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddTrackedPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrlInput.trim()) return;
    const newEntry: TrackedPageItem = {
      page: newUrlInput.startsWith('/') ? newUrlInput : `/${newUrlInput}`,
      source: 'Pinned URL',
      sessions28d: 0,
      psiPerf: 'Pending',
      lcp: 'Pending',
      sfStatus: '200',
    };
    setTrackedPagesList([newEntry, ...trackedPagesList]);
    setNewUrlInput('');
  };

  const handleExportCSV = () => {
    const headers = 'Page,Source / Medium,Sessions,Users,Engagement,Key events\n';
    const rows = filteredPages
      .map(
        (p) =>
          `"${p.page}","${p.sourceMedium}",${p.sessions},${p.users},"${p.engagement}",${p.keyEvents}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ga4-top-pages-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Sub-navigation tabs (Trackly segmented control style) */}
      <div className="flex items-center gap-1.5 p-1 bg-[#f1f5f9] border border-[#e2e8f0] rounded-[10px] w-fit">
        <button
          onClick={() => setActiveTab('ga4')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-[8px] transition-all ${
            activeTab === 'ga4'
              ? 'bg-white text-[#0f172a] shadow-xs'
              : 'text-[#64748b] hover:text-[#0f172a]'
          }`}
        >
          GA4 — Top Pages & Traffic
        </button>
        <button
          onClick={() => setActiveTab('pagespeed')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-[8px] transition-all ${
            activeTab === 'pagespeed'
              ? 'bg-white text-[#0f172a] shadow-xs'
              : 'text-[#64748b] hover:text-[#0f172a]'
          }`}
        >
          PageSpeed Core Web Vitals
        </button>
        <button
          onClick={() => setActiveTab('tracked')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-[8px] transition-all ${
            activeTab === 'tracked'
              ? 'bg-white text-[#0f172a] shadow-xs'
              : 'text-[#64748b] hover:text-[#0f172a]'
          }`}
        >
          Tracked Pages ({trackedPagesList.length})
        </button>
      </div>

      {/* SECTION 1: GA4 TOP PAGES (From PDF Page 1 & 2) */}
      {(activeTab === 'ga4' || activeTab === 'pagespeed') && (
        <div className="space-y-5">
          {/* Header Info Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-[12px] bg-white border border-[#e2e8f0] text-xs shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-[#0f172a] uppercase tracking-wide">GA4 — Top Pages</span>
              <span className="text-[#cbd5e1]">|</span>
              <a
                href={GA4_KPIS.url}
                target="_blank"
                rel="noreferrer"
                className="text-[#0f172a] hover:underline font-mono font-semibold inline-flex items-center gap-1"
              >
                {GA4_KPIS.domain} <ExternalLink className="w-3 h-3 text-[#64748b]" />
              </a>
              <span className="text-[#cbd5e1] hidden md:inline">·</span>
              <span className="text-[#64748b] hidden md:inline">{GA4_KPIS.dateRange}</span>
              <span className="text-[#cbd5e1] hidden md:inline">·</span>
              <span className="text-[#64748b] hidden md:inline">{GA4_KPIS.totalRows} rows indexed</span>
            </div>
            <div className="flex items-center gap-2 text-[#64748b] font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-[#0f172a] inline-block" />
              Data synchronized · {GA4_KPIS.asOf}
            </div>
          </div>

          {/* 4 KPI Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Sessions"
              value={GA4_KPIS.sessions.value}
              change={GA4_KPIS.sessions.change}
              changeDirection="up"
              subtext="vs previous 28 days"
            />
            <StatCard
              label="Users"
              value={GA4_KPIS.users.value}
              change={GA4_KPIS.users.change}
              changeDirection="up"
              subtext="vs previous 28 days"
            />
            <StatCard
              label="Pageviews"
              value={GA4_KPIS.pageviews.value}
              change={GA4_KPIS.pageviews.change}
              changeDirection="up"
              subtext="vs previous 28 days"
            />
            <StatCard
              label="Key Events"
              value={GA4_KPIS.keyEvents.value}
              change="0"
              changeDirection="neutral"
              subtext="Conversions recorded"
            />
          </div>

          {/* GA4 Table with filter & search (Trackly Table DNA) */}
          {activeTab === 'ga4' && (
            <div className="bg-white border border-[#e2e8f0] rounded-[12px] overflow-hidden shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
              {/* Filter controls */}
              <div className="p-4 border-b border-[#e2e8f0] flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white">
                <div className="flex flex-1 items-center gap-2.5">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-3.5 h-3.5 text-[#94a3b8] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Filter by page or source..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full pl-8 pr-3 py-1.5 rounded-[8px] bg-white border border-[#e2e8f0] text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0f172a] font-medium"
                    />
                  </div>

                  <Dropdown
                    value={sourceFilter}
                    onChange={(val) => {
                      setSourceFilter(val);
                      setCurrentPage(1);
                    }}
                    options={[
                      { label: 'All Sources', value: 'All' },
                      { label: 'Organic Search', value: 'organic' },
                      { label: 'Referral', value: 'referral' },
                      { label: 'Direct', value: 'direct' },
                    ]}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#64748b]">
                    Showing {filteredPages.length} pages
                  </span>
                  <button
                    onClick={handleExportCSV}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-xs font-semibold transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5 text-[#64748b]" />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f8fafc] text-[#64748b] border-b border-[#e2e8f0] uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3 px-4">Page</th>
                      <th className="py-3 px-4">Source / Medium</th>
                      <th className="py-3 px-4 text-right">Sessions</th>
                      <th className="py-3 px-4 text-right">Users</th>
                      <th className="py-3 px-4 text-right">Engagement</th>
                      <th className="py-3 px-4 text-right">Key Events</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0] text-[#0f172a]">
                    {displayedPages.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#f8fafc] transition-colors">
                        <td className="py-3 px-4 font-mono text-[#0f172a] hover:underline max-w-xs truncate font-medium">
                          {row.page}
                        </td>
                        <td className="py-3 px-4 font-mono text-[#64748b] text-[11px]">
                          {row.sourceMedium}
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-[#0f172a]">
                          {row.sessions}
                        </td>
                        <td className="py-3 px-4 text-right text-[#475569]">{row.users}</td>
                        <td className="py-3 px-4 text-right">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0]">
                            {row.engagement}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-[#94a3b8] font-mono">
                          {row.keyEvents}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-3.5 border-t border-[#e2e8f0] flex items-center justify-between text-xs text-[#64748b] bg-white">
                <div>
                  Page {currentPage} of {totalPages || 1} · {filteredPages.length} rows
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-1.5 rounded-[6px] bg-white border border-[#e2e8f0] text-[#475569] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f8fafc] transition-colors shadow-2xs"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="p-1.5 rounded-[6px] bg-white border border-[#e2e8f0] text-[#475569] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f8fafc] transition-colors shadow-2xs"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: PAGESPEED INSIGHTS (From PDF Page 2) */}
      {(activeTab === 'pagespeed' || activeTab === 'ga4') && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between p-4 rounded-[12px] bg-white border border-[#e2e8f0] shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
            <div>
              <h2 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#0f172a]" />
                PageSpeed Insights — Core Web Vitals
              </h2>
              <div className="text-xs text-[#64748b] font-mono mt-0.5">
                https://aizonemarketing.io/ · Data as of Sep 27, 2026
              </div>
            </div>
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] bg-[#0f172a] hover:bg-[#1e293b] text-white font-semibold text-xs transition-colors shadow-xs">
              <RefreshCw className="w-3.5 h-3.5" />
              Run PageSpeed
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Mobile Card */}
            <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#e2e8f0]">
                <div className="flex items-center gap-2 text-[#0f172a] font-bold text-xs">
                  <Smartphone className="w-4 h-4 text-[#64748b]" />
                  <span>MOBILE PERFORMANCE</span>
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0] font-semibold">
                  Needs Improvement
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2.5 mb-5 text-center">
                <div className="p-3 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                  <div className="text-[10px] font-bold text-[#64748b] uppercase">Perf</div>
                  <div className="text-[24px] font-bold text-[#0f172a] mt-0.5">{PAGESPEED_MOBILE.performance}</div>
                </div>
                <div className="p-3 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                  <div className="text-[10px] font-bold text-[#64748b] uppercase">SEO</div>
                  <div className="text-[24px] font-bold text-[#0f172a] mt-0.5">{PAGESPEED_MOBILE.seo}</div>
                </div>
                <div className="p-3 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                  <div className="text-[10px] font-bold text-[#64748b] uppercase">Access</div>
                  <div className="text-[24px] font-bold text-[#0f172a] mt-0.5">{PAGESPEED_MOBILE.accessibility}</div>
                </div>
                <div className="p-3 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                  <div className="text-[10px] font-bold text-[#64748b] uppercase">Best Prac</div>
                  <div className="text-[24px] font-bold text-[#0f172a] mt-0.5">{PAGESPEED_MOBILE.bestPractices}</div>
                </div>
              </div>

              {/* Vitals Diagnostics */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                  <span className="text-[#64748b]">Largest Contentful Paint (LCP)</span>
                  <span className="font-mono font-bold text-[#0f172a]">{PAGESPEED_MOBILE.lcp}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                  <span className="text-[#64748b]">Cumulative Layout Shift (CLS)</span>
                  <span className="font-mono font-bold text-[#0f172a]">{PAGESPEED_MOBILE.cls}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                  <span className="text-[#64748b]">Total Blocking Time (TBT)</span>
                  <span className="font-mono font-bold text-[#0f172a]">{PAGESPEED_MOBILE.tbt}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                  <span className="text-[#64748b]">First Contentful Paint (FCP)</span>
                  <span className="font-mono font-bold text-[#0f172a]">{PAGESPEED_MOBILE.fcp}</span>
                </div>
              </div>
            </div>

            {/* Desktop Card */}
            <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#e2e8f0]">
                <div className="flex items-center gap-2 text-[#0f172a] font-bold text-xs">
                  <Monitor className="w-4 h-4 text-[#64748b]" />
                  <span>DESKTOP PERFORMANCE</span>
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0] font-semibold">
                  Good Condition
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2.5 mb-5 text-center">
                <div className="p-3 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                  <div className="text-[10px] font-bold text-[#64748b] uppercase">Perf</div>
                  <div className="text-[24px] font-bold text-[#0f172a] mt-0.5">{PAGESPEED_DESKTOP.performance}</div>
                </div>
                <div className="p-3 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                  <div className="text-[10px] font-bold text-[#64748b] uppercase">SEO</div>
                  <div className="text-[24px] font-bold text-[#0f172a] mt-0.5">{PAGESPEED_DESKTOP.seo}</div>
                </div>
                <div className="p-3 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                  <div className="text-[10px] font-bold text-[#64748b] uppercase">Access</div>
                  <div className="text-[24px] font-bold text-[#0f172a] mt-0.5">{PAGESPEED_DESKTOP.accessibility}</div>
                </div>
                <div className="p-3 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                  <div className="text-[10px] font-bold text-[#64748b] uppercase">Best Prac</div>
                  <div className="text-[24px] font-bold text-[#0f172a] mt-0.5">{PAGESPEED_DESKTOP.bestPractices}</div>
                </div>
              </div>

              {/* Vitals Diagnostics */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                  <span className="text-[#64748b]">Largest Contentful Paint (LCP)</span>
                  <span className="font-mono font-bold text-[#0f172a]">{PAGESPEED_DESKTOP.lcp}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                  <span className="text-[#64748b]">Cumulative Layout Shift (CLS)</span>
                  <span className="font-mono font-bold text-[#0f172a]">{PAGESPEED_DESKTOP.cls}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                  <span className="text-[#64748b]">Total Blocking Time (TBT)</span>
                  <span className="font-mono font-bold text-[#0f172a]">{PAGESPEED_DESKTOP.tbt}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0]">
                  <span className="text-[#64748b]">First Contentful Paint (FCP)</span>
                  <span className="font-mono font-bold text-[#0f172a]">{PAGESPEED_DESKTOP.fcp}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: TRACKED PAGES (From PDF Page 2) */}
      {(activeTab === 'tracked' || activeTab === 'pagespeed') && (
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-[12px] bg-white border border-[#e2e8f0] shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
            <div>
              <h3 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">TRACKED PAGES</h3>
              <p className="text-xs text-[#64748b] mt-0.5">
                Home + top-traffic pages (auto from GA4) + your pinned URLs · measured weekly by PageSpeed
              </p>
            </div>

            <form onSubmit={handleAddTrackedPage} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="https://aizonemarketing.io/page…"
                value={newUrlInput}
                onChange={(e) => setNewUrlInput(e.target.value)}
                className="px-3 py-1.5 rounded-[8px] bg-white border border-[#e2e8f0] text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0f172a] w-56 font-medium"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-[8px] bg-[#0f172a] hover:bg-[#1e293b] text-white font-semibold text-xs transition-colors shrink-0 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Add URL
              </button>
            </form>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-[12px] overflow-hidden shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f8fafc] text-[#64748b] border-b border-[#e2e8f0] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">PAGE</th>
                  <th className="py-3 px-4">SOURCE</th>
                  <th className="py-3 px-4 text-right">SESSIONS 28D</th>
                  <th className="py-3 px-4 text-center">PSI PERF M/D</th>
                  <th className="py-3 px-4 text-center">LCP M/D</th>
                  <th className="py-3 px-4 text-center">SF STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0] text-[#0f172a]">
                {trackedPagesList.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="py-3 px-4 font-mono text-[#0f172a] font-medium">{item.page}</td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] font-medium border border-[#e2e8f0]">
                        {item.source}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-[#0f172a]">
                      {item.sessions28d}
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-semibold text-[#0f172a]">
                      {item.psiPerf}
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-[#64748b]">{item.lcp}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0] font-mono text-[10px] font-semibold">
                        {item.sfStatus === '200' ? '200 OK' : '—'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
