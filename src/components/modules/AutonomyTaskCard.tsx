import React, { useState } from 'react';
import { CheckSquare, CheckCircle2, Circle, Sparkles, UserCheck, Star, Clock } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  category: 'child' | 'parent';
  priority: 'alta' | 'media' | 'baixa';
  time: string;
  completed: boolean;
  rewardStars?: number;
}

export const AutonomyTaskCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'child' | 'parent'>('child');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Arrumar a caminha e dobrar o cobertor',
      category: 'child',
      priority: 'media',
      time: 'Antes da escola',
      completed: true,
      rewardStars: 2,
    },
    {
      id: 2,
      title: 'Regar a plantinha da varanda',
      category: 'child',
      priority: 'baixa',
      time: 'Tarde',
      completed: false,
      rewardStars: 1,
    },
    {
      id: 3,
      title: 'Guardar os materiais de artes na caixa',
      category: 'child',
      priority: 'alta',
      time: 'Noite',
      completed: false,
      rewardStars: 3,
    },
    {
      id: 4,
      title: 'Assinar a autorização do passeio pedagógico',
      category: 'parent',
      priority: 'alta',
      time: 'Hoje até 18h',
      completed: true,
    },
    {
      id: 5,
      title: 'Comprar a cartolina para a feira de ciências',
      category: 'parent',
      priority: 'media',
      time: 'Amanhã',
      completed: false,
    },
  ]);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (activeTab === 'child') return t.category === 'child';
    if (activeTab === 'parent') return t.category === 'parent';
    return true;
  });

  const childStarsEarned = tasks
    .filter((t) => t.category === 'child' && t.completed)
    .reduce((acc, curr) => acc + (curr.rewardStars || 0), 0);

  return (
    <div className="planner-card p-6 sm:p-7 flex flex-col justify-between">
      <div>
        {/* Header with Title and Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-linen mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-calm-sage-light text-calm-sage-dark flex items-center justify-center border border-calm-sage/30">
              <CheckSquare className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink">
                Tarefas & Autonomia
              </h3>
              <p className="text-xs text-ink-muted">Gestão colaborativa do dia</p>
            </div>
          </div>

          {/* Autonomy Stars Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-warm-peach-light text-warm-terracotta-dark border border-warm-peach text-xs font-semibold self-start sm:self-auto">
            <Star className="w-3.5 h-3.5 fill-warm-terracotta text-warm-terracotta" />
            <span>{childStarsEarned} Estrelas conquistadas</span>
          </div>
        </div>

        {/* Tab Filters (Parents vs Child) */}
        <div className="flex items-center p-1 bg-canvas-sand rounded-2xl border border-border-linen mb-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab('child')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl transition-all duration-200 ${
              activeTab === 'child'
                ? 'bg-surface text-ink font-semibold shadow-warm-sm border border-border-linen'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-warm-terracotta" />
            <span>Da Helena (Autonomia)</span>
          </button>
          <button
            onClick={() => setActiveTab('parent')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl transition-all duration-200 ${
              activeTab === 'parent'
                ? 'bg-surface text-ink font-semibold shadow-warm-sm border border-border-linen'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-calm-slate" />
            <span>Dos Pais & Cuidados</span>
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-2 rounded-xl transition-all duration-200 ${
              activeTab === 'all'
                ? 'bg-surface text-ink font-semibold shadow-warm-sm border border-border-linen'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Todas
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-2.5">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                task.completed
                  ? 'bg-calm-sage-light/40 border-calm-sage/30 text-ink-muted'
                  : 'bg-surface hover:bg-canvas-sand/60 border-border-linen text-ink'
              }`}
            >
              <div className="flex items-center gap-3">
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-calm-sage shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-border-linen hover:text-calm-sage shrink-0 transition-colors" />
                )}
                <div>
                  <h4
                    className={`text-xs sm:text-sm font-sans font-medium ${
                      task.completed ? 'line-through text-ink-light' : 'text-ink'
                    }`}
                  >
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-ink-muted flex items-center gap-1">
                      <Clock className="w-3 h-3 text-ink-light" />
                      {task.time}
                    </span>
                    {task.rewardStars && (
                      <span className="text-[10px] text-warm-terracotta-dark font-medium flex items-center gap-0.5 bg-warm-peach-light px-1.5 py-0.2 rounded">
                        +{task.rewardStars} ⭐
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <span
                className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
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

      <div className="pt-4 mt-4 border-t border-border-linen flex items-center justify-between text-xs text-ink-muted">
        <span>Incentivo diário à responsabilidade</span>
        <button className="text-warm-terracotta hover:text-warm-terracotta-dark font-medium text-xs font-serif italic hover:underline">
          + Criar nova tarefa
        </button>
      </div>
    </div>
  );
};
