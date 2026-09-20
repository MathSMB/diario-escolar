import React, { useState } from 'react';
import { useFamily } from '../context/FamilyContext';
import {
  Sparkles,
  Camera,
  Heart,
  Palette,
  Award,
  Plus,
  Calendar,
  MapPin,
} from 'lucide-react';

export const MemoriesView: React.FC = () => {
  const { memories, milestones, artworks, addMemory, addArtwork, selectedChildId, activeChild } =
    useFamily();

  const [activeSection, setActiveSection] = useState<'feed' | 'marcos' | 'artes'>('feed');
  const [showMemoryModal, setShowMemoryModal] = useState(false);
  const [showArtworkModal, setShowArtworkModal] = useState(false);

  // New Memory Form
  const [memTitle, setMemTitle] = useState('');
  const [memDate, setMemDate] = useState('');
  const [memNarrative, setMemNarrative] = useState('');
  const [memCategory, setMemCategory] = useState<'Escola' | 'Férias' | 'Conquistas' | 'Família' | 'Artes'>('Conquistas');
  const [memLocation, setMemLocation] = useState('');

  // New Artwork Form
  const [artTitle, setArtTitle] = useState('');
  const [artTech, setArtTech] = useState('');
  const [artDesc, setArtDesc] = useState('');

  const childName = activeChild ? activeChild.name : 'Família Unificada';

  const filteredMemories = memories.filter((m) =>
    selectedChildId === 'all' ? true : m.childId === selectedChildId
  );

  const filteredMilestones = milestones.filter((mil) =>
    selectedChildId === 'all' ? true : mil.childId === selectedChildId
  );

  const filteredArtworks = artworks.filter((a) =>
    selectedChildId === 'all' ? true : a.childId === selectedChildId
  );

  const handleCreateMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memTitle || !memNarrative) return;
    addMemory({
      childId: selectedChildId === 'all' ? 'helena' : selectedChildId,
      title: memTitle,
      date: memDate || new Date().toLocaleDateString('pt-BR'),
      narrative: memNarrative,
      category: memCategory,
      location: memLocation || 'Em Casa',
    });
    setMemTitle('');
    setMemNarrative('');
    setMemLocation('');
    setShowMemoryModal(false);
  };

  const handleCreateArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle) return;
    addArtwork({
      childId: selectedChildId === 'all' ? 'helena' : selectedChildId,
      title: artTitle,
      date: new Date().toLocaleDateString('pt-BR'),
      technique: artTech || 'Pintura livre',
      description: artDesc || 'Arte feita com muito carinho.',
    });
    setArtTitle('');
    setArtTech('');
    setArtDesc('');
    setShowArtworkModal(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-7 rounded-3xl bg-surface border border-border-linen shadow-warm-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-warm-peach-light text-warm-terracotta flex items-center justify-center border border-border-peach shadow-sm">
            <Heart className="w-6 h-6 stroke-[1.75]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-warm-peach text-warm-terracotta-dark">
                Módulo E • Linha do Tempo Afetiva
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mt-1">
              Memórias & Marcos de Vida • {childName}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              Preservação de instantes com significado, marcos do desenvolvimento e mural de artes infantis.
            </p>
          </div>
        </div>

        {/* Section Tabs & Add button */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="flex items-center p-1 bg-canvas-sand rounded-2xl border border-border-linen text-xs font-medium">
            <button
              onClick={() => setActiveSection('feed')}
              className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
                activeSection === 'feed'
                  ? 'bg-surface text-ink font-semibold shadow-warm-sm border border-border-linen'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Feed de Momentos
            </button>
            <button
              onClick={() => setActiveSection('marcos')}
              className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
                activeSection === 'marcos'
                  ? 'bg-surface text-ink font-semibold shadow-warm-sm border border-border-linen'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Marcos de Vida
            </button>
            <button
              onClick={() => setActiveSection('artes')}
              className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
                activeSection === 'artes'
                  ? 'bg-surface text-ink font-semibold shadow-warm-sm border border-border-linen'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Mural de Artes
            </button>
          </div>

          <button
            onClick={() => (activeSection === 'artes' ? setShowArtworkModal(true) : setShowMemoryModal(true))}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-warm-terracotta text-white font-sans text-xs font-semibold shadow-warm-sm hover:bg-warm-terracotta-dark transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{activeSection === 'artes' ? 'Nova Arte' : 'Novo Momento'}</span>
          </button>
        </div>
      </div>

      {/* Section 1: Feed de Momentos (Polaroid Style) */}
      {activeSection === 'feed' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMemories.map((mem) => (
            <div key={mem.id} className="planner-card p-5 flex flex-col justify-between space-y-4">
              <div>
                {/* Polaroid Frame */}
                <div className="p-3 bg-surface-subtle border border-border-linen rounded-2xl shadow-warm-sm">
                  <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-warm-peach-light via-canvas-sand to-calm-sage-light flex items-center justify-center border border-border-linen/80 relative overflow-hidden group">
                    <div className="text-center p-4">
                      <div className="w-10 h-10 rounded-full bg-surface/90 mx-auto flex items-center justify-center text-warm-terracotta shadow-warm-sm mb-2 group-hover:scale-110 transition-transform">
                        <Camera className="w-5 h-5 stroke-[1.75]" />
                      </div>
                      <span className="font-serif italic text-xs text-ink-muted">Foto do Momento</span>
                    </div>

                    <span className="absolute top-2.5 right-2.5 badge-peach text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                      #{mem.category}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-ink-muted font-sans px-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-ink-light" />
                      {mem.date}
                    </span>
                    {mem.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-calm-slate" />
                        {mem.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Narrative in Editorial Serif Typography */}
                <div className="mt-3 px-1">
                  <h3 className="font-serif text-base font-semibold text-ink leading-snug">
                    {mem.title}
                  </h3>
                  <p className="font-serif italic text-xs text-ink-muted leading-relaxed mt-2">
                    "{mem.narrative}"
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-border-linen flex items-center justify-between text-xs text-ink-muted">
                <span className="flex items-center gap-1 font-serif text-[11px] text-warm-terracotta">
                  <Sparkles className="w-3.5 h-3.5" /> Momento Guardado
                </span>
                <button className="text-warm-terracotta hover:underline text-xs font-serif italic">
                  Compartilhar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section 2: Marcos do Desenvolvimento */}
      {activeSection === 'marcos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-ink flex items-center gap-2">
              <Award className="w-5 h-5 text-calm-sage-dark" />
              <span>Marcos Importantes do Crescimento & Autonomia</span>
            </h3>
            <span className="text-xs text-ink-muted">Conquistas motoras, de linguagem e sociais</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMilestones.map((mil) => (
              <div key={mil.id} className="planner-card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="badge-sage text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                      {mil.category}
                    </span>
                    <span className="text-xs text-ink-muted font-mono">{mil.dateAchieved}</span>
                  </div>

                  <h4 className="font-serif text-base font-semibold text-ink leading-snug">
                    {mil.title}
                  </h4>
                  <span className="text-xs text-warm-terracotta font-medium block mt-0.5">
                    Atingido com {mil.ageAchieved}
                  </span>

                  <p className="text-xs text-ink-muted font-sans leading-relaxed mt-2.5 p-3 rounded-xl bg-canvas-sand/60 border border-border-linen">
                    {mil.description}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-border-linen flex items-center justify-between text-xs text-ink-muted">
                  <span className="text-calm-sage-dark font-medium flex items-center gap-1">
                    ✓ Marco Consolidado
                  </span>
                  <button className="text-warm-terracotta hover:underline font-serif italic">
                    Ver certificado
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 3: Mural de Artes */}
      {activeSection === 'artes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-ink flex items-center gap-2">
              <Palette className="w-5 h-5 text-warm-terracotta" />
              <span>Mural de Pinturas, Desenhos & Trabalhos Manuais</span>
            </h3>
            <span className="text-xs text-ink-muted">Expressão artística infantil preservada</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtworks.map((art) => (
              <div key={art.id} className="planner-card p-5 space-y-3">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-tr from-canvas-sand via-warm-peach-light/40 to-calm-slate-light flex items-center justify-center border border-border-linen relative overflow-hidden">
                  <div className="text-center p-4">
                    <Palette className="w-8 h-8 text-warm-terracotta mx-auto mb-2 opacity-80" />
                    <span className="font-serif text-xs text-ink font-semibold block">{art.title}</span>
                    <span className="text-[10px] text-ink-muted">{art.technique}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-ink-muted mb-1">
                    <span>{art.date}</span>
                    <span className="badge-peach text-[10px] px-2 py-0.2 rounded-full font-medium">
                      Ateliê Infantil
                    </span>
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-ink">
                    {art.title}
                  </h4>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                    {art.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Novo Momento */}
      {showMemoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/30 backdrop-blur-sm">
          <div className="w-full max-w-md bg-surface border border-border-linen rounded-3xl p-6 shadow-warm-hover">
            <h3 className="font-serif text-xl font-semibold text-ink mb-4">
              Registrar Momento Inesquecível
            </h3>

            <form onSubmit={handleCreateMemory} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-ink-muted block mb-1">
                  Título do Momento:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Primeira vez no mar sem medo das ondas"
                  value={memTitle}
                  onChange={(e) => setMemTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Categoria:
                  </label>
                  <select
                    value={memCategory}
                    onChange={(e) => setMemCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  >
                    <option value="Conquistas">Conquistas</option>
                    <option value="Escola">Escola</option>
                    <option value="Férias">Férias</option>
                    <option value="Família">Família</option>
                    <option value="Artes">Artes</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted block mb-1">
                    Data:
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 19 de Setembro"
                    value={memDate}
                    onChange={(e) => setMemDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-muted block mb-1">
                  Local:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Praia de Maresias, Varanda de Casa"
                  value={memLocation}
                  onChange={(e) => setMemLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-muted block mb-1">
                  Relato & Narrativa Afetiva:
                </label>
                <textarea
                  placeholder="Como foi o momento? O que a criança sentiu ou expressou?"
                  value={memNarrative}
                  onChange={(e) => setMemNarrative(e.target.value)}
                  rows={4}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta font-serif italic"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-linen">
                <button
                  type="button"
                  onClick={() => setShowMemoryModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-muted hover:bg-canvas-sand"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-warm-terracotta hover:bg-warm-terracotta-dark text-white text-xs font-semibold shadow-warm-sm"
                >
                  Salvar Momento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Nova Arte */}
      {showArtworkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/30 backdrop-blur-sm">
          <div className="w-full max-w-md bg-surface border border-border-linen rounded-3xl p-6 shadow-warm-hover">
            <h3 className="font-serif text-xl font-semibold text-ink mb-4">
              Registrar Arte Infantil
            </h3>

            <form onSubmit={handleCreateArtwork} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-ink-muted block mb-1">
                  Título da Obra:
                </label>
                <input
                  type="text"
                  placeholder="Ex: O Castelo Encantado na Floresta"
                  value={artTitle}
                  onChange={(e) => setArtTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-muted block mb-1">
                  Técnica Utilizada:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Aquarela sobre papel Canson, Guache a dedo"
                  value={artTech}
                  onChange={(e) => setArtTech(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-muted block mb-1">
                  Descrição do que a criança explicou:
                </label>
                <textarea
                  placeholder="O que significa essa pintura?"
                  value={artDesc}
                  onChange={(e) => setArtDesc(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-sand border border-border-linen text-sm text-ink focus:outline-none focus:border-warm-terracotta"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-linen">
                <button
                  type="button"
                  onClick={() => setShowArtworkModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-muted hover:bg-canvas-sand"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-warm-terracotta hover:bg-warm-terracotta-dark text-white text-xs font-semibold shadow-warm-sm"
                >
                  Salvar Arte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
