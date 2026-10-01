import React, { useState, useEffect } from 'react';
import { MenuId, TaskItem, TaskStatus } from './types';
import { INITIAL_TASKS } from './data/mockData';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

// Pages
import { OverviewPage } from './pages/OverviewPage';
import { WebsitePage } from './pages/WebsitePage';
import { SearchMarketingPage } from './pages/SearchMarketingPage';
import { PaidMediaPage } from './pages/PaidMediaPage';
import { SocialMediaPage } from './pages/SocialMediaPage';
import { EmailMarketingPage } from './pages/EmailMarketingPage';
import { CroPage } from './pages/CroPage';
import { StrategiesPage } from './pages/StrategiesPage';
import { ReportsPage } from './pages/ReportsPage';
import { BrandBriefPage } from './pages/BrandBriefPage';
import { ActionableItemsPage } from './pages/ActionableItemsPage';
import { TaskDatabasePage } from './pages/TaskDatabasePage';
import { ConnectionsPage } from './pages/ConnectionsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ImagesGraphicsPage } from './pages/ImagesGraphicsPage';
import { VideosPage } from './pages/VideosPage';

export function App() {
  const [currentMenu, setCurrentMenu] = useState<MenuId>('overview');
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditNotification, setAuditNotification] = useState<string | null>(null);

  // Global Cmd+K / Ctrl+K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Task actions
  const handleToggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextStatus: TaskStatus = t.status === 'Completed' ? 'Generated' : 'Completed';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const handleAddTask = (newTaskData: Omit<TaskItem, 'id'>) => {
    const nextId = `TSK-${String(tasks.length + 1).padStart(3, '0')}`;
    const task: TaskItem = {
      ...newTaskData,
      id: nextId,
    };
    setTasks([task, ...tasks]);
  };

  // Run audit simulation
  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditNotification('Audit selesai! Seluruh telemetri GA4, GSC, PageSpeed, dan Crawl tersinkronisasi.');
      setTimeout(() => setAuditNotification(null), 5000);
    }, 1800);
  };

  const actionableCount = tasks.filter(
    (t) => t.status === 'Generated' || t.status === 'Awaiting approval'
  ).length;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex">
      {/* Sidebar Navigation (Matching handwritten menus with Trackly UI style) */}
      <Sidebar
        currentMenu={currentMenu}
        onSelectMenu={(menu) => setCurrentMenu(menu)}
        taskCount={tasks.length}
        actionableCount={actionableCount}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header */}
        <Header
          currentMenu={currentMenu}
          onOpenMobile={() => setIsMobileMenuOpen(true)}
          onOpenSearch={() => setIsSearchModalOpen(true)}
        />

        {/* Audit notification toast */}
        {auditNotification && (
          <div className="mx-4 sm:mx-6 mt-4 p-3.5 rounded-[10px] bg-[#f0fdf4] border border-[#bbf7d0] text-[#16a34a] text-xs font-semibold flex items-center justify-between shadow-[0px_1px_3px_rgba(0,0,0,0.04)] animate-fadeIn">
            <span>{auditNotification}</span>
            <button
              onClick={() => setAuditNotification(null)}
              className="text-[#16a34a] hover:text-[#15803d] font-bold ml-2 text-xs"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Main Page View */}
        <main className="flex-1 p-4 sm:p-5 lg:p-6">
          {currentMenu === 'overview' && (
            <OverviewPage
              onNavigate={(menu) => setCurrentMenu(menu)}
              tasks={tasks}
              onToggleTaskStatus={handleToggleTaskStatus}
              onRunAudit={handleRunAudit}
              isAuditing={isAuditing}
            />
          )}

          {currentMenu === 'website' && <WebsitePage />}

          {currentMenu === 'search-marketing' && (
            <SearchMarketingPage onNavigate={(menu) => setCurrentMenu(menu)} />
          )}

          {currentMenu === 'paid-media' && (
            <PaidMediaPage
              onNavigate={(menu) => setCurrentMenu(menu)}
              tasks={tasks}
              onUpdateStatus={handleUpdateTaskStatus}
            />
          )}

          {currentMenu === 'social-media' && <SocialMediaPage />}

          {currentMenu === 'email-marketing' && <EmailMarketingPage />}

          {currentMenu === 'cro' && (
            <CroPage onNavigate={(menu) => setCurrentMenu(menu)} />
          )}

          {currentMenu === 'strategies' && <StrategiesPage />}

          {currentMenu === 'reports' && <ReportsPage />}

          {currentMenu === 'brand-brief' && <BrandBriefPage />}

          {currentMenu === 'actionable-items' && (
            <ActionableItemsPage
              tasks={tasks}
              onUpdateStatus={handleUpdateTaskStatus}
              onNavigateToDb={() => setCurrentMenu('task-db')}
            />
          )}

          {currentMenu === 'task-db' && (
            <TaskDatabasePage
              tasks={tasks}
              onAddTask={handleAddTask}
              onUpdateStatus={handleUpdateTaskStatus}
            />
          )}

          {currentMenu === 'connections' && <ConnectionsPage />}

          {currentMenu === 'notifications' && <NotificationsPage />}

          {currentMenu === 'images-graphics' && <ImagesGraphicsPage />}

          {currentMenu === 'videos' && <VideosPage />}
        </main>
      </div>

      {/* Global Command Palette Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onNavigate={(menu) => setCurrentMenu(menu)}
        tasks={tasks}
      />
    </div>
  );
}

export default App;
