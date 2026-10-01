import React, { useState } from 'react';
import {
  Plus,
  Search,
  Download,
} from 'lucide-react';
import { TaskItem, TaskLane, TaskStatus } from '../types';
import { Dropdown } from '../components/common/Dropdown';

interface TaskDatabasePageProps {
  tasks: TaskItem[];
  onAddTask: (newTask: Omit<TaskItem, 'id'>) => void;
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void;
}

export const TaskDatabasePage: React.FC<TaskDatabasePageProps> = ({
  tasks,
  onAddTask,
  onUpdateStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [laneFilter, setLaneFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskLane, setNewTaskLane] = useState<TaskLane>('CONTENT');
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>('Generated');
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.task.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLane = laneFilter === 'ALL' || t.lane === laneFilter;
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    return matchesSearch && matchesLane && matchesStatus;
  });

  // Summary counts
  const assignedCount = tasks.filter((t) => t.status === 'Assigned').length;
  const generatedCount = tasks.filter((t) => t.status === 'Generated').length;
  const awaitingCount = tasks.filter((t) => t.status === 'Awaiting approval').length;
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    onAddTask({
      task: newTaskTitle,
      lane: newTaskLane,
      status: newTaskStatus,
      date: new Date().toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      }),
      priority: newTaskPriority,
      source: 'User Manual Entry',
    });

    setNewTaskTitle('');
    setIsAddModalOpen(false);
  };

  const handleExportCSV = () => {
    const headers = 'ID,Task,Lane,Status,Date,Priority\n';
    const rows = filteredTasks
      .map(
        (t) =>
          `"${t.id}","${t.task.replace(/"/g, '""')}","${t.lane}","${t.status}","${t.date}","${
            t.priority || ''
          }"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `task-db-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-12">
      {/* Top Header & Summary from PDF Page 6 (Trackly Pure Monochrome Backlog) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-[12px] bg-white border border-[#e2e8f0] shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-bold text-[#0f172a] uppercase tracking-wider">ALL TASKS</h2>
            <span className="text-xs text-[#64748b] font-mono">
              {filteredTasks.length} of {tasks.length} total
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold mt-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0] text-[10px]">
              {assignedCount} assigned
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0] text-[10px]">
              {generatedCount} generated
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0] text-[10px]">
              {awaitingCount} awaiting approval
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0] text-[10px]">
              {completedCount} completed
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] bg-[#0f172a] hover:bg-[#1e293b] text-white font-semibold text-xs transition-colors shadow-xs active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            New Task
          </button>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] bg-white hover:bg-[#f8fafc] text-[#0f172a] text-xs font-semibold border border-[#e2e8f0] transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#64748b]" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filter Toolbar (Trackly style) */}
      <div className="p-3.5 bg-white border border-[#e2e8f0] rounded-[12px] flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-[#94a3b8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks by title or keyword…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-[8px] bg-white border border-[#e2e8f0] text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0f172a] font-medium"
            />
          </div>

          <Dropdown
            value={laneFilter}
            onChange={(val) => setLaneFilter(val)}
            options={[
              { label: 'Lane: All', value: 'ALL' },
              { label: 'Lane: CONTENT', value: 'CONTENT' },
              { label: 'Lane: TECHNICAL', value: 'TECHNICAL' },
              { label: 'Lane: PAID', value: 'PAID' },
              { label: 'Lane: GENERAL', value: 'GENERAL' },
            ]}
          />

          <Dropdown
            value={statusFilter}
            onChange={(val) => setStatusFilter(val)}
            options={[
              { label: 'Status: All', value: 'ALL' },
              { label: 'Status: Generated', value: 'Generated' },
              { label: 'Status: Assigned', value: 'Assigned' },
              { label: 'Status: Awaiting approval', value: 'Awaiting approval' },
              { label: 'Status: Completed', value: 'Completed' },
            ]}
          />
        </div>
      </div>

      {/* Database Table (Trackly Tasks Backlog Table DNA from node 257:3308) */}
      <div className="bg-white border border-[#e2e8f0] rounded-[12px] overflow-hidden shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#f8fafc] text-[#64748b] border-b border-[#e2e8f0] uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3 px-3 w-12 text-center">#</th>
              <th className="py-3 px-4">TASK</th>
              <th className="py-3 px-4">LANE</th>
              <th className="py-3 px-4">STATUS</th>
              <th className="py-3 px-4 text-right">DATE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0] text-[#0f172a]">
            {filteredTasks.map((t, idx) => (
              <tr key={t.id} className="hover:bg-[#f8fafc] transition-colors group">
                <td className="py-3.5 px-3 text-center font-mono text-[#94a3b8] text-xs">
                  {idx + 1}
                </td>
                <td className="py-3.5 px-4 font-medium text-[#0f172a] max-w-lg">
                  <div className="flex items-center gap-2">
                    <span
                      className={`cursor-pointer transition-all ${
                        t.status === 'Completed' ? 'line-through text-[#94a3b8]' : 'text-[#0f172a] font-semibold'
                      }`}
                      onClick={() =>
                        onUpdateStatus(
                          t.id,
                          t.status === 'Completed' ? 'Generated' : 'Completed'
                        )
                      }
                    >
                      {t.task}
                    </span>
                    {t.priority === 'High' && (
                      <span className="text-[10px] font-semibold text-[#0f172a] bg-[#f1f5f9] px-2 py-0.5 rounded-full border border-[#e2e8f0] shrink-0">
                        High Priority
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0]">
                    {t.lane}
                  </span>
                </td>
                <td className="py-2.5 px-4 whitespace-nowrap">
                  <Dropdown
                    size="sm"
                    value={t.status}
                    onChange={(val) => onUpdateStatus(t.id, val as TaskStatus)}
                    options={[
                      { label: 'Generated', value: 'Generated', badge: 'New', badgeColor: 'bg-[#f1f5f9] text-[#475569]' },
                      { label: 'Assigned', value: 'Assigned', badge: 'In flight', badgeColor: 'bg-[#f1f5f9] text-[#475569]' },
                      { label: 'Awaiting approval', value: 'Awaiting approval', badge: 'Pending', badgeColor: 'bg-[#f1f5f9] text-[#475569]' },
                      { label: 'Completed', value: 'Completed', badge: 'Done', badgeColor: 'bg-[#0f172a] text-white' },
                    ]}
                  />
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-[#64748b] whitespace-nowrap text-xs">
                  {t.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-3 bg-[#f8fafc] border-t border-[#e2e8f0] text-[#64748b] text-xs">
          Completed work is dated by when it was confirmed; everything else by when it was raised.
        </div>
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-6 w-full max-w-md shadow-[0px_20px_50px_rgba(15,23,42,0.15)]">
            <h3 className="text-base font-bold text-[#0f172a] mb-4">Create New Task</h3>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Set up Meta Pixel and track form submissions"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-[8px] bg-white border border-[#e2e8f0] text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0f172a] font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                    Lane
                  </label>
                  <Dropdown
                    className="w-full"
                    value={newTaskLane}
                    onChange={(val) => setNewTaskLane(val as TaskLane)}
                    options={[
                      { label: 'CONTENT', value: 'CONTENT' },
                      { label: 'TECHNICAL', value: 'TECHNICAL' },
                      { label: 'PAID', value: 'PAID' },
                      { label: 'GENERAL', value: 'GENERAL' },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                    Initial Status
                  </label>
                  <Dropdown
                    className="w-full"
                    value={newTaskStatus}
                    onChange={(val) => setNewTaskStatus(val as TaskStatus)}
                    options={[
                      { label: 'Generated', value: 'Generated' },
                      { label: 'Assigned', value: 'Assigned' },
                      { label: 'Awaiting approval', value: 'Awaiting approval' },
                      { label: 'Completed', value: 'Completed' },
                    ]}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  Priority
                </label>
                <Dropdown
                  className="w-full"
                  value={newTaskPriority}
                  onChange={(val) => setNewTaskPriority(val as 'High' | 'Medium' | 'Low')}
                  options={[
                    { label: 'High', value: 'High' },
                    { label: 'Medium', value: 'Medium' },
                    { label: 'Low', value: 'Low' },
                  ]}
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#e2e8f0]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-[8px] bg-white hover:bg-[#f8fafc] text-[#0f172a] text-xs font-semibold border border-[#e2e8f0] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-[8px] bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
