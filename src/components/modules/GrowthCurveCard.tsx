import React from 'react';
import { TrendingUp, Activity, Ruler, Weight, Calendar } from 'lucide-react';

export const GrowthCurveCard: React.FC = () => {
  const history = [
    { date: 'Set/2026', age: '7a 2m', height: '122 cm', weight: '24.2 kg', status: 'Percentil 65' },
    { date: 'Mar/2026', age: '6a 8m', height: '118 cm', weight: '22.8 kg', status: 'Percentil 62' },
    { date: 'Set/2025', age: '6a 2m', height: '114 cm', weight: '21.3 kg', status: 'Percentil 60' },
  ];

  return (
    <div className="planner-card p-6 sm:p-7 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border-linen mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-calm-sage-light text-calm-sage-dark flex items-center justify-center border border-calm-sage/30">
              <Activity className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink">
                Curva de Crescimento
              </h3>
              <p className="text-xs text-ink-muted">Acompanhamento evolutivo pediátrico (OMS)</p>
            </div>
          </div>
          <span className="badge-sage text-xs font-semibold px-3 py-1 rounded-full">
            Dentro do Esperado
          </span>
        </div>

        {/* Current Stat Cards */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3.5 rounded-2xl bg-calm-sage-light/50 border border-calm-sage/20">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-calm-sage-dark uppercase tracking-wider">
                Altura Atual
              </span>
              <Ruler className="w-4 h-4 text-calm-sage-dark" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold text-ink">122</span>
              <span className="text-xs text-ink-muted">cm</span>
            </div>
            <span className="text-[10px] text-calm-sage-dark block mt-0.5">
              +4.0 cm nos últimos 6 meses
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-calm-slate-light/50 border border-calm-slate/20">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-calm-slate-dark uppercase tracking-wider">
                Peso Atual
              </span>
              <Weight className="w-4 h-4 text-calm-slate-dark" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold text-ink">24.2</span>
              <span className="text-xs text-ink-muted">kg</span>
            </div>
            <span className="text-[10px] text-calm-slate-dark block mt-0.5">
              +1.4 kg (Ganho saudável)
            </span>
          </div>
        </div>

        {/* Tactile Visual Growth Chart Representation */}
        <div className="p-4 rounded-2xl bg-canvas-sand/60 border border-border-linen mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-serif font-semibold text-ink">
              Evolução da Estatura (Curva Percentil OMS)
            </span>
            <span className="text-[11px] text-ink-muted font-mono">P50 - P85</span>
          </div>

          {/* Styled SVG Chart in Soft Slate / Sage */}
          <div className="h-28 w-full relative flex items-end">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
              {/* Background Reference Band (OMS Norm) */}
              <path
                d="M 0,80 Q 75,60 150,45 T 300,20 L 300,50 Q 225,75 150,85 T 0,95 Z"
                fill="#8A9A8C"
                fillOpacity="0.12"
              />
              {/* Reference Median Curve */}
              <path
                d="M 0,85 Q 75,65 150,52 T 300,30"
                fill="none"
                stroke="#778899"
                strokeWidth="1.5"
                strokeDasharray="3,3"
                opacity="0.5"
              />
              {/* Actual Growth Line */}
              <path
                d="M 0,90 Q 75,70 150,50 T 300,25"
                fill="none"
                stroke="#BC7C67"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Data points */}
              <circle cx="0" cy="90" r="4" fill="#FFFFFF" stroke="#BC7C67" strokeWidth="2" />
              <circle cx="150" cy="50" r="4" fill="#FFFFFF" stroke="#BC7C67" strokeWidth="2" />
              <circle cx="300" cy="25" r="5" fill="#BC7C67" stroke="#FFFFFF" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex justify-between text-[10px] text-ink-muted mt-2 border-t border-border-linen/60 pt-1.5 font-sans">
            <span>5 anos (106cm)</span>
            <span>6 anos (114cm)</span>
            <span className="font-semibold text-warm-terracotta">Hoje (122cm)</span>
          </div>
        </div>

        {/* Recent Consultation History Logs */}
        <div className="space-y-1.5">
          {history.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-xl bg-surface border border-border-linen text-[11px]"
            >
              <span className="text-ink font-medium flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-ink-light" />
                {item.date} ({item.age})
              </span>
              <div className="flex items-center gap-3 text-ink-muted">
                <span>📏 {item.height}</span>
                <span>⚖️ {item.weight}</span>
                <span className="text-calm-sage-dark font-medium bg-calm-sage-light px-1.5 py-0.2 rounded">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-border-linen flex items-center justify-between text-xs text-ink-muted">
        <span className="flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5 text-calm-sage" />
          Desenvolvimento equilibrado
        </span>
        <button className="text-warm-terracotta hover:text-warm-terracotta-dark font-medium text-xs font-serif italic hover:underline">
          Lançar nova medição →
        </button>
      </div>
    </div>
  );
};
