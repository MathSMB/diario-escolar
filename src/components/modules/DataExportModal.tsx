import React, { useState } from 'react';
import { useFamily } from '../../context/FamilyContext';
import { exportToOpenSpreadsheet, exportFullBackupJSON, ExportSpreadsheetFormat } from '../../services/exportService';
import { downloadAllMediaZip } from '../../services/imagePackService';
import {
  X,
  FileSpreadsheet,
  FolderArchive,
  Download,
  ShieldCheck,
  CheckCircle2,
  HardDrive,
  Cloud,
  FileCode,
  AlertCircle,
  HelpCircle,
  FolderTree,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DataExportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const familyState = useFamily();

  if (!isOpen) return null;

  const [selectedFormat, setSelectedFormat] = useState<ExportSpreadsheetFormat>('ods');
  const [isExportingSpreadsheet, setIsExportingSpreadsheet] = useState(false);
  const [isExportingZip, setIsExportingZip] = useState(false);
  const [zipProgress, setZipProgress] = useState<{ percent: number; statusText: string } | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showCloudGuide, setShowCloudGuide] = useState(false);

  // Coleta dados completos
  const fullData = {
    children: familyState.children,
    schedules: familyState.schedules,
    assessments: familyState.assessments,
    meetings: familyState.meetings,
    circulars: familyState.circulars,
    activities: familyState.activities,
    socialEvents: familyState.socialEvents,
    medications: familyState.medications,
    prescriptions: familyState.prescriptions,
    medicationLogs: familyState.medicationLogs,
    vaccines: familyState.vaccines,
    appointments: familyState.appointments,
    growthRecords: familyState.growthRecords,
    notes: familyState.notes,
    tasks: familyState.tasks,
    memories: familyState.memories,
    milestones: familyState.milestones,
    artworks: familyState.artworks,
    documents: familyState.documents,
  };

  const totalPrescriptionImages = fullData.prescriptions.filter((p) => p.imageUrl).length;
  const totalMemoryImages = fullData.memories.filter((m) => m.imageUrl).length;
  const totalArtworkImages = fullData.artworks.filter((a) => a.imageUrl).length;
  const totalImages = totalPrescriptionImages + totalMemoryImages + totalArtworkImages;

  const handleExportSpreadsheet = () => {
    setIsExportingSpreadsheet(true);
    setErrorMessage(null);
    try {
      exportToOpenSpreadsheet(fullData, selectedFormat);
      setSuccessMessage(`Planilha em formato ${selectedFormat.toUpperCase()} gerada com sucesso!`);
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err) {
      setErrorMessage('Erro ao gerar a planilha. Tente outro formato.');
    } finally {
      setIsExportingSpreadsheet(false);
    }
  };

  const handleExportZip = async () => {
    setIsExportingZip(true);
    setErrorMessage(null);
    try {
      await downloadAllMediaZip(fullData, (p) => {
        setZipProgress({ percent: p.percent, statusText: p.statusText });
      });
      setSuccessMessage('Pacote ZIP com pastas e imagens baixado com sucesso!');
      setTimeout(() => {
        setSuccessMessage(null);
        setZipProgress(null);
      }, 4000);
    } catch (err) {
      setErrorMessage('Erro ao empacotar arquivos em ZIP.');
    } finally {
      setIsExportingZip(false);
    }
  };

  const handleExportJSON = () => {
    setErrorMessage(null);
    try {
      exportFullBackupJSON(fullData);
      setSuccessMessage('Arquivo de backup (.json) exportado com sucesso!');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err) {
      setErrorMessage('Erro ao gerar backup JSON.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface w-full max-w-2xl rounded-3xl border border-border-linen shadow-warm-xl overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-border-linen flex items-center justify-between bg-canvas-sand/60 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-warm-peach-light rounded-2xl text-warm-terracotta shadow-warm-sm">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-ink">
                  Soberania & Exportação de Dados
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-sans font-medium bg-warm-sage-light text-warm-sage-dark border border-warm-sage/30">
                  Custo Zero
                </span>
              </div>
              <p className="font-sans text-xs text-ink-muted">
                Seus dados são 100% seus: extraia planilhas abertas e todas as fotos em pastas
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

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Alerts */}
          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-emerald-800 text-xs animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="font-medium">{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-red-800 text-xs animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}

          {/* 1. SEÇÃO DE PLANILHA EM FORMATO ABERTO */}
          <div className="p-5 bg-canvas-sand/40 border border-border-peach/60 rounded-3xl space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-warm-peach text-warm-terracotta-dark rounded-2xl shadow-sm">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-ink">
                    1. Planilha em Formato Aberto (Multi-Abas)
                  </h3>
                  <p className="text-xs text-ink-muted">
                    Extrai 16 abas com todos os horários, saúde, receitas, vacinas e tarefas
                  </p>
                </div>
              </div>
            </div>

            {/* Formatos Disponíveis */}
            <div>
              <label className="block text-xs font-sans font-medium text-ink mb-2">
                Escolha o formato de compatibilidade da planilha:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                
                {/* ODS */}
                <button
                  type="button"
                  onClick={() => setSelectedFormat('ods')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedFormat === 'ods'
                      ? 'bg-surface border-warm-terracotta ring-2 ring-warm-terracotta/20 shadow-warm-sm'
                      : 'bg-surface/60 border-border-linen hover:bg-surface text-ink-muted'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-ink">.ODS (Aberto)</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] bg-warm-peach-light text-warm-terracotta font-semibold">
                      Padrão ISO
                    </span>
                  </div>
                  <p className="text-[11px] text-ink-muted leading-tight">
                    LibreOffice, OpenOffice, Google Planilhas, Numbers e Excel.
                  </p>
                </button>

                {/* XLSX */}
                <button
                  type="button"
                  onClick={() => setSelectedFormat('xlsx')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedFormat === 'xlsx'
                      ? 'bg-surface border-warm-terracotta ring-2 ring-warm-terracotta/20 shadow-warm-sm'
                      : 'bg-surface/60 border-border-linen hover:bg-surface text-ink-muted'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-ink">.XLSX</span>
                    <span className="text-[10px] text-ink-light">Multi-abas</span>
                  </div>
                  <p className="text-[11px] text-ink-muted leading-tight">
                    Microsoft Excel, Google Sheets, WPS e OnlyOffice.
                  </p>
                </button>

                {/* CSV */}
                <button
                  type="button"
                  onClick={() => setSelectedFormat('csv')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedFormat === 'csv'
                      ? 'bg-surface border-warm-terracotta ring-2 ring-warm-terracotta/20 shadow-warm-sm'
                      : 'bg-surface/60 border-border-linen hover:bg-surface text-ink-muted'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-ink">.CSV (UTF-8)</span>
                    <span className="text-[10px] text-ink-light">Universal</span>
                  </div>
                  <p className="text-[11px] text-ink-muted leading-tight">
                    Texto separado por vírgula compatível com qualquer programa.
                  </p>
                </button>

              </div>
            </div>

            {/* Botão de Download da Planilha */}
            <button
              type="button"
              disabled={isExportingSpreadsheet}
              onClick={handleExportSpreadsheet}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-warm-terracotta hover:bg-warm-terracotta-dark text-surface rounded-2xl font-sans font-semibold text-xs sm:text-sm shadow-warm-sm hover:shadow-warm-md transition-all active:scale-[0.99] disabled:opacity-60"
            >
              <Download className="w-4 h-4" />
              <span>
                {isExportingSpreadsheet
                  ? 'Gerando Planilha...'
                  : `Baixar Planilha Completa (.${selectedFormat.toUpperCase()})`}
              </span>
            </button>
          </div>

          {/* 2. SEÇÃO DE DOWNLOAD DE IMAGENS EM PASTAS (.ZIP) */}
          <div className="p-5 bg-canvas-sand/40 border border-border-linen rounded-3xl space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-warm-sage-light text-warm-sage-dark rounded-2xl shadow-sm">
                  <FolderArchive className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-ink">
                    2. Pacote de Imagens &amp; Anexos em Pastas (.ZIP)
                  </h3>
                  <p className="text-xs text-ink-muted">
                    Todas as fotos salvas organizadas em diretórios temáticos no seu computador
                  </p>
                </div>
              </div>
            </div>

            {/* Estrutura das Pastas */}
            <div className="p-3 bg-surface border border-border-linen rounded-2xl text-xs space-y-2">
              <div className="flex items-center gap-2 font-semibold text-ink">
                <FolderTree className="w-4 h-4 text-warm-sage" />
                <span>Estrutura de Pastas que você receberá:</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-ink-muted pl-6">
                <div>📁 <code>01_Saude_e_Receitas/</code> ({totalPrescriptionImages} fotos)</div>
                <div>📁 <code>02_Memorias_e_Momentos/</code> ({totalMemoryImages} fotos)</div>
                <div>📁 <code>03_Artes_e_Criatividade/</code> ({totalArtworkImages} obras)</div>
                <div>📁 <code>05_Relatorio_e_Planilha/</code> (Cópia .ODS e .XLSX)</div>
              </div>
            </div>

            {/* Barra de Progresso durante o ZIP */}
            {zipProgress && (
              <div className="space-y-1.5 animate-in fade-in">
                <div className="flex justify-between text-[11px] font-sans text-ink-muted">
                  <span>{zipProgress.statusText}</span>
                  <span className="font-semibold text-warm-terracotta">{zipProgress.percent}%</span>
                </div>
                <div className="w-full h-2 bg-canvas-sand rounded-full overflow-hidden">
                  <div
                    className="h-full bg-warm-terracotta transition-all duration-200"
                    style={{ width: `${zipProgress.percent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Botão de Download do ZIP */}
            <button
              type="button"
              disabled={isExportingZip}
              onClick={handleExportZip}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-warm-sage-dark hover:bg-calm-sage text-surface rounded-2xl font-sans font-semibold text-xs sm:text-sm shadow-warm-sm hover:shadow-warm-md transition-all active:scale-[0.99] disabled:opacity-60"
            >
              <Download className="w-4 h-4" />
              <span>
                {isExportingZip
                  ? 'Empacotando Arquivos ZIP...'
                  : `Baixar Todas as Fotos & Anexos (.ZIP • ${totalImages} arquivos)`}
              </span>
            </button>
          </div>

          {/* 3. SEÇÃO DE BACKUP & PORTABILIDADE JSON */}
          <div className="p-4 bg-surface border border-border-linen rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <FileCode className="w-5 h-5 text-ink-light flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-ink">Backup Bruto para Migração (.JSON)</p>
                <p className="text-[11px] text-ink-muted">
                  Permite salvar no Google Drive ou importar em banco de dados próprio.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleExportJSON}
              className="w-full sm:w-auto px-3.5 py-1.5 bg-canvas-sand hover:bg-canvas border border-border-linen rounded-xl text-xs font-sans font-medium text-ink flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-warm-terracotta" />
              <span>Exportar .JSON</span>
            </button>
          </div>

          {/* 4. GUIA DE INTEGRAÇÃO COM NUVEM & BANCO PRÓPRIO (CUSTO ZERO) */}
          <div className="p-3 bg-canvas-sand/60 border border-border-linen rounded-2xl text-xs">
            <button
              type="button"
              onClick={() => setShowCloudGuide(!showCloudGuide)}
              className="w-full flex items-center justify-between text-left font-medium text-ink hover:text-warm-terracotta transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Cloud className="w-4 h-4 text-warm-terracotta" />
                Como salvar no meu Google Drive ou Banco Próprio a custo zero?
              </span>
              <HelpCircle className="w-4 h-4 text-ink-light" />
            </button>

            {showCloudGuide && (
              <div className="mt-2.5 pt-2.5 border-t border-border-linen space-y-2 text-[11px] text-ink-muted leading-relaxed animate-in fade-in">
                <p>
                  <strong>1. Google Drive / Dropbox:</strong> Você pode salvar a planilha <code>.ods</code> ou o arquivo <code>.zip</code> diretamente na sua pasta sincronizada do Google Drive no computador ou fazer upload via navegador.
                </p>
                <p>
                  <strong>2. Banco de Dados Próprio (Supabase / Firebase):</strong> O arquivo <code>.json</code> exportado possui o esquema exato de tabelas relacionais pronto para ser inserido em tabelas Postgres ou Firestore gratuitas.
                </p>
                <p>
                  <strong>3. Custo Zero e Privacidade:</strong> Todos os dados ficam salvos localmente no seu dispositivo, sem qualquer cobrança de servidores de terceiros.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-border-linen flex items-center justify-between bg-canvas-sand/40 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] text-ink-muted">
            <ShieldCheck className="w-4 h-4 text-warm-sage" />
            <span>Zero Lock-in: Formato aberto internacional</span>
          </div>
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
