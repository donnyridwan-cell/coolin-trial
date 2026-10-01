import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, LucideIcon } from 'lucide-react';

export interface DropdownOption {
  label: string;
  value: string;
  badge?: string;
  badgeColor?: string;
}

interface DropdownProps {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
  size?: 'sm' | 'md';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  options,
  onChange,
  placeholder = 'Select option',
  icon: Icon,
  size = 'md',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center justify-between gap-2.5 bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] hover:bg-[#f8fafc] rounded-[8px] text-xs font-medium text-[#475569] transition-all duration-150 shadow-[0px_1px_2px_rgba(0,0,0,0.02)] focus:outline-none focus:border-[#94a3b8] focus:ring-2 focus:ring-[#0f172a]/5 ${
          size === 'sm' ? 'px-2.5 py-1' : 'px-3 py-1.5'
        } ${isOpen ? 'border-[#0f172a] ring-2 ring-[#0f172a]/5 bg-[#f8fafc]' : ''}`}
      >
        <div className="flex items-center gap-2 min-w-0">
          {Icon && <Icon className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-[#64748b] shrink-0" />}
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-[#94a3b8] group-hover:text-[#475569] shrink-0 transition-transform duration-150 ${
            isOpen ? 'rotate-180 text-[#0f172a]' : ''
          }`}
        />
      </button>

      {/* Floating Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-1 min-w-[160px] w-max max-w-xs bg-white border border-[#e2e8f0] rounded-[10px] shadow-[0px_8px_24px_rgba(0,0,0,0.08)] py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
          <div className="max-h-60 overflow-y-auto px-1 space-y-0.5">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-[6px] text-xs flex items-center justify-between gap-3 transition-colors ${
                    isSelected
                      ? 'bg-[#f1f5f9] text-[#0f172a] font-semibold'
                      : 'text-[#475569] hover:bg-[#f8fafc] hover:text-[#0f172a]'
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {option.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                          option.badgeColor || 'bg-[#f1f5f9] text-[#475569]'
                        }`}
                      >
                        {option.badge}
                      </span>
                    )}
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#2563eb]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
