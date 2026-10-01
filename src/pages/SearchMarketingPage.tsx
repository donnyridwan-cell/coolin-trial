import React, { useState } from 'react';
import {
  Search,
  Download,
  Upload,
  CheckCircle2,
  TrendingUp,
  Link2,
  Activity,
  Layers,
  ExternalLink,
} from 'lucide-react';
import {
  GSC_KPIS,
  GSC_QUERIES,
  CRAWL_OVERVIEW,
  CRAWL_ISSUES,
  CRAWL_HISTORY,
  CRAWLED_URLS,
} from '../data/mockData';
import { StatCard } from '../components/common/StatCard';
import { Dropdown } from '../components/common/Dropdown';
import { MenuId } from '../types';

interface SearchMarketingPageProps {
  onNavigate?: (menu: MenuId) => void;
}

export const SearchMarketingPage: React.FC<SearchMarketingPageProps> = ({ onNavigate }) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'keywords' | 'crawl-summary' | 'crawl-urls' | 'backlinks'
  >('keywords');

  const [issueFilter, setIssueFilter] = useState<'ALL' | 'ERROR' | 'WARNING' | 'NOTICE'>('ALL');
  const [urlSearch, setUrlSearch] = useState('');
  const [urlStatusFilter, setUrlStatusFilter] = useState<string>('ALL');

  const filteredIssues = CRAWL_ISSUES.filter((issue) => {
    if (issueFilter === 'ALL') return true;
    return issue.type === issueFilter;
  });

  const filteredUrls = CRAWLED_URLS.filter((item) => {
    const matchesSearch = item.url.toLowerCase().includes(urlSearch.toLowerCase());
    const matchesStatus =
      urlStatusFilter === 'ALL'
        ? true
        : urlStatusFilter === '200'
        ? item.status === 200
        : urlStatusFilter === '301'
        ? item.status === 301
        : urlStatusFilter === '404'
        ? item.status === 404
        : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Sub-navigation tabs (Trackly segmented control style) */}
      <div className="flex items-center gap-1.5 p-1 bg-[#f1f5f9] border border-[#e2e8f0] rounded-[10px] overflow-x-auto w-fit">
        <button
          onClick={() => setActiveSubTab('keywords')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-[8px] whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSubTab === 'keywords'
              ? 'bg-white text-[#0f172a] shadow-xs'
              : 'text-[#64748b] hover:text-[#0f172a]'
          }`}
        >
          <Search className="w-3.5 h-3.5 text-[#94a3b8]" />
          <span>Organic Keywords & Rankings</span>
        </button>

        <button
          onClick={() => setActiveSubTab('crawl-summary')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-[8px] whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSubTab === 'crawl-summary'
              ? 'bg-white text-[#0f172a] shadow-xs'
              : 'text-[#64748b] hover:text-[#0f172a]'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-[#94a3b8]" />
          <span>Technical Crawl Audit</span>
        </button>

        <button
          onClick={() => setActiveSubTab('crawl-urls')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-[8px] whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSubTab === 'crawl-urls'
              ? 'bg-white text-[#0f172a] shadow-xs'
              : 'text-[#64748b] hover:text-[#0f172a]'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-[#94a3b8]" />
          <span>Crawled URLs ({CRAWLED_URLS.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('backlinks')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-[8px] whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSubTab === 'backlinks'
              ? 'bg-white text-[#0f172a] shadow-xs'
              : 'text-[#64748b] hover:text-[#0f172a]'
          }`}
        >
          <Link2 className="w-3.5 h-3.5 text-[#94a3b8]" />
          <span>Off-Page Backlinks</span>
        </button>
      </div>

      {/* 1. ORGANIC KEYWORDS & RANKINGS (GSC Queries & SEMrush) */}
      {activeSubTab === 'keywords' && (
        <div className="space-y-5">
          {/* GSC Queries Header bar from PDF Page 2 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-[12px] bg-white border border-[#e2e8f0] text-xs shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-[#0f172a] uppercase tracking-wide">GSC — SEARCH QUERIES</span>
              <span className="text-[#cbd5e1]">|</span>
              <span className="text-[#0f172a] font-mono font-medium">https://aizonemarketing.io/</span>
              <span className="text-[#cbd5e1] hidden md:inline">·</span>
              <span className="text-[#64748b] hidden md:inline">{GSC_KPIS.dateRange}</span>
              <span className="text-[#cbd5e1] hidden md:inline">·</span>
              <span className="text-[#64748b] hidden md:inline">{GSC_QUERIES.length} queries</span>
            </div>
            <div className="text-[#64748b] font-mono text-[11px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0f172a] inline-block" />
              Verified domain · {GSC_KPIS.asOf}
            </div>
          </div>

          {/* 4 GSC Primary KPI StatCards (PDF Page 2) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Clicks"
              value={GSC_KPIS.clicks.value}
              subtext="Organic search clicks"
              badge="GSC"
            />
            <StatCard
              label="Impressions"
              value={GSC_KPIS.impressions.value}
              change={GSC_KPIS.impressions.change}
              changeDirection="up"
              subtext="Search visibility"
              badge="Top Performer"
            />
            <StatCard
              label="CTR"
              value={GSC_KPIS.ctr.value}
              subtext="Click-through rate"
              badge="GSC"
            />
            <StatCard
              label="Avg Position"
              value={GSC_KPIS.avgPosition.value}
              change={GSC_KPIS.avgPosition.change}
              changeDirection="up"
              subtext="Average ranking"
              badge="Improved"
            />
          </div>

          {/* GSC Search Queries Table (Trackly Table DNA) */}
          <div className="bg-white border border-[#e2e8f0] rounded-[12px] overflow-hidden shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
            <div className="p-4 border-b border-[#e2e8f0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                <input
                  type="text"
                  placeholder="Filter by query or page..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-[8px] border border-[#e2e8f0] text-xs bg-white text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0f172a] font-medium"
                />
              </div>

              <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] font-semibold text-xs transition-colors shadow-xs">
                <Download className="w-3.5 h-3.5 text-[#64748b]" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f8fafc] text-[#64748b] border-b border-[#e2e8f0] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Query</th>
                    <th className="py-3 px-4">Target Page</th>
                    <th className="py-3 px-4 text-right">Clicks</th>
                    <th className="py-3 px-4 text-right">Impr.</th>
                    <th className="py-3 px-4 text-right">CTR</th>
                    <th className="py-3 px-4 text-right">Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0] text-[#0f172a]">
                  {GSC_QUERIES.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#f8fafc] transition-colors">
                      <td className="py-3 px-4 font-semibold text-[#0f172a]">{row.query}</td>
                      <td className="py-3 px-4 font-mono text-[#64748b] text-[11px] truncate max-w-xs font-medium">
                        {row.page}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-medium">{row.clicks}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-[#0f172a]">{row.impressions}</td>
                      <td className="py-3 px-4 text-right font-mono">{row.ctr}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-[#0f172a]">
                        {row.position}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 border-t border-[#e2e8f0] bg-[#f8fafc] text-xs text-[#64748b] flex items-center justify-between">
              <span>Showing Page 1 of 1 · {GSC_QUERIES.length} rows</span>
            </div>
          </div>

          {/* Unified SEMrush Organic Positions Dropzone */}
          <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-[#e2e8f0]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[8px] bg-[#f8fafc] text-[#0f172a] border border-[#e2e8f0] flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#0f172a] uppercase tracking-wide">
                    KEYWORDS — RANKINGS (SEMrush)
                  </h3>
                  <p className="text-xs text-[#64748b]">
                    Cross-reference organic Google Search Console queries with full SEMrush position tracking.
                  </p>
                </div>
              </div>
              <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] font-semibold text-xs transition-colors shadow-xs self-start sm:self-center">
                <Upload className="w-3.5 h-3.5 text-[#64748b]" />
                <span>Upload CSV</span>
              </button>
            </div>

            <div className="border-2 border-dashed border-[#e2e8f0] hover:border-[#0f172a] rounded-[10px] p-8 text-center bg-[#f8fafc] transition-colors cursor-pointer">
              <Upload className="w-6 h-6 text-[#94a3b8] mx-auto mb-2" />
              <div className="text-xs font-bold text-[#0f172a]">
                Drop a CSV here or click to browse
              </div>
              <div className="text-xs text-[#64748b] mt-0.5">
                Organic Research → Positions → Export (.csv)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. TECHNICAL SITE AUDIT TAB (From PDF Page 3) */}
      {activeSubTab === 'crawl-summary' && (
        <div className="space-y-5">
          {/* Header Info Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-[12px] bg-white border border-[#e2e8f0] text-xs shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-[#0f172a] uppercase tracking-wide">
                SCREAMING FROG — SITE AUDIT
              </span>
              <span className="text-[#cbd5e1]">|</span>
              <span className="text-[#64748b]">Data as of {CRAWL_OVERVIEW.date}</span>
              <span className="text-[#cbd5e1]">·</span>
              <span className="text-[#0f172a] font-semibold">{CRAWL_OVERVIEW.pagesCrawled} pages</span>
              <span className="text-[#cbd5e1]">·</span>
              <span className="text-[#64748b] font-medium">scheduled crawl</span>
            </div>

            <div className="flex items-center gap-2.5">
              {onNavigate && (
                <button
                  onClick={() => onNavigate('notifications')}
                  className="inline-flex items-center gap-1 text-xs text-[#0f172a] hover:underline font-semibold"
                >
                  <span>View Crawl Logs in Notifications</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#64748b]" />
                </button>
              )}
              <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] font-semibold text-xs transition-colors shadow-xs">
                <Upload className="w-3.5 h-3.5 text-[#64748b]" />
                <span>Upload SF export</span>
              </button>
            </div>
          </div>

          {/* Crawl score card & Health breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Score box */}
            <div className="p-6 rounded-[12px] bg-white border border-[#e2e8f0] shadow-[0px_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">CRAWL SCORE</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-[36px] font-bold text-[#0f172a] leading-none">{CRAWL_OVERVIEW.score}</span>
                  <span className="text-xs text-[#64748b]">/ 100</span>
                  <span className="ml-2 px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0] text-[10px] font-bold uppercase">
                    {CRAWL_OVERVIEW.scoreLabel}
                  </span>
                </div>
                <div className="text-xs text-[#64748b] mt-4 space-y-1">
                  <div>{CRAWL_OVERVIEW.pagesCrawled} pages crawled · avg {CRAWL_OVERVIEW.avgTime}</div>
                  <div>{CRAWL_OVERVIEW.redirects3xx} redirects (3xx) · {CRAWL_OVERVIEW.nonIndexable} non-indexable</div>
                </div>
              </div>
            </div>

            {/* Error counts (Monochrome Slate Containers) */}
            <div className="lg:col-span-2 p-6 rounded-[12px] bg-white border border-[#e2e8f0] shadow-[0px_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between">
              <div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="p-3.5 rounded-[10px] bg-[#f8fafc] border border-[#e2e8f0]">
                    <span className="text-[10px] font-bold text-[#64748b] uppercase">Errors</span>
                    <div className="text-2xl font-bold text-[#0f172a] mt-0.5">{CRAWL_OVERVIEW.errors}</div>
                  </div>
                  <div className="p-3.5 rounded-[10px] bg-[#f8fafc] border border-[#e2e8f0]">
                    <span className="text-[10px] font-bold text-[#64748b] uppercase">Warnings</span>
                    <div className="text-2xl font-bold text-[#0f172a] mt-0.5">{CRAWL_OVERVIEW.warnings}</div>
                  </div>
                  <div className="p-3.5 rounded-[10px] bg-[#f8fafc] border border-[#e2e8f0]">
                    <span className="text-[10px] font-bold text-[#64748b] uppercase">Notices</span>
                    <div className="text-2xl font-bold text-[#0f172a] mt-0.5">{CRAWL_OVERVIEW.notices}</div>
                  </div>
                </div>

                {/* HTTP Status Breakdown bar (Monochrome Slate Shades) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-[#64748b] font-medium">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#0f172a]" /> Healthy (2xx): 100</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#64748b]" /> Redirects (3xx): 226</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#94a3b8]" /> Broken (4xx/5xx): 151</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#cbd5e1]" /> Blocked: 1</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#f1f5f9] rounded-full overflow-hidden flex border border-[#e2e8f0]">
                    <div style={{ width: '21%' }} className="bg-[#0f172a] h-full" />
                    <div style={{ width: '47%' }} className="bg-[#64748b] h-full" />
                    <div style={{ width: '31%' }} className="bg-[#94a3b8] h-full" />
                    <div style={{ width: '1%' }} className="bg-[#cbd5e1] h-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 9 Issues Filter & Table */}
          <div className="bg-white border border-[#e2e8f0] rounded-[12px] overflow-hidden shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
            <div className="p-4 border-b border-[#e2e8f0] flex flex-wrap items-center justify-between gap-3 bg-white">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-xs font-bold text-[#0f172a] mr-2">FILTER ISSUES:</span>
                <button
                  onClick={() => setIssueFilter('ALL')}
                  className={`px-3 py-1 rounded-[8px] text-xs font-semibold transition-colors ${
                    issueFilter === 'ALL'
                      ? 'bg-[#0f172a] text-white'
                      : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
                  }`}
                >
                  All ({CRAWL_ISSUES.length})
                </button>
                <button
                  onClick={() => setIssueFilter('ERROR')}
                  className={`px-3 py-1 rounded-[8px] text-xs font-semibold transition-colors ${
                    issueFilter === 'ERROR'
                      ? 'bg-[#0f172a] text-white'
                      : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
                  }`}
                >
                  Errors (3)
                </button>
                <button
                  onClick={() => setIssueFilter('WARNING')}
                  className={`px-3 py-1 rounded-[8px] text-xs font-semibold transition-colors ${
                    issueFilter === 'WARNING'
                      ? 'bg-[#0f172a] text-white'
                      : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
                  }`}
                >
                  Warnings (2)
                </button>
                <button
                  onClick={() => setIssueFilter('NOTICE')}
                  className={`px-3 py-1 rounded-[8px] text-xs font-semibold transition-colors ${
                    issueFilter === 'NOTICE'
                      ? 'bg-[#0f172a] text-white'
                      : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
                  }`}
                >
                  Notices (4)
                </button>
              </div>

              <div className="text-xs text-[#0f172a] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0f172a]" />
                <span>14 checks passed</span>
              </div>
            </div>

            <div className="divide-y divide-[#e2e8f0]">
              {filteredIssues.map((issue, idx) => (
                <div
                  key={idx}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-[#f8fafc] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0]">
                      {issue.type}
                    </span>
                    <span className="text-xs font-bold text-[#0f172a]">{issue.title}</span>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-xs font-mono font-bold text-[#0f172a]">
                      {issue.count}{' '}
                      <span className="text-[11px] font-normal text-[#64748b]">
                        ({issue.percentage})
                      </span>
                    </span>

                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
                      {issue.actionTag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Crawl History 8 Weeks Table (PDF Page 3 & 4) */}
          <div className="bg-white border border-[#e2e8f0] rounded-[12px] overflow-hidden shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
            <div className="p-4 border-b border-[#e2e8f0] bg-[#f8fafc]">
              <h3 className="text-xs font-bold text-[#0f172a] uppercase tracking-wide">
                CRAWL HISTORY (8 WEEKS)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f8fafc] text-[#64748b] border-b border-[#e2e8f0] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Pages</th>
                    <th className="py-3 px-4 text-right">Broken (4xx)</th>
                    <th className="py-3 px-4 text-right">Non-Indexable</th>
                    <th className="py-3 px-4 text-right">Avg Response</th>
                    <th className="py-3 px-4 text-right">Health Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0] font-mono text-[#0f172a]">
                  {CRAWL_HISTORY.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#f8fafc] transition-colors">
                      <td className="py-3 px-4 font-semibold text-[#0f172a]">{row.date}</td>
                      <td className="py-3 px-4 text-right">{row.pages}</td>
                      <td className="py-3 px-4 text-right font-bold text-[#0f172a]">{row.broken}</td>
                      <td className="py-3 px-4 text-right">{row.nonIdx}</td>
                      <td className="py-3 px-4 text-right">{row.avgTime}</td>
                      <td className="py-3 px-4 text-right font-bold text-[#0f172a]">{row.health}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. CRAWLED URLS DATABASE (From PDF Page 4 & 5) */}
      {activeSubTab === 'crawl-urls' && (
        <div className="space-y-4">
          <div className="bg-white border border-[#e2e8f0] rounded-[12px] overflow-hidden shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
            <div className="p-4 border-b border-[#e2e8f0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                  <input
                    type="text"
                    value={urlSearch}
                    onChange={(e) => setUrlSearch(e.target.value)}
                    placeholder="Filter by URL or title…"
                    className="pl-8 pr-3 py-1.5 rounded-[8px] border border-[#e2e8f0] text-xs bg-white text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0f172a] w-64 font-medium"
                  />
                </div>

                <div className="w-40">
                  <Dropdown
                    value={urlStatusFilter}
                    onChange={(val) => setUrlStatusFilter(val)}
                    options={[
                      { label: 'All Statuses', value: 'ALL' },
                      { label: '200 OK', value: '200' },
                      { label: '301 Redirect', value: '301' },
                      { label: '404 Broken', value: '404' },
                    ]}
                  />
                </div>
              </div>

              <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] font-semibold text-xs transition-colors shadow-xs">
                <Download className="w-3.5 h-3.5 text-[#64748b]" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f8fafc] text-[#64748b] border-b border-[#e2e8f0] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">URL</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Indexability</th>
                    <th className="py-3 px-4 text-right">Title Len</th>
                    <th className="py-3 px-4 text-right">Meta Len</th>
                    <th className="py-3 px-4 text-right">Words</th>
                    <th className="py-3 px-4 text-right">Size</th>
                    <th className="py-3 px-4 text-right">Depth</th>
                    <th className="py-3 px-4 text-right">Inlinks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0] font-mono text-[#0f172a]">
                  {filteredUrls.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#f8fafc] transition-colors">
                      <td className="py-3 px-4 font-mono text-[#0f172a] font-medium max-w-xs truncate">
                        {row.url}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0]">
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#64748b] text-[11px]">
                        {row.indexability}
                      </td>
                      <td className="py-3 px-4 text-right">{row.titleLen}</td>
                      <td className="py-3 px-4 text-right">
                        <span>{row.metaLen}</span>
                      </td>
                      <td className="py-3 px-4 text-right">{row.words}</td>
                      <td className="py-3 px-4 text-right">{row.size}</td>
                      <td className="py-3 px-4 text-right">{row.depth}</td>
                      <td className="py-3 px-4 text-right font-bold text-[#0f172a]">{row.inlinks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 border-t border-[#e2e8f0] bg-[#f8fafc] text-xs text-[#64748b] flex items-center justify-between">
              <span>Showing {filteredUrls.length} of {CRAWLED_URLS.length} URLs</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. OFF-PAGE BACKLINKS AUDIT (From PDF Page 5-6) */}
      {activeSubTab === 'backlinks' && (
        <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-10 text-center shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
          <div className="w-16 h-16 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] flex items-center justify-center mx-auto mb-4 shadow-xs">
            <Link2 className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-[#0f172a]">BACKLINKS AUDIT</h3>
          <p className="text-sm text-[#64748b] mt-1 max-w-md mx-auto">
            Backlinks export — source URL, target, anchor, domain rating.
          </p>

          <div className="mt-8 border-2 border-dashed border-[#e2e8f0] hover:border-[#0f172a] rounded-[12px] p-8 max-w-lg mx-auto bg-[#f8fafc] transition-colors cursor-pointer">
            <Upload className="w-7 h-7 text-[#94a3b8] mx-auto mb-2" />
            <div className="text-xs font-bold text-[#0f172a]">
              Drop an Ahrefs / SEMrush backlinks CSV, or click to browse
            </div>
            <div className="text-xs text-[#64748b] mt-0.5">
              Ahrefs Site Explorer → Backlinks → Export (.csv)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
