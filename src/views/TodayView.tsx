import React from 'react';
import { useFamily } from '../context/FamilyContext';
import {
  GraduationCap,
  Pill,
  CheckSquare,
  Backpack,
  Clock,
  CheckCircle2,
  Circle,
  Star,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  MapPin,
  Bookmark,
  Camera,
  FolderLock,
  Check,
} from 'lucide-react';
import { TabType } from '../types';

interface Props {
  onOpenSOS: () => void;
  onNavigateTab?: (tab: TabType) => void;
}

export const TodayView: React.FC<Props> = ({ onOpenSOS, onNavigateTab }) => {
  const {
    activeChild,
    selectedChildId,
    schedules,
    tasks,
    medications,
    notes,
    memories,
    toggleScheduleMaterial,
    toggleTask,
    logMedicationDose,
  } = useFamily();

  const childName = activeChild ? activeChild.name : 'Família Unificada';

  // Filter items for today (Quinta-feira)
  const todaySchedules = schedules.filter(
    (s) =>
      (selectedChildId === 'all' || s.childId === selectedChildId) &&
      s.dayOfWeek === 'Quinta'
  );

  const todayTasks = tasks.filter(
    (t) => selectedChildId === 'all' || t.childId === selectedChildId
  );

  const childTasks = todayTasks.filter((t) => t.category === 'child');
  const pendingChildTasks = childTasks.filter((t) => !t.completed).length;

  const todayMaterials = todaySchedules.flatMap((s) =>
    s.materials.map((m) => ({ ...m, scheduleId: s.id, subject: s.subject }))
  );
  const readyMaterialsCount = todayMaterials.filter((m) => m.checked).length;

  const activeMed = medications.find(
    (m) =>
      (selectedChildId === 'all' || m.childId === selectedChildId) && m.isActive
  );

  const latestNote = notes[0];
  const latestMemory = memories[0];

  const [justLoggedDose, setJustLoggedDose] = React.useState(false);

  const handleQuickDose = () => {
    if (activeMed) {
      logMedicationDose(activeMed.id, 'Mamãe (Mariana)');
      setJustLoggedDose(true);
      setTimeout(() => setJustLoggedDose(false), 3000);
    }
  };

  const navigate = (tab: TabType) => {
    if (onNavigateTab) {
      onNavigateTab(tab);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-7">
      
      {/* 1. Header Greeting & Dynamic Stat Pills */}
      <div className="p-5 sm:p-7 rounded-3xl bg-surface border border-border-peach/60 shadow-warm-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-warm-peach text-warm-terracotta-dark">
              Visão Hoje • Hub Central
            </span>
            <span className="text-xs text-ink-muted">
              {new Date().toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mt-1">
            {selectedChildId === 'all'
              ? 'Rotina Integrada da Família'
              : `Dia de ${childName}`}
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted font-sans mt-0.5">
            Prioridades imediatas, doses farmacêuticas e checklist do dia.
          </p>
        </div>

        {/* Quick SOS Trigger */}
        <button
          onClick={onOpenSOS}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-warm-peach-light hover:bg-warm-peach text-warm-terracotta-dark border border-warm-peach font-sans text-xs sm:text-sm font-semibold transition-all duration-300 shadow-warm-sm self-start md:self-auto hover:scale-[1.02]"
        >
          <ShieldAlert className="w-4 h-4 text-warm-terracotta" />
          <span>Ficha SOS da {childName}</span>
        </button>
      </div>

      {/* 2. Executive Stat Pills Bar (O Dia em Números) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => navigate('education')}
          className="p-3.5 rounded-2xl bg-surface border border-border-linen hover:border-calm-slate shadow-warm-sm flex items-center gap-3 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-calm-slate-light text-calm-slate-dark flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-ink-muted block font-medium">Aulas Hoje</span>
            <span className="font-serif text-lg font-bold text-ink leading-tight">
              {todaySchedules.length} Aulas
            </span>
          </div>
        </button>

        <button
          onClick={() => navigate('health')}
          className="p-3.5 rounded-2xl bg-surface border border-border-linen hover:border-warm-peach shadow-warm-sm flex items-center gap-3 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-warm-peach-light text-warm-terracotta flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-ink-muted block font-medium">Remédio Ativo</span>
            <span className="font-serif text-lg font-bold text-warm-terracotta leading-tight">
              {activeMed ? 'Próx: 23:30' : 'Nenhum'}
            </span>
          </div>
        </button>

        <button
          onClick={() => navigate('productivity')}
          className="p-3.5 rounded-2xl bg-surface border border-border-linen hover:border-calm-sage shadow-warm-sm flex items-center gap-3 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-calm-sage-light text-calm-sage-dark flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-ink-muted block font-medium">Autonomia</span>
            <span className="font-serif text-lg font-bold text-ink leading-tight">
              {pendingChildTasks} Pendentes
            </span>
          </div>
        </button>

        <div className="p-3.5 rounded-2xl bg-surface border border-border-linen shadow-warm-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-canvas-sand text-ink-muted flex items-center justify-center shrink-0">
            <Backpack className="w-5 h-5 text-calm-sage" />
          </div>
          <div>
            <span className="text-[11px] text-ink-muted block font-medium">Mochila</span>
            <span className="font-serif text-lg font-bold text-ink leading-tight">
              {readyMaterialsCount}/{todayMaterials.length} Prontos
            </span>
          </div>
        </div>
      </div>

      {/* 3. Foco do Momento & Próximas Horas (Timeline Concentrada) */}
      <div className="planner-card p-6 border-border-peach/50 bg-gradient-to-br from-surface via-surface to-canvas-sand/40">
        <div className="flex items-center justify-between pb-3 border-b border-border-linen mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-warm-terracotta" />
            <h3 className="font-serif text-lg font-semibold text-ink">
              Linha do Tempo de Hoje (Próximas Horas)
            </h3>
          </div>
          <span className="text-xs font-serif italic text-warm-terracotta">
            Ordem cronológica do dia
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Item 1: Próxima Aula */}
          <div className="p-4 rounded-2xl bg-surface border border-border-linen shadow-warm-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-ink-muted mb-1">
                <span className="font-bold text-ink font-mono">08:00 - 08:50</span>
                <span className="badge-slate text-[10px] px-2 py-0.2 rounded-full font-medium">
                  Sala 14B
                </span>
              </div>
              <h4 className="font-serif text-sm font-semibold text-ink">
                Matemática Lúdica & Geometria
              </h4>
              <p className="text-xs text-ink-muted flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-calm-slate" /> Profª. Camila Rodrigues
              </p>
            </div>
            <span className="text-[10px] text-calm-sage-dark font-medium mt-3 block">
              ✓ Caderno e estojo na mochila
            </span>
          </div>

          {/* Item 2: Aula das Cores */}
          <div className="p-4 rounded-2xl bg-surface border border-border-linen shadow-warm-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-ink-muted mb-1">
                <span className="font-bold text-ink font-mono">10:30 - 11:45</span>
                <span className="badge-peach text-[10px] px-2 py-0.2 rounded-full font-medium">
                  Ateliê
                </span>
              </div>
              <h4 className="font-serif text-sm font-semibold text-ink">
                Educação Artística em Aquarela
              </h4>
              <p className="text-xs text-ink-muted flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-warm-terracotta" /> Ateliê das Cores
              </p>
            </div>
            <span className="text-[10px] text-warm-terracotta-dark font-medium mt-3 block">
              ⚠️ Levar avental impermeável
            </span>
          </div>

          {/* Item 3: Remédio com Ação Rápida */}
          {activeMed && (
            <div className="p-4 rounded-2xl bg-warm-peach-light/60 border border-warm-peach shadow-warm-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-ink-muted mb-1">
                  <span className="font-bold text-warm-terracotta-dark font-mono">
                    Próxima Dose: {activeMed.nextDoseTime}
                  </span>
                  <span className="badge-peach text-[10px] px-2 py-0.2 rounded-full font-medium">
                    Farmácia
                  </span>
                </div>
                <h4 className="font-serif text-sm font-semibold text-ink">
                  {activeMed.name}
                </h4>
                <p className="text-xs text-ink-muted mt-0.5">
                  Dose: <strong>{activeMed.dosage}</strong> (8 em 8h)
                </p>
              </div>

              <button
                onClick={handleQuickDose}
                disabled={justLoggedDose}
                className={`mt-3 w-full py-2 px-3 rounded-xl font-sans text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                  justLoggedDose
                    ? 'bg-calm-sage text-white'
                    : 'bg-warm-terracotta hover:bg-warm-terracotta-dark text-white hover:scale-[1.02]'
                }`}
              >
                {justLoggedDose ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Dose Registrada!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Registrar Dose Tomada (1 Toque)</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4. Action Grid: Checklist da Mochila & Tarefas de Autonomia */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 items-start">
        
        {/* Checklist da Mochila */}
        <div className="planner-card p-6">
          <div className="flex items-center justify-between pb-3 border-b border-border-linen mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-canvas-sand text-calm-sage-dark flex items-center justify-center border border-border-linen">
                <Backpack className="w-4 h-4 text-calm-sage" />
              </div>
              <div>
                <h4 className="font-serif text-base font-semibold text-ink">
                  Mochila de Hoje ({readyMaterialsCount}/{todayMaterials.length})
                </h4>
                <p className="text-[11px] text-ink-muted">Itens necessários para as aulas de quinta</p>
              </div>
            </div>

            <button
              onClick={() => navigate('education')}
              className="text-xs text-warm-terracotta font-serif italic hover:underline flex items-center gap-1"
            >
              <span>Ver grade</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            {todayMaterials.map((mat) => (
              <button
                key={mat.id}
                onClick={() => toggleScheduleMaterial(mat.scheduleId, mat.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all border ${
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
                  <span className="text-[10px] text-ink-light block">{mat.subject}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tarefas de Autonomia da Criança */}
        <div className="planner-card p-6">
          <div className="flex items-center justify-between pb-3 border-b border-border-linen mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-warm-peach-light text-warm-terracotta flex items-center justify-center border border-border-peach">
                <Star className="w-4 h-4 fill-warm-peach stroke-warm-terracotta" />
              </div>
              <div>
                <h4 className="font-serif text-base font-semibold text-ink">
                  Autonomia de {childName}
                </h4>
                <p className="text-[11px] text-ink-muted">Hábitos e responsabilidades guiadas</p>
              </div>
            </div>

            <button
              onClick={() => navigate('productivity')}
              className="text-xs text-warm-terracotta font-serif italic hover:underline flex items-center gap-1"
            >
              <span>Ver todas</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            {childTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  task.completed
                    ? 'bg-calm-sage-light/40 border-calm-sage/30 text-ink-muted'
                    : 'bg-surface hover:bg-canvas-sand/60 border-border-linen text-ink'
                }`}
              >
                <div className="flex items-center gap-3">
                  {task.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-calm-sage shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-border-linen hover:text-calm-sage shrink-0 transition-colors" />
                  )}
                  <div>
                    <h5
                      className={`text-xs font-sans font-medium ${
                        task.completed ? 'line-through text-ink-light' : 'text-ink'
                      }`}
                    >
                      {task.title}
                    </h5>
                    <span className="text-[10px] text-ink-muted">
                      Horário: {task.dueTime}
                    </span>
                  </div>
                </div>

                {task.rewardStars && (
                  <span className="badge-peach text-[10px] font-semibold px-2 py-0.2 rounded-md">
                    +{task.rewardStars} ⭐
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. Smart Quick Hub (Atalhos Limpos para Outros Módulos) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Quick Note Card */}
        {latestNote && (
          <div
            onClick={() => navigate('productivity')}
            className="planner-card p-4.5 cursor-pointer hover:border-border-peach transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-ink-muted mb-2">
                <span className="badge-peach text-[10px] font-semibold px-2 py-0.2 rounded-full">
                  {latestNote.tags[0]}
                </span>
                <span className="text-[10px] text-ink-light">{latestNote.createdAt}</span>
              </div>
              <h5 className="font-serif text-sm font-semibold text-ink group-hover:text-warm-terracotta transition-colors line-clamp-1">
                {latestNote.title}
              </h5>
              <p className="text-xs text-ink-muted mt-1 line-clamp-2 font-sans">
                {latestNote.content}
              </p>
            </div>
            <span className="text-[11px] font-serif italic text-warm-terracotta mt-3 flex items-center gap-1">
              <Bookmark className="w-3 h-3" /> Abrir bloco de notas →
            </span>
          </div>
        )}

        {/* Quick Memory Polaroid */}
        {latestMemory && (
          <div
            onClick={() => navigate('memories')}
            className="planner-card p-4.5 cursor-pointer hover:border-border-peach transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-ink-muted mb-2">
                <span className="badge-sage text-[10px] font-semibold px-2 py-0.2 rounded-full">
                  #{latestMemory.category}
                </span>
                <span className="text-[10px] text-ink-light">{latestMemory.date}</span>
              </div>
              <h5 className="font-serif text-sm font-semibold text-ink group-hover:text-warm-terracotta transition-colors line-clamp-1">
                {latestMemory.title}
              </h5>
              <p className="text-xs text-ink-muted mt-1 line-clamp-2 font-serif italic">
                "{latestMemory.narrative}"
              </p>
            </div>
            <span className="text-[11px] font-serif italic text-warm-terracotta mt-3 flex items-center gap-1">
              <Camera className="w-3 h-3" /> Ver álbum de memórias →
            </span>
          </div>
        )}

        {/* Quick Documents Vault */}
        <div
          onClick={() => navigate('documents')}
          className="planner-card p-4.5 cursor-pointer hover:border-border-peach transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-ink-muted mb-2">
              <span className="badge-slate text-[10px] font-semibold px-2 py-0.2 rounded-full">
                Cofre Seguro
              </span>
              <span className="text-[10px] text-ink-light">Criptografado</span>
            </div>
            <h5 className="font-serif text-sm font-semibold text-ink group-hover:text-warm-terracotta transition-colors">
              Documentos & Exames
            </h5>
            <p className="text-xs text-ink-muted mt-1 font-sans">
              Certidões, carteira de vacinas carimbada e contratos escolares.
            </p>
          </div>
          <span className="text-[11px] font-serif italic text-warm-terracotta mt-3 flex items-center gap-1">
            <FolderLock className="w-3 h-3" /> Acessar cofre familiar →
          </span>
        </div>
      </div>

    </div>
  );
};
