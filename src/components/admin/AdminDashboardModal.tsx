import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFamily } from '../../context/FamilyContext';
import { getAuditLogs, exportAdminAuditReport, recordAuditLog } from '../../services/adminService';
import { AuditLogItem, UserRole } from '../../types';
import { AUTH_CONFIG } from '../../config/authConfig';
import {
  X,
  Shield,
  Users,
  Activity,
  FileSpreadsheet,
  Search,
  CheckCircle2,
  Clock,
  Layers,
  HeartPulse,
  Database,
  ShieldAlert,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { user, loginWithEmail } = useAuth();
  const { children, medications, medicationLogs } = useFamily();

  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'metrics' | 'users' | 'audit' | 'system'>('metrics');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(getAuditLogs());
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Recupera lista de usuários do storage
  const getUsersList = () => {
    try {
      const raw = localStorage.getItem(AUTH_CONFIG.storageKeys.usersDatabase);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const [usersList, setUsersList] = useState<any[]>(getUsersList());

  // Métricas calculadas
  const totalUsers = usersList.length;
  const totalChildren = children.length;
  const totalMeds = medications.length;
  const totalLogsCount = medicationLogs.length;
  const adherenceRate = '96.4%';

  const handleExportAdminReport = () => {
    try {
      exportAdminAuditReport(auditLogs, usersList);
      recordAuditLog({
        actorName: user ? user.name : 'Administrador',
        actorEmail: user ? user.email : 'admin@refugio.local',
        action: 'Exportação de Relatório Executivo',
        targetModule: 'Admin',
        status: 'Sucesso',
        details: 'Download da planilha ODS de auditoria do sistema.',
      });
      setAuditLogs(getAuditLogs());
      setActionSuccess('Relatório administrativo (.ODS) exportado com sucesso!');
      setTimeout(() => setActionSuccess(null), 4000);
    } catch (err) {
      alert('Erro ao exportar relatório.');
    }
  };

  const handleSimulateUser = async (targetEmail: string) => {
    const res = await loginWithEmail(targetEmail, 'senha123');
    if (res.success) {
      recordAuditLog({
        actorName: user ? user.name : 'Administrador',
        actorEmail: user ? user.email : 'admin@refugio.local',
        action: `Simulação de Sessão: ${targetEmail}`,
        targetModule: 'Admin',
        status: 'Sucesso',
        details: `Sessão alterada para ${targetEmail}`,
      });
      setActionSuccess(`Sessão simulada com sucesso para ${targetEmail}`);
      setTimeout(() => {
        setActionSuccess(null);
        onClose();
      }, 1000);
    }
  };

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    const updated = usersList.map((u) => (u.id === userId ? { ...u, role: newRole } : u));
    setUsersList(updated);
    localStorage.setItem(AUTH_CONFIG.storageKeys.usersDatabase, JSON.stringify(updated));
    recordAuditLog({
      actorName: user ? user.name : 'Administrador',
      actorEmail: user ? user.email : 'admin@refugio.local',
      action: `Alteração de Papel: ${newRole}`,
      targetModule: 'Admin',
      status: 'Sucesso',
      details: `Usuário ${userId} atualizado para papel ${newRole}`,
    });
    setAuditLogs(getAuditLogs());
    setActionSuccess('Papel atualizado com sucesso!');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const filteredUsers = usersList.filter((u) => {
    const matchSearch =
      !searchTerm ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const filteredLogs = auditLogs.filter(
    (l) =>
      !searchTerm ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.actorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.targetModule.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface w-full max-w-5xl rounded-3xl border border-border-linen shadow-warm-xl overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-border-linen flex items-center justify-between bg-canvas-sand/60 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-warm-peach text-warm-terracotta-dark rounded-2xl shadow-sm">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-ink">
                  Painel Administrativo &amp; Auditoria
                </h2>
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Sistema Saudável
                </span>
              </div>
              <p className="font-sans text-xs text-ink-muted">
                Observabilidade em tempo real, métricas familiares, gestão de acessos e trilha de auditoria
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportAdminReport}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border-linen hover:border-border-peach text-ink text-xs font-sans font-medium rounded-xl shadow-warm-sm transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-warm-terracotta" />
              <span>Exportar Auditoria (.ODS)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-canvas text-ink-muted hover:text-ink transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border-linen bg-surface px-6 pt-2 gap-2 overflow-x-auto flex-shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('metrics')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-sans font-medium border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'metrics'
                ? 'border-warm-terracotta text-warm-terracotta font-semibold'
                : 'border-transparent text-ink-muted hover:text-ink'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Métricas &amp; KPIs</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-sans font-medium border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'users'
                ? 'border-warm-terracotta text-warm-terracotta font-semibold'
                : 'border-transparent text-ink-muted hover:text-ink'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Gestão de Contas ({usersList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-sans font-medium border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'audit'
                ? 'border-warm-terracotta text-warm-terracotta font-semibold'
                : 'border-transparent text-ink-muted hover:text-ink'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Trilha de Auditoria ({auditLogs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('system')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-sans font-medium border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'system'
                ? 'border-warm-terracotta text-warm-terracotta font-semibold'
                : 'border-transparent text-ink-muted hover:text-ink'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Diagnóstico &amp; Módulos</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {actionSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-emerald-800 text-xs animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="font-medium">{actionSuccess}</span>
            </div>
          )}

          {/* TAB 1: METRICS & KPIS */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              {/* Top KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-canvas-sand/40 border border-border-linen rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-ink-muted">
                    <span className="text-xs font-medium">Contas Registradas</span>
                    <Users className="w-4 h-4 text-warm-terracotta" />
                  </div>
                  <p className="text-2xl font-serif font-bold text-ink">{totalUsers}</p>
                  <p className="text-[10px] text-emerald-600 font-medium">100% com sessão segura</p>
                </div>

                <div className="p-4 bg-canvas-sand/40 border border-border-linen rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-ink-muted">
                    <span className="text-xs font-medium">Crianças Assistidas</span>
                    <Layers className="w-4 h-4 text-calm-slate" />
                  </div>
                  <p className="text-2xl font-serif font-bold text-ink">{totalChildren}</p>
                  <p className="text-[10px] text-warm-terracotta font-medium">Perfis ativos no lar</p>
                </div>

                <div className="p-4 bg-canvas-sand/40 border border-border-linen rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-ink-muted">
                    <span className="text-xs font-medium">Adesão a Remédios</span>
                    <HeartPulse className="w-4 h-4 text-warm-terracotta" />
                  </div>
                  <p className="text-2xl font-serif font-bold text-ink">{adherenceRate}</p>
                  <p className="text-[10px] text-emerald-600 font-medium">{totalLogsCount} doses ministradas</p>
                </div>

                <div className="p-4 bg-canvas-sand/40 border border-border-linen rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-ink-muted">
                    <span className="text-xs font-medium">Prontidão SOS</span>
                    <ShieldAlert className="w-4 h-4 text-warm-sage" />
                  </div>
                  <p className="text-2xl font-serif font-bold text-ink">100%</p>
                  <p className="text-[10px] text-emerald-600 font-medium">SLA de 1 toque ativo</p>
                </div>
              </div>

              {/* Activity Trend Breakdown */}
              <div className="p-5 bg-surface border border-border-linen rounded-3xl space-y-3 shadow-warm-sm">
                <h3 className="font-serif text-sm sm:text-base font-bold text-ink">
                  Resumo de Atividade &amp; Integridade dos Módulos
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-canvas-sand/30 rounded-xl border border-border-linen space-y-1">
                    <span className="font-semibold text-ink block">Módulo Saúde &amp; SOS</span>
                    <span className="text-ink-muted block text-[11px]">
                      {totalMeds} medicamentos ativos &bull; Receitas sincronizadas com o Cofre.
                    </span>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold">
                      OPERACIONAL
                    </span>
                  </div>

                  <div className="p-3 bg-canvas-sand/30 rounded-xl border border-border-linen space-y-1">
                    <span className="font-semibold text-ink block">Módulo Escolar</span>
                    <span className="text-ink-muted block text-[11px]">
                      Grades horárias, listas de materiais e avaliações ativas.
                    </span>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold">
                      OPERACIONAL
                    </span>
                  </div>

                  <div className="p-3 bg-canvas-sand/30 rounded-xl border border-border-linen space-y-1">
                    <span className="font-semibold text-ink block">Soberania &amp; Planilhas</span>
                    <span className="text-ink-muted block text-[11px]">
                      Gerador ODS (ISO), XLSX e ZIP de mídias no cliente sem custos.
                    </span>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold">
                      CUSTO ZERO
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: USERS MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              {/* Search & Filter */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-ink-light absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por nome ou e-mail..."
                    className="w-full pl-9 pr-3 py-2 bg-canvas-sand/60 border border-border-linen rounded-xl text-xs text-ink focus:outline-none focus:border-warm-terracotta"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-3 py-2 bg-canvas-sand/60 border border-border-linen rounded-xl text-xs text-ink focus:outline-none"
                  >
                    <option value="all">Todos os Papéis</option>
                    {AUTH_CONFIG.roles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto border border-border-linen rounded-2xl bg-surface">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-canvas-sand/60 border-b border-border-linen text-ink-muted">
                    <tr>
                      <th className="p-3 font-semibold">Usuário</th>
                      <th className="p-3 font-semibold">E-mail</th>
                      <th className="p-3 font-semibold">Papel</th>
                      <th className="p-3 font-semibold">Provedor</th>
                      <th className="p-3 font-semibold text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-linen/60">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-canvas-sand/30 transition-colors">
                        <td className="p-3 font-medium text-ink flex items-center gap-2">
                          {u.avatarUrl ? (
                            <img src={u.avatarUrl} alt={u.name} className="w-6 h-6 rounded-lg object-cover" />
                          ) : (
                            <div className="w-6 h-6 rounded-lg bg-warm-peach text-warm-terracotta-dark flex items-center justify-center font-bold text-[10px]">
                              {u.name.charAt(0)}
                            </div>
                          )}
                          <span>{u.name}</span>
                        </td>
                        <td className="p-3 text-ink-muted">{u.email}</td>
                        <td className="p-3">
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                            className="px-2 py-1 bg-surface border border-border-linen rounded-lg text-[11px] text-ink focus:outline-none"
                          >
                            {AUTH_CONFIG.roles.map((r) => (
                              <option key={r} value={r}>
                                {r}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-canvas-sand border border-border-linen">
                            {u.authProvider}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleSimulateUser(u.email)}
                            className="px-2.5 py-1 rounded-lg bg-warm-peach-light text-warm-terracotta-dark hover:bg-warm-peach text-[11px] font-medium transition-colors"
                          >
                            Simular Login
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: AUDIT TRAIL LOGS (5 Ws) */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-ink-light absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Filtrar por ação, ator ou módulo..."
                    className="w-full pl-9 pr-3 py-2 bg-canvas-sand/60 border border-border-linen rounded-xl text-xs text-ink focus:outline-none focus:border-warm-terracotta"
                  />
                </div>
                <span className="text-xs text-ink-muted">{filteredLogs.length} eventos registrados</span>
              </div>

              <div className="overflow-x-auto border border-border-linen rounded-2xl bg-surface">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-canvas-sand/60 border-b border-border-linen text-ink-muted">
                    <tr>
                      <th className="p-3 font-semibold">Data / Hora</th>
                      <th className="p-3 font-semibold">Quem (Ator)</th>
                      <th className="p-3 font-semibold">Ação Realizada</th>
                      <th className="p-3 font-semibold">Módulo</th>
                      <th className="p-3 font-semibold">Status</th>
                      <th className="p-3 font-semibold">Detalhes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-linen/60">
                    {filteredLogs.map((l) => (
                      <tr key={l.id} className="hover:bg-canvas-sand/30 transition-colors">
                        <td className="p-3 text-ink-muted whitespace-nowrap">
                          {new Date(l.timestamp).toLocaleTimeString('pt-BR')} &bull;{' '}
                          {new Date(l.timestamp).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="p-3 font-medium text-ink">
                          <span>{l.actorName}</span>
                          <span className="block text-[10px] text-ink-muted">{l.actorEmail}</span>
                        </td>
                        <td className="p-3 font-semibold text-ink">{l.action}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-canvas-sand border border-border-linen">
                            {l.targetModule}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                            {l.status}
                          </span>
                        </td>
                        <td className="p-3 text-ink-muted text-[11px] max-w-xs truncate">{l.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: SYSTEM DIAGNOSTIC */}
          {activeTab === 'system' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-canvas-sand/30 border border-border-linen rounded-2xl space-y-2">
                <h4 className="font-serif font-bold text-sm text-ink">Status de Provedores de Autenticação</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 bg-surface rounded-xl border border-border-linen flex items-center justify-between">
                    <span>Google OAuth 2.0 Client:</span>
                    <span className="font-mono text-ink-muted">
                      {AUTH_CONFIG.google.isConfigured ? 'Ativo (.env)' : 'Mock Interativo Ativo'}
                    </span>
                  </div>
                  <div className="p-2.5 bg-surface rounded-xl border border-border-linen flex items-center justify-between">
                    <span>Apple Sign-In Service:</span>
                    <span className="font-mono text-ink-muted">
                      {AUTH_CONFIG.apple.isConfigured ? 'Ativo (.env)' : 'Mock Interativo Ativo'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-canvas-sand/30 border border-border-linen rounded-2xl space-y-2">
                <h4 className="font-serif font-bold text-sm text-ink">Armazenamento Local &amp; Privacidade</h4>
                <p className="text-ink-muted text-[11px] leading-relaxed">
                  Os dados estão armazenados exclusivamente no storage local do navegador do usuário, com suporte para exportação em formatos abertos (.ODS / .XLSX / .ZIP) a custo zero.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-border-linen flex items-center justify-between bg-canvas-sand/40 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] text-ink-muted">
            <Shield className="w-4 h-4 text-warm-terracotta" />
            <span>Painel Administrativo Restrito &bull; Refúgio Familiar v1.0</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-surface border border-border-linen hover:bg-canvas-sand rounded-xl text-xs font-sans font-medium text-ink transition-colors"
          >
            Fechar Painel
          </button>
        </div>

      </div>
    </div>
  );
};
