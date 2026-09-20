import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldAlert,
  Bell,
  Calendar,
  Sparkles,
  BookOpen,
  ChevronDown,
  LogOut,
  Settings,
  FileSpreadsheet,
  Shield,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserProfileModal } from '../auth/UserProfileModal';
import { DataExportModal } from '../modules/DataExportModal';
import { AdminDashboardModal } from '../admin/AdminDashboardModal';

interface Props {
  onOpenSOS: () => void;
  activeChildName: string;
}

export const PlannerHeader: React.FC<Props> = ({ onOpenSOS, activeChildName }) => {
  const { user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="w-full bg-surface/90 backdrop-blur-md border-b border-border-linen sticky top-0 z-40 px-4 sm:px-8 py-3.5 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          
          {/* Brand & Editorial Greeting */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-canvas-sand border border-border-peach flex items-center justify-center text-warm-terracotta shadow-warm-sm flex-shrink-0">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl text-ink font-semibold tracking-tight">
                  Refúgio Familiar
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-sans font-medium px-2.5 py-0.5 rounded-full bg-warm-peach-light text-warm-terracotta border border-border-peach">
                  <Sparkles className="w-3 h-3" />
                  Planner Diário
                </span>
              </div>
              <p className="text-xs sm:text-sm text-ink-muted font-sans flex items-center gap-2 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-calm-sage" />
                <span>Quinta-feira, 19 de Setembro</span>
                <span className="text-ink-light">•</span>
                <span className="italic font-serif text-warm-terracotta">
                  {activeChildName === 'Família Unificada' ? 'Visão Geral do Lar' : `Rotina de ${activeChildName}`}
                </span>
              </p>
            </div>
          </div>

          {/* Action Pills, Emergency SOS & User Menu */}
          <div className="flex items-center gap-2 sm:gap-3 self-end md:self-auto">
            {/* Daily Status Indicator */}
            <div className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-calm-sage-light text-calm-sage-dark text-xs font-medium border border-calm-sage/30">
              <span className="w-2 h-2 rounded-full bg-calm-sage animate-ping" />
              <span>Rotina Harmoniosa • 2 aulas, 1 remédio</span>
            </div>

            {/* Export & Data Sovereignty Action */}
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-canvas-sand border border-border-linen hover:border-border-peach hover:bg-surface text-ink text-xs font-sans font-medium transition-all shadow-warm-sm"
              title="Exportar dados em planilha aberta (.ODS/.XLSX) e baixar imagens"
            >
              <FileSpreadsheet className="w-4 h-4 text-warm-terracotta" />
              <span className="hidden sm:inline">Exportar Dados</span>
            </button>

            {/* Notification Bell */}
            <button
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-canvas-sand border border-border-linen hover:bg-surface text-ink-muted hover:text-ink flex items-center justify-center transition-all duration-200 shadow-warm-sm"
              title="Lembretes e avisos do dia"
            >
              <Bell className="w-4 h-4 stroke-[1.75]" />
            </button>

            {/* Fast Emergency SOS Button (SLA: 1 Click Access) */}
            <button
              onClick={onOpenSOS}
              className="group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-warm-peach-light hover:bg-warm-peach text-warm-terracotta-dark border border-warm-peach font-sans text-xs sm:text-sm font-semibold transition-all duration-300 shadow-warm-sm hover:shadow-warm-md hover:scale-[1.02]"
              title="Acesso Imediato ao Cartão Clínico e Alergias"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-xl bg-warm-terracotta text-white flex items-center justify-center shadow-sm">
                <ShieldAlert className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <span>Cartão SOS</span>
              <span className="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded bg-surface/80 text-warm-terracotta-dark uppercase font-bold tracking-wider">
                1 toque
              </span>
            </button>

            {/* User Profile Menu Button */}
            {user && (
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-2xl bg-surface border border-border-linen hover:border-border-peach shadow-warm-sm transition-all"
                  title="Configurações de Conta e Perfil"
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl object-cover border border-border-peach"
                    />
                  ) : (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-warm-peach text-warm-terracotta-dark flex items-center justify-center font-serif font-bold text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="hidden md:block text-left">
                    <p className="text-xs font-sans font-semibold text-ink leading-tight truncate max-w-[90px]">
                      {user.name.split(' ')[0]}
                    </p>
                    <p className="text-[10px] font-sans text-ink-muted leading-tight">
                      {user.role}
                    </p>
                  </div>

                  <ChevronDown
                    className={`w-3.5 h-3.5 text-ink-muted transition-transform duration-200 ${
                      isUserMenuOpen ? 'rotate-180 text-warm-terracotta' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-surface border border-border-linen rounded-2xl shadow-warm-hover p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-border-linen mb-1">
                      <p className="text-xs font-sans font-semibold text-ink truncate">{user.name}</p>
                      <p className="text-[11px] font-sans text-ink-muted truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-sans font-medium bg-warm-peach-light text-warm-terracotta border border-border-peach">
                        Papel: {user.role}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsProfileModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-sans text-ink hover:bg-canvas-sand rounded-xl transition-colors"
                    >
                      <Settings className="w-4 h-4 text-warm-terracotta" />
                      <span>Editar Perfil & Foto</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsExportModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-sans text-ink hover:bg-canvas-sand rounded-xl transition-colors"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-calm-sage" />
                      <span>Exportar Planilha & Imagens</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsAdminModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-sans text-ink hover:bg-canvas-sand rounded-xl transition-colors"
                    >
                      <Shield className="w-4 h-4 text-warm-terracotta" />
                      <span>Painel Admin &amp; Auditoria</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-sans text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-1"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Sair da Conta</span>
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      </header>

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Data Sovereignty & Export Modal */}
      <DataExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      {/* Admin Dashboard & Audit Modal */}
      <AdminDashboardModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </>
  );
};
