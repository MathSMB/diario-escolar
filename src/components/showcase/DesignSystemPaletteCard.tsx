import React from 'react';
import { Palette, Layers, Type, Feather, Compass } from 'lucide-react';

export const DesignSystemPaletteCard: React.FC = () => {
  const palette = [
    {
      role: 'Canvas (Fundo)',
      name: 'Creme de Linho',
      hex: '#F7F4F0',
      bgClass: 'bg-[#F7F4F0]',
      textColor: 'text-ink',
      borderClass: 'border-border-linen',
    },
    {
      role: 'Superfícies (Cartões)',
      name: 'Branco Alabastro',
      hex: '#FFFFFF',
      bgClass: 'bg-[#FFFFFF]',
      textColor: 'text-ink',
      borderClass: 'border-border-linen',
    },
    {
      role: 'Acento Calor (Badges)',
      name: 'Pêssego Aveludado',
      hex: '#EACFBD',
      bgClass: 'bg-[#EACFBD]',
      textColor: 'text-ink',
      borderClass: 'border-transparent',
    },
    {
      role: 'Acento Calor (Ações)',
      name: 'Terracota Queimado',
      hex: '#BC7C67',
      bgClass: 'bg-[#BC7C67]',
      textColor: 'text-white',
      borderClass: 'border-transparent',
    },
    {
      role: 'Equilíbrio (Saúde/Calma)',
      name: 'Verde Sálvia',
      hex: '#8A9A8C',
      bgClass: 'bg-[#8A9A8C]',
      textColor: 'text-white',
      borderClass: 'border-transparent',
    },
    {
      role: 'Equilíbrio (Dados/Rotina)',
      name: 'Azul Ardósia',
      hex: '#778899',
      bgClass: 'bg-[#778899]',
      textColor: 'text-white',
      borderClass: 'border-transparent',
    },
    {
      role: 'Tinta & Tipografia',
      name: 'Grafite Quente',
      hex: '#3D3A38',
      bgClass: 'bg-[#3D3A38]',
      textColor: 'text-white',
      borderClass: 'border-transparent',
    },
  ];

  return (
    <div className="planner-card p-6 sm:p-8 mb-8 border border-border-peach/60 bg-gradient-to-br from-surface via-surface to-canvas-sand/40">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-border-linen mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-warm-peach-light text-warm-terracotta flex items-center justify-center border border-border-peach shadow-sm">
            <Palette className="w-6 h-6 stroke-[1.75]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-warm-peach text-warm-terracotta-dark">
                Refúgio Visual
              </span>
              <span className="text-xs text-ink-muted">Design System de Luxo & Papelaria</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink mt-0.5">
              Diretrizes Estéticas & Paleta Orgânica Matte
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-serif italic text-warm-terracotta bg-surface px-3 py-1.5 rounded-2xl border border-border-linen self-start sm:self-auto">
          <Feather className="w-4 h-4" />
          <span>Experiência Táctil & Acolhedora (30-45 anos)</span>
        </div>
      </div>

      {/* Swatches Grid */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3 flex items-center gap-1.5 font-sans">
          <Compass className="w-3.5 h-3.5 text-warm-terracotta" />
          Paleta de Cores de Alta Sofisticação (Zero Cores Saturadas)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {palette.map((color, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-surface border border-border-linen shadow-warm-sm flex flex-col justify-between hover:scale-[1.03] transition-transform duration-200"
            >
              <div
                className={`w-full h-12 rounded-xl mb-2.5 shadow-sm border ${color.borderClass} ${color.bgClass} flex items-end justify-end p-1.5`}
              >
                <span className={`text-[9px] font-mono font-bold uppercase ${color.textColor} opacity-90`}>
                  {color.hex}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-ink block leading-tight">
                  {color.name}
                </span>
                <span className="text-[9px] text-ink-muted block mt-0.5 font-sans leading-tight">
                  {color.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography & Tactility Demonstration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Typography Dualism */}
        <div className="p-4 rounded-2xl bg-canvas-sand/60 border border-border-linen">
          <div className="flex items-center gap-2 mb-2 text-ink font-semibold text-xs">
            <Type className="w-4 h-4 text-warm-terracotta" />
            <span>Tipografia Híbrida:</span>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-surface border border-border-linen/80">
              <span className="text-[10px] uppercase font-bold tracking-wider text-warm-terracotta block">
                Fraunces / Lora (Serif Contemporânea)
              </span>
              <p className="font-serif text-lg font-medium text-ink mt-1 italic">
                "Guardando cada instante com afeto, ordem e significado."
              </p>
              <span className="text-[10px] text-ink-muted block mt-1">
                Usada para: Títulos principais, momentos afetivos e reflexões.
              </span>
            </div>

            <div className="p-3 rounded-xl bg-surface border border-border-linen/80">
              <span className="text-[10px] uppercase font-bold tracking-wider text-calm-slate-dark block">
                Plus Jakarta Sans (Sans-Serif Humanista)
              </span>
              <p className="font-sans text-sm font-medium text-ink mt-1">
                Grade de Horários • 08:30 às 11:45 • Amoxicilina 5.0ml
              </p>
              <span className="text-[10px] text-ink-muted block mt-1">
                Usada para: Dados clínicos, calendários, tabelas e listas de tarefas.
              </span>
            </div>
          </div>
        </div>

        {/* Tactile Curves & Diffuse Shadows */}
        <div className="p-4 rounded-2xl bg-canvas-sand/60 border border-border-linen flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 text-ink font-semibold text-xs">
              <Layers className="w-4 h-4 text-calm-sage-dark" />
              <span>Sensação Física & Movimento:</span>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed mb-3">
              Superfícies com cantos macios (raios <strong>rounded-2xl a 3xl</strong>) e elevação quente difusa que fazem os cartões parecerem papéis encadernados flutuando suavemente sobre a mesa.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border-linen">
            <div className="px-3.5 py-1.5 rounded-2xl bg-surface border border-border-linen text-ink font-sans text-xs shadow-warm-sm">
              Sombra Difusa Quente
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-calm-sage-light text-calm-sage-dark text-xs font-medium border border-calm-sage/30">
              Microinterações Suaves
            </div>
            <div className="px-3.5 py-1.5 rounded-2xl bg-warm-peach-light text-warm-terracotta-dark text-xs font-semibold border border-warm-peach">
              SLA &lt; 2 Cliques
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
