import React, { useState } from 'react';
import { GraduationCap, CheckCircle2, Circle, Clock, MapPin, Backpack } from 'lucide-react';

export const DailyScheduleCard: React.FC = () => {
  const [backpackItems, setBackpackItems] = useState([
    { id: 1, label: 'Caderno de Caligrafia & Pauta Larga', checked: true },
    { id: 2, label: 'Estojo de Lápis de Cor (12 cores)', checked: true },
    { id: 3, label: 'Garrafinha Térmica de Água Fresca', checked: false },
    { id: 4, label: 'Livro de Literatura: "O Menino e o Vento"', checked: false },
  ]);

  const toggleItem = (id: number) => {
    setBackpackItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const completedCount = backpackItems.filter((i) => i.checked).length;

  return (
    <div className="planner-card p-6 sm:p-7 flex flex-col justify-between">
      <div>
        {/* Header with Luxury Typography */}
        <div className="flex items-center justify-between pb-4 border-b border-border-linen mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-calm-slate-light text-calm-slate-dark flex items-center justify-center border border-calm-slate/20">
              <GraduationCap className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink">
                Grade Escolar do Dia
              </h3>
              <p className="text-xs text-ink-muted">Colégio Santa Teresa • Sala 14B</p>
            </div>
          </div>
          <span className="badge-slate text-xs font-semibold px-3 py-1 rounded-full">
            3 Disciplinas
          </span>
        </div>

        {/* Classes Timeline / Matrix */}
        <div className="space-y-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-canvas-sand/60 border border-border-linen flex items-center justify-between hover:bg-surface transition-colors">
            <div className="flex items-center gap-3">
              <div className="text-center font-sans pr-3 border-r border-border-linen">
                <span className="text-xs font-bold text-ink">08:00</span>
                <span className="text-[10px] text-ink-light block">50 min</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink">Matemática Lúdica & Formas</h4>
                <p className="text-xs text-ink-muted flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3 h-3 text-calm-slate" /> Profª. Camila Rodrigues
                </p>
              </div>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-surface border border-border-linen text-ink-muted">
              Sala 14B
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-canvas-sand/60 border border-border-linen flex items-center justify-between hover:bg-surface transition-colors">
            <div className="flex items-center gap-3">
              <div className="text-center font-sans pr-3 border-r border-border-linen">
                <span className="text-xs font-bold text-ink">09:30</span>
                <span className="text-[10px] text-ink-light block">60 min</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink">Língua Portuguesa & Leitura</h4>
                <p className="text-xs text-ink-muted flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3 h-3 text-calm-slate" /> Profª. Helena Fontes
                </p>
              </div>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-surface border border-border-linen text-ink-muted">
              Biblioteca
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-canvas-sand/60 border border-border-linen flex items-center justify-between hover:bg-surface transition-colors">
            <div className="flex items-center gap-3">
              <div className="text-center font-sans pr-3 border-r border-border-linen">
                <span className="text-xs font-bold text-ink">11:00</span>
                <span className="text-[10px] text-ink-light block">45 min</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink">Educação Artística & Pintura</h4>
                <p className="text-xs text-ink-muted flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3 h-3 text-warm-terracotta" /> Ateliê Infantil
                </p>
              </div>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-warm-peach-light border border-border-peach text-warm-terracotta-dark font-medium">
              Usa Avental
            </span>
          </div>
        </div>

        {/* Integrated Backpack Checklist */}
        <div className="p-4 rounded-2xl bg-surface-subtle border border-border-linen">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Backpack className="w-4 h-4 text-calm-sage-dark" />
              <h4 className="font-serif text-sm font-semibold text-ink">
                Checklist da Mochila de Hoje
              </h4>
            </div>
            <span className="text-[11px] font-sans text-calm-sage-dark font-medium">
              {completedCount} de {backpackItems.length} prontos
            </span>
          </div>

          <div className="space-y-2">
            {backpackItems.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all duration-200 ${
                  item.checked
                    ? 'bg-calm-sage-light/60 text-ink-muted line-through'
                    : 'bg-surface hover:bg-canvas-sand text-ink'
                } border border-border-linen/60`}
              >
                {item.checked ? (
                  <CheckCircle2 className="w-4 h-4 text-calm-sage shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-border-linen hover:text-calm-sage shrink-0" />
                )}
                <span className="text-xs font-sans font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-border-linen flex items-center justify-between text-xs text-ink-muted">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-ink-light" />
          Saída às 12h15
        </span>
        <button className="text-warm-terracotta hover:text-warm-terracotta-dark font-medium text-xs font-serif italic hover:underline">
          Ver grade semanal completa →
        </button>
      </div>
    </div>
  );
};
