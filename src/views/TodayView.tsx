import React from 'react';
import { useFamily } from '../context/FamilyContext';
import { DailyScheduleCard } from '../components/modules/DailyScheduleCard';
import { MedicineLogWidget } from '../components/modules/MedicineLogWidget';
import { AutonomyTaskCard } from '../components/modules/AutonomyTaskCard';
import { MemoryMomentCard } from '../components/modules/MemoryMomentCard';
import { GrowthCurveCard } from '../components/modules/GrowthCurveCard';
import { ReflectiveNoteCard } from '../components/modules/ReflectiveNoteCard';
import { DocumentVaultCard } from '../components/modules/DocumentVaultCard';
import { Heart, ShieldAlert } from 'lucide-react';

interface Props {
  onOpenSOS: () => void;
}

export const TodayView: React.FC<Props> = ({ onOpenSOS }) => {
  const { activeChild, selectedChildId } = useFamily();
  const childName = activeChild ? activeChild.name : 'Família Unificada';

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Greeting Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-surface border border-border-peach/60 shadow-warm-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-warm-peach-light text-warm-terracotta flex items-center justify-center border border-border-peach shrink-0 shadow-sm">
            <Heart className="w-6 h-6 stroke-[1.75]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-warm-peach text-warm-terracotta-dark">
                Visão Hoje • Hub Central
              </span>
              <span className="text-xs text-ink-muted">
                {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mt-1">
              {selectedChildId === 'all' ? 'Rotina Integrada da Família' : `Dia de ${childName}`}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted font-sans mt-0.5">
              Grade escolar, doses farmacêuticas no horário, tarefas de autonomia e cuidados preventivos.
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={onOpenSOS}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-warm-peach-light hover:bg-warm-peach text-warm-terracotta-dark border border-warm-peach font-sans text-xs sm:text-sm font-semibold transition-all duration-300 shadow-warm-sm"
          >
            <ShieldAlert className="w-4 h-4 text-warm-terracotta" />
            <span>Resumo Clínico SOS</span>
          </button>
        </div>
      </div>

      {/* Main Grid of Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
        
        {/* Left Column: Educação & Produtividade */}
        <div className="space-y-6 sm:space-y-8">
          <DailyScheduleCard />
          <AutonomyTaskCard />
          <ReflectiveNoteCard />
        </div>

        {/* Right Column: Saúde, Memórias e Documentos */}
        <div className="space-y-6 sm:space-y-8">
          <MedicineLogWidget />
          <GrowthCurveCard />
          <MemoryMomentCard />
          <DocumentVaultCard />
        </div>

      </div>
    </div>
  );
};
