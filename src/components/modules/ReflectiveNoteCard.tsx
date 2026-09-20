import React, { useState } from 'react';
import { Bookmark, Pin, Tag, Sparkles, Plus } from 'lucide-react';

export const ReflectiveNoteCard: React.FC = () => {
  const [notes] = useState([
    {
      id: 1,
      title: 'Acordo sobre o tempo de telas durante a semana',
      snippet: 'Combinamos que de segunda a quinta não haverá tablet antes das 18h e sempre após a lição de casa. Ela sugeriu ajudar a fazer o bolo no sábado como troca.',
      tag: '#comportamento',
      tagBadge: 'badge-peach',
      isPinned: true,
      date: 'Ontem às 20h30',
    },
    {
      id: 2,
      title: 'Dicas da psicopedagoga sobre leitura compartilhada',
      snippet: 'Fazer pausas dramáticas e perguntar: "O que você acha que o personagem vai fazer agora?". Isso estimula a antecipação e interpretação textual.',
      tag: '#escola',
      tagBadge: 'badge-slate',
      isPinned: false,
      date: '14 de Setembro',
    },
  ]);

  return (
    <div className="planner-card p-6 sm:p-7 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border-linen mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-canvas-sand text-warm-terracotta flex items-center justify-center border border-border-peach">
              <Bookmark className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink">
                Bloco de Notas & Reflexões
              </h3>
              <p className="text-xs text-ink-muted">Orientações pedagógicas e combinados</p>
            </div>
          </div>
          <button className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-warm-peach-light text-warm-terracotta-dark border border-warm-peach hover:bg-warm-peach transition-colors">
            <Plus className="w-3.5 h-3.5" />
            <span>Nova Nota</span>
          </button>
        </div>

        {/* Notes Feed */}
        <div className="space-y-3.5">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-4 rounded-2xl border transition-all duration-200 relative ${
                note.isPinned
                  ? 'bg-canvas-sand/70 border-border-peach/80 shadow-warm-sm'
                  : 'bg-surface border-border-linen hover:bg-canvas-sand/40'
              }`}
            >
              {note.isPinned && (
                <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-medium text-warm-terracotta">
                  <Pin className="w-3 h-3 fill-warm-terracotta" />
                  <span>Fixada</span>
                </div>
              )}

              <div className="flex items-center gap-2 mb-1.5">
                <span className={`${note.tagBadge} text-[10px] font-semibold px-2 py-0.2 rounded-full`}>
                  {note.tag}
                </span>
                <span className="text-[10px] text-ink-light">• {note.date}</span>
              </div>

              <h4 className="font-serif text-sm font-semibold text-ink leading-snug">
                {note.title}
              </h4>
              <p className="text-xs text-ink-muted font-sans leading-relaxed mt-1 line-clamp-2">
                {note.snippet}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Tag Pills Filter */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border-linen overflow-x-auto pb-1">
          <span className="text-[11px] text-ink-light flex items-center gap-1 shrink-0 font-medium">
            <Tag className="w-3 h-3" /> Filtrar:
          </span>
          <span className="badge-peach text-[10px] font-medium px-2 py-0.5 rounded-full cursor-pointer hover:opacity-80">
            #comportamento
          </span>
          <span className="badge-slate text-[10px] font-medium px-2 py-0.5 rounded-full cursor-pointer hover:opacity-80">
            #escola
          </span>
          <span className="badge-sage text-[10px] font-medium px-2 py-0.5 rounded-full cursor-pointer hover:opacity-80">
            #saude
          </span>
          <span className="text-[10px] text-ink-muted bg-canvas-sand px-2 py-0.5 rounded-full border border-border-linen cursor-pointer">
            #ideias
          </span>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-border-linen flex items-center justify-between text-xs text-ink-muted">
        <span className="flex items-center gap-1 font-serif italic">
          <Sparkles className="w-3.5 h-3.5 text-warm-terracotta" />
          Reflexões ajudam a manter a harmonia
        </span>
        <button className="text-warm-terracotta hover:text-warm-terracotta-dark font-medium text-xs font-serif italic hover:underline">
          Ver todas as notas →
        </button>
      </div>
    </div>
  );
};
