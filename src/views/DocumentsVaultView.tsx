import React, { useState } from 'react';
import { useFamily } from '../context/FamilyContext';
import {
  FolderLock,
  Folder,
  FileText,
  Image as ImageIcon,
  Eye,
  Download,
  UploadCloud,
  Search,
  X,
  Lock,
  FileSpreadsheet,
  FolderArchive,
  HardDrive,
} from 'lucide-react';
import { DataExportModal } from '../components/modules/DataExportModal';

export const DocumentsVaultView: React.FC = () => {
  const { documents, addDocument, selectedChildId, activeChild } = useFamily();

  const [activeFolder, setActiveFolder] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [previewFile, setPreviewFile] = useState<any>(null);

  // Upload Form
  const [docName, setDocName] = useState('');
  const [docFolder, setDocFolder] = useState<'Oficiais' | 'Saúde' | 'Educação'>('Oficiais');
  const [docType, setDocType] = useState<'pdf' | 'image'>('pdf');
  const [docSize, setDocSize] = useState('1.5 MB');

  const childName = activeChild ? activeChild.name : 'Família Unificada';

  const filteredDocuments = documents.filter((doc) => {
    const matchChild = selectedChildId === 'all' || doc.childId === selectedChildId;
    const matchFolder = activeFolder === 'all' || doc.folderCategory === activeFolder;
    const matchSearch =
      !searchTerm ||
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.description && doc.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchChild && matchFolder && matchSearch;
  });

  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName) return;

    addDocument({
      childId: selectedChildId === 'all' ? 'helena' : selectedChildId,
      name: docName.endsWith('.pdf') || docName.endsWith('.jpg') ? docName : `${docName}.${docType === 'pdf' ? 'pdf' : 'jpg'}`,
      folderCategory: docFolder,
      fileType: docType,
      size: docSize,
      description: 'Documento anexado no cofre familiar.',
    });

    setDocName('');
    setShowUploadModal(false);
  };

  const folders = [
    { id: 'all', name: 'Todos os Arquivos', count: documents.length },
    { id: 'Oficiais', name: 'Documentos Oficiais (RG, Certidões)', count: documents.filter(d => d.folderCategory === 'Oficiais').length },
    { id: 'Saúde', name: 'Saúde & Laudos Clínicos', count: documents.filter(d => d.folderCategory === 'Saúde').length },
    { id: 'Educação', name: 'Educação, Boletins & Contratos', count: documents.filter(d => d.folderCategory === 'Educação').length },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-7 rounded-3xl bg-surface border border-border-linen shadow-warm-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-calm-slate-light text-calm-slate-dark flex items-center justify-center border border-calm-slate/30 shadow-sm">
            <FolderLock className="w-6 h-6 stroke-[1.75]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-calm-slate-light text-calm-slate-dark">
                Módulo F • Cofre de Documentos & Drive
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mt-1">
              Cofre de Arquivos • {childName}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              Centralização segura de certidões, laudos clínicos, exames, contratos escolares e boletins.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-canvas-sand hover:bg-surface border border-border-peach text-warm-terracotta-dark font-sans text-xs sm:text-sm font-semibold transition-all shadow-warm-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-warm-terracotta" />
            <span>Exportar Dados &amp; ZIP</span>
          </button>

          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-warm-terracotta hover:bg-warm-terracotta-dark text-white font-sans text-xs sm:text-sm font-semibold transition-all duration-300 shadow-warm-sm"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Enviar Novo Documento</span>
          </button>
        </div>
      </div>

      {/* Data Sovereignty & Open Spreadsheet Export Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-warm-peach-light/80 to-warm-sage-light/60 border border-border-peach flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-warm-sm">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 bg-surface rounded-2xl border border-border-peach text-warm-terracotta shadow-sm flex-shrink-0">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-sm sm:text-base font-bold text-ink">
              Soberania de Dados &amp; Portabilidade Total (Custo Zero)
            </h4>
            <p className="text-xs text-ink-muted">
              Exporte todas as 16 tabelas em planilha aberta (<strong>.ODS</strong> compatível com LibreOffice, Google Sheets, Numbers e Excel) e baixe todas as fotos organizadas em pastas compactadas (<strong>.ZIP</strong>).
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowExportModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-surface hover:bg-canvas-sand text-warm-terracotta-dark border border-border-peach font-sans text-xs sm:text-sm font-semibold transition-all shadow-warm-sm hover:shadow-warm-md flex-shrink-0 self-start sm:self-auto"
        >
          <FolderArchive className="w-4 h-4 text-warm-terracotta" />
          <span>Baixar Pacote Completo</span>
        </button>
      </div>

      {/* Folders & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {folders.map((f) => (
          <div
            key={f.id}
            onClick={() => setActiveFolder(f.id)}
            className={`planner-card p-4 cursor-pointer flex items-center justify-between transition-all ${
              activeFolder === f.id
                ? 'bg-canvas-sand border-border-peach shadow-warm-md scale-[1.02]'
                : 'bg-surface hover:bg-surface-subtle'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-canvas-sand flex items-center justify-center text-warm-terracotta border border-border-linen">
                <Folder className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-xs font-semibold text-ink leading-tight">
                  {f.name}
                </h4>
                <span className="text-[10px] text-ink-muted font-sans font-medium">
                  {f.count} arquivos armazenados
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-4 top-3.5 text-ink-light" />
        <input
          type="text"
          placeholder="Buscar por nome do arquivo, tipo ou descrição..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-surface border border-border-linen text-xs sm:text-sm text-ink focus:outline-none focus:border-warm-terracotta shadow-warm-sm"
        />
      </div>

      {/* Files Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className="planner-card p-5 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="badge-slate text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                  {doc.folderCategory}
                </span>
                <span className="text-xs text-ink-muted font-mono">{doc.uploadDate}</span>
              </div>

              <div className="flex items-start gap-3 mt-1">
                <div className="w-10 h-10 rounded-2xl bg-canvas-sand flex items-center justify-center text-warm-terracotta border border-border-peach shrink-0">
                  {doc.fileType === 'pdf' ? (
                    <FileText className="w-5 h-5" />
                  ) : (
                    <ImageIcon className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm text-ink leading-tight">
                    {doc.name}
                  </h4>
                  <span className="text-[11px] text-ink-muted font-mono block mt-0.5">
                    {doc.size} • {doc.fileType.toUpperCase()}
                  </span>
                </div>
              </div>

              {doc.description && (
                <p className="text-xs text-ink-muted mt-2.5 font-sans leading-relaxed">
                  {doc.description}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-border-linen flex items-center justify-between">
              <button
                onClick={() => setPreviewFile(doc)}
                className="flex items-center gap-1.5 text-xs text-warm-terracotta hover:text-warm-terracotta-dark font-serif italic font-medium"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Visualizar documento</span>
              </button>

              <button
                className="p-1.5 rounded-lg bg-canvas-sand hover:bg-surface text-ink-muted hover:text-ink transition-colors"
                title="Download seguro"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Preview de Arquivo Inline */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-surface border border-border-linen rounded-3xl p-6 sm:p-8 shadow-warm-hover relative">
            <div className="flex items-start justify-between pb-4 border-b border-border-linen mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-warm-peach-light text-warm-terracotta flex items-center justify-center">
                  {previewFile.fileType === 'pdf' ? <FileText className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-ink">
                    {previewFile.name}
                  </h3>
                  <span className="text-xs text-ink-muted">
                    {previewFile.folderCategory} • {previewFile.size} • Enviado em {previewFile.uploadDate}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setPreviewFile(null)}
                className="w-8 h-8 rounded-full bg-canvas-sand flex items-center justify-center text-ink-muted hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Document Preview Area */}
            <div className="w-full h-72 rounded-2xl bg-canvas-sand/80 border border-border-linen flex flex-col items-center justify-center p-6 text-center">
              <Lock className="w-8 h-8 text-calm-sage-dark mb-2 opacity-80" />
              <h4 className="font-serif text-base font-semibold text-ink">
                Visualização Segura do Documento
              </h4>
              <p className="text-xs text-ink-muted max-w-md mt-1 leading-relaxed">
                Este arquivo está criptografado de ponta a ponta e armazenado no cofre seguro da família.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <button className="btn-terracotta text-xs py-2 px-4 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>Baixar Arquivo Completo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Upload de Documento */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/30 backdrop-blur-sm">
          <div className="w-full max-w-md bg-surface border border-border-linen rounded-3xl p-6 shadow-warm-hover">
            <h3 className="font-serif text-xl font-semibold text-ink mb-4">
              Enviar Documento para o Cofre
            </h3>

            <form onSubmit={handleCreateDocument} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-ink-muted block mb-1">
                  Nome do Documento:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Laudo_Audiometria_2026.pdf"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Pasta:
                  </label>
                  <select
                    value={docFolder}
                    onChange={(e) => setDocFolder(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  >
                    <option value="Oficiais">Documentos Oficiais</option>
                    <option value="Saúde">Saúde & Laudos</option>
                    <option value="Educação">Educação & Boletins</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Tipo:
                  </label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  >
                    <option value="pdf">PDF</option>
                    <option value="image">Imagem</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Tamanho:
                  </label>
                  <input
                    type="text"
                    value={docSize}
                    onChange={(e) => setDocSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-linen">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-muted hover:bg-canvas-sand"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-warm-terracotta hover:bg-warm-terracotta-dark text-white text-xs font-semibold shadow-warm-sm"
                >
                  Salvar no Cofre
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Data Export & Open Spreadsheet Modal */}
      <DataExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </div>
  );
};

