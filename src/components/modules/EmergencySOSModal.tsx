import React from 'react';
import { X, ShieldAlert, PhoneCall, AlertTriangle, Building2, User, FileText } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  childName: string;
}

export const EmergencySOSModal: React.FC<Props> = ({ isOpen, onClose, childName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/30 backdrop-blur-sm transition-all duration-300">
      <div
        className="w-full max-w-2xl bg-surface border border-border-linen rounded-3xl p-6 sm:p-8 shadow-warm-hover relative overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-warm-terracotta via-warm-peach to-calm-sage" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-border-linen mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-warm-peach-light text-warm-terracotta flex items-center justify-center border border-border-peach shadow-sm">
              <ShieldAlert className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-warm-terracotta text-white">
                  Acesso de Emergência
                </span>
                <span className="text-xs text-ink-muted">Cartão Clínico Oficial</span>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-ink mt-0.5">
                Resumo de Saúde de {childName}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-canvas-sand border border-border-linen hover:bg-surface text-ink-muted hover:text-ink flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Vitals Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-center">
            <span className="text-[11px] text-ink-muted block uppercase font-medium">Tipo Sanguíneo</span>
            <span className="font-serif text-2xl font-bold text-warm-terracotta mt-0.5 block">
              A +
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-center">
            <span className="text-[11px] text-ink-muted block uppercase font-medium">Idade</span>
            <span className="font-serif text-2xl font-bold text-ink mt-0.5 block">
              7 anos
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-center">
            <span className="text-[11px] text-ink-muted block uppercase font-medium">Peso Recente</span>
            <span className="font-serif text-2xl font-bold text-ink mt-0.5 block">
              24.2 kg
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-center">
            <span className="text-[11px] text-ink-muted block uppercase font-medium">Convênio</span>
            <span className="font-sans text-xs font-semibold text-calm-slate-dark mt-2 block">
              SulAmérica Especial
            </span>
          </div>
        </div>

        {/* Critical Allergies Box (High Priority) */}
        <div className="p-4 rounded-2xl bg-warm-peach-light/80 border border-warm-peach mb-6">
          <div className="flex items-center gap-2 mb-2 text-warm-terracotta-dark font-semibold text-sm">
            <AlertTriangle className="w-4 h-4 text-warm-terracotta" />
            <span>Alergias Graves & Intolerâncias (Atenção Crítica):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-surface text-warm-terracotta-dark font-semibold text-xs border border-warm-peach shadow-sm">
              ⚠️ Amendoim / Castanhas (Risco Anafilaxia)
            </span>
            <span className="px-3 py-1 rounded-full bg-surface text-warm-terracotta-dark font-semibold text-xs border border-warm-peach shadow-sm">
              ⚠️ Penicilina & Derivados
            </span>
            <span className="px-3 py-1 rounded-full bg-surface text-ink-muted text-xs border border-border-linen">
              Sensibilidade a Picada de Abelha
            </span>
          </div>
        </div>

        {/* Emergency Contacts & Hospital Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Pediatrician Card */}
          <div className="p-4 rounded-2xl bg-surface-subtle border border-border-linen flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-calm-sage-light text-calm-sage-dark flex items-center justify-center border border-calm-sage/30">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-calm-sage-dark block">
                  Pediatra Responsável
                </span>
                <h4 className="font-serif text-sm font-semibold text-ink">
                  Dra. Beatriz Albuquerque
                </h4>
                <p className="text-xs text-ink-muted">CRM 142.890-SP</p>
              </div>
            </div>

            <a
              href="tel:+5511999998888"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-calm-sage text-white text-xs font-semibold shadow-sm hover:bg-calm-sage-dark transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Ligar</span>
            </a>
          </div>

          {/* Reference Hospital Card */}
          <div className="p-4 rounded-2xl bg-surface-subtle border border-border-linen flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-calm-slate-light text-calm-slate-dark flex items-center justify-center border border-calm-slate/30">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-calm-slate-dark block">
                  Hospital de Referência
                </span>
                <h4 className="font-serif text-sm font-semibold text-ink">
                  Hospital Infantil Sabará
                </h4>
                <p className="text-xs text-ink-muted">Pronto-Atendimento 24h</p>
              </div>
            </div>

            <a
              href="tel:+551131552800"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-calm-slate text-white text-xs font-semibold shadow-sm hover:bg-calm-slate-dark transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Ligar</span>
            </a>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-border-linen flex items-center justify-between">
          <button className="flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink font-sans transition-colors">
            <FileText className="w-4 h-4 text-warm-terracotta" />
            <span>Compartilhar Ficha com Cuidador/Escola (PDF)</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-canvas-sand hover:bg-surface border border-border-linen text-ink font-sans text-xs font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
