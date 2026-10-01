import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  ArrowRight,
  Globe,
  Database,
  Unplug,
  FileText,
  Layers,
} from 'lucide-react';
import { MenuId, TaskItem } from '../../types';
import { GA4_PAGES, GSC_QUERIES, CONNECTIONS, CRAWLED_URLS } from '../../data/mockData';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Page' | 'Task' | 'URL' | 'Query' | 'Connection';
  targetMenu: MenuId;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (menu: MenuId) => void;
  tasks: TaskItem[];
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  tasks,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K and navigation keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // 16 Menus list
  const menusList: { id: MenuId; label: string; desc: string }[] = [
    { id: 'overview', label: 'OVERVIEW', desc: 'AI Site Audit & Multi-Channel Health Summary' },
    { id: 'website', label: 'WEBSITE', desc: 'GA4 Traffic, Landing Pages & Core Web Vitals' },
    { id: 'search-marketing', label: 'SEARCH MGKT', desc: 'Search Console Queries, Screaming Frog Crawl & Rankings' },
    { id: 'paid-media', label: 'PAID MEDIA', desc: 'Google Ads, Meta Ads & Paid Acquisition Management' },
    { id: 'social-media', label: 'SOCIAL MEDIA', desc: 'Organic Social Channels, Reach & Community Engagement' },
    { id: 'email-marketing', label: 'EMAIL MGKT', desc: 'Campaign Newsletters, List Growth & Automation Funnels' },
    { id: 'cro', label: 'CRO', desc: 'A/B Testing Experiments, Click Heatmaps & Funnels' },
    { id: 'strategies', label: 'STRATEGIES', desc: 'Marketing Strategy Documents, Quarterly Goals & SEO Pillars' },
    { id: 'reports', label: 'REPORTS', desc: 'Automated Client Reports, Monthly Reviews & PDF Generation' },
    { id: 'brand-brief', label: 'BRAND BRIEF', desc: 'Brand Identity Guidelines, Persona Specs & Value Proposition' },
    { id: 'actionable-items', label: 'ACTIONABLE ITEMS', desc: 'Immediate Actions, Generated Tasks & Approvals' },
    { id: 'task-db', label: 'TASK DB', desc: 'Complete Centralized Task List, Filters & Workflow Lane DB' },
    { id: 'connections', label: 'CONNECTIONS', desc: 'Active API Data Sources, Crawlers & Ad Platform Hooks' },
    { id: 'notifications', label: 'NOTIFICATIONS', desc: 'Crawl Station Logs, System Alerts & Task Updates' },
    { id: 'images-graphics', label: 'IMAGES / GRAPHICS', desc: 'Client Creative Asset Library & Ad Design Banners' },
    { id: 'videos', label: 'VIDEOS', desc: 'Reels, Video Ads, Motion Graphics & Promo Assets' },
  ];

  // Build searchable index
  const allSearchItems: SearchResultItem[] = [
    // 1. Pages
    ...menusList.map((m) => ({
      id: `menu-${m.id}`,
      title: m.label,
      subtitle: m.desc,
      category: 'Page' as const,
      targetMenu: m.id,
      icon: Layers,
    })),
    // 2. Tasks
    ...tasks.map((t) => ({
      id: `task-${t.id}`,
      title: t.task,
      subtitle: `${t.lane} · Status: ${t.status} · Priority: ${t.priority || 'Normal'}`,
      category: 'Task' as const,
      targetMenu: 'task-db' as MenuId,
      icon: Database,
      badge: t.lane,
    })),
    // 3. GA4 Top Pages
    ...GA4_PAGES.slice(0, 10).map((p, idx) => ({
      id: `ga4-${idx}`,
      title: p.page,
      subtitle: `GA4 Page · ${p.sessions} sessions · ${p.engagement} engagement · ${p.sourceMedium}`,
      category: 'URL' as const,
      targetMenu: 'website' as MenuId,
      icon: Globe,
      badge: 'GA4',
    })),
    // 4. Crawled URLs
    ...CRAWLED_URLS.slice(0, 10).map((u, idx) => ({
      id: `crawl-${idx}`,
      title: u.url,
      subtitle: `Screaming Frog Crawl · HTTP ${u.status} · ${u.indexability} · ${u.inlinks} inlinks`,
      category: 'URL' as const,
      targetMenu: 'search-marketing' as MenuId,
      icon: FileText,
      badge: `HTTP ${u.status}`,
    })),
    // 5. GSC Queries
    ...GSC_QUERIES.map((q, idx) => ({
      id: `gsc-${idx}`,
      title: `"${q.query}"`,
      subtitle: `GSC Search Query · ${q.impressions} impressions · Avg pos: ${q.position}`,
      category: 'Query' as const,
      targetMenu: 'search-marketing' as MenuId,
      icon: Search,
      badge: 'GSC',
    })),
    // 6. Connections
    ...CONNECTIONS.map((c) => ({
      id: `conn-${c.id}`,
      title: c.name,
      subtitle: `${c.service} · Status: ${c.status}`,
      category: 'Connection' as const,
      targetMenu: 'connections' as MenuId,
      icon: Unplug,
      badge: c.status,
    })),
  ];

  // Filter based on query
  const filteredResults = query.trim()
    ? allSearchItems.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      })
    : allSearchItems.slice(0, 8); // default suggestions

  // Keyboard navigation inside list
  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        onNavigate(filteredResults[selectedIndex].targetMenu);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 p-4 bg-slate-950/40 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#e2e8f0] rounded-[16px] w-full max-w-2xl shadow-[0px_20px_50px_rgba(15,23,42,0.15)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyNav}
      >
        {/* Search Input Bar */}
        <div className="p-3.5 sm:p-4 border-b border-[#e2e8f0] flex items-center gap-3 bg-white">
          <Search className="w-4 h-4 text-[#94a3b8] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type to search menus, tasks, URLs, queries, or integrations..."
            className="flex-1 text-sm text-[#0f172a] placeholder-[#94a3b8] bg-transparent focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-[6px] hover:bg-[#f1f5f9] text-[#64748b]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-[6px] bg-[#f1f5f9] border border-[#e2e8f0] text-[10px] text-[#64748b] font-mono font-medium">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div ref={listRef} className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#64748b]">
              No results found for &ldquo;<span className="text-[#0f172a] font-semibold">{query}</span>&rdquo;
            </div>
          ) : (
            filteredResults.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.targetMenu);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`group p-2.5 rounded-[8px] flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#f8fafc] border-l-[3px] border-[#0f172a] pl-2'
                      : 'hover:bg-[#f8fafc] border-l-[3px] border-transparent pl-2'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-[8px] flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-white text-[#0f172a] shadow-xs border border-[#e2e8f0]'
                          : 'bg-[#f1f5f9] text-[#64748b] group-hover:text-[#0f172a]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#0f172a] truncate">
                          {item.title}
                        </span>
                        <span className="text-[9px] font-semibold px-2 py-0.2 rounded-full bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0]">
                          {item.category}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] font-mono text-[#64748b] hidden sm:inline">
                            [{item.badge}]
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#64748b] truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] text-[#94a3b8] group-hover:text-[#64748b] hidden sm:inline">
                      Jump to {item.targetMenu}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-[#0f172a] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="p-3 border-t border-[#e2e8f0] bg-[#f8fafc] flex items-center justify-between text-xs text-[#64748b]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-[#e2e8f0] rounded-[4px] text-[10px] font-mono">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-[#e2e8f0] rounded-[4px] text-[10px] font-mono">↓</kbd> to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-[#e2e8f0] rounded-[4px] text-[10px] font-mono">↵</kbd> to open
            </span>
          </div>
          <span>{filteredResults.length} matching items</span>
        </div>
      </div>
    </div>
  );
};
