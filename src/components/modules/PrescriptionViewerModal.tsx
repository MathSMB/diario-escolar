import React from 'react';
import {
  X,
  FileText,
  Calendar,
  User,
  Building2,
  Lock,
  Share2,
  Trash2,
} from 'lucide-react';
import { MedicalPrescription } from '../../types';

interface Props {
  prescription: MedicalPrescription | null;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

export const PrescriptionViewerModal: React.FC<Props> = ({
  prescription,
  onClose,
  onDelete,
}) => {
  if (!prescription) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/50 backdrop-blur-sm transition-all duration-300">
      <div
        className="w-full max-w-3xl bg-surface border border-border-linen rounded-3xl p-5 sm:p-7 shadow-warm-hover relative overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-calm-sage via-warm-peach to-warm-terracotta" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-border-linen shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-calm-sage-light text-calm-sage-dark flex items-center justify-center border border-calm-sage/30 shadow-sm">
              <FileText className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-calm-sage-light text-calm-sage-dark">
                  Prescrição Digitalizada
                </span>
                {prescription.syncedToVault && (
                  <span className="text-[10px] text-calm-slate-dark bg-canvas-sand px-2 py-0.5 rounded-full border border-border-linen flex items-center gap-1">
                    <Lock className="w-3 h-3 text-calm-sage-dark" />
                    Cofre Familiar
                  </span>
                )}
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink mt-0.5">
                {prescription.title}
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

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto pr-1 py-4 space-y-4">
          {/* Metadata Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-canvas-sand/60 border border-border-linen">
              <span className="text-[10px] uppercase font-bold text-ink-muted block flex items-center gap-1">
                <Calendar className="w-3 h-3 text-warm-terracotta" />
                Data de Emissão
              </span>
              <p className="font-serif text-sm font-semibold text-ink mt-0.5">
                {prescription.date}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-canvas-sand/60 border border-border-linen">
              <span className="text-[10px] uppercase font-bold text-ink-muted block flex items-center gap-1">
                <User className="w-3 h-3 text-calm-sage-dark" />
                Pediatra / Médico
              </span>
              <p className="font-serif text-sm font-semibold text-ink mt-0.5 truncate">
                {prescription.doctorName || 'Não especificado'}
              </p>
              {prescription.doctorCrm && (
                <p className="text-[11px] text-ink-muted">{prescription.doctorCrm}</p>
              )}
            </div>

            <div className="p-3 rounded-2xl bg-canvas-sand/60 border border-border-linen">
              <span className="text-[10px] uppercase font-bold text-ink-muted block flex items-center gap-1">
                <Building2 className="w-3 h-3 text-calm-slate-dark" />
                Hospital / Local
              </span>
              <p className="font-serif text-sm font-semibold text-ink mt-0.5 truncate">
                {prescription.clinic || 'Consultório Clínico'}
              </p>
            </div>
          </div>

          {/* Medicines Summary */}
          <div className="p-4 rounded-2xl bg-surface-subtle border border-border-linen space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-warm-terracotta-dark block">
              Medicamentos Prescritos & Posologia:
            </span>
            <p className="text-sm text-ink font-medium leading-relaxed">
              {prescription.medicationsSummary}
            </p>
            {prescription.dosageInstructions && (
              <p className="text-xs text-ink-muted pt-1 border-t border-border-linen mt-2">
                <strong>Orientações:</strong> {prescription.dosageInstructions}
              </p>
            )}
          </div>

          {/* Document / Photo View */}
          {prescription.imageUrl && (
            <div className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Foto Digitalizada da Receita:
              </span>
              <div className="w-full rounded-2xl overflow-hidden border border-border-linen bg-ink/5 p-2 flex items-center justify-center">
                <img
                  src={prescription.imageUrl}
                  alt={prescription.title}
                  className="max-h-[360px] w-auto object-contain rounded-xl shadow-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-border-linen flex items-center justify-between gap-3">
          <div>
            {onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Deseja realmente remover esta receita médica do histórico?')) {
                    onDelete(prescription.id);
                    onClose();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-red-700 hover:bg-red-50 text-xs font-semibold transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Excluir</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert(`Compartilhando prescrição médica de ${prescription.title}...`)}
              className="px-3.5 py-2 rounded-2xl bg-canvas-sand hover:bg-surface border border-border-linen text-ink font-sans text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-warm-terracotta" />
              <span>Compartilhar</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-2xl bg-calm-sage text-white font-sans text-xs font-semibold transition-colors shadow-sm hover:bg-calm-sage-dark"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
