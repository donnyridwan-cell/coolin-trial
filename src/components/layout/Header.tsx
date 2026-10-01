import React, { useState } from 'react';
import { Menu, Search, CheckCircle2, Calendar } from 'lucide-react';
import { MenuId } from '../../types';

interface HeaderProps {
  currentMenu: MenuId;
  onOpenMobile: () => void;
  onOpenSearch: () => void;
}

const MENU_TITLES: Record<
  MenuId,
  { title: string; subtitle: string; countBadge?: string }
> = {
  overview: {
    title: 'Overview',
    subtitle: 'AI Site Audit & Multi-Channel Health Summary',
    countBadge: '19 Findings',
  },
  website: {
    title: 'Website',
    subtitle: 'GA4 Traffic, Landing Pages & Core Web Vitals',
    countBadge: '67 URLs',
  },
  'search-marketing': {
    title: 'Search Marketing',
    subtitle: 'Google Search Console Queries & Screaming Frog Site Audit',
    countBadge: '478 Crawled',
  },
  'paid-media': {
    title: 'Paid Media',
    subtitle: 'Google Ads & Meta Ads Performance',
    countBadge: '3 Tasks',
  },
  'social-media': {
    title: 'Social Media',
    subtitle: 'Social Channels, Reach & Engagement',
    countBadge: 'Setup',
  },
  'email-marketing': {
    title: 'Email Marketing',
    subtitle: 'Newsletters & Email Campaign Funnels',
    countBadge: 'Setup',
  },
  cro: {
    title: 'CRO',
    subtitle: 'Conversion Rate Optimization & Experiments',
    countBadge: 'Clarity Sync',
  },
  strategies: {
    title: 'Strategies',
    subtitle: 'Marketing Strategy & Execution Roadmap',
    countBadge: 'Planning',
  },
  reports: {
    title: 'Reports',
    subtitle: 'Automated Client Reports & Reviews',
    countBadge: 'Monthly',
  },
  'brand-brief': {
    title: 'Brand Brief',
    subtitle: 'Brand Guidelines & Value Proposition',
    countBadge: 'Identity',
  },
  'actionable-items': {
    title: 'Actionable Items',
    subtitle: 'Audit Action Tasks & Approvals',
    countBadge: '6 Pending',
  },
  'task-db': {
    title: 'Task Database',
    subtitle: 'Centralized Tasks from Audit (PDF Page 6)',
    countBadge: '17 Total',
  },
  connections: {
    title: 'Connections',
    subtitle: 'Data Sources & Connected Integrations (PDF Page 1)',
    countBadge: '5/5 Active',
  },
  notifications: {
    title: 'Notifications',
    subtitle: 'System & Crawl Station Event Logs',
    countBadge: '4 Unread',
  },
  'images-graphics': {
    title: 'Images & Graphics',
    subtitle: 'Creative Brand & Campaign Assets',
    countBadge: 'Assets',
  },
  videos: {
    title: 'Videos',
    subtitle: 'Video Ad Creatives & Video Content',
    countBadge: 'Media',
  },
  access: {
    title: 'Access',
    subtitle: 'Team Members, Roles & Access Permissions',
    countBadge: 'Others',
  },
  billing: {
    title: 'Billing',
    subtitle: 'Subscription Plan, Invoices & Payment Methods',
    countBadge: 'Others',
  },
};

export const Header: React.FC<HeaderProps> = ({
  currentMenu,
  onOpenMobile,
  onOpenSearch,
}) => {
  const [selectedRange, setSelectedRange] = useState<'28d' | '7d' | 'today'>('28d');

  const currentInfo = MENU_TITLES[currentMenu] || {
    title: 'Dashboard',
    subtitle: 'AIZone Marketing Client Portal',
    countBadge: undefined,
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#e2e8f0] px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
      {/* Left: Mobile hamburger & current page title with Trackly Pill */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onOpenMobile}
          className="p-1.5 -ml-1 rounded-[8px] text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] lg:hidden transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <h1 className="text-[17px] sm:text-[19px] font-bold text-[#0f172a] tracking-tight leading-snug">
              {currentInfo.title}
            </h1>
            {currentInfo.countBadge && (
              <span className="hidden xs:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
                {currentInfo.countBadge}
              </span>
            )}
          </div>
          <p className="hidden sm:block text-xs text-[#64748b] leading-none mt-0.5">
            {currentInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Right controls: Segmented date selector & Search */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Trackly Segmented Date Filter */}
        <div className="hidden md:flex items-center bg-[#f1f5f9] p-1 rounded-[8px] border border-[#e2e8f0] text-xs">
          <Calendar className="w-3.5 h-3.5 text-[#94a3b8] ml-1.5 mr-1" />
          <button
            type="button"
            onClick={() => setSelectedRange('28d')}
            className={`px-2.5 py-1 rounded-[6px] text-xs font-medium transition-all ${
              selectedRange === '28d'
                ? 'bg-white text-[#0f172a] font-semibold shadow-xs'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            Last 28 Days
          </button>
          <button
            type="button"
            onClick={() => setSelectedRange('7d')}
            className={`px-2.5 py-1 rounded-[6px] text-xs font-medium transition-all ${
              selectedRange === '7d'
                ? 'bg-white text-[#0f172a] font-semibold shadow-xs'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            7 Days
          </button>
          <button
            type="button"
            onClick={() => setSelectedRange('today')}
            className={`px-2.5 py-1 rounded-[6px] text-xs font-medium transition-all ${
              selectedRange === 'today'
                ? 'bg-white text-[#0f172a] font-semibold shadow-xs'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            Today
          </button>
        </div>

        {/* Verified domain indicator */}
        <div className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0] text-xs text-[#475569] font-mono">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a]" />
          <span>aizonemarketing.io</span>
        </div>

        {/* Global Search trigger button (⌘K) */}
        <button
          onClick={onOpenSearch}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-[#64748b] hover:text-[#0f172a] font-medium text-xs transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.02)]"
          title="Search anything (⌘ K)"
        >
          <Search className="w-3.5 h-3.5 text-[#94a3b8]" />
          <span className="hidden sm:inline text-xs">Search</span>
          <kbd className="px-1.5 py-0.5 bg-[#f1f5f9] border border-[#e2e8f0] rounded-[4px] text-[10px] text-[#64748b] font-mono font-semibold">
            ⌘K
          </kbd>
        </button>
      </div>
    </header>
  );
};
