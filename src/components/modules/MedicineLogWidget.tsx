import React, { useState } from 'react';
import { Pill, Clock, Check, History, AlertCircle, Sparkles } from 'lucide-react';

export const MedicineLogWidget: React.FC = () => {
  const [loggedDoses, setLoggedDoses] = useState([
    { id: 1, caregiver: 'Mamãe (Mariana)', time: '07:30', note: 'Dose matinal com café' },
    { id: 2, caregiver: 'Papai (Rodrigo)', time: '15:30', note: 'Dose da tarde após o lanche' },
  ]);

  const [justLogged, setJustLogged] = useState(false);

  const handleLogQuickDose = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const newLog = {
      id: Date.now(),
      caregiver: 'Mamãe (Mariana)',
      time: `${hours}:${minutes}`,
      note: 'Dose registrada via botão rápido',
    };
    setLoggedDoses([newLog, ...loggedDoses]);
    setJustLogged(true);
    setTimeout(() => setJustLogged(false), 3000);
  };

  return (
    <div className="planner-card p-6 sm:p-7 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border-linen mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-warm-peach-light text-warm-terracotta-dark flex items-center justify-center border border-border-peach">
              <Pill className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink">
                Cuidados & Farmácia
              </h3>
              <p className="text-xs text-ink-muted">Tratamento temporário ativo</p>
            </div>
          </div>
          <span className="badge-peach text-xs font-semibold px-3 py-1 rounded-full">
            Dose 2 de 3 hoje
          </span>
        </div>

        {/* Current Active Treatment Card */}
        <div className="p-4 rounded-2xl bg-canvas-sand/70 border border-border-peach/60 mb-5 relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-warm-terracotta">
                Tratamento Ativo
              </span>
              <h4 className="font-serif text-base font-semibold text-ink mt-0.5">
                Amoxicilina + Clavulanato
              </h4>
              <p className="text-xs text-ink-muted mt-0.5">
                Dose: <strong className="text-ink">5.0 ml</strong> a cada <strong className="text-ink">8 horas</strong> (Dia 4 de 7)
              </p>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-sans px-2 py-0.5 rounded-md bg-surface text-ink-muted border border-border-linen">
                Próxima: 23:30
              </span>
            </div>
          </div>

          {/* Quick 1-Click Action Button */}
          <div className="mt-4 pt-3 border-t border-border-peach/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <Clock className="w-3.5 h-3.5 text-warm-terracotta" />
              <span>Intervalo rigoroso p/ evitar duplicidade</span>
            </div>

            <button
              onClick={handleLogQuickDose}
              disabled={justLogged}
              className={`group flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-semibold transition-all duration-300 shadow-sm ${
                justLogged
                  ? 'bg-calm-sage text-white'
                  : 'bg-warm-terracotta hover:bg-warm-terracotta-dark text-white hover:shadow-warm-md hover:scale-[1.02]'
              }`}
            >
              {justLogged ? (
                <>
                  <Check className="w-4 h-4 animate-bounce" />
                  <span>Dose Registrada com Sucesso!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Registrar Dose Tomada Agora</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Administration Log History */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-serif font-semibold text-ink px-1 mb-1">
            <History className="w-3.5 h-3.5 text-ink-muted" />
            <span>Registro de Doses Administradas Hoje</span>
          </div>

          {loggedDoses.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-surface border border-border-linen text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-calm-sage" />
                <div>
                  <span className="font-semibold text-ink">{log.caregiver}</span>
                  <span className="text-[11px] text-ink-light block sm:inline sm:ml-2">
                    {log.note}
                  </span>
                </div>
              </div>
              <span className="font-mono font-medium text-ink-muted bg-canvas-sand px-2 py-0.5 rounded-md text-[11px] border border-border-linen">
                {log.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-border-linen flex items-center justify-between text-xs text-ink-muted">
        <span className="flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 text-calm-sage" />
          Nenhuma dose esquecida
        </span>
        <button className="text-warm-terracotta hover:text-warm-terracotta-dark font-medium text-xs font-serif italic hover:underline">
          Histórico médico completo →
        </button>
      </div>
    </div>
  );
};
