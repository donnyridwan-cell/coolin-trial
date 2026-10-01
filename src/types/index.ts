export type MenuId =
  | 'overview'
  | 'website'
  | 'search-marketing'
  | 'paid-media'
  | 'social-media'
  | 'email-marketing'
  | 'cro'
  | 'strategies'
  | 'reports'
  | 'brand-brief'
  | 'actionable-items'
  | 'task-db'
  | 'connections'
  | 'notifications'
  | 'images-graphics'
  | 'videos'
  | 'access'
  | 'billing';

export interface MenuGroup {
  groupName?: string;
  items: {
    id: MenuId;
    label: string;
    badge?: string | number;
    badgeColor?: string;
    hasContent: boolean;
  }[];
}

export interface GA4PageItem {
  page: string;
  sourceMedium: string;
  sessions: number;
  users: number;
  engagement: string;
  keyEvents: number;
}

export interface GSCQueryItem {
  query: string;
  page: string;
  clicks: number;
  impressions: number;
  ctr: string;
  position: number;
}

export interface PageSpeedScore {
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
  lcp: string;
  cls: string;
  tbt: string;
  fcp: string;
  speedIndex: string;
}

export interface TrackedPageItem {
  page: string;
  source: string;
  sessions28d: number;
  psiPerf: string; // e.g. "67 / 85"
  lcp: string; // e.g. "13.4s / 2.3s"
  sfStatus: string;
}

export interface CrawlIssue {
  type: 'ERROR' | 'WARNING' | 'NOTICE';
  title: string;
  count: number;
  percentage: string;
  actionTag: string; // "Task created" | "Send to tech" | "Send to content"
}

export interface CrawlHistoryPoint {
  date: string;
  pages: number;
  broken: number;
  nonIdx: number;
  avgTime: string;
  health: number;
}

export interface CrawledUrlItem {
  url: string;
  status: number;
  indexability: string;
  robots: string;
  titleLen: number;
  metaLen: number;
  words: number;
  size: string;
  depth: number;
  inlinks: number;
  ext: number;
}

export type TaskLane = 'CONTENT' | 'TECHNICAL' | 'PAID' | 'GENERAL';
export type TaskStatus = 'Generated' | 'Assigned' | 'Awaiting approval' | 'Completed';

export interface TaskItem {
  id: string;
  task: string;
  lane: TaskLane;
  status: TaskStatus;
  date: string;
  priority?: 'High' | 'Medium' | 'Low';
  assignedTo?: string;
  source?: string;
}

export interface ConnectionItem {
  id: string;
  name: string;
  service: string;
  status: 'connected' | 'disconnected' | 'pending';
  lastSynced: string;
  account: string;
  icon: string;
  details?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  read: boolean;
}
