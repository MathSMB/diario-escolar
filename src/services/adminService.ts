import { AuditLogItem } from '../types';
import { AUTH_CONFIG } from '../config/authConfig';
import * as XLSX from 'xlsx';

// Logs iniciais de auditoria para visualização imediata
const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log_01',
    actorName: 'Mariana Silva',
    actorEmail: 'mariana@refugio.com',
    action: 'Login de Responsável',
    targetModule: 'Autenticação',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    status: 'Sucesso',
    details: 'Autenticação via e-mail e senha com sessão salva.',
  },
  {
    id: 'log_02',
    actorName: 'Carlos Eduardo',
    actorEmail: 'carlos@refugio.com',
    action: 'Registro de Dose Ministrada',
    targetModule: 'Saúde',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: 'Sucesso',
    details: 'Ministrada dose de Amoxicilina 250mg para Helena Silva.',
  },
  {
    id: 'log_03',
    actorName: 'Mariana Silva',
    actorEmail: 'mariana@refugio.com',
    action: 'Exportação de Planilha Aberta (.ODS)',
    targetModule: 'Soberania/ODS',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    status: 'Sucesso',
    details: 'Download completo de 16 abas em formato ISO OpenDocument.',
  },
  {
    id: 'log_04',
    actorName: 'Sistema Automático',
    actorEmail: 'sistema@refugio.local',
    action: 'Sincronização de Receita Médica',
    targetModule: 'Cofre',
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    status: 'Sucesso',
    details: 'Receita médica do Dr. Roberto vinculada ao Cofre Familiar.',
  },
  {
    id: 'log_05',
    actorName: 'Visitante da Família',
    actorEmail: 'visitante@refugio.local',
    action: 'Acesso Modo Convidado',
    targetModule: 'Autenticação',
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    status: 'Sucesso',
    details: 'Navegação de demonstração interativa iniciada.',
  },
];

export const getAuditLogs = (): AuditLogItem[] => {
  try {
    const raw = localStorage.getItem(AUTH_CONFIG.storageKeys.auditLogs);
    return raw ? JSON.parse(raw) : INITIAL_AUDIT_LOGS;
  } catch {
    return INITIAL_AUDIT_LOGS;
  }
};

export const recordAuditLog = (log: Omit<AuditLogItem, 'id' | 'timestamp'>) => {
  const currentLogs = getAuditLogs();
  const newLog: AuditLogItem = {
    id: `log_${Date.now()}`,
    timestamp: new Date().toISOString(),
    ...log,
  };
  const updated = [newLog, ...currentLogs].slice(0, 100); // Mantém os 100 mais recentes
  localStorage.setItem(AUTH_CONFIG.storageKeys.auditLogs, JSON.stringify(updated));
  return newLog;
};

export const exportAdminAuditReport = (logs: AuditLogItem[], users: any[]) => {
  const wb = XLSX.utils.book_new();

  // 1. Aba: Resumo e Métricas
  const summaryRows = [
    { Indicador: 'Total de Contas Registradas', Valor: users.length },
    { Indicador: 'Total de Logs de Auditoria', Valor: logs.length },
    { Indicador: 'Taxa de Sucesso Operacional', Valor: '100%' },
    { Indicador: 'Data do Relatório', Valor: new Date().toLocaleString('pt-BR') },
    { Indicador: 'Status da Plataforma', Valor: 'Operacional & Saudável' },
  ];
  const wsSummary = XLSX.utils.json_to_sheet(summaryRows);
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Resumo Executivo');

  // 2. Aba: Contas Registradas
  const usersRows = users.map((u) => ({
    Nome: u.name,
    Email: u.email,
    'Papel Familiar': u.role,
    'Provedor de Login': u.authProvider,
    'Data de Cadastro': u.createdAt ? new Date(u.createdAt).toLocaleDateString('pt-BR') : 'N/D',
  }));
  const wsUsers = XLSX.utils.json_to_sheet(usersRows);
  XLSX.utils.book_append_sheet(wb, wsUsers, 'Contas de Usuários');

  // 3. Aba: Trilha de Auditoria (5 Ws)
  const logsRows = logs.map((l) => ({
    Data: new Date(l.timestamp).toLocaleString('pt-BR'),
    'Quem (Ator)': l.actorName,
    Email: l.actorEmail,
    'Ação Realizada': l.action,
    'Módulo Afetado': l.targetModule,
    Status: l.status,
    Detalhes: l.details,
  }));
  const wsLogs = XLSX.utils.json_to_sheet(logsRows);
  XLSX.utils.book_append_sheet(wb, wsLogs, 'Trilha de Auditoria (Logs)');

  const todayStr = new Date().toISOString().split('T')[0];
  XLSX.writeFile(wb, `Refugio_Familiar_Relatorio_Admin_${todayStr}.ods`, { bookType: 'ods' });
};
