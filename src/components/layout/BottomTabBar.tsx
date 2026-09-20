import React, { useState } from 'react';
import { TabType } from '../../types';
import {
  Home,
  GraduationCap,
  HeartPulse,
  CheckSquare,
  MoreHorizontal,
  Activity,
  Sparkles,
  FolderLock,
  X,
} from 'lucide-react';

interface Props {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomTabBar: React.FC<Props> = ({ activeTab, onSelectTab }) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const mainTabs = [
    { id: 'today' as TabType, label: 'Hoje', icon: Home },
    { id: 'education' as TabType, label: 'Escola', icon: GraduationCap },
    { id: 'health' as TabType, label: 'Saúde', icon: HeartPulse },
    { id: 'productivity' as TabType, label: 'Tarefas', icon: CheckSquare },
  ];

  const moreTabs = [
    { id: 'activities' as TabType, label: 'Extracurricular & Social', icon: Activity, desc: 'Cursos, esportes e festinhas' },
    { id: 'memories' as TabType, label: 'Memórias & Marcos', icon: Sparkles, desc: 'Fotos, artes e conquistas' },
    { id: 'documents' as TabType, label: 'Cofre de Documentos', icon: FolderLock, desc: 'Certidões, laudos e contratos' },
  ];

  const isMoreTabActive = moreTabs.some((t) => t.id === activeTab);

  return (
    <>
      {/* Drawer / Bottom Sheet for "Mais" Options */}
      {isMoreOpen && (
        <div
          className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-end md:hidden animate-in fade-in duration-200"
          onClick={() => setIsMoreOpen(false)}
        >
          <div
            className="w-full bg-surface border-t border-border-linen rounded-t-3xl p-6 shadow-warm-hover pb-10 space-y-4 animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-border-linen">
              <span className="font-serif text-base font-semibold text-ink">
                Outros Módulos & Gestão
              </span>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="w-8 h-8 rounded-full bg-canvas-sand flex items-center justify-center text-ink-muted hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {moreTabs.map((item) => {
                const Icon = item.icon;
                const isCurrent = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      setIsMoreOpen(false);
                    }}
                    className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl text-left transition-all ${
                      isCurrent
                        ? 'bg-warm-peach-light text-warm-terracotta-dark border border-warm-peach shadow-sm font-semibold'
                        : 'bg-canvas-sand/60 hover:bg-canvas-sand text-ink border border-border-linen'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isCurrent
                          ? 'bg-warm-terracotta text-white'
                          : 'bg-surface text-ink-muted border border-border-linen'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-sans block">{item.label}</span>
                      <span className="text-xs text-ink-muted font-normal block">
                        {item.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Ergonomic Bottom Navigation Bar (Mobile Only) */}
      <nav
        aria-label="Navegação móvel ergonômica"
        className="block md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-border-linen shadow-[0_-8px_24px_rgba(61,58,56,0.06)] px-2 py-1.5 transition-all"
      >
        <div className="max-w-lg mx-auto flex items-center justify-around">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  onSelectTab(tab.id);
                  setIsMoreOpen(false);
                }}
                className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 min-w-[64px] ${
                  isActive
                    ? 'text-warm-terracotta scale-105 font-semibold'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                    isActive ? 'bg-warm-peach-light' : 'bg-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-sans mt-0.5 tracking-tight">
                  {tab.label}
                </span>
              </button>
            );
          })}

          {/* Button: Mais */}
          <button
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 min-w-[64px] ${
              isMoreTabActive || isMoreOpen
                ? 'text-warm-terracotta scale-105 font-semibold'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                isMoreTabActive || isMoreOpen ? 'bg-warm-peach-light' : 'bg-transparent'
              }`}
            >
              <MoreHorizontal className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-sans mt-0.5 tracking-tight">
              Mais
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
