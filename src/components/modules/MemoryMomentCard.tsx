import React from 'react';
import { Camera, Heart, Palette, Award, Sparkles } from 'lucide-react';

export const MemoryMomentCard: React.FC = () => {
  return (
    <div className="planner-card p-6 sm:p-7 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border-linen mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-warm-peach-light text-warm-terracotta flex items-center justify-center border border-border-peach">
              <Heart className="w-5 h-5 fill-warm-peach stroke-warm-terracotta" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink">
                Memórias & Marcos de Vida
              </h3>
              <p className="text-xs text-ink-muted">Registros afetivos do crescimento</p>
            </div>
          </div>
          <span className="badge-peach text-xs font-semibold px-3 py-1 rounded-full">
            Feed de Momentos
          </span>
        </div>

        {/* Featured Polaroid Memory Frame */}
        <div className="p-4 rounded-2xl bg-surface-subtle border border-border-linen shadow-warm-sm mb-5">
          {/* Visual Canvas Representation */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-tr from-warm-peach-light via-canvas-sand to-calm-sage-light aspect-[16/9] flex items-center justify-center border border-border-linen/80 group">
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-surface/90 mx-auto flex items-center justify-center text-warm-terracotta shadow-warm-md mb-2 group-hover:scale-110 transition-transform duration-300">
                <Camera className="w-6 h-6 stroke-[1.5]" />
              </div>
              <span className="font-serif italic text-sm text-ink block">
                "Primeira Apresentação de Balé"
              </span>
              <span className="text-[11px] text-ink-muted font-sans">
                Teatro Municipal • 12 de Setembro
              </span>
            </div>

            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-sm text-warm-terracotta-dark text-[10px] font-bold uppercase tracking-wider border border-border-peach shadow-sm">
                #Conquistas
              </span>
            </div>
          </div>

          {/* Narrative text in editorial typography */}
          <div className="mt-3.5 px-1">
            <h4 className="font-serif text-base font-semibold text-ink leading-snug">
              Um passo de coragem no palco principal
            </h4>
            <p className="text-xs text-ink-muted font-sans leading-relaxed mt-1">
              "Helena estava com o coração acelerado antes de entrar, mas assim que a música começou, abriu o maior sorriso do mundo. Guardamos as sapatilhas como recordação."
            </p>
          </div>
        </div>

        {/* Development Milestones & Artwork Highlights */}
        <div className="grid grid-cols-2 gap-3">
          {/* Milestone 1 */}
          <div className="p-3 rounded-2xl bg-canvas-sand/60 border border-border-linen flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-calm-sage-light text-calm-sage-dark flex items-center justify-center shrink-0 mt-0.5">
              <Award className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-calm-sage-dark block">
                Marco Atingido
              </span>
              <h5 className="font-serif text-xs font-semibold text-ink">
                Leitura Autônoma
              </h5>
              <span className="text-[10px] text-ink-light">Lendo livros sozinha</span>
            </div>
          </div>

          {/* Milestone 2 (Artwork) */}
          <div className="p-3 rounded-2xl bg-canvas-sand/60 border border-border-linen flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-warm-peach-light text-warm-terracotta flex items-center justify-center shrink-0 mt-0.5">
              <Palette className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-warm-terracotta-dark block">
                Mural de Artes
              </span>
              <h5 className="font-serif text-xs font-semibold text-ink">
                Desenho da Família
              </h5>
              <span className="text-[10px] text-ink-light">Giz de cera no ateliê</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-border-linen flex items-center justify-between text-xs text-ink-muted">
        <span className="flex items-center gap-1 font-serif italic text-warm-terracotta">
          <Sparkles className="w-3.5 h-3.5" />
          14 memórias guardadas este ano
        </span>
        <button className="text-warm-terracotta hover:text-warm-terracotta-dark font-medium text-xs font-serif italic hover:underline">
          Abrir álbum de memórias →
        </button>
      </div>
    </div>
  );
};
