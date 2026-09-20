import React from 'react';
import {
  X,
  Users,
  Plus,
  Edit2,
  Trash2,
  School,
  Heart,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { Child } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  childrenList: Child[];
  selectedChildId: string;
  onSelectChild: (id: string) => void;
  onOpenCreateChild: () => void;
  onOpenEditChild: (child: Child) => void;
  onDeleteChild: (childId: string) => void;
}

export const FamilyManagerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  childrenList,
  selectedChildId,
  onSelectChild,
  onOpenCreateChild,
  onOpenEditChild,
  onDeleteChild,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/40 backdrop-blur-sm transition-all duration-300">
      <div
        className="w-full max-w-2xl bg-surface border border-border-linen rounded-3xl p-5 sm:p-7 shadow-warm-hover relative overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-warm-terracotta via-warm-peach to-calm-sage" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-border-linen">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-warm-peach/40 text-warm-terracotta-dark flex items-center justify-center border border-warm-peach shadow-sm">
              <Users className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-warm-terracotta text-white">
                  Família & Perfis
                </span>
                <span className="text-xs text-ink-muted">
                  {childrenList.length} membro{childrenList.length !== 1 ? 's' : ''} cadastrado{childrenList.length !== 1 ? 's' : ''}
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink mt-0.5">
                Gerenciar Membros da Família
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-canvas-sand border border-border-linen hover:bg-surface text-ink-muted hover:text-ink flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of Children */}
        <div className="flex-1 overflow-y-auto pr-1 py-4 space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs uppercase font-semibold tracking-wider text-ink-muted flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-warm-terracotta" />
              Filhos Registrados no Planner
            </span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCreateChild();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-warm-peach/30 border border-warm-peach text-warm-terracotta-dark text-xs font-semibold hover:bg-warm-peach/60 transition-all shadow-warm-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Filho(a)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {childrenList.map((child) => {
              const isActive = selectedChildId === child.id;
              return (
                <div
                  key={child.id}
                  className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isActive
                      ? 'bg-surface border-warm-terracotta/50 ring-2 ring-warm-terracotta/20 shadow-warm-md'
                      : 'bg-canvas-sand/60 border-border-linen hover:bg-surface'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-serif font-bold text-lg border border-border-linen shadow-sm ${child.avatarColor}`}
                    >
                      {child.initials || child.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-base font-semibold text-ink">
                          {child.name}
                        </h4>
                        {isActive && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-warm-terracotta text-white">
                            Ativo Agora
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted mt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-ink-light" />
                          {child.age || 'Idade n/d'}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <School className="w-3 h-3 text-ink-light" />
                          {child.grade || child.schoolName || 'Escola n/d'}
                        </span>
                        {child.bloodType && (
                          <>
                            <span>•</span>
                            <span className="font-medium text-warm-terracotta-dark">
                              Tipo {child.bloodType}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {!isActive && (
                      <button
                        type="button"
                        onClick={() => {
                          onSelectChild(child.id);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-canvas-sand hover:bg-surface border border-border-linen text-xs font-semibold text-ink transition-colors"
                      >
                        Alternar Contexto
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenEditChild(child);
                      }}
                      className="p-2 rounded-xl bg-surface hover:bg-warm-peach/30 border border-border-linen text-ink-muted hover:text-warm-terracotta transition-colors shadow-warm-sm"
                      title="Editar Perfil"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    {childrenList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Deseja realmente remover o perfil de ${child.name}?`
                            )
                          ) {
                            onDeleteChild(child.id);
                          }
                        }}
                        className="p-2 rounded-xl bg-surface hover:bg-red-50 border border-border-linen text-ink-muted hover:text-red-600 transition-colors shadow-warm-sm"
                        title="Excluir Perfil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Explanation */}
          <div className="p-4 rounded-2xl bg-canvas-sand/80 border border-border-linen flex items-start gap-3 mt-2">
            <Sparkles className="w-4 h-4 text-warm-terracotta shrink-0 mt-0.5" />
            <div className="text-xs text-ink-muted space-y-1">
              <p className="font-semibold text-ink">
                Como funciona a alternância de perfil:
              </p>
              <p>
                Ao selecionar o perfil de um filho, todas as rotinas, remédios,
                tarefas escolares, mochilas e memórias são filtrados automaticamente
                para aquele contexto em menos de 2 cliques.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-border-linen flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onSelectChild('all');
              onClose();
            }}
            className="text-xs text-ink-muted hover:text-ink font-sans underline underline-offset-4"
          >
            Selecionar Visão Geral da Família Unificada
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-2xl bg-canvas-sand hover:bg-surface border border-border-linen text-ink font-sans text-xs font-semibold transition-colors"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
};
