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
} from 'lucide-react';

export const HealthView: React.FC = () => {
  const {
    activeChild,
    selectedChildId,
    medications,
    medicationLogs,
    vaccines,
    appointments,
    growthRecords,
    logMedicationDose,
    toggleVaccine,
    addGrowthRecord,
    addAppointment,
  } = useFamily();

  const [activeTab, setActiveTab] = useState<'farmacia' | 'vacinas' | 'consultas' | 'curva'>('farmacia');
  const [showGrowthModal, setShowGrowthModal] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);

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

  const filteredVaccines = vaccines.filter((v) =>
    selectedChildId === 'all' ? true : v.childId === selectedChildId
  );

  const filteredAppointments = appointments.filter((a) =>
    selectedChildId === 'all' ? true : a.childId === selectedChildId
  );

  const filteredGrowth = growthRecords.filter((g) =>
    selectedChildId === 'all' ? true : g.childId === selectedChildId
  );

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
  };

  return (
    <div className="space-y-6 sm:space-y-8">
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
              Gestão de doses farmacêuticas, vacinas, consultas e curvas de crescimento pediátrico.
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
                {activeChild.allergies.join(' • ')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-medium">
            <span className="text-ink-muted">Pediatra: {activeChild.pediatricianName}</span>
            <a
              href={`tel:${activeChild.pediatricianPhone.replace(/\D/g, '')}`}
              className="px-2.5 py-1 rounded-lg bg-surface hover:bg-canvas-sand text-warm-terracotta border border-border-peach font-semibold flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              <span>{activeChild.pediatricianPhone}</span>
            </a>
          </div>
        </div>
      )}

      {/* Tab 1: Farmácia & Medicamentos */}
      {activeTab === 'farmacia' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Active Treatments */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-semibold text-ink flex items-center gap-2">
                <Pill className="w-5 h-5 text-warm-terracotta" />
                <span>Tratamentos Ativos & Posologia</span>
              </h3>

              {filteredMeds.map((med) => (
                <div key={med.id} className="planner-card p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="badge-peach text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        A cada {med.intervalHours} horas
                      </span>
                      <h4 className="font-serif text-base font-semibold text-ink mt-1">
                        {med.name}
                      </h4>
                      <p className="text-xs text-ink-muted">
                        Dose: <strong className="text-ink">{med.dosage}</strong> • Período: {med.startDate} a {med.endDate}
                      </p>
                    </div>

                    <span className="text-xs font-mono font-medium bg-canvas-sand px-2 py-1 rounded-lg border border-border-linen text-warm-terracotta">
                      Próx: {med.nextDoseTime}
                    </span>
                  </div>

                  <p className="text-xs text-ink-muted bg-surface-subtle p-2.5 rounded-xl border border-border-linen">
                    Instrução: {med.instructions}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-calm-sage-dark font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Tratamento em dia
                    </span>

                    <button
                      onClick={() => logMedicationDose(med.id, 'Mamãe (Mariana)')}
                      className="btn-terracotta text-xs py-2 px-3.5 flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Registrar Dose Tomada Agora</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Medication Administration History */}
            <div className="planner-card p-6">
              <div className="flex items-center justify-between pb-3 border-b border-border-linen mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-warm-peach-light text-warm-terracotta flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-ink">
                      Log de Administração de Doses
                    </h4>
                    <p className="text-[11px] text-ink-muted">Registro em tempo real entre os cuidadores</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                {medicationLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-canvas-sand/60 border border-border-linen text-xs flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-calm-sage" />
                      <div>
                        <span className="font-semibold text-ink">{log.medicationName}</span>
                        <p className="text-[11px] text-ink-muted">
                          Ministrado por <strong>{log.caregiver}</strong> • {log.note}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-ink-muted bg-surface px-2 py-0.5 rounded border border-border-linen shrink-0">
                      {log.administeredAt}
                    </span>
                  </div>
                ))}
              </div>
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
              {/* Graphic container */}
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
