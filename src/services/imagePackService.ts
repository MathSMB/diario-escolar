import JSZip from 'jszip';
import * as XLSX from 'xlsx';
import { FullFamilyData } from './exportService';

interface ProgressCallback {
  (progress: { current: number; total: number; percent: number; statusText: string }): void;
}

/**
 * Converte DataURL ou URL remota em Uint8Array/Blob
 */
async function fetchImageBuffer(url: string): Promise<{ data: Uint8Array | string; extension: string } | null> {
  try {
    // Se for Base64 Data URL
    if (url.startsWith('data:image/')) {
      const mimeMatch = url.match(/^data:image\/([a-zA-Z+]+);base64,/);
      const extension = mimeMatch ? (mimeMatch[1] === 'jpeg' ? 'jpg' : mimeMatch[1]) : 'jpg';
      const base64Data = url.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');
      return { data: base64Data, extension };
    }

    // Se for URL remota (ex: Unsplash / Cloudinary)
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) return null;
    const arrayBuffer = await response.arrayBuffer();
    return { data: new Uint8Array(arrayBuffer), extension: 'jpg' };
  } catch (err) {
    console.warn(`Não foi possível baixar a imagem remota (${url}):`, err);
    return null;
  }
}

/**
 * Sanitiza nomes de arquivos para evitar caracteres inválidos em sistemas de arquivos
 */
function sanitizeFileName(name: string): string {
  return name
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/\s+/g, '_')
    .trim()
    .substring(0, 50);
}

/**
 * Empacota todas as imagens e anexos em um arquivo ZIP com pastas organizadas
 */
export const downloadAllMediaZip = async (
  data: FullFamilyData,
  onProgress?: ProgressCallback
) => {
  const zip = new JSZip();

  // Pastas temáticas
  const folderPrescriptions = zip.folder('01_Saude_e_Receitas');
  const folderMemories = zip.folder('02_Memorias_e_Momentos');
  const folderArtworks = zip.folder('03_Artes_e_Criatividade');
  const folderVault = zip.folder('04_Documentos_e_Cofre');
  const folderSpreadsheets = zip.folder('05_Relatorio_e_Planilhas');

  // Coleta todas as mídias disponíveis
  interface MediaItem {
    url: string;
    folder: JSZip | null;
    fileName: string;
    category: string;
  }

  const itemsToFetch: MediaItem[] = [];

  // 1. Receitas Médicas
  data.prescriptions.forEach((p, idx) => {
    if (p.imageUrl) {
      const child = data.children.find((c) => c.id === p.childId);
      const childPrefix = child ? `${child.name}_` : '';
      const safeTitle = sanitizeFileName(p.title || `Receita_${idx + 1}`);
      const safeDoctor = p.doctorName ? `_${sanitizeFileName(p.doctorName)}` : '';
      itemsToFetch.push({
        url: p.imageUrl,
        folder: folderPrescriptions,
        fileName: `${childPrefix}${p.date}_${safeTitle}${safeDoctor}`,
        category: 'Receita Médica',
      });
    }
  });

  // 2. Memórias e Momentos
  data.memories.forEach((m, idx) => {
    if (m.imageUrl) {
      const child = data.children.find((c) => c.id === m.childId);
      const childPrefix = child ? `${child.name}_` : '';
      const safeTitle = sanitizeFileName(m.title || `Memoria_${idx + 1}`);
      itemsToFetch.push({
        url: m.imageUrl,
        folder: folderMemories,
        fileName: `${childPrefix}${m.date}_${safeTitle}`,
        category: 'Memória / Momento',
      });
    }
  });

  // 3. Artes e Desenhos
  data.artworks.forEach((art, idx) => {
    if (art.imageUrl) {
      const child = data.children.find((c) => c.id === art.childId);
      const childPrefix = child ? `${child.name}_` : '';
      const safeTitle = sanitizeFileName(art.title || `Arte_${idx + 1}`);
      itemsToFetch.push({
        url: art.imageUrl,
        folder: folderArtworks,
        fileName: `${childPrefix}${art.date}_${safeTitle}`,
        category: 'Obra de Arte Infantil',
      });
    }
  });

  // 4. Inventário de Documentos do Cofre
  if (folderVault) {
    const vaultManifest = data.documents
      .map(
        (doc, i) =>
          `${i + 1}. [${doc.folderCategory}] ${doc.name} (${doc.size}) - Upload: ${doc.uploadDate}\n   Descrição: ${doc.description || 'Sem descrição'}`
      )
      .join('\n\n');
    folderVault.file('INVENTARIO_DO_COFRE.txt', vaultManifest || 'Nenhum documento anexado.');
  }

  const totalItems = itemsToFetch.length;
  let processedCount = 0;

  if (onProgress) {
    onProgress({
      current: 0,
      total: totalItems,
      percent: 0,
      statusText: 'Iniciando empacotamento das pastas...',
    });
  }

  // Baixa e adiciona cada imagem no ZIP
  for (const item of itemsToFetch) {
    try {
      const result = await fetchImageBuffer(item.url);
      if (result && item.folder) {
        if (typeof result.data === 'string') {
          // Base64
          item.folder.file(`${item.fileName}.${result.extension}`, result.data, { base64: true });
        } else {
          // Binary Buffer
          item.folder.file(`${item.fileName}.${result.extension}`, result.data);
        }
      }
    } catch (err) {
      console.error(`Erro ao empacotar arquivo ${item.fileName}:`, err);
    }

    processedCount++;
    if (onProgress) {
      const percent = Math.round((processedCount / (totalItems || 1)) * 90);
      onProgress({
        current: processedCount,
        total: totalItems,
        percent,
        statusText: `Empacotando ${item.category} (${processedCount}/${totalItems})...`,
      });
    }
  }

  // Adiciona a Planilha Aberta (ODS) e (XLSX) dentro do ZIP
  try {
    const wb = XLSX.utils.book_new();
    const wsChildren = XLSX.utils.json_to_sheet(data.children);
    XLSX.utils.book_append_sheet(wb, wsChildren, 'Perfis & Ficha SOS');
    const wsMedications = XLSX.utils.json_to_sheet(data.medications);
    XLSX.utils.book_append_sheet(wb, wsMedications, 'Medicamentos');
    const wsSchedules = XLSX.utils.json_to_sheet(data.schedules);
    XLSX.utils.book_append_sheet(wb, wsSchedules, 'Horarios Escolares');
    const wsVaccines = XLSX.utils.json_to_sheet(data.vaccines);
    XLSX.utils.book_append_sheet(wb, wsVaccines, 'Vacinas');

    const odsBuffer = XLSX.write(wb, { bookType: 'ods', type: 'array' });
    const xlsxBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    if (folderSpreadsheets) {
      folderSpreadsheets.file('Planilha_Aberta_Dados_Completos.ods', odsBuffer);
      folderSpreadsheets.file('Planilha_Excel_Dados_Completos.xlsx', xlsxBuffer);
    }
  } catch (err) {
    console.warn('Erro ao anexar planilha dentro do ZIP:', err);
  }

  // Adiciona arquivo LEIA-ME de Soberania de Dados
  const readmeContent = `===================================================================
REFÚGIO FAMILIAR — PACOTE DE SOBERANIA E PORTABILIDADE DE DADOS
===================================================================
Data de Exportação: ${new Date().toLocaleString('pt-BR')}

Este arquivo ZIP contém todas as fotos, receitas e dados cadastrados
na sua plataforma Refúgio Familiar organizados em pastas:

- 01_Saude_e_Receitas/       : Fotos e anexos de receitas médicas
- 02_Memorias_e_Momentos/    : Fotos do álbum e conquistas dos seus filhos
- 03_Artes_e_Criatividade/   : Obras de arte e desenhos digitalizados
- 04_Documentos_e_Cofre/     : Documentos e certidões
- 05_Relatorio_e_Planilhas/  : Planilha completa em formato aberto (.ODS)
                               compatível com LibreOffice Calc, Google Sheets,
                               MS Excel e Apple Numbers.

Todos os seus dados são seus por direito, a custo zero e sem aprisionamento tecnológico.
===================================================================`;

  zip.file('LEIA-ME_PORTABILIDADE.txt', readmeContent);

  if (onProgress) {
    onProgress({
      current: totalItems,
      total: totalItems,
      percent: 95,
      statusText: 'Gerando arquivo ZIP final...',
    });
  }

  // Gera o arquivo ZIP final e dispara download
  const content = await zip.generateAsync({ type: 'blob' });
  const todayStr = new Date().toISOString().split('T')[0];
  const zipFilename = `Refugio_Familiar_Arquivos_Completos_${todayStr}.zip`;

  const url = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = url;
  link.download = zipFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  if (onProgress) {
    onProgress({
      current: totalItems,
      total: totalItems,
      percent: 100,
      statusText: 'Download concluído com sucesso!',
    });
  }
};
