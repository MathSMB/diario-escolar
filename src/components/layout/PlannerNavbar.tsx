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
  tooltip: string;
  icon: React.ElementType;
}

export const PlannerNavbar: React.FC<Props> = ({ activeTab, onSelectTab }) => {
  const allNavItems: NavItem[] = [
    { id: 'today', label: 'Hoje', tooltip: 'Visão Geral & Hub do Dia', icon: Home },
    { id: 'education', label: 'Educação', tooltip: 'Escola, Horários & Avaliações', icon: GraduationCap },
    { id: 'health', label: 'Saúde', tooltip: 'Doses, Receitas & Vacinas', icon: HeartPulse },
    { id: 'productivity', label: 'Tarefas', tooltip: 'Checklists & Notas do Lar', icon: CheckSquare },
    { id: 'activities', label: 'Atividades', tooltip: 'Extracurricular & Social', icon: Activity },
    { id: 'memories', label: 'Memórias', tooltip: 'Álbum, Artes & Conquistas', icon: Sparkles },
    { id: 'documents', label: 'Cofre', tooltip: 'Documentos & Contratos Seguros', icon: FolderLock },
  ];

  return (
    <nav className="relative z-20 hidden md:block w-full bg-surface-subtle/90 backdrop-blur-md border-b border-border-linen px-3 sm:px-6 py-2 shadow-warm-sm transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-1 sm:gap-1.5 lg:gap-2">
        {allNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              title={item.tooltip}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl text-xs lg:text-sm font-sans font-medium transition-all duration-200 shrink-0 ${
                isActive
                  ? 'bg-surface text-warm-terracotta-dark shadow-warm-md border border-border-peach scale-[1.02] font-semibold'
                  : 'bg-transparent text-ink-muted hover:bg-surface/70 hover:text-ink border border-transparent'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 shrink-0 ${
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
