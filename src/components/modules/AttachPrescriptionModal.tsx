import React, { useState, useEffect } from 'react';
import {
  X,
  FileText,
  User,
  Building2,
  Calendar,
  Pill,
  Upload,
  Image as ImageIcon,
  Lock,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { useFamily } from '../../context/FamilyContext';
import { MedicalPrescription } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  targetChildId: string;
}

const SAMPLE_PRESCRIPTION_IMAGES = [
  {
    id: 'sample-1',
    label: 'Receita Pediátrica Padrão',
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'sample-2',
    label: 'Receituário Farmacêutico Digital',
    url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'sample-3',
    label: 'Laudo & Prescrição Clínica',
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
  },
];

export const AttachPrescriptionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  targetChildId,
}) => {
  const { activeChild, children, addPrescription } = useFamily();

  const currentChild =
    children.find((c) => c.id === targetChildId) || activeChild || children[0];

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [doctorName, setDoctorName] = useState('');
  const [doctorCrm, setDoctorCrm] = useState('');
  const [clinic, setClinic] = useState('');
  const [medicationsSummary, setMedicationsSummary] = useState('');
  const [dosageInstructions, setDosageInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState(SAMPLE_PRESCRIPTION_IMAGES[0].url);
  const [notes, setNotes] = useState('');
  const [syncToVault, setSyncToVault] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDate(new Date().toISOString().split('T')[0]);
      setDoctorName(currentChild?.pediatricianName || '');
      setDoctorCrm(currentChild?.pediatricianCrm || '');
      setClinic(currentChild?.referenceHospital || '');
      setMedicationsSummary('');
      setDosageInstructions('');
      setImageUrl(SAMPLE_PRESCRIPTION_IMAGES[0].url);
      setNotes('');
      setSyncToVault(true);
      setErrorMsg('');
    }
  }, [isOpen, currentChild]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Por favor, informe o título da prescrição ou medicamento principal.');
      return;
    }
    if (!medicationsSummary.trim()) {
      setErrorMsg('Por favor, descreva os medicamentos e doses prescritas.');
      return;
    }

    const payload: Omit<MedicalPrescription, 'id'> = {
      childId: currentChild ? currentChild.id : 'helena',
      title: title.trim(),
      date: new Date(date).toLocaleDateString('pt-BR'),
      doctorName: doctorName.trim() || undefined,
      doctorCrm: doctorCrm.trim() || undefined,
      clinic: clinic.trim() || undefined,
      medicationsSummary: medicationsSummary.trim(),
      dosageInstructions: dosageInstructions.trim() || undefined,
      imageUrl: imageUrl || undefined,
      notes: notes.trim() || undefined,
      syncedToVault: syncToVault,
    };

    addPrescription(payload, syncToVault);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/40 backdrop-blur-sm transition-all duration-300">
      <div
        className="w-full max-w-2xl bg-surface border border-border-linen rounded-3xl p-5 sm:p-7 shadow-warm-hover relative overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
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
                  Prescrição Médica
                </span>
                <span className="text-xs text-ink-muted">
                  Para: {currentChild ? currentChild.name : 'Família'}
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink mt-0.5">
                Anexar Receita & Histórico Clínico
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-1 py-4 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Title and Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                Título da Receita / Diagnóstico *
              </label>
              <div className="relative">
                <Pill className="w-4 h-4 text-ink-light absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Ex: Receita Amoxicilina - Otite Aguda"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-calm-sage/30 focus:border-calm-sage transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                Data do Atendimento
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-ink-light absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-calm-sage/30 focus:border-calm-sage transition-all"
                />
              </div>
            </div>
          </div>

          {/* Doctor and Clinic */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                Pediatra / Médico(a)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-ink-light absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Ex: Dra. Beatriz Albuquerque"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-calm-sage/30 focus:border-calm-sage transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                CRM
              </label>
              <input
                type="text"
                placeholder="CRM 142.890-SP"
                value={doctorCrm}
                onChange={(e) => setDoctorCrm(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-calm-sage/30 focus:border-calm-sage transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                Hospital / Clínica
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-ink-light absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Ex: Hospital Sabará"
                  value={clinic}
                  onChange={(e) => setClinic(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-calm-sage/30 focus:border-calm-sage transition-all"
                />
              </div>
            </div>
          </div>

          {/* Medicines and Dosages */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
              Medicamentos Prescritos & Posologia *
            </label>
            <textarea
              rows={2}
              required
              placeholder="Ex: Amoxicilina 250mg/5ml (5ml de 8 em 8 horas durante 7 dias) + Soro Fisiológico para lavagem"
              value={medicationsSummary}
              onChange={(e) => {
                setMedicationsSummary(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              className="w-full p-3 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-calm-sage/30 focus:border-calm-sage transition-all"
            />
          </div>

          {/* Notes & Instructions */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
              Instruções Adicionais & Recomendações do Pediatra
            </label>
            <input
              type="text"
              placeholder="Ex: Tomar após as refeições. Retornar se a febre persistir após 48h."
              value={dosageInstructions}
              onChange={(e) => setDosageInstructions(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-ink text-sm focus:outline-none focus:ring-2 focus:ring-calm-sage/30 focus:border-calm-sage transition-all"
            />
          </div>

          {/* Prescription Image / Document Upload */}
          <div className="p-4 rounded-2xl bg-canvas-sand/60 border border-border-linen space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-calm-sage-dark" />
                Imagem / Foto Digitalizada da Receita
              </span>
              <span className="text-[10px] text-ink-muted font-normal lowercase">
                (fotos, scans ou amostras)
              </span>
            </label>

            <div className="flex flex-col sm:flex-row gap-3 items-center">
              {/* Image Preview */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-border-linen bg-surface relative shrink-0 shadow-sm">
                <img
                  src={imageUrl}
                  alt="Pré-visualização da receita"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Upload or Choose sample */}
              <div className="flex-1 space-y-2 w-full">
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-surface border border-border-linen text-ink text-xs font-semibold hover:bg-canvas-sand flex items-center gap-1.5 transition-all shadow-warm-sm">
                    <Upload className="w-3.5 h-3.5 text-warm-terracotta" />
                    <span>Carregar Foto da Receita</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-xs text-ink-muted">ou selecione amostra:</span>
                </div>

                {/* Sample Swatches */}
                <div className="grid grid-cols-3 gap-2">
                  {SAMPLE_PRESCRIPTION_IMAGES.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => setImageUrl(sample.url)}
                      className={`text-[10px] p-1.5 rounded-xl border text-left truncate transition-all ${
                        imageUrl === sample.url
                          ? 'bg-surface border-calm-sage ring-2 ring-calm-sage/30 text-ink font-semibold'
                          : 'bg-surface/50 border-border-linen text-ink-muted hover:bg-surface'
                      }`}
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sync with Document Vault */}
          <div className="p-3.5 rounded-2xl bg-calm-sage-light/40 border border-calm-sage/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-calm-sage-dark shrink-0" />
              <div>
                <span className="text-xs font-semibold text-ink block">
                  Salvar cópia segura no Cofre Familiar
                </span>
                <span className="text-[11px] text-ink-muted block">
                  Arquiva automaticamente na pasta "Saúde & Laudos" do cofre documental.
                </span>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={syncToVault}
                onChange={(e) => setSyncToVault(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-calm-sage"></div>
            </label>
          </div>

          {/* Footer Actions */}
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
              className="px-5 py-2.5 rounded-2xl bg-calm-sage-dark hover:bg-calm-sage text-white font-sans text-xs font-semibold shadow-warm-md flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5"
            >
              <Check className="w-4 h-4" />
              <span>Salvar & Anexar Receita</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
