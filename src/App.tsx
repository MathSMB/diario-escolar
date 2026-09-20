import React, { useState } from 'react';
import { FamilyProvider, useFamily } from './context/FamilyContext';
import { PlannerHeader } from './components/layout/PlannerHeader';
import { PlannerNavbar } from './components/layout/PlannerNavbar';
import { ChildContextSelector } from './components/layout/ChildContextSelector';
import { TodayView } from './views/TodayView';
import { EducationView } from './views/EducationView';
import { ActivitiesView } from './views/ActivitiesView';
import { HealthView } from './views/HealthView';
import { ProductivityView } from './views/ProductivityView';
import { MemoriesView } from './views/MemoriesView';
import { DocumentsVaultView } from './views/DocumentsVaultView';
import { EmergencySOSModal } from './components/modules/EmergencySOSModal';
import { TabType } from './types';
import { Heart, ShieldCheck } from 'lucide-react';

const AppContent: React.FC = () => {
  const { selectedChildId, setSelectedChildId, activeChild } = useFamily();
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [isSOSOpen, setIsSOSOpen] = useState<boolean>(false);

  const activeChildName = activeChild ? activeChild.name : 'Família Unificada';

  return (
    <div className="min-h-screen bg-canvas flex flex-col font-sans selection:bg-warm-peach selection:text-ink">
      {/* Top Planner Header */}
      <PlannerHeader
        onOpenSOS={() => setIsSOSOpen(true)}
        activeChildName={activeChildName}
      />

      {/* Luxury Planner Navigation Bar */}
      <PlannerNavbar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* Child Context Selector (Always Accessible) */}
        <section aria-label="Seletor de Perfil Infantil">
          <ChildContextSelector
            selectedChildId={selectedChildId}
            onSelectChild={(id) => setSelectedChildId(id)}
          />
        </section>

        {/* Dynamic Views Rendering */}
        <section className="transition-all duration-300">
          {activeTab === 'today' && <TodayView onOpenSOS={() => setIsSOSOpen(true)} />}
          {activeTab === 'education' && <EducationView />}
          {activeTab === 'activities' && <ActivitiesView />}
          {activeTab === 'health' && <HealthView />}
          {activeTab === 'productivity' && <ProductivityView />}
          {activeTab === 'memories' && <MemoriesView />}
          {activeTab === 'documents' && <DocumentsVaultView />}
        </section>

      </main>

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
    <FamilyProvider>
      <AppContent />
    </FamilyProvider>
  );
};
