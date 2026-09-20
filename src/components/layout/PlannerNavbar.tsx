import React from 'react';
import { TabType } from '../../types';
import {
  Home,
  GraduationCap,
  Activity,
  HeartPulse,
  CheckSquare,
  Sparkles,
  FolderLock,
} from 'lucide-react';

interface Props {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

interface NavItem {
  id: TabType;
  label: string;
  icon: React.ElementType;
}

export const PlannerNavbar: React.FC<Props> = ({ activeTab, onSelectTab }) => {
  const navItems: NavItem[] = [
    { id: 'today', label: 'Visão Hoje', icon: Home },
    { id: 'education', label: 'Educação & Escola', icon: GraduationCap },
    { id: 'activities', label: 'Extracurricular & Social', icon: Activity },
    { id: 'health', label: 'Saúde & Cuidados', icon: HeartPulse },
    { id: 'productivity', label: 'Notas & Tarefas', icon: CheckSquare },
    { id: 'memories', label: 'Memórias & Marcos', icon: Sparkles },
    { id: 'documents', label: 'Cofre de Documentos', icon: FolderLock },
  ];

  return (
    <nav className="hidden md:block w-full bg-surface-subtle/80 backdrop-blur-md border-b border-border-linen sticky top-[73px] z-30 px-4 sm:px-8 py-2 overflow-x-auto shadow-warm-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 min-w-max">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs lg:text-sm font-sans font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-surface text-warm-terracotta-dark shadow-warm-md border border-border-peach scale-[1.02] font-semibold'
                  : 'bg-transparent text-ink-muted hover:bg-surface/60 hover:text-ink border border-transparent'
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-transform duration-300 ${
                  isActive ? 'text-warm-terracotta scale-110' : 'text-ink-light'
                }`}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
