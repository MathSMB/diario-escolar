import React from 'react';
import {
  BookOpen,
  Sparkles,
  ShieldCheck,
  Heart,
  GraduationCap,
  FolderArchive,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Lock,
  Download,
  Star,
  Settings,
  LogIn,
  UserPlus,
} from 'lucide-react';

interface Props {
  onOpenAuth: (initialMode: 'login' | 'register') => void;
  onEnterGuest: () => void;
  onOpenAdmin: () => void;
}

export const LandingReceptionView: React.FC<Props> = ({
  onOpenAuth,
  onEnterGuest,
  onOpenAdmin,
}) => {
  return (
    <div className="min-h-screen bg-canvas text-ink font-sans flex flex-col selection:bg-warm-peach selection:text-ink">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-warm-peach/25 blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-warm-sage/20 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-border-peach/30 blur-3xl" />
      </div>

      {/* Top Floating Glass Navigation */}
      <header className="w-full bg-surface/80 backdrop-blur-md border-b border-border-linen px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-canvas-sand border border-border-peach flex items-center justify-center text-warm-terracotta shadow-warm-sm">
              <BookOpen className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-ink block leading-none">
                Refúgio Familiar
              </span>
              <span className="text-[10px] font-sans text-ink-muted tracking-wider uppercase">
                Santuário Digital do Lar
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border-linen hover:border-border-peach text-xs font-sans text-ink-muted hover:text-ink transition-colors"
              title="Painel de Métricas e Administração Geral"
            >
              <Settings className="w-3.5 h-3.5 text-warm-terracotta" />
              <span>Painel Admin</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenAuth('login')}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-2xl border border-border-linen hover:bg-surface text-xs sm:text-sm font-sans font-medium text-ink transition-all shadow-warm-sm"
            >
              <LogIn className="w-3.5 h-3.5 text-warm-terracotta" />
              <span>Entrar</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenAuth('register')}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 bg-warm-terracotta hover:bg-warm-terracotta-dark text-surface text-xs sm:text-sm font-sans font-semibold rounded-2xl shadow-warm-sm hover:shadow-warm-md transition-all active:scale-[0.98]"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Criar Conta</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">
        
        {/* HERO SECTION */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warm-peach-light text-warm-terracotta-dark border border-border-peach text-xs font-sans font-medium shadow-warm-sm animate-in fade-in duration-300">
            <Sparkles className="w-3.5 h-3.5 text-warm-terracotta" />
            <span>Organização Familiar com Afeto, Serenidade e Custo Zero</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-ink tracking-tight leading-[1.15]">
            O refúgio sereno para a rotina, saúde e memórias dos seus filhos.
          </h1>

          <p className="font-sans text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl mx-auto">
            Chega de recados esquecidos no WhatsApp, horários de remédios desencontrados e anotações soltas. Centralize a vida escolar, cuidados clínicos com <strong>Cartão SOS em 1 toque</strong> e lembranças inesquecíveis em um espaço com a delicadeza de uma papelaria de luxo.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              type="button"
              onClick={() => onOpenAuth('register')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 bg-warm-terracotta hover:bg-warm-terracotta-dark text-surface font-sans font-semibold text-sm rounded-2xl shadow-warm-md hover:shadow-warm-hover transition-all duration-200 active:scale-[0.98]"
            >
              <span>Criar Meu Espaço Familiar Grátis</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onEnterGuest}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-surface hover:bg-canvas-sand border border-border-peach text-ink font-sans font-medium text-sm rounded-2xl shadow-warm-sm transition-all"
            >
              <Sparkles className="w-4 h-4 text-warm-terracotta" />
              <span>Experimentar Demonstração (1 Toque)</span>
            </button>
          </div>

          {/* Social Proof Mini Bar */}
          <div className="pt-2 flex items-center justify-center gap-6 text-xs text-ink-muted flex-wrap">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-warm-sage" />
              100% Livre de Anúncios
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-warm-terracotta" />
              Criptografia &amp; Privacidade Local
            </span>
            <span className="flex items-center gap-1.5">
              <Download className="w-4 h-4 text-calm-slate" />
              Exportação em Planilha Aberta (.ODS)
            </span>
          </div>

        </section>

        {/* 4 PILARS PREVIEW CARDS */}
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
              Tudo o que sua família precisa em perfeita harmonia
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              Quatro pilares pensados para eliminar a sobrecarga mental dos pais e cuidadores
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* 1. Saúde e SOS */}
            <div className="p-6 bg-surface border border-border-linen hover:border-border-peach rounded-3xl shadow-warm-card hover:shadow-warm-hover transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-warm-peach-light text-warm-terracotta flex items-center justify-center shadow-sm">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-ink">
                  Saúde &amp; Cartão SOS (1 Toque)
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Acesso instantâneo a tipo sanguíneo, alergias, contato de pediatras e dosagens de medicamentos ativos para babás e escolas.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-border-linen/80 text-[11px] text-warm-terracotta font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Histórico de receitas com foto</span>
              </div>
            </div>

            {/* 2. Educação e Rotina */}
            <div className="p-6 bg-surface border border-border-linen hover:border-border-peach rounded-3xl shadow-warm-card hover:shadow-warm-hover transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-warm-sage-light text-warm-sage-dark flex items-center justify-center shadow-sm">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-ink">
                  Escola &amp; Mochila Pronta
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Grade semanal de aulas, avaliações acadêmicas, reuniões de professores e lista de materiais para nunca esquecer uniformes ou cadernos.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-border-linen/80 text-[11px] text-warm-sage-dark font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Cálculo automático de horários</span>
              </div>
            </div>

            {/* 3. Soberania e Formato Aberto */}
            <div className="p-6 bg-surface border border-border-linen hover:border-border-peach rounded-3xl shadow-warm-card hover:shadow-warm-hover transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-calm-slate-light text-calm-slate-dark flex items-center justify-center shadow-sm">
                  <FolderArchive className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-ink">
                  Soberania &amp; Custo Zero
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Zero aprisionamento. Baixe todas as 16 tabelas em planilha aberta (.ODS padrão ISO) e receba todas as fotos organizadas em pastas compactadas (.ZIP).
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-border-linen/80 text-[11px] text-calm-slate-dark font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Lido em LibreOffice, Excel e Google</span>
              </div>
            </div>

            {/* 4. Memórias e Afeto */}
            <div className="p-6 bg-surface border border-border-linen hover:border-border-peach rounded-3xl shadow-warm-card hover:shadow-warm-hover transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-warm-peach/40 text-warm-terracotta-dark flex items-center justify-center shadow-sm">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-ink">
                  Memórias &amp; Obras de Arte
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Digitalização dos desenhos infantis, álbum com marcos de desenvolvimento e diário de momentos especiais com narrativa afetiva.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-border-linen/80 text-[11px] text-warm-terracotta font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Linha do tempo do crescimento</span>
              </div>
            </div>

          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="bg-surface border border-border-linen rounded-3xl p-6 sm:p-10 space-y-6 shadow-warm-sm">
          <div className="text-center space-y-1">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              Criado para pais que valorizam clareza e acolhimento
            </h2>
            <p className="text-xs text-ink-muted">A experiência de quem já transformou a rotina dos filhos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-canvas-sand/40 border border-border-linen rounded-2xl space-y-3">
              <div className="flex text-amber-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-serif italic text-xs sm:text-sm text-ink leading-relaxed">
                "Com dois filhos em escolas diferentes e horários de natação e reforço, vivíamos perdidos. O Refúgio Familiar virou nosso centro de paz. O fato de exportar tudo em planilha para o meu marido que usa Linux foi perfeito!"
              </p>
              <div className="text-xs font-sans">
                <span className="font-bold text-ink block">Mariana Silva</span>
                <span className="text-ink-muted">Mãe da Helena (8 anos) e Mateo (4 anos)</span>
              </div>
            </div>

            <div className="p-5 bg-canvas-sand/40 border border-border-linen rounded-2xl space-y-3">
              <div className="flex text-amber-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-serif italic text-xs sm:text-sm text-ink leading-relaxed">
                "O Cartão SOS em 1 toque já nos salvou na emergência do hospital. O médico leu tudo em segundos, sem precisarmos caçar papel na bolsa. O visual de papelaria elegante dá gosto de usar todo dia."
              </p>
              <div className="text-xs font-sans">
                <span className="font-bold text-ink block">Carlos Eduardo</span>
                <span className="text-ink-muted">Pai cuidador &bull; Belo Horizonte, MG</span>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-warm-terracotta to-warm-terracotta-dark text-surface text-center space-y-5 shadow-warm-xl">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
            Comece hoje mesmo a cuidar do que mais importa.
          </h2>
          <p className="text-xs sm:text-sm text-warm-peach max-w-lg mx-auto leading-relaxed">
            Sem mensalidades escondidas, sem venda de dados. Uma experiência serena criada com carinho para sua família.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenAuth('register')}
              className="w-full sm:w-auto px-8 py-3 bg-surface text-warm-terracotta-dark hover:bg-canvas-sand font-sans font-bold text-sm rounded-2xl shadow-warm-md transition-all active:scale-[0.98]"
            >
              Criar Conta Gratuita
            </button>
            <button
              type="button"
              onClick={() => onOpenAuth('login')}
              className="w-full sm:w-auto px-6 py-3 border border-white/40 hover:bg-white/10 text-white font-sans font-medium text-sm rounded-2xl transition-all"
            >
              Já tenho conta &bull; Entrar
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-subtle border-t border-border-linen py-8 px-4 sm:px-8 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <div className="flex items-center gap-2 font-serif italic">
            <Heart className="w-4 h-4 text-warm-terracotta fill-warm-peach" />
            <span>Refúgio Familiar &bull; Acompanhamento infantil com afeto e clareza.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="hover:text-warm-terracotta hover:underline flex items-center gap-1"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Painel Admin</span>
            </button>
            <span>&bull;</span>
            <span>Design System Matte &amp; Orgânico</span>
            <span>&bull;</span>
            <span>Formato Aberto ISO/IEC 26300</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
