import React from 'react';
import { Sparkles, Users, Heart } from 'lucide-react';

export interface Child {
  id: string;
  name: string;
  age: string;
  grade: string;
  avatarColor: string;
  accentColor: string;
  initials: string;
  themeBadge: string;
}

export const CHILDREN_MOCK: Child[] = [
  {
    id: 'helena',
    name: 'Helena',
    age: '7 anos',
    grade: '2º Ano Fundamental',
    avatarColor: 'bg-warm-peach/60 text-warm-terracotta-dark',
    accentColor: 'border-warm-peach',
    initials: 'H',
    themeBadge: 'badge-peach',
  },
  {
    id: 'mateo',
    name: 'Mateo',
    age: '4 anos',
    grade: 'Jardim II',
    avatarColor: 'bg-calm-sage/30 text-calm-sage-dark',
    accentColor: 'border-calm-sage',
    initials: 'M',
    themeBadge: 'badge-sage',
  },
];

interface Props {
  selectedChildId: string;
  onSelectChild: (id: string) => void;
}

export const ChildContextSelector: React.FC<Props> = ({
  selectedChildId,
  onSelectChild,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-2 bg-canvas-sand/90 border border-border-linen rounded-3xl p-2.5 backdrop-blur-sm shadow-warm-sm">
      <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
        <span className="text-xs uppercase tracking-widest font-semibold text-ink-muted px-3 flex items-center gap-1.5 shrink-0">
          <Heart className="w-3.5 h-3.5 text-warm-terracotta" />
          Perfil Ativo:
        </span>

        {CHILDREN_MOCK.map((child) => {
          const isSelected = selectedChildId === child.id;
          return (
            <button
              key={child.id}
              onClick={() => onSelectChild(child.id)}
              className={`group flex items-center gap-3 px-4 py-2 rounded-2xl transition-all duration-300 ${
                isSelected
                  ? 'bg-surface text-ink shadow-warm-md border border-border-linen scale-[1.02]'
                  : 'bg-transparent text-ink-muted hover:bg-surface/50 hover:text-ink border border-transparent'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-serif font-bold text-sm transition-transform duration-300 ${
                  child.avatarColor
                } ${isSelected ? 'ring-2 ring-warm-terracotta/40' : ''}`}
              >
                {child.initials}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm font-sans tracking-tight">
                    {child.name}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-warm-terracotta animate-pulse" />
                  )}
                </div>
                <span className="text-[11px] text-ink-muted font-normal block">
                  {child.age} • {child.grade}
                </span>
              </div>
            </button>
          );
        })}

        <button
          onClick={() => onSelectChild('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-300 shrink-0 ${
            selectedChildId === 'all'
              ? 'bg-surface text-ink shadow-warm-md border border-border-linen scale-[1.02]'
              : 'bg-transparent text-ink-muted hover:bg-surface/50 hover:text-ink border border-transparent'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center bg-calm-slate/20 text-calm-slate-dark ${
              selectedChildId === 'all' ? 'ring-2 ring-calm-slate/40' : ''
            }`}
          >
            <Users className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-sm font-sans tracking-tight block">
              Família Unificada
            </span>
            <span className="text-[11px] text-ink-muted font-normal block">
              Todos os filhos
            </span>
          </div>
        </button>
      </div>

      <div className="hidden lg:flex items-center gap-2 pr-3 text-xs text-ink-muted font-serif italic">
        <Sparkles className="w-3.5 h-3.5 text-warm-terracotta" />
        <span>Alternância de contexto instantânea</span>
      </div>
    </div>
  );
};
