import React, { useState } from 'react';
import { useFamily } from '../context/FamilyContext';
import {
  CheckSquare,
  Plus,
  Pin,
  Tag,
  Clock,
  Sparkles,
  CheckCircle2,
  Circle,
  Star,
  UserCheck,
} from 'lucide-react';

export const ProductivityView: React.FC = () => {
  const { notes, tasks, toggleTask, addTask, addNote, togglePinNote, selectedChildId, activeChild } =
    useFamily();

  const [activeTab, setActiveTab] = useState<'tarefas' | 'notas'>('tarefas');
  const [taskFilter, setTaskFilter] = useState<'child' | 'parent' | 'all'>('child');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Modals
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);

  // New Task Form
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState<'child' | 'parent'>('child');
  const [taskPriority, setTaskPriority] = useState<'alta' | 'media' | 'baixa'>('media');
  const [taskDue, setTaskDue] = useState('Hoje');
  const [taskStars, setTaskStars] = useState(2);

  // New Note Form
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteTag, setNoteTag] = useState('#comportamento');

  const childName = activeChild ? activeChild.name : 'Família Unificada';

  const filteredTasks = tasks.filter((t) => {
    const matchChild = selectedChildId === 'all' || t.childId === selectedChildId;
    if (taskFilter === 'child') return matchChild && t.category === 'child';
    if (taskFilter === 'parent') return matchChild && t.category === 'parent';
    return matchChild;
  });

  const filteredNotes = notes.filter((n) => {
    const matchTag = selectedTag === 'all' || n.tags.includes(selectedTag);
    const matchChild = selectedChildId === 'all' || !n.childId || n.childId === selectedChildId;
    return matchTag && matchChild;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;
    addTask({
      childId: selectedChildId === 'all' ? 'helena' : selectedChildId,
      title: taskTitle,
      category: taskCategory,
      priority: taskPriority,
      dueTime: taskDue,
      completed: false,
      rewardStars: taskCategory === 'child' ? Number(taskStars) : undefined,
    });
    setTaskTitle('');
    setShowTaskModal(false);
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle || !noteContent) return;
    addNote({
      childId: selectedChildId === 'all' ? undefined : selectedChildId,
      title: noteTitle,
      content: noteContent,
      tags: [noteTag],
      isPinned: false,
      tagColorClass: noteTag === '#comportamento' ? 'badge-peach' : noteTag === '#escola' ? 'badge-slate' : 'badge-sage',
    });
    setNoteTitle('');
    setNoteContent('');
    setShowNoteModal(false);
  };

  const childStars = tasks
    .filter((t) => t.category === 'child' && t.completed)
    .reduce((acc, curr) => acc + (curr.rewardStars || 0), 0);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-7 rounded-3xl bg-surface border border-border-linen shadow-warm-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-calm-sage-light text-calm-sage-dark flex items-center justify-center border border-calm-sage/30 shadow-sm">
            <CheckSquare className="w-6 h-6 stroke-[1.75]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-calm-sage-light text-calm-sage-dark">
                Módulo D • Produtividade & Autonomia
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mt-1">
              Notas & Tarefas Diárias • {childName}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              Listas colaborativas de afazeres, incentivo à autonomia com estrelas e bloco de reflexões pedagógicas.
            </p>
          </div>
        </div>

        {/* Tab switcher and Create button */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="flex items-center p-1 bg-canvas-sand rounded-2xl border border-border-linen text-xs font-medium">
            <button
              onClick={() => setActiveTab('tarefas')}
              className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
                activeTab === 'tarefas'
                  ? 'bg-surface text-ink font-semibold shadow-warm-sm border border-border-linen'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Listas de Tarefas
            </button>
            <button
              onClick={() => setActiveTab('notas')}
              className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
                activeTab === 'notas'
                  ? 'bg-surface text-ink font-semibold shadow-warm-sm border border-border-linen'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Bloco de Notas
            </button>
          </div>

          <button
            onClick={() => (activeTab === 'tarefas' ? setShowTaskModal(true) : setShowNoteModal(true))}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-warm-terracotta text-white font-sans text-xs font-semibold shadow-warm-sm hover:bg-warm-terracotta-dark transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{activeTab === 'tarefas' ? 'Nova Tarefa' : 'Nova Nota'}</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Tarefas & Autonomia */}
      {activeTab === 'tarefas' && (
        <div className="space-y-6">
          {/* Subfilter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-2xl bg-surface border border-border-linen shadow-warm-sm">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTaskFilter('child')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  taskFilter === 'child'
                    ? 'bg-warm-peach-light text-warm-terracotta-dark border border-warm-peach shadow-sm'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                <Sparkles className="w-4 h-4 text-warm-terracotta" />
                <span>Tarefas da Criança (Autonomia)</span>
              </button>

              <button
                onClick={() => setTaskFilter('parent')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  taskFilter === 'parent'
                    ? 'bg-calm-slate-light text-calm-slate-dark border border-calm-slate/30 shadow-sm'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                <UserCheck className="w-4 h-4 text-calm-slate" />
                <span>Tarefas dos Pais</span>
              </button>

              <button
                onClick={() => setTaskFilter('all')}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  taskFilter === 'all'
                    ? 'bg-surface text-ink border border-border-linen shadow-sm'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                Todas
              </button>
            </div>

            <div className="flex items-center gap-2 pr-2 text-xs font-serif italic text-warm-terracotta">
              <Star className="w-4 h-4 fill-warm-terracotta text-warm-terracotta" />
              <span>{childStars} Estrelas conquistadas no mural de hábitos</span>
            </div>
          </div>

          {/* Tasks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`planner-card p-5 cursor-pointer flex items-start justify-between gap-3 transition-all ${
                  task.completed
                    ? 'bg-calm-sage-light/30 border-calm-sage/30'
                    : 'bg-surface hover:border-warm-peach'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-calm-sage shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-5 h-5 text-border-linen shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4
                      className={`text-sm font-sans font-medium leading-snug ${
                        task.completed ? 'line-through text-ink-light' : 'text-ink'
                      }`}
                    >
                      {task.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs text-ink-muted flex items-center gap-1">
                        <Clock className="w-3 h-3 text-ink-light" />
                        {task.dueTime}
                      </span>
                      {task.rewardStars && (
                        <span className="badge-peach text-[10px] font-semibold px-2 py-0.2 rounded-md">
                          +{task.rewardStars} ⭐
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                    task.priority === 'alta'
                      ? 'bg-warm-peach-light text-warm-terracotta-dark border border-warm-peach'
                      : 'bg-canvas-sand text-ink-muted border border-border-linen'
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Bloco de Notas */}
      {activeTab === 'notas' && (
        <div className="space-y-6">
          {/* Tag Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider px-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Filtrar Marcadores:
            </span>
            {['all', '#comportamento', '#escola', '#saude', '#ideias', '#combinados'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-warm-terracotta text-white shadow-warm-sm font-semibold'
                    : 'bg-surface text-ink-muted hover:bg-canvas-sand border border-border-linen'
                }`}
              >
                {tag === 'all' ? 'Todos os marcadores' : tag}
              </button>
            ))}
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`planner-card p-6 flex flex-col justify-between relative ${
                  note.isPinned ? 'bg-canvas-sand/60 border-border-peach shadow-warm-sm' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      {note.tags.map((t, idx) => (
                        <span key={idx} className={`${note.tagColorClass} text-[10px] font-semibold px-2 py-0.5 rounded-full`}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => togglePinNote(note.id)}
                      className="p-1 rounded-lg hover:bg-surface text-ink-muted hover:text-warm-terracotta transition-colors"
                      title={note.isPinned ? 'Desafixar nota' : 'Fixar no topo'}
                    >
                      <Pin className={`w-3.5 h-3.5 ${note.isPinned ? 'fill-warm-terracotta text-warm-terracotta' : ''}`} />
                    </button>
                  </div>

                  <h4 className="font-serif text-base font-semibold text-ink mt-1 leading-snug">
                    {note.title}
                  </h4>
                  <p className="text-xs text-ink-muted font-sans leading-relaxed mt-2">
                    {note.content}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-border-linen text-[11px] text-ink-light flex items-center justify-between">
                  <span>{note.createdAt}</span>
                  <span className="font-serif italic text-warm-terracotta">Anotação livre</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Nova Tarefa */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/30 backdrop-blur-sm">
          <div className="w-full max-w-md bg-surface border border-border-linen rounded-3xl p-6 shadow-warm-hover">
            <h3 className="font-serif text-xl font-semibold text-ink mb-4">
              Criar Nova Tarefa
            </h3>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-ink-muted block mb-1">
                  Título da Tarefa:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Arrumar os brinquedos na caixa"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Responsável:
                  </label>
                  <select
                    value={taskCategory}
                    onChange={(e) => setTaskCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  >
                    <option value="child">Criança (Autonomia)</option>
                    <option value="parent">Pais / Cuidador</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Prioridade:
                  </label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  >
                    <option value="alta">Alta</option>
                    <option value="media">Média</option>
                    <option value="baixa">Baixa</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Horário / Período:
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Manhã, Antes de dormir"
                    value={taskDue}
                    onChange={(e) => setTaskDue(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Estrelas (se criança):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={taskStars}
                    onChange={(e) => setTaskStars(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-linen">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-muted hover:bg-canvas-sand"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-warm-terracotta hover:bg-warm-terracotta-dark text-white text-xs font-semibold shadow-warm-sm"
                >
                  Salvar Tarefa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Nova Nota */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/30 backdrop-blur-sm">
          <div className="w-full max-w-md bg-surface border border-border-linen rounded-3xl p-6 shadow-warm-hover">
            <h3 className="font-serif text-xl font-semibold text-ink mb-4">
              Nova Reflexão / Anotação
            </h3>

            <form onSubmit={handleCreateNote} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-ink-muted block mb-1">
                  Título da Nota:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Combinados sobre rotina de estudos"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-muted block mb-1">
                  Marcador (#Tag):
                </label>
                <select
                  value={noteTag}
                  onChange={(e) => setNoteTag(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                >
                  <option value="#comportamento">#comportamento</option>
                  <option value="#escola">#escola</option>
                  <option value="#saude">#saude</option>
                  <option value="#ideias">#ideias</option>
                  <option value="#combinados">#combinados</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-muted block mb-1">
                  Conteúdo da Reflexão:
                </label>
                <textarea
                  placeholder="Escreva suas orientações, combinados ou pensamentos..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  rows={4}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-linen">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-muted hover:bg-canvas-sand"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-warm-terracotta hover:bg-warm-terracotta-dark text-white text-xs font-semibold shadow-warm-sm"
                >
                  Salvar Nota
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
