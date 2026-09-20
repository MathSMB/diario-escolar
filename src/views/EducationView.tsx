import React, { useState } from 'react';
import { useFamily } from '../context/FamilyContext';
import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  FileText,
  Plus,
  Clock,
  MapPin,
  CheckCircle2,
  Circle,
  Backpack,
  Sparkles,
  Edit2,
  Trash2,
  X,
} from 'lucide-react';
import { ClassScheduleItem } from '../types';

export const EducationView: React.FC = () => {
  const {
    schedules,
    assessments,
    meetings,
    circulars,
    toggleScheduleMaterial,
    addScheduleItem,
    updateScheduleItem,
    deleteScheduleItem,
    addAssessment,
    selectedChildId,
    activeChild,
  } = useFamily();

  const [selectedDay, setSelectedDay] = useState<string>('Quinta');
  const [activeSection, setActiveSection] = useState<'grade' | 'boletim' | 'reunioes' | 'circulares'>('grade');

  // Schedule Modal State
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [editingScheduleId, setEditingScheduleId] = useState<string | null>(null);
  const [schedSubject, setSchedSubject] = useState('');
  const [schedDay, setSchedDay] = useState<'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta'>('Quinta');
  const [schedStartTime, setSchedStartTime] = useState('08:00');
  const [schedEndTime, setSchedEndTime] = useState('08:50');
  const [schedTeacher, setSchedTeacher] = useState('');
  const [schedRoom, setSchedRoom] = useState('');
  const [schedColorTag, setSchedColorTag] = useState('badge-slate');
  const [schedMaterials, setSchedMaterials] = useState<{ id: string; name: string; checked: boolean }[]>([]);
  const [materialInput, setMaterialInput] = useState('');

  // Assessment Modal State
  const [showNewAssessmentModal, setShowNewAssessmentModal] = useState(false);
  const [newSubj, setNewSubj] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'Prova' | 'Trabalho' | 'Feira de Ciências'>('Prova');
  const [newDate, setNewDate] = useState('');
  const [newWeight, setNewWeight] = useState(3.0);

  const childName = activeChild ? activeChild.name : 'Família Unificada';

  const filteredSchedule = schedules.filter((s) => {
    const matchChild = selectedChildId === 'all' || s.childId === selectedChildId;
    return matchChild && s.dayOfWeek === selectedDay;
  });

  const filteredAssessments = assessments.filter((a) =>
    selectedChildId === 'all' ? true : a.childId === selectedChildId
  );

  const filteredMeetings = meetings.filter((m) =>
    selectedChildId === 'all' ? true : m.childId === selectedChildId
  );

  const filteredCirculars = circulars.filter((c) =>
    selectedChildId === 'all' ? true : c.childId === selectedChildId
  );

  // Open modal for new schedule
  const handleOpenAddSchedule = () => {
    setEditingScheduleId(null);
    setSchedSubject('');
    setSchedDay((selectedDay as any) || 'Quinta');
    setSchedStartTime('08:00');
    setSchedEndTime('08:50');
    setSchedTeacher('');
    setSchedRoom('Sala 14B');
    setSchedColorTag('badge-slate');
    setSchedMaterials([
      { id: 'm-' + Date.now(), name: 'Caderno pautado', checked: true },
    ]);
    setMaterialInput('');
    setShowScheduleModal(true);
  };

  // Open modal for editing existing schedule
  const handleOpenEditSchedule = (item: ClassScheduleItem) => {
    setEditingScheduleId(item.id);
    setSchedSubject(item.subject);
    setSchedDay(item.dayOfWeek);
    setSchedStartTime(item.startTime);
    setSchedEndTime(item.endTime);
    setSchedTeacher(item.teacher);
    setSchedRoom(item.room);
    setSchedColorTag(item.colorTag || 'badge-slate');
    setSchedMaterials(item.materials || []);
    setMaterialInput('');
    setShowScheduleModal(true);
  };

  // Add material to temp list
  const handleAddMaterialItem = () => {
    if (!materialInput.trim()) return;
    setSchedMaterials([
      ...schedMaterials,
      { id: 'mat-' + Date.now(), name: materialInput.trim(), checked: false },
    ]);
    setMaterialInput('');
  };

  // Remove material from temp list
  const handleRemoveMaterialItem = (matId: string) => {
    setSchedMaterials(schedMaterials.filter((m) => m.id !== matId));
  };

  // Calculate duration string
  const calculateDuration = (start: string, end: string) => {
    if (!start || !end) return '50 min';
    const [h1, m1] = start.split(':').map(Number);
    const [h2, m2] = end.split(':').map(Number);
    const diff = (h2 * 60 + m2) - (h1 * 60 + m1);
    return diff > 0 ? `${diff} min` : '50 min';
  };

  // Save schedule (Create or Update)
  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedSubject.trim()) return;

    const durationStr = calculateDuration(schedStartTime, schedEndTime);

    if (editingScheduleId) {
      updateScheduleItem({
        id: editingScheduleId,
        childId: selectedChildId === 'all' ? 'helena' : selectedChildId,
        dayOfWeek: schedDay,
        subject: schedSubject,
        startTime: schedStartTime,
        endTime: schedEndTime,
        duration: durationStr,
        teacher: schedTeacher || 'Professor Responsável',
        room: schedRoom || 'Sala de Aula',
        colorTag: schedColorTag,
        materials: schedMaterials,
      });
    } else {
      addScheduleItem({
        childId: selectedChildId === 'all' ? 'helena' : selectedChildId,
        dayOfWeek: schedDay,
        subject: schedSubject,
        startTime: schedStartTime,
        endTime: schedEndTime,
        duration: durationStr,
        teacher: schedTeacher || 'Professor Responsável',
        room: schedRoom || 'Sala de Aula',
        colorTag: schedColorTag,
        materials: schedMaterials,
      });
    }

    setShowScheduleModal(false);
  };

  const handleCreateAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubj || !newTitle || !newDate) return;
    addAssessment({
      childId: selectedChildId === 'all' ? 'helena' : selectedChildId,
      subject: newSubj,
      title: newTitle,
      type: newType,
      date: newDate,
      weight: Number(newWeight),
      status: 'Agendado',
    });
    setNewSubj('');
    setNewTitle('');
    setNewDate('');
    setShowNewAssessmentModal(false);
  };

  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Module Header */}
      <div className="p-6 sm:p-7 rounded-3xl bg-surface border border-border-linen shadow-warm-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-calm-slate-light text-calm-slate-dark flex items-center justify-center border border-calm-slate/30 shadow-sm">
            <GraduationCap className="w-6 h-6 stroke-[1.75]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-calm-slate-light text-calm-slate-dark">
                Módulo A • Educação & Rotina Escolar
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mt-1">
              Desenvolvimento Pedagógico • {childName}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              Grade semanal de aulas, materiais de mochila, boletim e diário de reuniões com a escola.
            </p>
          </div>
        </div>

        {/* Section Tabs Switcher */}
        <div className="flex items-center p-1 bg-canvas-sand rounded-2xl border border-border-linen text-xs font-medium self-start md:self-auto overflow-x-auto">
          <button
            onClick={() => setActiveSection('grade')}
            className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
              activeSection === 'grade'
                ? 'bg-surface text-ink font-semibold shadow-warm-sm border border-border-linen'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Grade & Mochila
          </button>
          <button
            onClick={() => setActiveSection('boletim')}
            className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
              activeSection === 'boletim'
                ? 'bg-surface text-ink font-semibold shadow-warm-sm border border-border-linen'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Boletim & Notas
          </button>
          <button
            onClick={() => setActiveSection('reunioes')}
            className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
              activeSection === 'reunioes'
                ? 'bg-surface text-ink font-semibold shadow-warm-sm border border-border-linen'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Diário Pedagógico
          </button>
          <button
            onClick={() => setActiveSection('circulares')}
            className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
              activeSection === 'circulares'
                ? 'bg-surface text-ink font-semibold shadow-warm-sm border border-border-linen'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Circulares
          </button>
        </div>
      </div>

      {/* Section 1: Grade Semanal & Mochila */}
      {activeSection === 'grade' && (
        <div className="space-y-6">
          {/* Day of Week Selector Pills & Add Class Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider px-2 shrink-0">
                Dia da Semana:
              </span>
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-2xl text-xs font-sans font-medium transition-all duration-200 ${
                    selectedDay === day
                      ? 'bg-warm-terracotta text-white shadow-warm-md font-semibold scale-105'
                      : 'bg-surface text-ink-muted hover:bg-canvas-sand border border-border-linen'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Prominent Add Schedule Button */}
            <button
              onClick={handleOpenAddSchedule}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-warm-terracotta hover:bg-warm-terracotta-dark text-white font-sans text-xs sm:text-sm font-semibold shadow-warm-sm hover:scale-[1.02] transition-all self-start sm:self-auto shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Aula / Horário</span>
            </button>
          </div>

          {/* Schedule Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Class Timeline (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-semibold text-ink flex items-center gap-2">
                  <Clock className="w-4 h-4 text-warm-terracotta" />
                  <span>Horários de Aula • {selectedDay}-feira</span>
                </h3>
                <span className="text-xs text-ink-muted">
                  {filteredSchedule.length} aula(s) programada(s)
                </span>
              </div>

              {filteredSchedule.length === 0 ? (
                <div className="p-8 rounded-3xl bg-surface border border-border-linen text-center text-ink-muted space-y-3">
                  <BookOpen className="w-8 h-8 mx-auto text-ink-light opacity-60" />
                  <p className="font-serif text-sm">Nenhuma aula cadastrada para {selectedDay}-feira.</p>
                  <button
                    onClick={handleOpenAddSchedule}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-warm-peach-light text-warm-terracotta-dark font-semibold text-xs border border-warm-peach hover:bg-warm-peach transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar primeira aula de {selectedDay}</span>
                  </button>
                </div>
              ) : (
                filteredSchedule.map((item) => (
                  <div
                    key={item.id}
                    className="planner-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-14 text-center font-sans pr-3 border-r border-border-linen shrink-0">
                        <span className="text-sm font-bold text-ink">{item.startTime}</span>
                        <span className="text-[10px] text-ink-light block">{item.duration}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-full ${item.colorTag}`}>
                            {item.room}
                          </span>
                        </div>
                        <h4 className="font-serif text-base font-semibold text-ink mt-0.5">
                          {item.subject}
                        </h4>
                        <p className="text-xs text-ink-muted flex items-center gap-1.5 mt-0.5">
                          <MapPin className="w-3 h-3 text-calm-slate" /> {item.teacher}
                        </p>
                      </div>
                    </div>

                    {/* Action buttons & Materials preview */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-border-linen">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditSchedule(item)}
                          className="p-1.5 rounded-lg bg-canvas-sand hover:bg-surface text-ink-muted hover:text-warm-terracotta border border-border-linen transition-colors flex items-center gap-1 text-xs"
                          title="Editar horário e materiais"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline text-[11px] font-medium">Editar</span>
                        </button>

                        <button
                          onClick={() => deleteScheduleItem(item.id)}
                          className="p-1.5 rounded-lg bg-canvas-sand hover:bg-red-50 text-ink-muted hover:text-red-600 border border-border-linen transition-colors"
                          title="Excluir horário de aula"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-[11px] font-sans text-ink-muted block">
                        {item.materials?.length || 0} materiais associados
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Daily Backpack Checklist (1 col) */}
            <div className="planner-card p-6">
              <div className="flex items-center justify-between pb-3 border-b border-border-linen mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-calm-sage-light text-calm-sage-dark flex items-center justify-center">
                    <Backpack className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-ink">
                      Checklist da Mochila
                    </h4>
                    <p className="text-[11px] text-ink-muted">Itens necessários para {selectedDay}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                {filteredSchedule.length === 0 ? (
                  <p className="text-xs text-ink-muted italic text-center py-4">
                    Nenhum material cadastrado para este dia.
                  </p>
                ) : (
                  filteredSchedule.flatMap((sch) =>
                    (sch.materials || []).map((mat) => (
                      <button
                        key={mat.id}
                        onClick={() => toggleScheduleMaterial(sch.id, mat.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 border ${
                          mat.checked
                            ? 'bg-calm-sage-light/50 border-calm-sage/30 text-ink-muted line-through'
                            : 'bg-surface hover:bg-canvas-sand border-border-linen text-ink'
                        }`}
                      >
                        {mat.checked ? (
                          <CheckCircle2 className="w-4 h-4 text-calm-sage shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-border-linen shrink-0" />
                        )}
                        <div>
                          <span className="text-xs font-sans font-medium block">{mat.name}</span>
                          <span className="text-[10px] text-ink-light block">{sch.subject}</span>
                        </div>
                      </button>
                    ))
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Boletim & Avaliações */}
      {activeSection === 'boletim' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-ink flex items-center gap-2">
              <Award className="w-5 h-5 text-warm-terracotta" />
              <span>Notas, Provas & Trabalhos Acadêmicos</span>
            </h3>

            <button
              onClick={() => setShowNewAssessmentModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-warm-terracotta text-white font-sans text-xs font-semibold shadow-warm-sm hover:bg-warm-terracotta-dark transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Lançar Avaliação / Nota</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredAssessments.map((ass) => (
              <div key={ass.id} className="planner-card p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="badge-slate text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                      {ass.subject}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-warm-terracotta">
                      {ass.type}
                    </span>
                  </div>

                  <h4 className="font-serif text-base font-semibold text-ink leading-snug">
                    {ass.title}
                  </h4>
                  <p className="text-xs text-ink-muted mt-1">Data: {ass.date} • Peso {ass.weight}</p>

                  {ass.notes && (
                    <p className="text-xs text-ink-muted italic bg-canvas-sand/60 p-2.5 rounded-xl border border-border-linen mt-3">
                      "{ass.notes}"
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-border-linen flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-ink-light block">Nota Obtida</span>
                    <span className="font-serif text-xl font-bold text-warm-terracotta">
                      {ass.grade !== undefined ? ass.grade.toFixed(1) : 'Pendente'}
                    </span>
                  </div>

                  {ass.classAverage && (
                    <div className="text-right">
                      <span className="text-[10px] uppercase text-ink-light block">Média Turma</span>
                      <span className="font-sans text-xs font-semibold text-ink-muted">
                        {ass.classAverage.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 3: Diário Pedagógico */}
      {activeSection === 'reunioes' && (
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-semibold text-ink flex items-center gap-2">
            <Users className="w-5 h-5 text-calm-sage-dark" />
            <span>Feedbacks de Professores & Reuniões Escolares</span>
          </h3>

          <div className="space-y-4">
            {filteredMeetings.map((meet) => (
              <div key={meet.id} className="planner-card p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border-linen">
                  <div>
                    <span className="text-xs text-ink-muted">{meet.date}</span>
                    <h4 className="font-serif text-lg font-semibold text-ink mt-0.5">
                      {meet.teacherOrCoordinator}
                    </h4>
                  </div>
                  <span className="badge-sage text-xs font-semibold px-3 py-1 rounded-full">
                    Acompanhamento Realizado
                  </span>
                </div>

                <div>
                  <h5 className="text-xs uppercase font-bold text-ink-muted mb-1 font-sans">
                    Pauta da Conversa:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {meet.topics.map((t, idx) => (
                      <span key={idx} className="badge-peach text-xs px-2.5 py-0.5 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-canvas-sand/60 border border-border-linen">
                  <h5 className="text-xs uppercase font-bold text-ink-muted mb-1">
                    Relato & Parecer da Coordenação:
                  </h5>
                  <p className="font-serif italic text-sm text-ink leading-relaxed">
                    "{meet.feedbacks}"
                  </p>
                </div>

                <div>
                  <h5 className="text-xs uppercase font-bold text-warm-terracotta mb-2 font-sans">
                    Combinados e Planos de Ação em Casa:
                  </h5>
                  <ul className="space-y-1.5">
                    {meet.actionPoints.map((ap, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-ink">
                        <Sparkles className="w-3.5 h-3.5 text-warm-terracotta" />
                        <span>{ap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 4: Circulares e Avisos */}
      {activeSection === 'circulares' && (
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-semibold text-ink flex items-center gap-2">
            <FileText className="w-5 h-5 text-calm-slate-dark" />
            <span>Repositório de Circulares, Calendários & Contratos</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCirculars.map((circ) => (
              <div key={circ.id} className="planner-card p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="badge-slate text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                      {circ.category}
                    </span>
                    <span className="text-xs text-ink-muted">{circ.date}</span>
                  </div>
                  <h4 className="font-serif text-base font-semibold text-ink">
                    {circ.title}
                  </h4>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                    {circ.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border-linen flex items-center justify-between text-xs text-ink-muted">
                  <span>Tamanho: {circ.fileSize}</span>
                  <button className="text-warm-terracotta hover:underline font-serif italic">
                    Abrir documento (PDF) →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Adicionar / Editar Horário de Aula */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-xl bg-surface border border-border-linen rounded-3xl p-6 sm:p-7 shadow-warm-hover max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-border-linen mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-warm-peach-light text-warm-terracotta flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-ink">
                    {editingScheduleId ? 'Editar Horário de Aula' : 'Adicionar Horário de Aula'}
                  </h3>
                  <p className="text-xs text-ink-muted">Grade escolar e itens de mochila para {childName}</p>
                </div>
              </div>

              <button
                onClick={() => setShowScheduleModal(false)}
                className="w-8 h-8 rounded-full bg-canvas-sand flex items-center justify-center text-ink-muted hover:text-ink transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSchedule} className="space-y-4">
              {/* Disciplina */}
              <div>
                <label className="text-xs font-semibold text-ink-muted block mb-1">
                  Disciplina / Matéria:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Matemática Lúdica, Educação Artística, História"
                  value={schedSubject}
                  onChange={(e) => setSchedSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  required
                />
              </div>

              {/* Dia da Semana & Cor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Dia da Semana:
                  </label>
                  <select
                    value={schedDay}
                    onChange={(e) => setSchedDay(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  >
                    <option value="Segunda">Segunda-feira</option>
                    <option value="Terça">Terça-feira</option>
                    <option value="Quarta">Quarta-feira</option>
                    <option value="Quinta">Quinta-feira</option>
                    <option value="Sexta">Sexta-feira</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Estilo do Badge / Cor:
                  </label>
                  <select
                    value={schedColorTag}
                    onChange={(e) => setSchedColorTag(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  >
                    <option value="badge-slate">Azul Ardósia (Padrão)</option>
                    <option value="badge-peach">Pêssego Aveludado</option>
                    <option value="badge-sage">Verde Sálvia</option>
                  </select>
                </div>
              </div>

              {/* Horário Início e Fim */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Horário de Início:
                  </label>
                  <input
                    type="time"
                    value={schedStartTime}
                    onChange={(e) => setSchedStartTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Horário de Término:
                  </label>
                  <input
                    type="time"
                    value={schedEndTime}
                    onChange={(e) => setSchedEndTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                    required
                  />
                </div>
              </div>

              {/* Professor e Sala */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Professor(a):
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Profª. Camila Rodrigues"
                    value={schedTeacher}
                    onChange={(e) => setSchedTeacher(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Sala / Local:
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Sala 14B, Ateliê, Pátio"
                    value={schedRoom}
                    onChange={(e) => setSchedRoom(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  />
                </div>
              </div>

              {/* Materiais da Mochila (Checklist Dinâmico) */}
              <div className="p-4 rounded-2xl bg-canvas-sand/60 border border-border-linen space-y-3">
                <label className="text-xs font-semibold text-ink block">
                  🎒 Materiais da Mochila para esta Aula:
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Ex: Caderno pautado, Estojo, Avental..."
                    value={materialInput}
                    onChange={(e) => setMaterialInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddMaterialItem();
                      }
                    }}
                    className="flex-1 px-3 py-2 rounded-xl bg-surface border border-border-linen text-xs text-ink focus:outline-none focus:border-warm-terracotta"
                  />
                  <button
                    type="button"
                    onClick={handleAddMaterialItem}
                    className="px-3.5 py-2 rounded-xl bg-surface hover:bg-canvas-sand border border-border-linen text-xs font-semibold text-warm-terracotta"
                  >
                    + Adicionar
                  </button>
                </div>

                {/* Materials List */}
                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {schedMaterials.map((mat) => (
                    <div
                      key={mat.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-surface border border-border-linen text-xs"
                    >
                      <span className="text-ink font-medium">✓ {mat.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMaterialItem(mat.id)}
                        className="text-ink-muted hover:text-red-500 transition-colors p-0.5"
                        title="Remover material"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border-linen">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-muted hover:bg-canvas-sand transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-warm-terracotta hover:bg-warm-terracotta-dark text-white text-xs font-semibold shadow-warm-sm transition-all"
                >
                  {editingScheduleId ? 'Salvar Alterações' : 'Salvar Novo Horário'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Lançar Nova Avaliação */}
      {showNewAssessmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/30 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-surface border border-border-linen rounded-3xl p-6 shadow-warm-hover">
            <h3 className="font-serif text-xl font-semibold text-ink mb-4">
              Lançar Avaliação / Prova / Trabalho
            </h3>

            <form onSubmit={handleCreateAssessment} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-ink-muted block mb-1">
                  Disciplina:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Matemática, História, Ciências"
                  value={newSubj}
                  onChange={(e) => setNewSubj(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-muted block mb-1">
                  Título da Atividade:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Prova Bimestral de Geometria"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Tipo:
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  >
                    <option value="Prova">Prova</option>
                    <option value="Trabalho">Trabalho</option>
                    <option value="Feira de Ciências">Feira de Ciências</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Peso:
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={newWeight}
                    onChange={(e) => setNewWeight(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Data:
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 28 de Setembro"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-linen">
                <button
                  type="button"
                  onClick={() => setShowNewAssessmentModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-muted hover:bg-canvas-sand"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-warm-terracotta hover:bg-warm-terracotta-dark text-white text-xs font-semibold shadow-warm-sm"
                >
                  Salvar Avaliação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
