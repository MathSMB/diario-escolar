import React, { useState } from 'react';
import {
  X,
  Bell,
  CheckCircle2,
  HeartPulse,
  GraduationCap,
  Sparkles,
  Clock,
  Trash2,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationItem {
  id: string;
  category: 'saude' | 'escola' | 'familia';
  title: string;
  description: string;
  timeText: string;
  childName: string;
  isRead: boolean;
  urgent?: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    category: 'saude',
    title: 'Dose de Amoxicilina 250mg',
    description: 'Helena precisa tomar 5.0 ml do antibiótico no horário da tarde. Não esquecer de ministrar com alimento.',
    timeText: 'Hoje às 16:00 (Faltam 45 min)',
    childName: 'Helena',
    isRead: false,
    urgent: true,
  },
  {
    id: 'notif-2',
    category: 'escola',
    title: 'Aviso da Feira de Ciências & Natureza',
    description: 'Apresentação do projeto do ciclo da água no auditório. Levar o caderno de anotações e avental.',
    timeText: 'Amanhã às 08:00',
    childName: 'Helena',
    isRead: false,
  },
  {
    id: 'notif-3',
    category: 'saude',
    title: 'Consulta Pediátrica de Puericultura',
    description: 'Consulta de 2 anos do Lucas agendada com o Dr. Fernando Vasconcelos. Levar caderneta de vacinação.',
    timeText: '15 de Outubro às 10:00',
    childName: 'Lucas',
    isRead: false,
  },
  {
    id: 'notif-4',
    category: 'familia',
    title: 'Tarefa de Autonomia Concluída!',
    description: 'Laura finalizou a lista de 10 exercícios de álgebra com nota máxima (+2 estrelas de recompensa).',
    timeText: 'Hoje às 10:30',
    childName: 'Laura',
    isRead: true,
  },
];

export const NotificationsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'saude' | 'escola' | 'familia'>('all');

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'all') return true;
    return n.category === filter;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'saude':
        return <HeartPulse className="w-4 h-4 text-warm-terracotta" />;
      case 'escola':
        return <GraduationCap className="w-4 h-4 text-calm-slate" />;
      default:
        return <Sparkles className="w-4 h-4 text-calm-sage" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface w-full max-w-lg rounded-3xl border border-border-linen shadow-warm-xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-border-linen flex items-center justify-between bg-canvas-sand/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-warm-peach text-warm-terracotta-dark rounded-2xl shadow-sm relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-warm-terracotta text-white text-[9px] font-bold flex items-center justify-center border border-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg font-bold text-ink">
                  Central de Lembretes &amp; Avisos
                </h2>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-sans font-medium bg-warm-peach-light text-warm-terracotta border border-border-peach">
                    {unreadCount} pendentes
                  </span>
                )}
              </div>
              <p className="font-sans text-xs text-ink-muted">
                Doses de saúde, eventos escolares e conquistas do dia
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-canvas text-ink-muted hover:text-ink transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-6 py-2.5 bg-surface border-b border-border-linen/80 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-xl font-medium transition-all ${
                filter === 'all'
                  ? 'bg-warm-peach text-warm-terracotta-dark font-semibold'
                  : 'bg-canvas-sand text-ink-muted hover:text-ink'
              }`}
            >
              Todas ({notifications.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('saude')}
              className={`px-3 py-1 rounded-xl font-medium transition-all ${
                filter === 'saude'
                  ? 'bg-warm-peach text-warm-terracotta-dark font-semibold'
                  : 'bg-canvas-sand text-ink-muted hover:text-ink'
              }`}
            >
              Saúde ({notifications.filter((n) => n.category === 'saude').length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('escola')}
              className={`px-3 py-1 rounded-xl font-medium transition-all ${
                filter === 'escola'
                  ? 'bg-warm-peach text-warm-terracotta-dark font-semibold'
                  : 'bg-canvas-sand text-ink-muted hover:text-ink'
              }`}
            >
              Escola ({notifications.filter((n) => n.category === 'escola').length})
            </button>
          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllAsRead}
              className="text-[11px] font-sans text-warm-terracotta hover:underline shrink-0"
            >
              Marcar lidas
            </button>
          )}
        </div>

        {/* Notification List */}
        <div className="p-4 sm:p-6 space-y-3 overflow-y-auto flex-1">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-warm-sage mx-auto" />
              <p className="font-serif text-sm font-semibold text-ink">Nenhum lembrete pendente</p>
              <p className="text-xs text-ink-muted">Tudo em perfeita harmonia na rotina da família!</p>
            </div>
          ) : (
            filteredNotifications.map((item) => (
              <div
                key={item.id}
                onClick={() => handleToggleRead(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                  item.isRead
                    ? 'bg-canvas-sand/30 border-border-linen/70 opacity-75'
                    : 'bg-surface border-border-peach shadow-warm-sm hover:border-warm-terracotta'
                }`}
              >
                {!item.isRead && (
                  <span className="w-2 h-2 rounded-full bg-warm-terracotta absolute top-4 right-4" />
                )}

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-canvas-sand border border-border-linen shrink-0 mt-0.5">
                    {getCategoryIcon(item.category)}
                  </div>

                  <div className="flex-1 min-w-0 pr-3 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-serif text-sm font-bold text-ink">
                        {item.title}
                      </span>
                      <span className="px-2 py-0.2 rounded-full text-[10px] font-medium bg-canvas-sand border border-border-linen text-ink-muted">
                        {item.childName}
                      </span>
                    </div>

                    <p className="text-xs text-ink-muted leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-1 text-[11px] text-warm-terracotta font-medium pt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{item.timeText}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-border-linen flex items-center justify-between bg-canvas-sand/40 shrink-0">
          <button
            type="button"
            onClick={handleClearAll}
            className="flex items-center gap-1.5 text-xs text-ink-light hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpar Histórico</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-surface border border-border-linen hover:bg-canvas-sand rounded-xl text-xs font-sans font-medium text-ink transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
