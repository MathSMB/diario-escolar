import React, { useState } from 'react';
import { useFamily } from '../context/FamilyContext';
import {
  Activity,
  Calendar,
  Clock,
  MapPin,
  PhoneCall,
  CheckCircle2,
  PartyPopper,
  Gift,
  Plus,
  Compass,
  CheckSquare,
  Sparkles,
} from 'lucide-react';

export const ActivitiesView: React.FC = () => {
  const { activities, socialEvents, toggleSocialEvent, addActivity, selectedChildId, activeChild } =
    useFamily();

  const [activeTab, setActiveTab] = useState<'cursos' | 'sociais'>('cursos');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Esporte' | 'Idiomas' | 'Artes' | 'Música'>('Esporte');
  const [newDays, setNewDays] = useState('Terça, Quinta');
  const [newStart, setNewStart] = useState('15:00');
  const [newEnd, setNewEnd] = useState('16:00');
  const [newInst, setNewInst] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newEquip, setNewEquip] = useState('');

  const childName = activeChild ? activeChild.name : 'Família Unificada';

  const filteredActivities = activities.filter((a) =>
    selectedChildId === 'all' ? true : a.childId === selectedChildId
  );

  const filteredEvents = socialEvents.filter((e) =>
    selectedChildId === 'all' ? true : e.childId === selectedChildId
  );

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAddress) return;

    addActivity({
      childId: selectedChildId === 'all' ? 'helena' : selectedChildId,
      title: newTitle,
      category: newCategory,
      daysOfWeek: newDays.split(',').map((d) => d.trim()),
      startTime: newStart,
      endTime: newEnd,
      instructorName: newInst || 'Instrutor Responsável',
      instructorContact: newPhone || '(11) 99999-0000',
      institution: 'Espaço de Atividades',
      address: newAddress,
      equipmentChecklist: newEquip ? newEquip.split(',').map((eq) => eq.trim()) : ['Garrafinha', 'Uniforme'],
      badgeColor: newCategory === 'Artes' ? 'badge-peach' : newCategory === 'Esporte' ? 'badge-sage' : 'badge-slate',
    });

    setNewTitle('');
    setNewAddress('');
    setNewEquip('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-7 rounded-3xl bg-surface border border-border-linen shadow-warm-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-warm-peach-light text-warm-terracotta flex items-center justify-center border border-border-peach shadow-sm">
            <Activity className="w-6 h-6 stroke-[1.75]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-warm-peach text-warm-terracotta-dark">
                Módulo B • Rotina Externa & Social
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mt-1">
              Atividades Extracurriculares & Eventos • {childName}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              Cursos esportivos, artísticos, rotas, contato com professores e agenda de aniversários.
            </p>
          </div>
        </div>

        {/* Action Pills & Tab Toggle */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="flex items-center p-1 bg-canvas-sand rounded-2xl border border-border-linen text-xs font-medium">
            <button
              onClick={() => setActiveTab('cursos')}
              className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
                activeTab === 'cursos'
                  ? 'bg-surface text-ink font-semibold shadow-warm-sm border border-border-linen'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Cursos & Esportes
            </button>
            <button
              onClick={() => setActiveTab('sociais')}
              className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
                activeTab === 'sociais'
                  ? 'bg-surface text-ink font-semibold shadow-warm-sm border border-border-linen'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Eventos Sociais
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-warm-terracotta text-white font-sans text-xs font-semibold shadow-warm-sm hover:bg-warm-terracotta-dark transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Atividade</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Cursos & Esportes */}
      {activeTab === 'cursos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((act) => (
            <div key={act.id} className="planner-card p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`${act.badgeColor} text-[10px] font-semibold px-2.5 py-0.5 rounded-full`}>
                    {act.category}
                  </span>
                  <span className="text-xs font-mono font-medium text-ink-muted">
                    {act.daysOfWeek.join(' & ')}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-semibold text-ink">
                  {act.title}
                </h3>
                <p className="text-xs text-ink-muted mt-0.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-warm-terracotta" />
                  <span>{act.startTime} às {act.endTime}</span>
                </p>

                {/* Location & Route */}
                <div className="p-3 rounded-2xl bg-canvas-sand/60 border border-border-linen mt-4 space-y-2">
                  <div className="flex items-start gap-2 text-xs text-ink">
                    <MapPin className="w-4 h-4 text-calm-slate shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">{act.institution}</span>
                      <span className="text-[11px] text-ink-muted">{act.address}</span>
                    </div>
                  </div>

                  <a
                    href={act.routeUrl || `https://maps.google.com/?q=${encodeURIComponent(act.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-serif italic text-warm-terracotta hover:underline pt-1"
                  >
                    <Compass className="w-3 h-3" />
                    <span>Ver rota no mapa de navegação →</span>
                  </a>
                </div>

                {/* Instructor contact */}
                <div className="mt-3 flex items-center justify-between p-2.5 rounded-xl bg-surface border border-border-linen text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-ink-light block">Instrutor(a)</span>
                    <span className="font-medium text-ink">{act.instructorName}</span>
                  </div>
                  <a
                    href={`tel:${act.instructorContact.replace(/\D/g, '')}`}
                    className="p-2 rounded-lg bg-canvas-sand hover:bg-surface text-ink-muted hover:text-warm-terracotta transition-colors"
                    title="Ligar para o instrutor"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>
                </div>

                {/* Equipment Checklist */}
                <div className="mt-4 pt-3 border-t border-border-linen">
                  <span className="text-[11px] font-semibold text-ink-muted flex items-center gap-1 mb-2">
                    <CheckSquare className="w-3.5 h-3.5 text-calm-sage" />
                    Vestimenta & Equipamentos Obrigatórios:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {act.equipmentChecklist.map((eq, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-lg bg-surface border border-border-linen text-ink-muted"
                      >
                        ✓ {eq}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border-linen flex items-center justify-between text-xs text-ink-muted">
                <span className="text-calm-sage-dark font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Matrícula Ativa
                </span>
                <button className="text-warm-terracotta hover:underline font-serif italic">
                  Editar atividade
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Eventos Sociais & Aniversários */}
      {activeTab === 'sociais' && (
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-semibold text-ink flex items-center gap-2">
            <PartyPopper className="w-5 h-5 text-warm-terracotta" />
            <span>Agenda Social, Festinhas & Convites de Colegas</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEvents.map((ev) => (
              <div key={ev.id} className="planner-card p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="badge-peach text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                      {ev.eventType}
                    </span>
                    <span className="text-xs text-ink-muted flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-ink-light" />
                      {ev.date}
                    </span>
                  </div>

                  <h4 className="font-serif text-base font-semibold text-ink">
                    {ev.title}
                  </h4>

                  <p className="text-xs text-ink-muted flex items-center gap-1.5 mt-1.5">
                    <MapPin className="w-3.5 h-3.5 text-calm-slate" />
                    <span>{ev.location}</span>
                  </p>

                  {ev.giftSuggestion && (
                    <div className="p-3 rounded-2xl bg-canvas-sand/60 border border-border-linen mt-3 flex items-start gap-2 text-xs">
                      <Gift className="w-4 h-4 text-warm-terracotta shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-ink block">Sugestão de Presente:</span>
                        <span className="text-ink-muted">{ev.giftSuggestion}</span>
                      </div>
                    </div>
                  )}

                  {ev.notes && (
                    <p className="text-xs text-ink-muted italic mt-2">
                      Obs: "{ev.notes}"
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-border-linen flex items-center justify-between">
                  <button
                    onClick={() => toggleSocialEvent(ev.id)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      ev.confirmed
                        ? 'bg-calm-sage-light text-calm-sage-dark border border-calm-sage/30'
                        : 'bg-canvas-sand text-ink-muted hover:bg-surface border border-border-linen'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-calm-sage" />
                    <span>{ev.confirmed ? 'Presença Confirmada' : 'Confirmar Presença'}</span>
                  </button>

                  <span className="text-xs text-ink-muted font-sans">
                    Horário: {ev.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Nova Atividade */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/30 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-surface border border-border-linen rounded-3xl p-6 shadow-warm-hover">
            <h3 className="font-serif text-xl font-semibold text-ink mb-4">
              Cadastrar Atividade Extracurricular
            </h3>

            <form onSubmit={handleCreateActivity} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-ink-muted block mb-1">
                  Nome da Atividade:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Natação, Judô, Inglês, Ballet"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Categoria:
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  >
                    <option value="Esporte">Esporte</option>
                    <option value="Idiomas">Idiomas</option>
                    <option value="Artes">Artes</option>
                    <option value="Música">Música</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Dias da Semana:
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Terça, Quinta"
                    value={newDays}
                    onChange={(e) => setNewDays(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Horário de Início:
                  </label>
                  <input
                    type="time"
                    value={newStart}
                    onChange={(e) => setNewStart(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Horário de Término:
                  </label>
                  <input
                    type="time"
                    value={newEnd}
                    onChange={(e) => setNewEnd(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Nome do Instrutor(a):
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Profª. Laura Meirelles"
                    value={newInst}
                    onChange={(e) => setNewInst(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Telefone de Contato:
                  </label>
                  <input
                    type="tel"
                    placeholder="Ex: (11) 98877-6655"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-muted block mb-1">
                  Endereço & Local:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Alameda dos Ipês, 450"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-muted block mb-1">
                  Vestimenta / Equipamentos (separados por vírgula):
                </label>
                <input
                  type="text"
                  placeholder="Ex: Sapatilha, Collant, Toalha"
                  value={newEquip}
                  onChange={(e) => setNewEquip(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-linen">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-muted hover:bg-canvas-sand"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-warm-terracotta hover:bg-warm-terracotta-dark text-white text-xs font-semibold shadow-warm-sm"
                >
                  Salvar Atividade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
