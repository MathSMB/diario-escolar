import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FamilyProvider, useFamily } from './context/FamilyContext';
import { PlannerHeader } from './components/layout/PlannerHeader';
import { PlannerNavbar } from './components/layout/PlannerNavbar';
import { BottomTabBar } from './components/layout/BottomTabBar';
import { ChildContextSelector } from './components/layout/ChildContextSelector';
import { TodayView } from './views/TodayView';
import { EducationView } from './views/EducationView';
import { ActivitiesView } from './views/ActivitiesView';
import { HealthView } from './views/HealthView';
import { ProductivityView } from './views/ProductivityView';
import { MemoriesView } from './views/MemoriesView';
import { DocumentsVaultView } from './views/DocumentsVaultView';
import { EmergencySOSModal } from './components/modules/EmergencySOSModal';
import { LandingReceptionView } from './components/landing/LandingReceptionView';
import { AuthPortal } from './components/auth/AuthPortal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';
import { TabType } from './types';
import { Heart, ShieldCheck, BookOpen } from 'lucide-react';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading, loginAsGuest } = useAuth();
  const { selectedChildId, setSelectedChildId, activeChild } = useFamily();
  
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [isSOSOpen, setIsSOSOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'landing' | 'auth'>('landing');
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col items-center justify-center p-4">
        <div className="w-14 h-14 rounded-3xl bg-surface border border-border-peach flex items-center justify-center text-warm-terracotta shadow-warm-md animate-pulse mb-4">
          <BookOpen className="w-7 h-7" />
        </div>
        <p className="font-serif text-lg font-medium text-ink">Refúgio Familiar</p>
        <p className="font-sans text-xs text-ink-muted mt-1">Carregando ambiente acolhedor...</p>
      </div>
    );
  }

  // Se não estiver logado:
  if (!isAuthenticated) {
    return (
      <>
        {viewMode === 'landing' ? (
          <LandingReceptionView
            onOpenAuth={(mode) => {
              setAuthInitialMode(mode);
              setViewMode('auth');
            }}
            onEnterGuest={loginAsGuest}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
        ) : (
          <AuthPortal
            initialMode={authInitialMode}
            onBackToLanding={() => setViewMode('landing')}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
        )}

        {/* Global Admin Modal */}
        <AdminDashboardModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />
      </>
    );
  }

  // Usuário Autenticado: Exibe o Planner Completo
  const activeChildName = activeChild ? activeChild.name : 'Família Unificada';

  return (
    <div className="min-h-screen bg-canvas flex flex-col font-sans selection:bg-warm-peach selection:text-ink pb-20 md:pb-0 animate-in fade-in duration-300">
      {/* Top Planner Header with Profile, Admin and SOS */}
      <PlannerHeader
        onOpenSOS={() => setIsSOSOpen(true)}
        activeChildName={activeChildName}
      />

      {/* Desktop Navigation Bar (Sticky Top) */}
      <PlannerNavbar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-5 sm:py-8 space-y-5 sm:space-y-7">
        
        {/* Child Context Selector (Unificado diretamente no Hero Card da Visão Hoje) */}
        {activeTab !== 'today' && (
          <section aria-label="Seletor de Perfil Infantil">
            <ChildContextSelector
              selectedChildId={selectedChildId}
              onSelectChild={(id) => setSelectedChildId(id)}
            />
          </section>
        )}

        {/* Dynamic Views Rendering */}
        <section className="transition-all duration-300">
          {activeTab === 'today' && (
            <TodayView
              onOpenSOS={() => setIsSOSOpen(true)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}
          {activeTab === 'education' && <EducationView />}
          {activeTab === 'activities' && <ActivitiesView />}
          {activeTab === 'health' && <HealthView />}
          {activeTab === 'productivity' && <ProductivityView />}
          {activeTab === 'memories' && <MemoriesView />}
          {activeTab === 'documents' && <DocumentsVaultView />}
        </section>

      </main>

      {/* Mobile Ergonomic Bottom Tab Bar (Thumb Zone) */}
      <BottomTabBar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Universal Emergency SOS Modal (1-Click) */}
      <EmergencySOSModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
        childName={activeChildName}
      />

      {/* Planner Footer */}
      <footer className="w-full bg-surface-subtle border-t border-border-linen py-8 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <div className="flex items-center gap-2 font-serif italic">
            <Heart className="w-4 h-4 text-warm-terracotta fill-warm-peach" />
            <span>Refúgio Familiar — Acompanhamento com afeto, clareza e acolhimento.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-calm-sage" />
              Privacidade & Criptografia
            </span>
            <span>•</span>
            <span className="font-serif">Design System Matte &amp; Orgânico</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <FamilyProvider>
        <AppContent />
      </FamilyProvider>
    </AuthProvider>
  );
};
