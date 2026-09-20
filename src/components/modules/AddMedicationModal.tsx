import React, { useState, useEffect } from 'react';
import {
  X,
  Pill,
  Clock,
  Bell,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { Medication } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  targetChildId: string;
  onSave: (med: Omit<Medication, 'id'>) => void;
}

export const AddMedicationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  targetChildId,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [intervalHours, setIntervalHours] = useState(8);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');
  const [instructions, setInstructions] = useState('');
  const [nextDoseTime, setNextDoseTime] = useState('14:00');
  const [reminderActive, setReminderActive] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
      setDosage('');
      setIntervalHours(8);
      setStartDate(new Date().toISOString().split('T')[0]);
      setEndDate('');
      setInstructions('');
      setNextDoseTime('14:00');
      setReminderActive(true);
      setErrorMsg('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Por favor, informe o nome do medicamento ou tratamento.');
      return;
    }
    if (!dosage.trim()) {
      setErrorMsg('Por favor, informe a dose (ex: 5.0 ml, 2 gotas, 1 comprimido).');
      return;
    }

    const startFormatted = new Date(startDate).toLocaleDateString('pt-BR');
    const endFormatted = endDate ? new Date(endDate).toLocaleDateString('pt-BR') : 'Uso contínuo';

    onSave({
      childId: targetChildId || 'helena',
      name: name.trim(),
      dosage: dosage.trim(),
      intervalHours: Number(intervalHours) || 8,
      startDate: startFormatted,
      endDate: endFormatted,
      isActive: true,
      instructions: instructions.trim() || 'Administrar conforme prescrição médica.',
      nextDoseTime: nextDoseTime.trim() || '12:00',
      reminderActive,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/40 backdrop-blur-sm transition-all duration-300">
      <div
        className="w-full max-w-lg bg-surface border border-border-linen rounded-3xl p-5 sm:p-7 shadow-warm-hover relative overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-warm-terracotta via-warm-peach to-calm-sage" />

        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-border-linen shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-warm-peach/50 text-warm-terracotta-dark flex items-center justify-center border border-warm-peach shadow-sm">
              <Pill className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-warm-peach/60 text-warm-terracotta-dark">
                Farmácia & Posologia
              </span>
              <h2 className="font-serif text-xl font-semibold text-ink mt-0.5">
                Novo Medicamento / Tratamento
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-canvas-sand border border-border-linen hover:bg-surface text-ink-muted hover:text-ink flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-1 py-4 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Nome e Dose */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
              Nome do Medicamento *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Amoxicilina + Clavulanato"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              className="w-full px-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                Dosagem por Administração *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: 5.0 ml, 2 gotas, 1 comp."
                value={dosage}
                onChange={(e) => {
                  setDosage(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                className="w-full px-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                Frequência / Intervalo
              </label>
              <select
                value={intervalHours}
                onChange={(e) => setIntervalHours(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
              >
                <option value={4}>A cada 4 horas (6x ao dia)</option>
                <option value={6}>A cada 6 horas (4x ao dia)</option>
                <option value={8}>A cada 8 horas (3x ao dia)</option>
                <option value={12}>A cada 12 horas (2x ao dia)</option>
                <option value={24}>A cada 24 horas (1x ao dia)</option>
              </select>
            </div>
          </div>

          {/* Horário da próxima dose e Período */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                Próxima Dose (Hora)
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-ink-light absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="time"
                  value={nextDoseTime}
                  onChange={(e) => setNextDoseTime(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                Início do Tratamento
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-xs focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                Término Previsto
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-xs focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30"
              />
            </div>
          </div>

          {/* Instruções */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
              Instruções & Cuidados de Uso
            </label>
            <input
              type="text"
              placeholder="Ex: Administrar sempre após as refeições. Agitar bem antes de usar."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
            />
          </div>

          {/* Notification toggle */}
          <div className="p-3.5 rounded-2xl bg-warm-peach-light/50 border border-warm-peach flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-warm-terracotta shrink-0" />
              <div>
                <span className="text-xs font-semibold text-ink block">
                  Lembrete de Dose Ativo
                </span>
                <span className="text-[11px] text-ink-muted block">
                  Notificar pais e cuidadores no horário exato da dose.
                </span>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={reminderActive}
                onChange={(e) => setReminderActive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-warm-terracotta"></div>
            </label>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-border-linen flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-2xl bg-canvas-sand hover:bg-surface border border-border-linen text-ink font-sans text-xs font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-2xl bg-warm-terracotta hover:bg-warm-terracotta-dark text-white font-sans text-xs font-semibold shadow-warm-md flex items-center gap-1.5 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Salvar Tratamento</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
