import React, { useState, useRef, useEffect } from 'react';
import { TabType } from '../../types';
import {
  Home,
  GraduationCap,
  Activity,
  HeartPulse,
  CheckSquare,
  Sparkles,
  FolderLock,
  ChevronDown,
} from 'lucide-react';

interface Props {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

interface NavItem {
  id: TabType;
  label: string;
  tooltip: string;
  icon: React.ElementType;
}

export const PlannerNavbar: React.FC<Props> = ({ activeTab, onSelectTab }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Core 4 Daily Priority Tabs
  const coreNavItems: NavItem[] = [
    { id: 'today', label: 'Hoje', tooltip: 'Visão Geral & Hub do Dia', icon: Home },
    { id: 'education', label: 'Educação', tooltip: 'Escola, Horários & Avaliações', icon: GraduationCap },
    { id: 'health', label: 'Saúde', tooltip: 'Doses, Receitas & Vacinas', icon: HeartPulse },
    { id: 'productivity', label: 'Tarefas', tooltip: 'Checklists & Notas do Lar', icon: CheckSquare },
  ];

  // Secondary / Archival Tabs
  const secondaryNavItems: NavItem[] = [
    { id: 'activities', label: 'Atividades', tooltip: 'Extracurricular & Social', icon: Activity },
    { id: 'memories', label: 'Memórias', tooltip: 'Álbum, Artes & Conquistas', icon: Sparkles },
    { id: 'documents', label: 'Cofre', tooltip: 'Documentos & Contratos Seguros', icon: FolderLock },
  ];

  const allNavItems = [...coreNavItems, ...secondaryNavItems];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isSecondaryActive = secondaryNavItems.some((item) => item.id === activeTab);
  const activeSecondaryItem = secondaryNavItems.find((item) => item.id === activeTab);

  return (
    <nav className="hidden md:block w-full bg-surface-subtle/90 backdrop-blur-md border-b border-border-linen sticky top-[73px] z-30 px-3 sm:px-6 py-2 shadow-warm-sm transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between sm:justify-center gap-1 lg:gap-2">
        
        {/* Full View for Desktops (Fits all 7 items without any horizontal scrolling) */}
        <div className="hidden lg:flex items-center justify-center gap-1.5 w-full">
          {allNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                title={item.tooltip}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs lg:text-sm font-sans font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-surface text-warm-terracotta-dark shadow-warm-md border border-border-peach scale-[1.02] font-semibold'
                    : 'bg-transparent text-ink-muted hover:bg-surface/70 hover:text-ink border border-transparent'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isActive ? 'text-warm-terracotta scale-110' : 'text-ink-light'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Compact View for Laptops / Tablets (4 Core Tabs + "Mais ▾" Dropdown) */}
        <div className="flex lg:hidden items-center justify-center gap-1 sm:gap-2 w-full">
          {coreNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                title={item.tooltip}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-sans font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-surface text-warm-terracotta-dark shadow-warm-md border border-border-peach font-semibold'
                    : 'bg-transparent text-ink-muted hover:bg-surface/60 hover:text-ink border border-transparent'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? 'text-warm-terracotta' : 'text-ink-light'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* "Mais" Menu Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-sans font-medium transition-all duration-200 ${
                isSecondaryActive
                  ? 'bg-surface text-warm-terracotta-dark shadow-warm-md border border-border-peach font-semibold'
                  : 'bg-transparent text-ink-muted hover:bg-surface/60 hover:text-ink border border-transparent'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-warm-terracotta" />
              <span>{isSecondaryActive && activeSecondaryItem ? activeSecondaryItem.label : 'Mais'}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180 text-warm-terracotta' : 'text-ink-light'
                }`}
              />
            </button>

            {/* Dropdown Menu Box */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-surface border border-border-linen rounded-2xl shadow-warm-hover p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                {secondaryNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onSelectTab(item.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-sans transition-all text-left ${
                        isActive
                          ? 'bg-warm-peach-light text-warm-terracotta-dark font-semibold'
                          : 'text-ink-muted hover:bg-canvas-sand hover:text-ink'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          isActive ? 'text-warm-terracotta' : 'text-ink-light'
                        }`}
                      />
                      <div>
                        <span className="block font-medium">{item.label}</span>
                        <span className="block text-[10px] text-ink-muted font-normal">
                          {item.tooltip}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
};
