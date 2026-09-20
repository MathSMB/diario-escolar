import React, { useState } from 'react';
import { useFamily } from '../context/FamilyContext';
import {
  HeartPulse,
  Pill,
  Syringe,
  Stethoscope,
  Activity,
  Plus,
  Clock,
  Check,
  CheckCircle2,
  Circle,
  PhoneCall,
  FileText,
  Calendar,
  Bell,
  BellOff,
  ExternalLink,
  Lock,
  Eye,
  Trash2,
  Sparkles,
  Share2,
  ShieldCheck,
} from 'lucide-react';
import { AttachPrescriptionModal } from '../components/modules/AttachPrescriptionModal';
import { AddMedicationModal } from '../components/modules/AddMedicationModal';
import { PrescriptionViewerModal } from '../components/modules/PrescriptionViewerModal';
import { createGoogleCalendarUrl } from '../utils/calendar';
import { MedicalPrescription, Medication } from '../types';

export const HealthView: React.FC = () => {
  const {
    activeChild,
    selectedChildId,
    medications,
    prescriptions,
    medicationLogs,
    vaccines,
    appointments,
    growthRecords,
    logMedicationDose,
    toggleVaccine,
    addGrowthRecord,
    addAppointment,
    addMedication,
    deleteMedication,
    toggleMedicationReminder,
    deletePrescription,
  } = useFamily();

  const [activeTab, setActiveTab] = useState<'farmacia' | 'vacinas' | 'consultas' | 'curva'>('farmacia');

  // Modals state
  const [showAttachPrescriptionModal, setShowAttachPrescriptionModal] = useState(false);
  const [showAddMedicationModal, setShowAddMedicationModal] = useState(false);
  const [viewingPrescription, setViewingPrescription] = useState<MedicalPrescription | null>(null);
  const [showGrowthModal, setShowGrowthModal] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Growth State
  const [newHeight, setNewHeight] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // New Appointment State
  const [newSpec, setNewSpec] = useState('');
  const [newDoc, setNewDoc] = useState('');
  const [newDiag, setNewDiag] = useState('');
  const [newAppDate, setNewAppDate] = useState('');

  const childName = activeChild ? activeChild.name : 'Família Unificada';

  const filteredMeds = medications.filter((m) =>
    selectedChildId === 'all' ? true : m.childId === selectedChildId
  );

  const filteredPrescriptions = prescriptions.filter((p) =>
    selectedChildId === 'all' ? true : p.childId === selectedChildId
  );

  const filteredLogs = medicationLogs.filter((l) =>
    selectedChildId === 'all' ? true : l.childId === selectedChildId
  );

  const filteredVaccines = vaccines.filter((v) =>
    selectedChildId === 'all' ? true : v.childId === selectedChildId
  );

  const filteredAppointments = appointments.filter((a) =>
    selectedChildId === 'all' ? true : a.childId === selectedChildId
  );

  const filteredGrowth = growthRecords.filter((g) =>
    selectedChildId === 'all' ? true : g.childId === selectedChildId
  );

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveGrowth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHeight || !newWeight) return;
    addGrowthRecord({
      childId: selectedChildId === 'all' ? 'helena' : selectedChildId,
      date: new Date().toLocaleDateString('pt-BR'),
      ageMonths: 88,
      ageDisplay: 'Atual',
      heightCm: Number(newHeight),
      weightKg: Number(newWeight),
      percentileText: 'Percentil 65 (OMS)',
      notes: newNotes || 'Medição registrada na rotina.',
    });
    setNewHeight('');
    setNewWeight('');
    setNewNotes('');
    setShowGrowthModal(false);
    triggerToast('Medição de crescimento registrada com sucesso!');
  };

  const handleSaveAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpec || !newDoc) return;
    addAppointment({
      childId: selectedChildId === 'all' ? 'helena' : selectedChildId,
      specialty: newSpec,
      doctorName: newDoc,
      clinic: 'Consultório Clínico',
      date: newAppDate || new Date().toLocaleDateString('pt-BR'),
      time: '14:00',
      diagnosis: newDiag || 'Avaliação médica realizada.',
      prescriptions: ['Orientações gerais de saúde'],
    });
    setNewSpec('');
    setNewDoc('');
    setNewDiag('');
    setShowAppModal(false);
    triggerToast('Consulta médica registrada no histórico!');
  };

  const handleAddToGoogleCalendar = (med: Medication) => {
    const url = createGoogleCalendarUrl({
      title: `💊 Dose ${med.name} (${med.dosage}) - ${childName}`,
      details: `Instruções: ${med.instructions}\nIntervalo: A cada ${med.intervalHours}h\nPeríodo: ${med.startDate} a ${med.endDate}`,
      location: 'Rotina Familiar',
      time: med.nextDoseTime.includes(':') ? med.nextDoseTime.slice(0, 5) : '08:00',
    });
    window.open(url, '_blank');
    triggerToast('Abrindo Google Agenda para sincronização do lembrete!');
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-ink text-white text-xs font-medium shadow-warm-lg flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <Sparkles className="w-4 h-4 text-warm-peach" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="p-6 sm:p-7 rounded-3xl bg-surface border border-border-linen shadow-warm-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-calm-sage-light text-calm-sage-dark flex items-center justify-center border border-calm-sage/30 shadow-sm">
            <HeartPulse className="w-6 h-6 stroke-[1.75]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-calm-sage-light text-calm-sage-dark">
                Módulo C • Saúde & Cuidados Preventivos
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mt-1">
              Prontuário & Bem-Estar • {childName}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              Gestão de doses farmacêuticas, receitas médicas com foto, vacinas e curvas de crescimento.
            </p>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center p-1 bg-canvas-sand rounded-2xl border border-border-linen text-xs font-medium self-start md:self-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('farmacia')}
            className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
              activeTab === 'farmacia'
                ? 'bg-surface text-ink font-semibold shadow-warm-sm border border-border-linen'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Farmácia & Doses
          </button>
          <button
            onClick={() => setActiveTab('vacinas')}
            className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
              activeTab === 'vacinas'
                ? 'bg-surface text-ink font-semibold shadow-warm-sm border border-border-linen'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Carteira Vacinal
          </button>
          <button
            onClick={() => setActiveTab('consultas')}
            className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
              activeTab === 'consultas'
                ? 'bg-surface text-ink font-semibold shadow-warm-sm border border-border-linen'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Consultas
          </button>
          <button
            onClick={() => setActiveTab('curva')}
            className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
              activeTab === 'curva'
                ? 'bg-surface text-ink font-semibold shadow-warm-sm border border-border-linen'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Curva de Crescimento
          </button>
        </div>
      </div>

      {/* Persistent SOS Emergency Summary Bar */}
      {activeChild && (
        <div className="p-4 rounded-2xl bg-warm-peach-light/70 border border-warm-peach flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-warm-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-warm-terracotta text-white flex items-center justify-center font-bold text-sm shrink-0">
              {activeChild.bloodType}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-warm-terracotta-dark block">
                Alergias & Atenção Clínica ({activeChild.name})
              </span>
              <p className="text-xs text-ink font-medium">
                {activeChild.allergies && activeChild.allergies.length > 0
                  ? activeChild.allergies.join(' • ')
                  : 'Nenhuma alergia grave cadastrada'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-medium">
            <span className="text-ink-muted">Pediatra: {activeChild.pediatricianName}</span>
            {activeChild.pediatricianPhone && (
              <a
                href={`tel:${activeChild.pediatricianPhone.replace(/\D/g, '')}`}
                className="px-2.5 py-1 rounded-lg bg-surface hover:bg-canvas-sand text-warm-terracotta border border-border-peach font-semibold flex items-center gap-1 shadow-warm-sm transition-colors"
              >
                <PhoneCall className="w-3 h-3" />
                <span>{activeChild.pediatricianPhone}</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Tab 1: Farmácia & Medicamentos */}
      {activeTab === 'farmacia' && (
        <div className="space-y-8">
          {/* Action Header for Pharmacy & Prescriptions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-surface border border-border-linen shadow-warm-sm">
            <div>
              <h3 className="font-serif text-lg font-semibold text-ink flex items-center gap-2">
                <Pill className="w-5 h-5 text-warm-terracotta" />
                <span>Gestão Farmacêutica & Prescrições</span>
              </h3>
              <p className="text-xs text-ink-muted">
                Controle de horários de remédios, lembretes inteligentes e arquivo de receitas digitalizadas.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddMedicationModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-warm-peach/40 hover:bg-warm-peach/70 text-warm-terracotta-dark border border-warm-peach text-xs font-semibold shadow-warm-sm transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-warm-terracotta" />
                <span>+ Novo Medicamento</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAttachPrescriptionModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-calm-sage-dark hover:bg-calm-sage text-white text-xs font-semibold shadow-warm-md transition-all transform hover:-translate-y-0.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>+ Anexar Receita Médica</span>
              </button>
            </div>
          </div>

          {/* Grid: Active Treatments + History of Care & Doses */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Treatments */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-base font-semibold text-ink flex items-center gap-2">
                  <span>Tratamentos Ativos & Posologia</span>
                  <span className="text-xs font-sans text-ink-muted">({filteredMeds.length})</span>
                </h4>
              </div>

              {filteredMeds.length > 0 ? (
                filteredMeds.map((med) => (
                  <div key={med.id} className="planner-card p-5 space-y-3 relative group">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="badge-peach text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            A cada {med.intervalHours} horas
                          </span>
                          {med.reminderActive ? (
                            <span className="text-[10px] font-medium text-calm-sage-dark bg-calm-sage-light px-2 py-0.5 rounded-full flex items-center gap-1 border border-calm-sage/30">
                              <Bell className="w-3 h-3 text-calm-sage-dark" />
                              Lembrete Ativo
                            </span>
                          ) : (
                            <span className="text-[10px] font-medium text-ink-muted bg-canvas-sand px-2 py-0.5 rounded-full flex items-center gap-1 border border-border-linen">
                              <BellOff className="w-3 h-3 text-ink-light" />
                              Sem Lembrete
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-base font-semibold text-ink mt-1.5">
                          {med.name}
                        </h4>
                        <p className="text-xs text-ink-muted mt-0.5">
                          Dose: <strong className="text-ink font-semibold">{med.dosage}</strong> • Período: {med.startDate} a {med.endDate}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-medium bg-canvas-sand px-2.5 py-1 rounded-lg border border-border-linen text-warm-terracotta block shadow-sm">
                          Próx: {med.nextDoseTime}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-ink-muted bg-surface-subtle p-2.5 rounded-xl border border-border-linen">
                      <strong>Instrução:</strong> {med.instructions}
                    </p>

                    {/* Action Row */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        {/* Toggle Reminder */}
                        <button
                          type="button"
                          onClick={() => {
                            toggleMedicationReminder(med.id);
                            triggerToast(
                              med.reminderActive
                                ? `Lembrete desativado para ${med.name}.`
                                : `Lembrete ativado para ${med.name}!`
                            );
                          }}
                          className="p-1.5 rounded-lg bg-canvas-sand hover:bg-surface border border-border-linen text-ink-muted hover:text-warm-terracotta text-xs transition-colors"
                          title={med.reminderActive ? 'Desativar notificação' : 'Ativar notificação'}
                        >
                          {med.reminderActive ? (
                            <Bell className="w-3.5 h-3.5 text-warm-terracotta" />
                          ) : (
                            <BellOff className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Google Calendar Link */}
                        <button
                          type="button"
                          onClick={() => handleAddToGoogleCalendar(med)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-canvas-sand hover:bg-surface border border-border-linen text-ink-muted hover:text-calm-slate-dark text-[11px] font-medium transition-colors"
                          title="Sincronizar com Google Agenda"
                        >
                          <Calendar className="w-3 h-3 text-calm-slate-dark" />
                          <span>Google Agenda</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Deseja remover ${med.name} dos tratamentos?`)) {
                              deleteMedication(med.id);
                              triggerToast('Tratamento removido.');
                            }
                          }}
                          className="p-1.5 rounded-lg text-ink-light hover:text-red-600 hover:bg-red-50 text-xs transition-colors"
                          title="Excluir Tratamento"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Register Dose Button */}
                      <button
                        type="button"
                        onClick={() => {
                          logMedicationDose(med.id, 'Mamãe (Mariana)');
                          triggerToast(`Dose de ${med.name} registrada com sucesso!`);
                        }}
                        className="btn-terracotta text-xs py-1.5 px-3.5 flex items-center gap-1.5 shadow-warm-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Registrar Dose Tomada</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 rounded-3xl bg-surface border border-dashed border-border-linen text-center space-y-2">
                  <Pill className="w-8 h-8 text-ink-light mx-auto" />
                  <p className="text-xs text-ink-muted">
                    Nenhum tratamento ou medicamento ativo cadastrado no momento.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowAddMedicationModal(true)}
                    className="text-xs text-warm-terracotta hover:underline font-semibold"
                  >
                    + Cadastrar primeiro medicamento
                  </button>
                </div>
              )}
            </div>

            {/* Registro de Cuidados & Doses Ministradas (Renamed from Log) */}
            <div className="planner-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border-linen mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-warm-peach-light text-warm-terracotta flex items-center justify-center border border-border-peach shadow-sm">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-ink">
                        Registro de Cuidados & Doses Ministradas
                      </h4>
                      <p className="text-[11px] text-ink-muted">
                        Acompanhamento em tempo real entre pais e cuidadores
                      </p>
                    </div>
                  </div>

                  <span className="badge-sage text-[10px] px-2 py-0.5 rounded-full font-medium">
                    {filteredLogs.length} registros
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-3.5 rounded-2xl bg-canvas-sand/60 border border-border-linen text-xs flex items-center justify-between gap-3 hover:bg-surface transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-2.5 h-2.5 rounded-full bg-calm-sage shrink-0" />
                          <div>
                            <span className="font-semibold text-ink">{log.medicationName}</span>
                            <p className="text-[11px] text-ink-muted mt-0.5">
                              Ministrado por <strong className="text-ink">{log.caregiver}</strong> • {log.note}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-[11px] text-ink-muted bg-surface px-2.5 py-1 rounded-xl border border-border-linen shrink-0 shadow-warm-sm">
                          {log.administeredAt}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-ink-muted text-xs italic">
                      Nenhuma dose registrada ainda hoje.
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-border-linen flex items-center justify-between text-[11px] text-ink-muted">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-calm-sage" />
                  Sincronizado entre todos os cuidadores
                </span>
                <span>Registro Oficial</span>
              </div>
            </div>
          </div>

          {/* Section 3: Receitas Médicas & Prescrições Digitais (New Area) */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border-linen">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-calm-sage-light text-calm-sage-dark flex items-center justify-center border border-calm-sage/30">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-ink">
                    Receitas Médicas & Prescrições Digitais
                  </h4>
                  <p className="text-xs text-ink-muted">
                    Histórico com imagem da receita, médico emissor, posologia e integração com o Cofre Familiar
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAttachPrescriptionModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-canvas-sand hover:bg-surface border border-border-linen text-ink text-xs font-semibold shadow-warm-sm transition-all self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5 text-warm-terracotta" />
                <span>+ Anexar Receita</span>
              </button>
            </div>

            {/* Prescriptions Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPrescriptions.map((presc) => (
                <div
                  key={presc.id}
                  className="planner-card p-4 space-y-3 hover:border-calm-sage/50 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-semibold text-ink-muted bg-canvas-sand px-2 py-0.5 rounded-full border border-border-linen">
                          {presc.date}
                        </span>
                        <h5 className="font-serif text-sm font-semibold text-ink mt-1 line-clamp-1">
                          {presc.title}
                        </h5>
                        <p className="text-[11px] text-ink-muted truncate">
                          {presc.doctorName || 'Médico(a) assistente'} {presc.doctorCrm ? `(${presc.doctorCrm})` : ''}
                        </p>
                      </div>

                      {presc.syncedToVault && (
                        <span
                          className="text-[10px] text-calm-slate-dark bg-canvas-sand px-2 py-0.5 rounded-full border border-border-linen flex items-center gap-1 shrink-0"
                          title="Arquivo salvo com cópia no Cofre Familiar"
                        >
                          <Lock className="w-3 h-3 text-calm-sage-dark" />
                          <span>Cofre</span>
                        </span>
                      )}
                    </div>

                    {/* Prescription Thumbnail with Zoom Trigger */}
                    {presc.imageUrl ? (
                      <div
                        onClick={() => setViewingPrescription(presc)}
                        className="relative h-28 w-full rounded-xl overflow-hidden border border-border-linen bg-ink/5 cursor-pointer group/thumb"
                      >
                        <img
                          src={presc.imageUrl}
                          alt={presc.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                        />
                        <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-semibold backdrop-blur-[1px]">
                          <Eye className="w-4 h-4" />
                          <span>Ver Receita</span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-24 w-full rounded-xl border border-dashed border-border-linen bg-canvas-sand/60 flex items-center justify-center text-xs text-ink-muted">
                        Sem anexo de foto
                      </div>
                    )}

                    {/* Medicines Summary */}
                    <div className="p-2.5 rounded-xl bg-canvas-sand/60 border border-border-linen text-xs text-ink">
                      <span className="font-semibold text-warm-terracotta-dark block text-[10px] uppercase">
                        Prescrição:
                      </span>
                      <p className="line-clamp-2 text-[11px] mt-0.5 font-medium">
                        {presc.medicationsSummary}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-2 border-t border-border-linen flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setViewingPrescription(presc)}
                      className="text-xs font-semibold text-calm-sage-dark hover:text-calm-sage flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Detalhes</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => alert(`Compartilhando receita: ${presc.title}`)}
                        className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-canvas-sand transition-colors"
                        title="Compartilhar Ficha"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Deseja excluir a receita "${presc.title}"?`)) {
                            deletePrescription(presc.id);
                            triggerToast('Receita médica removida.');
                          }
                        }}
                        className="p-1.5 rounded-lg text-ink-light hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Excluir Receita"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Carteira de Vacinas */}
      {activeTab === 'vacinas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-ink flex items-center gap-2">
              <Syringe className="w-5 h-5 text-calm-sage-dark" />
              <span>Carteira Digital de Vacinação Infantil</span>
            </h3>
            <span className="text-xs text-ink-muted font-sans">
              Controle de imunização preventiva por idade
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVaccines.map((vac) => {
              const isApplied = vac.status === 'Aplicada';
              return (
                <div
                  key={vac.id}
                  onClick={() => toggleVaccine(vac.id)}
                  className={`planner-card p-5 cursor-pointer transition-all duration-200 border ${
                    isApplied
                      ? 'bg-surface hover:border-calm-sage'
                      : 'bg-warm-peach-light/40 border-warm-peach'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                        isApplied ? 'badge-sage' : 'badge-peach'
                      }`}
                    >
                      {vac.status}
                    </span>
                    <span className="text-xs text-ink-muted font-mono">{vac.recommendedAge}</span>
                  </div>

                  <h4 className="font-serif text-base font-semibold text-ink">
                    {vac.vaccineName}
                  </h4>
                  <p className="text-xs text-ink-muted mt-0.5">{vac.dose}</p>

                  <div className="mt-4 pt-3 border-t border-border-linen flex items-center justify-between text-xs">
                    {isApplied ? (
                      <span className="text-calm-sage-dark font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-calm-sage" />
                        {vac.applicationDate || 'Aplicada'}
                      </span>
                    ) : (
                      <span className="text-warm-terracotta-dark font-medium flex items-center gap-1">
                        <Circle className="w-4 h-4 text-warm-terracotta" />
                        Pendente
                      </span>
                    )}

                    <span className="text-[10px] text-ink-light italic">Clique p/ alternar</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Consultas Médicas */}
      {activeTab === 'consultas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-ink flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-calm-slate-dark" />
              <span>Diário de Consultas & Puericultura</span>
            </h3>

            <button
              onClick={() => setShowAppModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-warm-terracotta text-white font-sans text-xs font-semibold shadow-warm-sm hover:bg-warm-terracotta-dark transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Registrar Consulta</span>
            </button>
          </div>

          <div className="space-y-4">
            {filteredAppointments.map((app) => (
              <div key={app.id} className="planner-card p-6 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-border-linen">
                  <div>
                    <span className="text-xs text-ink-muted">{app.date} às {app.time}</span>
                    <h4 className="font-serif text-lg font-semibold text-ink mt-0.5">
                      {app.specialty} • {app.doctorName}
                    </h4>
                    <span className="text-xs text-ink-muted">{app.clinic}</span>
                  </div>
                  {app.returnDate && (
                    <span className="badge-slate text-xs font-semibold px-3 py-1 rounded-full">
                      Retorno: {app.returnDate}
                    </span>
                  )}
                </div>

                <div className="p-3.5 rounded-2xl bg-canvas-sand/60 border border-border-linen">
                  <span className="text-xs uppercase font-bold text-ink-muted block mb-1">
                    Diagnóstico & Parecer:
                  </span>
                  <p className="font-serif text-sm text-ink leading-relaxed">
                    "{app.diagnosis}"
                  </p>
                </div>

                {app.prescriptions && app.prescriptions.length > 0 && (
                  <div className="pt-2">
                    <span className="text-xs uppercase font-bold text-calm-sage-dark block mb-1.5">
                      Condutas e Receitas Indicadas:
                    </span>
                    <ul className="space-y-1">
                      {app.prescriptions.map((presc, idx) => (
                        <li key={idx} className="text-xs text-ink flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-calm-sage" />
                          <span>{presc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Curva de Crescimento */}
      {activeTab === 'curva' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-ink flex items-center gap-2">
              <Activity className="w-5 h-5 text-calm-sage-dark" />
              <span>Acompanhamento Antropométrico & Curva OMS</span>
            </h3>

            <button
              onClick={() => setShowGrowthModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-warm-terracotta text-white font-sans text-xs font-semibold shadow-warm-sm hover:bg-warm-terracotta-dark transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Lançar Nova Medição</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="planner-card p-6">
                <h4 className="font-serif text-base font-semibold text-ink mb-2">
                  Evolução Histórica da Estatura vs Idade
                </h4>
                <p className="text-xs text-ink-muted mb-4">
                  Curva balizada nos parâmetros oficiais da Organização Mundial da Saúde (OMS).
                </p>

                <div className="h-44 w-full bg-canvas-sand/60 rounded-2xl border border-border-linen p-4 relative flex items-end">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120" preserveAspectRatio="none">
                    <path
                      d="M 0,95 Q 100,75 200,55 T 400,25 L 400,60 Q 300,90 200,105 T 0,115 Z"
                      fill="#8A9A8C"
                      fillOpacity="0.15"
                    />
                    <path
                      d="M 0,100 Q 100,80 200,60 T 400,30"
                      fill="none"
                      stroke="#778899"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      opacity="0.6"
                    />
                    <path
                      d="M 0,110 Q 100,85 200,55 T 400,20"
                      fill="none"
                      stroke="#BC7C67"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle cx="0" cy="110" r="5" fill="#FFFFFF" stroke="#BC7C67" strokeWidth="2.5" />
                    <circle cx="200" cy="55" r="5" fill="#FFFFFF" stroke="#BC7C67" strokeWidth="2.5" />
                    <circle cx="400" cy="20" r="6" fill="#BC7C67" stroke="#FFFFFF" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Growth History list */}
            <div className="planner-card p-6">
              <h4 className="font-serif text-base font-semibold text-ink mb-3">
                Histórico de Medições
              </h4>
              <div className="space-y-3">
                {filteredGrowth.map((gr) => (
                  <div key={gr.id} className="p-3 rounded-2xl bg-canvas-sand/60 border border-border-linen text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-ink">{gr.date} ({gr.ageDisplay})</span>
                      <span className="badge-sage text-[10px] px-2 py-0.2 rounded-full">
                        {gr.percentileText}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-ink-muted mt-1">
                      <span>📏 <strong>{gr.heightCm}</strong> cm</span>
                      <span>⚖️ <strong>{gr.weightKg}</strong> kg</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Anexar Receita Médica */}
      <AttachPrescriptionModal
        isOpen={showAttachPrescriptionModal}
        onClose={() => setShowAttachPrescriptionModal(false)}
        targetChildId={selectedChildId === 'all' ? 'helena' : selectedChildId}
      />

      {/* Modal: Novo Medicamento */}
      <AddMedicationModal
        isOpen={showAddMedicationModal}
        onClose={() => setShowAddMedicationModal(false)}
        targetChildId={selectedChildId === 'all' ? 'helena' : selectedChildId}
        onSave={(newMed) => {
          addMedication(newMed);
          triggerToast(`Tratamento com ${newMed.name} cadastrado com sucesso!`);
        }}
      />

      {/* Modal: Visualizador Lightbox de Receita Médica */}
      <PrescriptionViewerModal
        prescription={viewingPrescription}
        onClose={() => setViewingPrescription(null)}
        onDelete={(id) => {
          deletePrescription(id);
          triggerToast('Receita médica excluída com sucesso.');
        }}
      />

      {/* Modal: Nova Medição de Crescimento */}
      {showGrowthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/30 backdrop-blur-sm">
          <div className="w-full max-w-md bg-surface border border-border-linen rounded-3xl p-6 shadow-warm-hover">
            <h3 className="font-serif text-xl font-semibold text-ink mb-4">
              Lançar Medição de Crescimento
            </h3>

            <form onSubmit={handleSaveGrowth} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Altura (cm):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 122.5"
                    value={newHeight}
                    onChange={(e) => setNewHeight(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Peso (kg):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 24.2"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-muted block mb-1">
                  Observações:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Medido no consultório da pediatra"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-linen">
                <button
                  type="button"
                  onClick={() => setShowGrowthModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-muted hover:bg-canvas-sand"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-warm-terracotta hover:bg-warm-terracotta-dark text-white text-xs font-semibold shadow-warm-sm"
                >
                  Salvar Medição
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Registrar Consulta */}
      {showAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/30 backdrop-blur-sm">
          <div className="w-full max-w-md bg-surface border border-border-linen rounded-3xl p-6 shadow-warm-hover">
            <h3 className="font-serif text-xl font-semibold text-ink mb-4">
              Registrar Consulta Médica
            </h3>

            <form onSubmit={handleSaveAppointment} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-ink-muted block mb-1">
                  Especialidade Médica:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Pediatria, Oftalmologia, Alergista"
                  value={newSpec}
                  onChange={(e) => setNewSpec(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Nome do Médico(a):
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Dra. Beatriz Albuquerque"
                    value={newDoc}
                    onChange={(e) => setNewDoc(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Data da Consulta:
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 18 de Outubro"
                    value={newAppDate}
                    onChange={(e) => setNewAppDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-muted block mb-1">
                  Diagnóstico / Parecer:
                </label>
                <textarea
                  placeholder="Relato do médico e orientações dadas"
                  value={newDiag}
                  onChange={(e) => setNewDiag(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-linen">
                <button
                  type="button"
                  onClick={() => setShowAppModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-muted hover:bg-canvas-sand"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-warm-terracotta hover:bg-warm-terracotta-dark text-white text-xs font-semibold shadow-warm-sm"
                >
                  Salvar Consulta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
