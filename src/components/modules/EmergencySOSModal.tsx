import React from 'react';
import {
  X,
  ShieldAlert,
  PhoneCall,
  AlertTriangle,
  Building2,
  User,
  FileText,
} from 'lucide-react';
import { useFamily } from '../../context/FamilyContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  childName?: string;
}

export const EmergencySOSModal: React.FC<Props> = ({ isOpen, onClose, childName }) => {
  const { activeChild, children, growthRecords } = useFamily();

  if (!isOpen) return null;

  const currentChild = activeChild || (children.length > 0 ? children[0] : null);
  const displayName = childName || (currentChild ? currentChild.name : 'Família');

  // Find latest weight if available
  const latestGrowth = growthRecords.find(
    (g) => currentChild && g.childId === currentChild.id
  );
  const displayWeight = latestGrowth ? `${latestGrowth.weightKg} kg` : '24.2 kg';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/40 backdrop-blur-sm transition-all duration-300">
      <div
        className="w-full max-w-2xl bg-surface border border-border-linen rounded-3xl p-5 sm:p-7 shadow-warm-xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-warm-terracotta via-warm-peach to-calm-sage" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-border-linen mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-warm-peach-light text-warm-terracotta flex items-center justify-center border border-border-peach shadow-sm shrink-0">
              <ShieldAlert className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-warm-terracotta text-white">
                  Acesso de Emergência
                </span>
                <span className="text-xs text-ink-muted">Cartão Clínico Oficial</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink mt-0.5">
                Resumo de Saúde de {displayName}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-canvas-sand border border-border-linen hover:bg-surface text-ink-muted hover:text-ink flex items-center justify-center transition-colors shrink-0 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          
          {/* Quick Vitals Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <div className="p-3 sm:p-3.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-center flex flex-col justify-center">
              <span className="text-[10px] sm:text-[11px] text-ink-muted block uppercase font-medium">
                Tipo Sanguíneo
              </span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-warm-terracotta mt-0.5 block">
                {currentChild?.bloodType || 'A +'}
              </span>
            </div>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-center flex flex-col justify-center">
              <span className="text-[10px] sm:text-[11px] text-ink-muted block uppercase font-medium">
                Idade
              </span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-ink mt-0.5 block">
                {currentChild?.age || '7 anos'}
              </span>
            </div>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-center flex flex-col justify-center">
              <span className="text-[10px] sm:text-[11px] text-ink-muted block uppercase font-medium">
                Peso Recente
              </span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-ink mt-0.5 block">
                {displayWeight}
              </span>
            </div>

            {/* Convênio Card with graceful text wrapping */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-center flex flex-col justify-center">
              <span className="text-[10px] sm:text-[11px] text-ink-muted block uppercase font-medium">
                Convênio
              </span>
              <span className="font-sans text-xs font-semibold text-calm-slate-dark mt-1 block leading-snug line-clamp-2 break-words">
                {currentChild?.healthInsurance || 'Particular'}
              </span>
            </div>
          </div>

          {/* Critical Allergies Box (High Priority) */}
          <div className="p-4 rounded-2xl bg-warm-peach-light/80 border border-warm-peach">
            <div className="flex items-center gap-2 mb-2 text-warm-terracotta-dark font-semibold text-xs sm:text-sm">
              <AlertTriangle className="w-4 h-4 text-warm-terracotta shrink-0" />
              <span>Alergias Graves &amp; Intolerâncias (Atenção Crítica):</span>
            </div>
            {currentChild && currentChild.allergies && currentChild.allergies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {currentChild.allergies.map((allergy, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-surface text-warm-terracotta-dark font-semibold text-xs border border-warm-peach shadow-sm inline-flex items-center gap-1.5"
                  >
                    <span>⚠️</span>
                    <span>{allergy}</span>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-ink-muted italic">
                Nenhuma alergia grave ou restrição médica informada para este perfil.
              </p>
            )}
          </div>

          {/* Emergency Contacts & Hospital Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            
            {/* Pediatrician Card */}
            <div className="p-4 rounded-2xl bg-canvas-sand/40 border border-border-linen flex items-center justify-between gap-3 shadow-warm-sm">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-2xl bg-calm-sage-light text-calm-sage-dark flex items-center justify-center border border-calm-sage/30 shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-calm-sage-dark block">
                    Pediatra Responsável
                  </span>
                  <h4 className="font-serif text-sm font-semibold text-ink truncate">
                    {currentChild?.pediatricianName || 'Dra. Beatriz Albuquerque'}
                  </h4>
                  <p className="text-xs text-ink-muted truncate">
                    {currentChild?.pediatricianCrm || 'CRM 142.890-SP'}
                  </p>
                </div>
              </div>

              {currentChild?.pediatricianPhone ? (
                <a
                  href={`tel:${currentChild.pediatricianPhone.replace(/\D/g, '')}`}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-calm-sage hover:bg-calm-sage-dark text-white text-xs font-semibold shadow-sm transition-all shrink-0"
                  title={`Ligar para ${currentChild.pediatricianPhone}`}
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Ligar</span>
                </a>
              ) : (
                <span className="text-[11px] text-ink-muted italic shrink-0">Sem tel.</span>
              )}
            </div>

            {/* Reference Hospital Card */}
            <div className="p-4 rounded-2xl bg-canvas-sand/40 border border-border-linen flex items-center justify-between gap-3 shadow-warm-sm">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-2xl bg-calm-slate-light text-calm-slate-dark flex items-center justify-center border border-calm-slate/30 shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-calm-slate-dark block">
                    Hospital de Referência
                  </span>
                  <h4 className="font-serif text-sm font-semibold text-ink truncate">
                    {currentChild?.referenceHospital || 'Hospital Infantil Sabará'}
                  </h4>
                  <p className="text-xs text-ink-muted truncate">Pronto-Atendimento</p>
                </div>
              </div>

              {currentChild?.referenceHospitalPhone ? (
                <a
                  href={`tel:${currentChild.referenceHospitalPhone.replace(/\D/g, '')}`}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-calm-slate hover:bg-calm-slate-dark text-white text-xs font-semibold shadow-sm transition-all shrink-0"
                  title={`Ligar para ${currentChild.referenceHospitalPhone}`}
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Ligar</span>
                </a>
              ) : (
                <span className="text-[11px] text-ink-muted italic shrink-0">Sem tel.</span>
              )}
            </div>

          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-3.5 mt-3 border-t border-border-linen flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={() => alert(`Ficha clínica e contatos de ${displayName} prontos para envio em PDF.`)}
            className="flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink font-sans transition-colors"
          >
            <FileText className="w-4 h-4 text-warm-terracotta" />
            <span className="hidden sm:inline">Compartilhar Ficha com Cuidador/Escola (PDF)</span>
            <span className="sm:hidden">Compartilhar (PDF)</span>
          </button>

          <button
            type="button"
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
