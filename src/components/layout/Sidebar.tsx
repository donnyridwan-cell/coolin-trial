import React from 'react';
import {
  LayoutDashboard,
  Globe,
  Search,
  Megaphone,
  Share2,
  Mail,
  Zap,
  Compass,
  FileBarChart2,
  Palette,
  CheckSquare,
  Database,
  Unplug,
  Bell,
  Image,
  Video,
  KeyRound,
  CreditCard,
  ChevronRight,
  Shield,
  Search as SearchIcon,
  ChevronsUpDown,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { MenuId } from '../../types';

interface SidebarProps {
  currentMenu: MenuId;
  onSelectMenu: (menu: MenuId) => void;
  taskCount: number;
  actionableCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenSearch: () => void;
}

interface NavSection {
  title?: string;
  items: {
    id: MenuId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    hasContent: boolean;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentMenu,
  onSelectMenu,
  taskCount,
  actionableCount,
  isOpenMobile,
  onCloseMobile,
  onOpenSearch,
}) => {
  const sections: NavSection[] = [
    {
      items: [
        {
          id: 'overview',
          label: 'OVERVIEW',
          icon: LayoutDashboard,
          hasContent: true,
        },
      ],
    },
    {
      title: 'CHANNELS',
      items: [
        {
          id: 'website',
          label: 'WEBSITE',
          icon: Globe,
          hasContent: true,
          badge: 'GA4 + PSI',
        },
        {
          id: 'search-marketing',
          label: 'SEARCH MGKT',
          icon: Search,
          hasContent: true,
          badge: 'GSC + Crawl',
        },
        {
          id: 'paid-media',
          label: 'PAID MEDIA',
          icon: Megaphone,
          hasContent: false,
        },
        {
          id: 'social-media',
          label: 'SOCIAL MEDIA',
          icon: Share2,
          hasContent: false,
        },
        {
          id: 'email-marketing',
          label: 'EMAIL MGKT',
          icon: Mail,
          hasContent: false,
        },
        {
          id: 'cro',
          label: 'CRO',
          icon: Zap,
          hasContent: false,
        },
      ],
    },
    {
      title: 'PLANNING & REPORTS',
      items: [
        {
          id: 'strategies',
          label: 'STRATEGIES',
          icon: Compass,
          hasContent: false,
        },
        {
          id: 'reports',
          label: 'REPORTS',
          icon: FileBarChart2,
          hasContent: false,
        },
      ],
    },
    {
      title: 'MANAGEMENT & TASKS',
      items: [
        {
          id: 'brand-brief',
          label: 'BRAND BRIEF',
          icon: Palette,
          hasContent: false,
        },
        {
          id: 'actionable-items',
          label: 'ACTIONABLE ITEMS',
          icon: CheckSquare,
          hasContent: true,
          badge: actionableCount > 0 ? actionableCount : undefined,
        },
        {
          id: 'task-db',
          label: 'TASK DB',
          icon: Database,
          hasContent: true,
          badge: taskCount,
        },
      ],
    },
    {
      title: 'SETTINGS & SYNC',
      items: [
        {
          id: 'connections',
          label: 'CONNECTIONS',
          icon: Unplug,
          hasContent: true,
          badge: '5/5',
        },
        {
          id: 'notifications',
          label: 'NOTIFICATIONS',
          icon: Bell,
          hasContent: true,
          badge: '4',
        },
      ],
    },
    {
      title: 'ASSETS',
      items: [
        {
          id: 'images-graphics',
          label: 'IMAGES / GRAPHICS',
          icon: Image,
          hasContent: false,
        },
        {
          id: 'videos',
          label: 'VIDEOS',
          icon: Video,
          hasContent: false,
        },
      ],
    },
    {
      title: 'OTHERS',
      items: [
        {
          id: 'access',
          label: 'ACCESS',
          icon: KeyRound,
          hasContent: false,
        },
        {
          id: 'billing',
          label: 'BILLING',
          icon: CreditCard,
          hasContent: false,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-[#e2e8f0] flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Workspace Brand Header (Trackly Monochrome Style) */}
        <div className="h-16 px-4 border-b border-[#e2e8f0] bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[8px] bg-[#0f172a] flex items-center justify-center text-white font-bold text-xs tracking-tight shadow-sm">
              AI
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#0f172a] tracking-tight leading-snug">
                AIZone Marketing
              </div>
              <div className="text-[11px] text-[#64748b] font-mono leading-none">
                aizonemarketing.io
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenSearch}
            className="p-1 rounded-[6px] hover:bg-[#f1f5f9] text-[#94a3b8] hover:text-[#0f172a] transition-colors"
            title="Switch workspace / search"
          >
            <ChevronsUpDown className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Search Bar */}
        <div className="px-3 pt-3 pb-1">
          <button
            type="button"
            onClick={onOpenSearch}
            className="w-full bg-[#f8fafc] hover:bg-[#f1f5f9] hover:border-[#cbd5e1] border border-[#e2e8f0] flex h-[34px] items-center justify-between px-2.5 rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.02)] text-[#64748b] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2 text-xs text-[#64748b] group-hover:text-[#0f172a]">
              <SearchIcon className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-[#64748b]" />
              <span>Search menu, tasks...</span>
            </div>
            <kbd className="bg-white text-[10px] text-[#64748b] font-mono px-1.5 py-0.5 rounded-[4px] border border-[#e2e8f0]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-0.5">
              {section.title && (
                <div className="px-2.5 text-[10px] font-bold tracking-wider text-[#94a3b8] uppercase mb-1">
                  {section.title}
                </div>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentMenu === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectMenu(item.id);
                      onCloseMobile();
                    }}
                    className={`w-full group flex items-center justify-between px-2.5 py-1.5 text-xs font-medium tracking-tight transition-all ${
                      isActive
                        ? 'border-l-[3px] border-[#0f172a] bg-[#f8fafc] text-[#0f172a] font-semibold rounded-r-[8px] rounded-l-none'
                        : 'border-l-[3px] border-transparent text-[#64748b] hover:text-[#0f172a] hover:bg-[#f8fafc] rounded-[8px]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive
                            ? 'text-[#0f172a]'
                            : 'text-[#94a3b8] group-hover:text-[#0f172a]'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.badge !== undefined && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
                          {item.badge}
                        </span>
                      )}
                      {!item.hasContent && !isActive && (
                        <span className="text-[9px] font-medium text-[#94a3b8] bg-[#f1f5f9] px-1.5 py-0.5 rounded-full">
                          Empty
                        </span>
                      )}
                      <ChevronRight
                        className={`w-3 h-3 transition-transform ${
                          isActive
                            ? 'text-[#0f172a] translate-x-0.5'
                            : 'text-[#cbd5e1] opacity-0 group-hover:opacity-100'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer Trackly Promo Card & Links (Pure Monochrome from Figma node 415:38239) */}
        <div className="p-3 border-t border-[#e2e8f0] bg-white space-y-2.5">
          <div className="p-3.5 rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0] text-center flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#0f172a] text-white flex items-center justify-center mb-2 shadow-xs">
              <Shield className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-[#0f172a]">
              Audit Pro Tier
            </div>
            <div className="text-[11px] text-[#64748b] mt-0.5 leading-snug">
              Score: 73 · 19 findings indexed
            </div>
            <button
              onClick={() => onSelectMenu('overview')}
              className="mt-2.5 w-full py-1.5 rounded-[8px] bg-[#0f172a] hover:bg-[#1e293b] text-white text-[11px] font-semibold transition-colors shadow-xs"
            >
              View Report
            </button>
          </div>

          <div className="px-1 pt-1 flex items-center justify-between text-xs text-[#64748b]">
            <button
              onClick={() => onSelectMenu('connections')}
              className="flex items-center gap-1.5 hover:text-[#0f172a] transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
            </button>
            <button
              onClick={() => onSelectMenu('notifications')}
              className="flex items-center gap-1.5 hover:text-[#0f172a] transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Help & logs</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
