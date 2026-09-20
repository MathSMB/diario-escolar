import React from 'react';
import { ShieldAlert, Bell, Calendar, Sparkles, BookOpen } from 'lucide-react';

interface Props {
  onOpenSOS: () => void;
  activeChildName: string;
}

export const PlannerHeader: React.FC<Props> = ({ onOpenSOS, activeChildName }) => {
  return (
    <header className="w-full bg-surface/90 backdrop-blur-md border-b border-border-linen sticky top-0 z-40 px-4 sm:px-8 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand & Editorial Greeting */}
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-canvas-sand border border-border-peach flex items-center justify-center text-warm-terracotta shadow-warm-sm">
            <BookOpen className="w-6 h-6 stroke-[1.5]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl text-ink font-semibold tracking-tight">
                Refúgio Familiar
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-sans font-medium px-2.5 py-0.5 rounded-full bg-warm-peach-light text-warm-terracotta border border-border-peach">
                <Sparkles className="w-3 h-3" />
                Planner Diário
              </span>
            </div>
            <p className="text-xs sm:text-sm text-ink-muted font-sans flex items-center gap-2 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-calm-sage" />
              <span>Quinta-feira, 19 de Setembro</span>
              <span className="text-ink-light">•</span>
              <span className="italic font-serif text-warm-terracotta">
                {activeChildName === 'Família Unificada' ? 'Visão Geral do Lar' : `Rotina de ${activeChildName}`}
              </span>
            </p>
          </div>
        </div>

        {/* Action Pills & Emergency SOS */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Daily Status Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-calm-sage-light text-calm-sage-dark text-xs font-medium border border-calm-sage/30">
            <span className="w-2 h-2 rounded-full bg-calm-sage animate-ping" />
            <span>Rotina Harmoniosa • 2 aulas, 1 remédio</span>
          </div>

          {/* Notification Bell */}
          <button
            className="w-10 h-10 rounded-2xl bg-canvas-sand border border-border-linen hover:bg-surface text-ink-muted hover:text-ink flex items-center justify-center transition-all duration-200 shadow-warm-sm"
            title="Lembretes e avisos do dia"
          >
            <Bell className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* Fast Emergency SOS Button (SLA: 1 Click Access) */}
          <button
            onClick={onOpenSOS}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-warm-peach-light hover:bg-warm-peach text-warm-terracotta-dark border border-warm-peach font-sans text-xs sm:text-sm font-semibold transition-all duration-300 shadow-warm-sm hover:shadow-warm-md hover:scale-[1.02]"
            title="Acesso Imediato ao Cartão Clínico e Alergias"
          >
            <div className="w-6 h-6 rounded-xl bg-warm-terracotta text-white flex items-center justify-center shadow-sm">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
            <span>Cartão SOS</span>
            <span className="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded bg-surface/80 text-warm-terracotta-dark uppercase font-bold tracking-wider">
              1 toque
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
