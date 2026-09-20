import React from 'react';
import { Folder, FileText, Image as ImageIcon, ShieldCheck, Eye, Download, UploadCloud } from 'lucide-react';

export const DocumentVaultCard: React.FC = () => {
  const folders = [
    {
      name: 'Documentos Oficiais',
      filesCount: 4,
      tag: 'RG, Certidão, Convênio',
      badge: 'badge-peach',
      icon: ShieldCheck,
    },
    {
      name: 'Saúde & Laudos Clínicos',
      filesCount: 6,
      tag: 'Exames de Sangue, Atestados',
      badge: 'badge-sage',
      icon: FileText,
    },
    {
      name: 'Educação & Boletins',
      filesCount: 8,
      tag: 'Contratos, Relatórios Bimestrais',
      badge: 'badge-slate',
      icon: Folder,
    },
  ];

  const recentFiles = [
    {
      name: 'Carteira_Vacinacao_Atualizada_2026.pdf',
      size: '1.2 MB',
      date: '10/Set/2026',
      type: 'pdf',
    },
    {
      name: 'Boletim_Escolar_2ºBimestre.pdf',
      size: '840 KB',
      date: '02/Set/2026',
      type: 'pdf',
    },
    {
      name: 'Foto_RG_Helena_FrenteVerso.jpg',
      size: '3.4 MB',
      date: '15/Ago/2026',
      type: 'image',
    },
  ];

  return (
    <div className="planner-card p-6 sm:p-7 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border-linen mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-calm-slate-light text-calm-slate-dark flex items-center justify-center border border-calm-slate/30">
              <Folder className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink">
                Cofre de Documentos
              </h3>
              <p className="text-xs text-ink-muted">Armazenamento seguro e organizado</p>
            </div>
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface hover:bg-canvas-sand border border-border-linen text-ink font-sans text-xs font-semibold shadow-warm-sm transition-colors">
            <UploadCloud className="w-3.5 h-3.5 text-warm-terracotta" />
            <span>Enviar Arquivo</span>
          </button>
        </div>

        {/* Structured Folders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {folders.map((folder, idx) => {
            const Icon = folder.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-canvas-sand/60 border border-border-linen hover:bg-surface hover:shadow-warm-sm transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-surface border border-border-linen flex items-center justify-center text-ink-muted group-hover:text-warm-terracotta transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-ink-muted bg-surface px-1.5 py-0.5 rounded border border-border-linen">
                    {folder.filesCount} arqs
                  </span>
                </div>
                <h4 className="font-serif text-xs font-semibold text-ink leading-tight">
                  {folder.name}
                </h4>
                <p className="text-[10px] text-ink-light font-sans truncate mt-1">
                  {folder.tag}
                </p>
              </div>
            );
          })}
        </div>

        {/* Recent Files List */}
        <div className="space-y-2">
          <span className="text-xs font-serif font-semibold text-ink px-1 block mb-1">
            Arquivos Recentes no Drive
          </span>

          {recentFiles.map((file, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-surface border border-border-linen flex items-center justify-between text-xs hover:bg-canvas-sand/40 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <div className="w-6 h-6 rounded-lg bg-canvas-sand flex items-center justify-center shrink-0 text-warm-terracotta">
                  {file.type === 'pdf' ? (
                    <FileText className="w-3.5 h-3.5" />
                  ) : (
                    <ImageIcon className="w-3.5 h-3.5" />
                  )}
                </div>
                <div className="min-w-0">
                  <h5 className="font-sans font-medium text-ink truncate text-[11px] sm:text-xs">
                    {file.name}
                  </h5>
                  <span className="text-[10px] text-ink-light">
                    {file.size} • {file.date}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  className="p-1.5 rounded-lg hover:bg-canvas-sand text-ink-muted hover:text-ink transition-colors"
                  title="Pré-visualizar"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  className="p-1.5 rounded-lg hover:bg-canvas-sand text-ink-muted hover:text-ink transition-colors"
                  title="Baixar"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-border-linen flex items-center justify-between text-xs text-ink-muted">
        <span className="flex items-center gap-1 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-calm-sage" />
          Criptografia de ponta a ponta
        </span>
        <button className="text-warm-terracotta hover:text-warm-terracotta-dark font-medium text-xs font-serif italic hover:underline">
          Abrir cofre completo →
        </button>
      </div>
    </div>
  );
};
