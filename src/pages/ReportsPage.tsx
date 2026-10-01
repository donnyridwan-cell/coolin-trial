import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import {
  ArrowLeft,
  Plus,
  Copy,
  Trash2,
  SlidersHorizontal,
  Mail,
  Printer,
  Download,
  ChevronRight,
  Trophy,
  Gauge,
  FileWarning,
  MousePointerClick,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MinusCircle,
  Check,
  X,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Report data — numbers frozen at creation (from the SEO audit PDF)   */
/* ------------------------------------------------------------------ */

type Status = 'Strong' | 'Needs Work' | 'Weak' | 'No data';

const REPORT = {
  client: 'Acme Legal Group',
  url: 'https://www.acmelegal.example.com/',
  eyebrow: 'SEO & Local Search Audit',
  scope: 'Technical · Search · On-page · Local',
  period: 'Jul 1, 2026 – Jul 31, 2026',
  overall: 5.5,
  createdBy: 'Admin LMS',
  createdAt: 'Aug 18, 2026',
  pdfGenerated: 'Sep 28, 2026',
  technical: {
    score: 4,
    measures: [
      { measure: 'Mobile Performance', result: '62/100', status: 'Needs Work' as Status },
      { measure: 'Largest Contentful Paint (Mobile)', result: '7.7s', status: 'Weak' as Status },
      { measure: 'Cumulative Layout Shift (Mobile)', result: '0.001', status: 'Strong' as Status },
      { measure: 'Avg. Server Response Time', result: '2096ms', status: 'Weak' as Status },
    ],
    issues: [
      { issue: 'Broken External Links', opportunity: '27 found', status: 'Needs Work' as Status },
      { issue: 'Schema.org Warnings', opportunity: '32 pages with warnings', status: 'Needs Work' as Status },
      { issue: 'Crawlability', opportunity: '647 of 647 pages successfully crawled', status: 'Strong' as Status },
    ],
  },
  highlights: [
    { icon: Trophy, value: '#1', label: 'Position for 40+ Local Keywords' },
    { icon: Gauge, value: '7.7s', label: 'Mobile Page Load (LCP)' },
    { icon: FileWarning, value: '84', label: 'Pages With Duplicate Titles' },
    { icon: MousePointerClick, value: '+22%', label: 'Search Clicks (MoM)' },
  ],
  narrative:
    'Acme Legal Group shows exceptional strength in local search, ranking #1 in the map pack for over 40 high-value keywords in its service areas. This is driving visibility, but the website itself has significant technical weaknesses that are holding back performance. Severe site speed issues, with a mobile page load (LCP) of 7.7 seconds, create a poor user experience and risk damaging search rankings. Widespread, systematic on-page issues like duplicate and overly long titles across hundreds of pages need to be addressed through template fixes. A critical gap is the lack of connected Google Business Profile data; optimizing the GBP profiles is essential to capitalize on the existing map pack dominance and convert that visibility into clients.',
  breakdown: [
    { num: '01', title: 'Technical & Speed', verdict: 'Weak' as const, score: '4/10', desc: 'Site speed, stability and core web vitals' },
    { num: '02', title: 'Search Performance', verdict: 'Strong' as const, score: '8.5/10', desc: 'Traffic, keywords and authority' },
    { num: '03', title: 'On-Page & Local Signals', verdict: 'Needs Work' as const, score: '6.5/10', desc: 'Homepage signals Google relies on' },
    { num: '04', title: 'Local SEO', verdict: 'Weak' as const, score: '3/10', desc: 'Google Business Profile & map pack' },
  ],
  commentary: 'Priority this period is fixing server response time and claiming the Google Business Profile — the two changes that unlock the most value fastest.',
  search: {
    score: 8.5,
    measures: [
      { measure: 'Organic Clicks (28d)', result: '79', status: 'Strong' as Status },
      { measure: 'Organic Impressions (28d)', result: '141k', status: 'Needs Work' as Status },
      { measure: 'Average Position', result: '32.3', status: 'Weak' as Status },
      { measure: 'Authority & Backlinks', result: 'No backlink data connected', status: 'No data' as Status },
    ],
    note: 'The dates these figures cover were not recorded — this audit ran before the window was captured, so they describe roughly the four weeks before it ran, not necessarily the period on the cover.',
    traffic: { branded: 1, nonBranded: 99 },
    keywords: [
      { keyword: 'riverton personal injury lawyer', position: 1, type: 'Local pack' },
      { keyword: 'lakeside car accident lawyers', position: 1, type: 'Local pack' },
      { keyword: 'motorcycle accident lawyer lakeside', position: 1, type: 'Local pack' },
      { keyword: 'westbrook car accident attorney', position: 1, type: 'Local pack' },
      { keyword: 'acme legal group', position: 1, type: 'Local pack' },
      { keyword: 'personal injury lawyer westbrook', position: 1, type: 'Local pack' },
    ],
  },
  onpage: {
    score: 6.5,
    signals: [
      { signal: 'Meta Titles', finding: '569 pages have titles over 60 chars; 84 are duplicates', status: 'Weak' as Status },
      { signal: 'Meta Descriptions', finding: '84 pages have duplicate descriptions', status: 'Needs Work' as Status },
      { signal: 'Headings', finding: '85 pages have duplicate H1s', status: 'Weak' as Status },
      { signal: 'Content Word Count', finding: '88 pages have low content (<200 words)', status: 'Needs Work' as Status },
      { signal: 'Indexability', finding: '99.8% of pages are indexable', status: 'Strong' as Status },
    ],
    brightSpot:
      'Core practice area and location pages feature in-depth content, with several exceeding 1,000–2,000 words, providing substantial value to users and search engines.',
  },
  local: {
    score: 3,
    signals: [
      { signal: 'Google Business Profile', finding: 'No Google Business Profile data connected', status: 'No data' as Status },
      { signal: 'Local Reviews', finding: 'No review or rating data connected', status: 'No data' as Status },
      { signal: 'Local Pack Keywords', finding: 'Ranks #1 for 40+ local service keywords', status: 'Strong' as Status },
    ],
    mapPack: 'No map-pack competitors were identified for this location.',
    gateway:
      'The firm has exceptional visibility in the local map pack for its key service areas like Riverton, Lakeside, and Westbrook, serving as the primary gateway for local client acquisition.',
  },
  priorityFixes: [
    {
      priority: 'High' as const,
      opportunity: 'Severe site speed issues (7.7s mobile LCP, 2.1s server response) are harming user experience and creating ranking risk.',
      action: 'Initiate a full technical performance audit. Focus on reducing server response time (TTFB), optimizing images, and deferring non-critical CSS and JavaScript.',
    },
    {
      priority: 'High' as const,
      opportunity: 'The site has dominant local pack rankings but no connected Google Business Profile data, leaving a major gap in converting visibility to leads.',
      action: 'Claim, connect, and fully optimize Google Business Profile listings for all office locations. Implement a strategy to consistently generate new client reviews.',
    },
    {
      priority: 'Medium' as const,
      opportunity: 'Systematic crawl issues show 84 duplicate titles/H1s and 569 long titles, primarily on paginated blog and library sections.',
      action: "Revise website templates for archive pages to generate unique, concise titles (e.g., 'Topic - Page 2 | Brand'). Ensure all primary page titles are under 60 characters.",
    },
    {
      priority: 'Medium' as const,
      opportunity: 'Bridge the gap between strong local map rankings and the on-page user experience to improve conversion rates.',
      action: 'Audit top local landing pages (Riverton, Lakeside, Westbrook) to ensure they feature local addresses, embedded maps, location-specific testimonials, and clear calls-to-action.',
    },
    {
      priority: 'Low' as const,
      opportunity: "Organic search performance is weak (avg. position 32), but GSC shows impressions for informational queries the site isn't fully capturing.",
      action: "Identify informational keywords with existing impressions (e.g., 'speeding ticket penalties') and create dedicated, in-depth blog posts or FAQ pages to capture this top-of-funnel traffic.",
    },
  ],
  work: {
    summary: '7 tasks in progress this period; none signed off yet.',
    tasks: [
      { lane: 'Technical', task: '[Audit] Duplicate title', status: 'Unassigned', date: '—' },
      { lane: 'Technical', task: '[Audit] Duplicate meta description', status: 'Unassigned', date: '—' },
      { lane: 'Technical', task: '[Audit] Low-content pages (under 200 words)', status: 'Unassigned', date: '—' },
      { lane: 'Technical', task: '[Audit] Non-indexable pages', status: 'Unassigned', date: '—' },
      { lane: 'Technical', task: '[Audit] Noindex directive', status: 'Unassigned', date: '—' },
      { lane: 'Technical', task: '[Audit] Missing meta description', status: 'Unassigned', date: '—' },
      { lane: 'Technical', task: '[Audit] Duplicate H1', status: 'Unassigned', date: '—' },
    ],
    footnote:
      'Completed work covers Jul 1, 2026 – Jul 31, 2026, dated by when it was signed off. Open work is shown in full, whenever it was raised.',
  },
};

// List of reports produced for this client (opens the detail view above).
export interface ReportSummary {
  id: string;
  name: string;
  period: string;
  author: string;
  created: string;
}

export const INITIAL_REPORTS: ReportSummary[] = [
  { id: 'r1', name: 'July 2026', period: 'Jul 1, 2026 – Jul 31, 2026', author: 'Admin LMS', created: 'Aug 18, 2026' },
  { id: 'r2', name: 'June 2026', period: 'Jun 1, 2026 – Jun 30, 2026', author: 'Admin LMS', created: 'Jul 14, 2026' },
  { id: 'r3', name: 'Q2 2026 Summary', period: 'Apr 1, 2026 – Jun 30, 2026', author: 'Admin LMS', created: 'Jul 8, 2026' },
];

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

const statusStyle: Record<Status, string> = {
  Strong: 'bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]',
  'Needs Work': 'bg-[#fffbeb] text-[#d97706] border border-[#fde68a]',
  Weak: 'bg-[#fef2f2] text-[#dc2626] border border-[#fecaca]',
  'No data': 'bg-[#f1f5f9] text-[#64748b] border border-[#e2e8f0]',
};

const StatusIcon: Record<Status, React.ComponentType<{ className?: string }>> = {
  Strong: CheckCircle2,
  'Needs Work': AlertTriangle,
  Weak: XCircle,
  'No data': MinusCircle,
};

const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const Icon = StatusIcon[status];
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${statusStyle[status]}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
};

const verdictStyle: Record<string, string> = {
  Strong: 'text-[#16a34a]',
  'Needs Work': 'text-[#d97706]',
  Weak: 'text-[#dc2626]',
};

const priorityStyle: Record<string, string> = {
  High: 'bg-[#fef2f2] text-[#dc2626] border border-[#fecaca]',
  Medium: 'bg-[#fffbeb] text-[#d97706] border border-[#fde68a]',
  Low: 'bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]',
};

const SectionHeading: React.FC<{ num: string; title: string; score?: number }> = ({ num, title, score }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-mono font-bold text-[#94a3b8]">{num}</span>
      <h2 className="text-base font-bold text-[#0f172a] tracking-tight">{title}</h2>
    </div>
    {score !== undefined && (
      <span className="text-sm font-bold text-[#0f172a] tabular-nums">
        {score}<span className="text-[#94a3b8] font-semibold">/10</span>
      </span>
    )}
  </div>
);

const DataTable: React.FC<{ headers: string[]; children: React.ReactNode }> = ({ headers, children }) => (
  <div className="overflow-x-auto -mx-1">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-[#e2e8f0]">
          {headers.map((h, i) => (
            <th
              key={h}
              className={`py-2 px-1 text-[10px] font-bold tracking-wider text-[#94a3b8] uppercase ${
                i === headers.length - 1 ? 'text-right' : 'text-left'
              }`}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);

const Panel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white border border-[#e2e8f0] rounded-[14px] shadow-[0px_1px_3px_rgba(0,0,0,0.04)] p-5 sm:p-6 space-y-5">
    {children}
  </div>
);

/* ------------------------------------------------------------------ */
/* Section bodies (one per tab)                                        */
/* ------------------------------------------------------------------ */

const TechnicalBody = () => (
  <Panel>
    <SectionHeading num="01" title="Technical & Speed" score={REPORT.technical.score} />
    <DataTable headers={['Measure', 'Result', 'Status']}>
      {REPORT.technical.measures.map((m) => (
        <tr key={m.measure} className="border-b border-[#f1f5f9] last:border-0">
          <td className="py-2.5 px-1 font-medium text-[#0f172a]">{m.measure}</td>
          <td className="py-2.5 px-1 text-[#475569] tabular-nums">{m.result}</td>
          <td className="py-2.5 px-1 text-right"><StatusBadge status={m.status} /></td>
        </tr>
      ))}
    </DataTable>
    <div>
      <div className="text-[10px] font-bold tracking-wider uppercase text-[#94a3b8] mb-2">Issues & opportunities</div>
      <DataTable headers={['Issue', 'Opportunity', 'Status']}>
        {REPORT.technical.issues.map((i) => (
          <tr key={i.issue} className="border-b border-[#f1f5f9] last:border-0">
            <td className="py-2.5 px-1 font-medium text-[#0f172a]">{i.issue}</td>
            <td className="py-2.5 px-1 text-[#475569]">{i.opportunity}</td>
            <td className="py-2.5 px-1 text-right"><StatusBadge status={i.status} /></td>
          </tr>
        ))}
      </DataTable>
    </div>
  </Panel>
);

const SummaryBody = () => (
  <Panel>
    <SectionHeading num="02" title="Performance summary" />
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {REPORT.highlights.map((h) => {
        const Icon = h.icon;
        return (
          <div key={h.label} className="rounded-[12px] border border-[#e2e8f0] bg-[#f8fafc] p-4">
            <Icon className="w-4 h-4 text-[#94a3b8] mb-2" />
            <div className="text-2xl font-bold text-[#0f172a] tracking-tight leading-none mb-1.5">{h.value}</div>
            <div className="text-[11px] text-[#64748b] leading-snug">{h.label}</div>
          </div>
        );
      })}
    </div>
    <p className="text-sm text-[#475569] leading-relaxed">{REPORT.narrative}</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {REPORT.breakdown.map((b) => (
        <div key={b.num} className="flex items-center justify-between rounded-[12px] border border-[#e2e8f0] p-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-[#94a3b8]">{b.num}</span>
              <span className="text-sm font-semibold text-[#0f172a] truncate">{b.title}</span>
            </div>
            <div className="text-[11px] text-[#64748b] mt-0.5">{b.desc}</div>
          </div>
          <div className="text-right shrink-0 ml-3">
            <div className={`text-[10px] font-bold uppercase tracking-wider ${verdictStyle[b.verdict]}`}>{b.verdict}</div>
            <div className="text-sm font-bold text-[#0f172a] tabular-nums">{b.score}</div>
          </div>
        </div>
      ))}
    </div>
    <div className="rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0] p-4">
      <div className="text-[10px] font-bold tracking-wider uppercase text-[#94a3b8] mb-1.5">Our commentary</div>
      <p className="text-sm text-[#475569] leading-relaxed">{REPORT.commentary}</p>
    </div>
  </Panel>
);

const SearchBody = () => (
  <Panel>
    <SectionHeading num="03" title="Search Performance" score={REPORT.search.score} />
    <DataTable headers={['Measure', 'Result', 'Status']}>
      {REPORT.search.measures.map((m) => (
        <tr key={m.measure} className="border-b border-[#f1f5f9] last:border-0">
          <td className="py-2.5 px-1 font-medium text-[#0f172a]">{m.measure}</td>
          <td className="py-2.5 px-1 text-[#475569] tabular-nums">{m.result}</td>
          <td className="py-2.5 px-1 text-right"><StatusBadge status={m.status} /></td>
        </tr>
      ))}
    </DataTable>
    <p className="text-xs text-[#94a3b8] italic leading-relaxed">{REPORT.search.note}</p>
    <div>
      <div className="text-[10px] font-bold tracking-wider uppercase text-[#94a3b8] mb-2">Where the traffic comes from</div>
      <div className="flex h-3 rounded-full overflow-hidden border border-[#e2e8f0]">
        <div className="bg-[#0f172a]" style={{ width: `${REPORT.search.traffic.branded}%` }} />
        <div className="bg-[#cbd5e1]" style={{ width: `${REPORT.search.traffic.nonBranded}%` }} />
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs text-[#475569]">
        <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0f172a]" /> Branded {REPORT.search.traffic.branded}%</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#cbd5e1]" /> Non-branded {REPORT.search.traffic.nonBranded}% — visits from generic searches</span>
      </div>
    </div>
    <div>
      <div className="text-[10px] font-bold tracking-wider uppercase text-[#94a3b8] mb-2">Top ranking keywords</div>
      <DataTable headers={['Keyword', 'Position', 'Type']}>
        {REPORT.search.keywords.map((k) => (
          <tr key={k.keyword} className="border-b border-[#f1f5f9] last:border-0">
            <td className="py-2.5 px-1 font-medium text-[#0f172a]">{k.keyword}</td>
            <td className="py-2.5 px-1 text-[#475569] tabular-nums">{k.position}</td>
            <td className="py-2.5 px-1 text-right">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">{k.type}</span>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  </Panel>
);

const OnPageBody = () => (
  <Panel>
    <SectionHeading num="04" title="On-Page & Local Signals" score={REPORT.onpage.score} />
    <DataTable headers={['Signal', 'Finding', 'Status']}>
      {REPORT.onpage.signals.map((s) => (
        <tr key={s.signal} className="border-b border-[#f1f5f9] last:border-0">
          <td className="py-2.5 px-1 font-medium text-[#0f172a] whitespace-nowrap">{s.signal}</td>
          <td className="py-2.5 px-1 text-[#475569]">{s.finding}</td>
          <td className="py-2.5 px-1 text-right"><StatusBadge status={s.status} /></td>
        </tr>
      ))}
    </DataTable>
    <div className="rounded-[12px] bg-[#f0fdf4] border border-[#bbf7d0] p-4">
      <div className="text-[10px] font-bold tracking-wider uppercase text-[#16a34a] mb-1.5">The bright spot</div>
      <p className="text-sm text-[#166534] leading-relaxed">{REPORT.onpage.brightSpot}</p>
    </div>
  </Panel>
);

const LocalBody = () => (
  <Panel>
    <SectionHeading num="05" title="Local SEO" score={REPORT.local.score} />
    <DataTable headers={['Signal', 'Finding', 'Status']}>
      {REPORT.local.signals.map((s) => (
        <tr key={s.signal} className="border-b border-[#f1f5f9] last:border-0">
          <td className="py-2.5 px-1 font-medium text-[#0f172a] whitespace-nowrap">{s.signal}</td>
          <td className="py-2.5 px-1 text-[#475569]">{s.finding}</td>
          <td className="py-2.5 px-1 text-right"><StatusBadge status={s.status} /></td>
        </tr>
      ))}
    </DataTable>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0] p-4">
        <div className="text-[10px] font-bold tracking-wider uppercase text-[#94a3b8] mb-1.5">Who holds the local map pack today</div>
        <p className="text-sm text-[#475569] leading-relaxed">{REPORT.local.mapPack}</p>
      </div>
      <div className="rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0] p-4">
        <div className="text-[10px] font-bold tracking-wider uppercase text-[#94a3b8] mb-1.5">The gateway</div>
        <p className="text-sm text-[#475569] leading-relaxed">{REPORT.local.gateway}</p>
      </div>
    </div>
  </Panel>
);

const PriorityBody = () => (
  <Panel>
    <SectionHeading num="06" title="Priority Fixes" />
    <div className="space-y-3">
      {REPORT.priorityFixes.map((p, idx) => (
        <div key={idx} className="rounded-[12px] border border-[#e2e8f0] p-4">
          <div className="flex items-start gap-3">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${priorityStyle[p.priority]}`}>
              {p.priority}
            </span>
            <div className="min-w-0 space-y-2">
              <p className="text-sm font-semibold text-[#0f172a] leading-snug">{p.opportunity}</p>
              <div className="flex items-start gap-1.5 text-sm text-[#475569] leading-relaxed">
                <ChevronRight className="w-4 h-4 text-[#94a3b8] shrink-0 mt-0.5" />
                <span>{p.action}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Panel>
);

const WorkBody = () => (
  <Panel>
    <SectionHeading num="07" title="Work this period" />
    <p className="text-sm text-[#475569]">{REPORT.work.summary}</p>
    <div>
      <div className="text-[10px] font-bold tracking-wider uppercase text-[#94a3b8] mb-2">
        Open, and next ({REPORT.work.tasks.length})
      </div>
      <DataTable headers={['Lane', 'Task', 'Status', 'Date']}>
        {REPORT.work.tasks.map((t, idx) => (
          <tr key={idx} className="border-b border-[#f1f5f9] last:border-0">
            <td className="py-2.5 px-1">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">{t.lane}</span>
            </td>
            <td className="py-2.5 px-1 font-medium text-[#0f172a]">{t.task}</td>
            <td className="py-2.5 px-1 text-[#64748b]">{t.status}</td>
            <td className="py-2.5 px-1 text-right text-[#94a3b8]">{t.date}</td>
          </tr>
        ))}
      </DataTable>
    </div>
    <p className="text-xs text-[#94a3b8] italic leading-relaxed">{REPORT.work.footnote}</p>
  </Panel>
);

/* ------------------------------------------------------------------ */
/* Report detail (tabbed — one section at a time, minimal scrolling)   */
/* ------------------------------------------------------------------ */

const TABS = [
  { id: 'summary', label: 'Summary', badge: null as string | null, body: SummaryBody },
  { id: 'technical', label: 'Technical & Speed', badge: '4/10', body: TechnicalBody },
  { id: 'search', label: 'Search', badge: '8.5/10', body: SearchBody },
  { id: 'onpage', label: 'On-Page & Local', badge: '6.5/10', body: OnPageBody },
  { id: 'local', label: 'Local SEO', badge: '3/10', body: LocalBody },
  { id: 'priority', label: 'Priority Fixes', badge: null, body: PriorityBody },
  { id: 'work', label: 'Work', badge: null, body: WorkBody },
];

/* Build a real, text-based PDF of the report (only the sections passed in). */
function downloadReportPdf(includeIds: string[]) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const M = 42;
  const maxW = pageW - M * 2;
  let y = M;

  const ensure = (need = 16) => {
    if (y + need > pageH - M) {
      doc.addPage();
      y = M;
    }
  };
  const setFont = (size: number, style = 'normal', rgb: [number, number, number] = [15, 23, 42]) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', style);
    doc.setTextColor(rgb[0], rgb[1], rgb[2]);
  };
  const line = (s: string, size = 10, style = 'normal', rgb: [number, number, number] = [15, 23, 42], gap = 15) => {
    setFont(size, style, rgb);
    doc.splitTextToSize(s, maxW).forEach((ln: string) => {
      ensure(gap);
      doc.text(ln, M, y);
      y += gap;
    });
  };
  const row = (left: string, right: string) => {
    ensure(16);
    setFont(10, 'normal', [71, 85, 105]);
    const rightW = doc.getTextWidth(right);
    doc.splitTextToSize(left, maxW - rightW - 12).forEach((ln: string, i: number) => {
      ensure(15);
      if (i === 0) {
        setFont(10, 'bold', [15, 23, 42]);
        doc.text(ln, M, y);
      } else {
        setFont(10, 'normal', [71, 85, 105]);
        doc.text(ln, M, y);
      }
      y += 15;
    });
    setFont(9, 'normal', [100, 116, 139]);
    doc.text(right, pageW - M, y - 15, { align: 'right' });
  };
  const heading = (num: string, title: string, score?: number) => {
    y += 8;
    ensure(22);
    setFont(12, 'bold', [15, 23, 42]);
    doc.text(`${num}  ${title}`, M, y);
    if (score !== undefined) {
      setFont(12, 'bold', [15, 23, 42]);
      doc.text(`${score}/10`, pageW - M, y, { align: 'right' });
    }
    y += 8;
    doc.setDrawColor(226, 232, 240);
    doc.line(M, y, pageW - M, y);
    y += 14;
  };

  // Header band
  setFont(9, 'bold', [100, 116, 139]);
  doc.text(REPORT.eyebrow.toUpperCase(), M, y);
  doc.setFontSize(22);
  setFont(22, 'bold', [15, 23, 42]);
  doc.text(`${REPORT.overall} / 10`, pageW - M, y + 2, { align: 'right' });
  y += 24;
  line(REPORT.client, 20, 'bold', [15, 23, 42], 24);
  line(REPORT.url, 9, 'normal', [100, 116, 139], 14);
  y += 2;
  line(`Scope: ${REPORT.scope}`, 9, 'normal', [71, 85, 105], 13);
  line(`Period: ${REPORT.period}`, 9, 'normal', [71, 85, 105], 13);
  line(
    `Created ${REPORT.createdAt} by ${REPORT.createdBy} · numbers frozen at creation · PDF generated ${REPORT.pdfGenerated}`,
    8,
    'normal',
    [148, 163, 184],
    13
  );
  y += 4;

  const has = (id: string) => includeIds.includes(id);

  if (has('summary')) {
    heading('02', 'Performance summary');
    REPORT.highlights.forEach((h) => row(h.label, h.value));
    y += 4;
    line(REPORT.narrative, 10, 'normal', [71, 85, 105], 14);
    y += 4;
    REPORT.breakdown.forEach((b) => row(`${b.num}  ${b.title} — ${b.desc}`, `${b.verdict} ${b.score}`));
    y += 4;
    line('Our commentary', 8, 'bold', [148, 163, 184], 13);
    line(REPORT.commentary, 10, 'normal', [71, 85, 105], 14);
  }
  if (has('technical')) {
    heading('01', 'Technical & Speed', REPORT.technical.score);
    REPORT.technical.measures.forEach((m) => row(m.measure, `${m.result}  ·  ${m.status}`));
    y += 4;
    line('Issues & opportunities', 8, 'bold', [148, 163, 184], 13);
    REPORT.technical.issues.forEach((i) => row(i.issue, `${i.opportunity}  ·  ${i.status}`));
  }
  if (has('search')) {
    heading('03', 'Search Performance', REPORT.search.score);
    REPORT.search.measures.forEach((m) => row(m.measure, `${m.result}  ·  ${m.status}`));
    y += 4;
    line(REPORT.search.note, 8, 'italic', [148, 163, 184], 12);
    y += 2;
    row('Branded', `${REPORT.search.traffic.branded}%`);
    row('Non-branded', `${REPORT.search.traffic.nonBranded}%`);
    y += 4;
    line('Top ranking keywords', 8, 'bold', [148, 163, 184], 13);
    REPORT.search.keywords.forEach((k) => row(k.keyword, `#${k.position}  ·  ${k.type}`));
  }
  if (has('onpage')) {
    heading('04', 'On-Page & Local Signals', REPORT.onpage.score);
    REPORT.onpage.signals.forEach((s) => row(s.signal, `${s.finding}  ·  ${s.status}`));
    y += 4;
    line('The bright spot', 8, 'bold', [22, 163, 74], 13);
    line(REPORT.onpage.brightSpot, 10, 'normal', [71, 85, 105], 14);
  }
  if (has('local')) {
    heading('05', 'Local SEO', REPORT.local.score);
    REPORT.local.signals.forEach((s) => row(s.signal, `${s.finding}  ·  ${s.status}`));
    y += 4;
    line('Who holds the local map pack today', 8, 'bold', [148, 163, 184], 13);
    line(REPORT.local.mapPack, 10, 'normal', [71, 85, 105], 14);
    line('The gateway', 8, 'bold', [148, 163, 184], 13);
    line(REPORT.local.gateway, 10, 'normal', [71, 85, 105], 14);
  }
  if (has('priority')) {
    heading('06', 'Priority Fixes');
    REPORT.priorityFixes.forEach((p) => {
      line(`[${p.priority}] ${p.opportunity}`, 10, 'bold', [15, 23, 42], 14);
      line(`→ ${p.action}`, 10, 'normal', [71, 85, 105], 14);
      y += 4;
    });
  }
  if (has('work')) {
    heading('07', 'Work this period');
    line(REPORT.work.summary, 10, 'normal', [71, 85, 105], 14);
    y += 2;
    REPORT.work.tasks.forEach((t) => row(`${t.lane} · ${t.task}`, `${t.status}  ·  ${t.date}`));
    y += 4;
    line(REPORT.work.footnote, 8, 'italic', [148, 163, 184], 12);
  }

  doc.save(`${REPORT.client} - SEO report (${REPORT.period}).pdf`);
}

/* Open the user's mail app with a pre-filled draft summarising the report. */
function draftReportEmail() {
  const subject = `${REPORT.client} — ${REPORT.eyebrow} (${REPORT.period})`;
  const body = [
    `Hi,`,
    ``,
    `Please find the ${REPORT.eyebrow.toLowerCase()} for ${REPORT.client}, covering ${REPORT.period}.`,
    ``,
    `Overall score: ${REPORT.overall}/10`,
    `• Technical & Speed: ${REPORT.technical.score}/10`,
    `• Search Performance: ${REPORT.search.score}/10`,
    `• On-Page & Local Signals: ${REPORT.onpage.score}/10`,
    `• Local SEO: ${REPORT.local.score}/10`,
    ``,
    `Top priority this period: ${REPORT.priorityFixes[0].opportunity}`,
    ``,
    `Report URL: ${REPORT.url}`,
    ``,
    `Best regards,`,
  ].join('\n');
  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const ReportDetail: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [showCustomise, setShowCustomise] = useState(false);

  const visibleTabs = TABS.filter((t) => !hidden.has(t.id));

  // Keep the active tab valid when sections are hidden.
  useEffect(() => {
    if (hidden.has(activeTab) && visibleTabs.length > 0) {
      setActiveTab(visibleTabs[0].id);
    }
  }, [hidden, activeTab, visibleTabs]);

  const toggleSection = (id: string) => {
    setHidden((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toolbarBtn =
    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-xs font-medium text-[#475569] hover:text-[#0f172a] transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.02)]';

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Toolbar */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#64748b] hover:text-[#0f172a] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Reports
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowCustomise((v) => !v)}
            className={`${toolbarBtn} ${showCustomise ? 'bg-[#f1f5f9] text-[#0f172a] border-[#cbd5e1]' : ''}`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#94a3b8]" />
            Customise
          </button>
          <button onClick={draftReportEmail} className={toolbarBtn}>
            <Mail className="w-3.5 h-3.5 text-[#94a3b8]" />
            Draft in email
          </button>
          <button onClick={() => window.print()} className={toolbarBtn}>
            <Printer className="w-3.5 h-3.5 text-[#94a3b8]" />
            Print as PDF
          </button>
          <button
            onClick={() => downloadReportPdf(visibleTabs.map((t) => t.id))}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Customise panel */}
      {showCustomise && (
        <div className="no-print rounded-[12px] border border-[#e2e8f0] bg-white p-4 shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-semibold text-[#0f172a]">Customise report</div>
              <div className="text-xs text-[#64748b] mt-0.5">Choose which sections appear in the report, print and PDF.</div>
            </div>
            <button
              onClick={() => setShowCustomise(false)}
              className="p-1.5 rounded-[6px] text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {TABS.map((t) => {
              const on = !hidden.has(t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => toggleSection(t.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-[8px] border text-xs font-medium text-left transition-colors ${
                    on
                      ? 'border-[#cbd5e1] bg-[#f8fafc] text-[#0f172a]'
                      : 'border-[#e2e8f0] bg-white text-[#94a3b8]'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-[5px] border flex items-center justify-center shrink-0 ${
                      on ? 'bg-[#0f172a] border-[#0f172a]' : 'border-[#cbd5e1]'
                    }`}
                  >
                    {on && <Check className="w-3 h-3 text-white" />}
                  </span>
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Cover banner — compact, with inline meta */}
      <div className="rounded-[16px] bg-[#0f172a] text-white p-6 shadow-[0px_4px_16px_rgba(15,23,42,0.18)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#94a3b8] mb-2">{REPORT.eyebrow}</div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">{REPORT.client}</h1>
            <a href={REPORT.url} className="text-sm text-[#cbd5e1] hover:text-white font-mono break-all">{REPORT.url}</a>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-4 text-xs text-[#cbd5e1]">
              <span><span className="text-[#64748b]">Scope:</span> {REPORT.scope}</span>
              <span><span className="text-[#64748b]">Period:</span> {REPORT.period}</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[10px] font-bold tracking-wider uppercase text-[#94a3b8] mb-1">Overall</div>
            <div className="text-4xl font-bold tracking-tight leading-none">
              {REPORT.overall}<span className="text-xl text-[#94a3b8] font-semibold"> / 10</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-[#64748b]">
          Created {REPORT.createdAt} by {REPORT.createdBy} · numbers frozen at creation · PDF generated {REPORT.pdfGenerated}
        </div>
      </div>

      {/* Tab bar */}
      <div className="no-print sticky top-16 z-10 -mx-1 px-1 py-1 bg-[#f8fafc]/90 backdrop-blur-sm">
        <div className="flex items-center gap-1 overflow-x-auto rounded-[10px] border border-[#e2e8f0] bg-white p-1 shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
          {visibleTabs.map((t) => {
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-[8px] text-xs font-medium transition-all ${
                  active ? 'bg-[#0f172a] text-white font-semibold' : 'text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9]'
                }`}
              >
                {t.label}
                {t.badge && (
                  <span className={`text-[10px] font-semibold tabular-nums ${active ? 'text-[#cbd5e1]' : 'text-[#94a3b8]'}`}>
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sections — on screen only the active one shows; on print all visible ones show */}
      {TABS.map((t) => {
        if (hidden.has(t.id)) return null;
        const Body = t.body;
        const isActive = activeTab === t.id;
        return (
          <div key={t.id} className={`${isActive ? 'block' : 'hidden'} print:block print:mb-5`}>
            <Body />
          </div>
        );
      })}

      <div className="text-center text-xs text-[#94a3b8] py-2">
        {REPORT.client} · SEO &amp; Local Search Audit
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Reports list (default view)                                         */
/* ------------------------------------------------------------------ */

const formatToday = () =>
  new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

interface ReportsListProps {
  reports: ReportSummary[];
  onOpen: (id: string) => void;
  onCreate: (name: string, period: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

const ReportsList: React.FC<ReportsListProps> = ({ reports, onOpen, onCreate, onDuplicate, onDelete }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [period, setPeriod] = useState('');

  const openCreate = () => {
    const now = new Date();
    setName(now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
    setPeriod('');
    setShowCreate(true);
  };

  const submitCreate = () => {
    if (!name.trim()) return;
    onCreate(name.trim(), period.trim() || 'Period not set');
    setShowCreate(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
        <div>
          <h1 className="text-xl font-bold text-[#0f172a] tracking-tight">Reports</h1>
          <p className="text-sm text-[#64748b] mt-0.5">
            {reports.length} {reports.length === 1 ? 'report' : 'reports'} produced for this client
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-[#0f172a] hover:bg-[#1e293b] text-white text-sm font-semibold transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          Create new report
        </button>
      </div>

      {reports.length === 0 ? (
        <div className="bg-white border border-dashed border-[#cbd5e1] rounded-[14px] p-10 text-center">
          <div className="text-sm font-semibold text-[#0f172a]">No reports yet</div>
          <div className="text-xs text-[#64748b] mt-1 mb-4">Create your first report for this client.</div>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-[#0f172a] hover:bg-[#1e293b] text-white text-sm font-semibold transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Create new report
          </button>
        </div>
      ) : (
        <div className="bg-white border border-[#e2e8f0] rounded-[14px] shadow-[0px_1px_3px_rgba(0,0,0,0.04)] divide-y divide-[#f1f5f9] overflow-hidden">
          {reports.map((r) => (
            <div
              key={r.id}
              onClick={() => onOpen(r.id)}
              className="group flex items-center justify-between gap-3 px-5 py-4 cursor-pointer hover:bg-[#f8fafc] transition-colors"
            >
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[#0f172a]">{r.name}</div>
                <div className="text-xs text-[#64748b] mt-0.5">
                  {r.period} · {r.author} · {r.created}
                </div>
              </div>

              {confirmId === r.id ? (
                <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <span className="text-xs text-[#64748b]">Delete?</span>
                  <button
                    onClick={() => {
                      onDelete(r.id);
                      setConfirmId(null);
                    }}
                    className="px-2.5 py-1 rounded-[6px] bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-semibold transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setConfirmId(null)}
                    className="px-2.5 py-1 rounded-[6px] bg-white border border-[#e2e8f0] text-[#475569] hover:text-[#0f172a] text-xs font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDuplicate(r.id);
                    }}
                    className="p-1.5 rounded-[6px] text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors"
                    title="Duplicate report"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmId(r.id);
                    }}
                    className="p-1.5 rounded-[6px] text-[#94a3b8] hover:text-[#dc2626] hover:bg-[#fef2f2] transition-colors"
                    title="Delete report"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <ChevronRight className="w-4 h-4 text-[#cbd5e1] group-hover:text-[#0f172a] group-hover:translate-x-0.5 transition-all ml-0.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create report modal */}
      {showCreate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setShowCreate(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-[14px] shadow-xl border border-[#e2e8f0] p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#0f172a]">Create new report</h2>
              <button
                onClick={() => setShowCreate(false)}
                className="p-1.5 rounded-[6px] text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <label className="block text-xs font-semibold text-[#475569] mb-1">Report name</label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitCreate()}
              placeholder="e.g. August 2026"
              className="w-full h-9 px-3 rounded-[8px] border border-[#e2e8f0] text-sm text-[#0f172a] outline-none focus:border-[#94a3b8] mb-3"
            />

            <label className="block text-xs font-semibold text-[#475569] mb-1">Period</label>
            <input
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitCreate()}
              placeholder="e.g. Aug 1, 2026 – Aug 31, 2026"
              className="w-full h-9 px-3 rounded-[8px] border border-[#e2e8f0] text-sm text-[#0f172a] outline-none focus:border-[#94a3b8] mb-5"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 rounded-[8px] bg-white border border-[#e2e8f0] text-sm font-medium text-[#475569] hover:text-[#0f172a] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitCreate}
                disabled={!name.trim()}
                className="px-4 py-2 rounded-[8px] bg-[#0f172a] hover:bg-[#1e293b] text-white text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Create report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Page — switches between list and detail                             */
/* ------------------------------------------------------------------ */

interface ReportsPageProps {
  reports: ReportSummary[];
  setReports: React.Dispatch<React.SetStateAction<ReportSummary[]>>;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ reports, setReports }) => {
  const [openReportId, setOpenReportId] = useState<string | null>(null);

  const handleCreate = (name: string, period: string) => {
    const report: ReportSummary = {
      id: `r${Date.now()}`,
      name,
      period,
      author: 'Admin LMS',
      created: formatToday(),
    };
    setReports((prev) => [report, ...prev]);
    setOpenReportId(report.id);
  };

  const handleDuplicate = (id: string) => {
    setReports((prev) => {
      const src = prev.find((r) => r.id === id);
      if (!src) return prev;
      const copy: ReportSummary = {
        ...src,
        id: `r${Date.now()}`,
        name: `${src.name} (copy)`,
        created: formatToday(),
      };
      const idx = prev.findIndex((r) => r.id === id);
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      return next;
    });
  };

  const handleDelete = (id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
    setOpenReportId((cur) => (cur === id ? null : cur));
  };

  if (openReportId) {
    return <ReportDetail onBack={() => setOpenReportId(null)} />;
  }
  return (
    <ReportsList
      reports={reports}
      onOpen={setOpenReportId}
      onCreate={handleCreate}
      onDuplicate={handleDuplicate}
      onDelete={handleDelete}
    />
  );
};
