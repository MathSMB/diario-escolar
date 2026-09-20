import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { AUTH_CONFIG } from '../../config/authConfig';
import {
  BookOpen,
  Mail,
  Lock,
  User,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  KeyRound,
} from 'lucide-react';

export const AuthPortal: React.FC = () => {
  const { loginWithEmail, registerWithEmail, loginWithOAuth, loginAsGuest } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('Mamãe');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOAuthHelp, setShowOAuthHelp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        const result = await loginWithEmail(email, password);
        if (!result.success) {
          setErrorMessage(result.error || 'Erro ao realizar login.');
        }
      } else {
        if (!name.trim()) {
          setErrorMessage('Por favor, informe seu nome.');
          setIsSubmitting(false);
          return;
        }
        const result = await registerWithEmail({
          name,
          email,
          password,
          role,
        });
        if (!result.success) {
          setErrorMessage(result.error || 'Erro ao criar conta.');
        }
      }
    } catch (err) {
      setErrorMessage('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'apple') => {
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      const result = await loginWithOAuth(provider);
      if (!result.success) {
        setErrorMessage(result.error || `Erro ao autenticar com ${provider}.`);
      }
    } catch (err) {
      setErrorMessage('Erro ao conectar com provedor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoAccount = (demoEmail: string, demoPass: string) => {
    setMode('login');
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen w-full bg-canvas flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Background Decor Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-warm-peach/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-warm-sage/15 blur-3xl" />
      </div>

      {/* Top Brand Logo */}
      <div className="max-w-md w-full mx-auto text-center pt-2">
        <div className="inline-flex items-center justify-center p-3.5 bg-surface border border-border-peach rounded-2xl shadow-warm-md mb-3 text-warm-terracotta">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-ink tracking-tight">
          Refúgio Familiar
        </h1>
        <p className="font-sans text-xs text-ink-muted mt-1">
          O santuário digital da rotina, educação e saúde dos seus filhos
        </p>
      </div>

      {/* Auth Card */}
      <div className="max-w-md w-full mx-auto my-6 bg-surface border border-border-linen rounded-3xl shadow-warm-card p-6 sm:p-8 relative">
        {/* Tab Toggle: Entrar / Criar Conta */}
        <div className="flex bg-canvas-sand p-1 rounded-2xl mb-6 border border-border-linen">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-sans font-medium rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-surface text-warm-terracotta-dark shadow-warm-sm font-semibold'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-sans font-medium rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-surface text-warm-terracotta-dark shadow-warm-sm font-semibold'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Criar Conta
          </button>
        </div>

        {/* OAuth Buttons (Google & Apple) */}
        <div className="space-y-2.5 mb-5">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleOAuthLogin('google')}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-surface border border-border-linen hover:border-border-peach hover:bg-canvas-sand text-ink text-xs sm:text-sm font-sans font-medium rounded-2xl shadow-warm-sm transition-all duration-150 active:scale-[0.99] disabled:opacity-50"
          >
            {/* Google SVG Icon */}
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continuar com Google</span>
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleOAuthLogin('apple')}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-ink text-surface hover:bg-ink-light text-xs sm:text-sm font-sans font-medium rounded-2xl shadow-warm-sm transition-all duration-150 active:scale-[0.99] disabled:opacity-50"
          >
            {/* Apple SVG Icon */}
            <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.93-14.3-5.75-8.7-10.35-18.72-13.8-30.04-3.46-11.32-5.19-22.18-5.19-32.58 0-14.42 3.65-26.31 10.96-35.66 7.31-9.35 16.48-14.15 27.5-14.42 5.09 0 10.74 1.34 16.96 4.02 6.23 2.68 10.02 4.08 11.37 4.2 1.83-.24 5.92-1.74 12.28-4.51 6.35-2.77 12.01-4.02 16.97-3.75 12.63.67 22.84 5.48 30.64 14.42-10.96 6.64-16.32 15.6-16.08 26.88.24 8.78 3.53 16.05 9.87 21.8 6.35 5.75 13.9 9.07 22.67 9.97-2.32 7.15-5.06 14.12-8.23 20.91zM119.22 31.84c0-7.31 2.66-14.18 7.97-20.61 5.31-6.43 11.83-10.38 19.56-11.85.98 6.94-.48 13.71-4.38 20.31-3.9 6.6-9.67 10.87-17.3 12.82-.73-.24-2.07-.37-4.01-.37-.53 0-1.14-.1-1.84-.3z" />
            </svg>
            <span>Continuar com Apple</span>
          </button>
        </div>

        {/* Divider with Text */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-border-linen"></div>
          <span className="flex-shrink mx-3 text-[11px] font-sans text-ink-muted uppercase tracking-wider">
            ou com e-mail
          </span>
          <div className="flex-grow border-t border-border-linen"></div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="my-3 p-3 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2.5 text-red-700 text-xs animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{errorMessage}</div>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 mt-2">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-sans font-medium text-ink mb-1">
                Seu Nome Completo
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-ink-light absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Mariana Silva"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-canvas-sand/60 border border-border-linen rounded-2xl text-xs sm:text-sm text-ink placeholder:text-ink-light focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
                />
              </div>
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-sans font-medium text-ink mb-1">
                Papel na Família
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3.5 py-2.5 bg-canvas-sand/60 border border-border-linen rounded-2xl text-xs sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
              >
                {AUTH_CONFIG.roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-sans font-medium text-ink mb-1">
              E-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-ink-light absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full pl-9 pr-3.5 py-2.5 bg-canvas-sand/60 border border-border-linen rounded-2xl text-xs sm:text-sm text-ink placeholder:text-ink-light focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-sans font-medium text-ink">
                Senha
              </label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() =>
                    alert(
                      'Dica para testes: Use "senha123" para as contas de teste ou clique nos atalhos rápidos abaixo.'
                    )
                  }
                  className="text-[11px] font-sans text-warm-terracotta hover:underline"
                >
                  Esqueceu?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-ink-light absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === 'register' ? 'Mínimo de 6 caracteres' : '••••••••'}
                className="w-full pl-9 pr-10 py-2.5 bg-canvas-sand/60 border border-border-linen rounded-2xl text-xs sm:text-sm text-ink placeholder:text-ink-light focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-light hover:text-ink transition-colors"
                title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3 bg-warm-terracotta hover:bg-warm-terracotta-dark text-surface font-sans font-semibold text-xs sm:text-sm rounded-2xl shadow-warm-md hover:shadow-warm-hover transition-all duration-200 active:scale-[0.99] disabled:opacity-60 mt-4"
          >
            {isSubmitting ? (
              <span>Processando...</span>
            ) : (
              <>
                <span>{mode === 'login' ? 'Entrar no Planner' : 'Criar Minha Conta'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Access Pill */}
        <div className="mt-5 pt-4 border-t border-border-linen/80">
          <div className="flex items-center justify-between text-[11px] font-sans text-ink-muted mb-2">
            <span className="flex items-center gap-1 font-medium text-ink">
              <KeyRound className="w-3.5 h-3.5 text-warm-terracotta" />
              Acesso Rápido para Avaliação:
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillDemoAccount('mariana@refugio.com', 'senha123')}
              className="px-2.5 py-1.5 bg-warm-peach-light hover:bg-warm-peach/40 border border-border-peach text-warm-terracotta-dark rounded-xl text-[11px] font-sans font-medium text-left truncate transition-colors"
            >
              👩 Mamãe Mariana
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount('carlos@refugio.com', 'senha123')}
              className="px-2.5 py-1.5 bg-warm-sage-light hover:bg-warm-sage/30 border border-warm-sage/40 text-warm-sage-dark rounded-xl text-[11px] font-sans font-medium text-left truncate transition-colors"
            >
              👨 Papai Carlos
            </button>
          </div>
        </div>

        {/* Guest Mode & OAuth Info Trigger */}
        <div className="mt-4 flex items-center justify-between text-xs font-sans">
          <button
            type="button"
            onClick={loginAsGuest}
            className="text-ink-muted hover:text-warm-terracotta hover:underline inline-flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Navegar como Visitante</span>
          </button>

          <button
            type="button"
            onClick={() => setShowOAuthHelp(!showOAuthHelp)}
            className="text-ink-light hover:text-ink flex items-center gap-1 text-[11px]"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Info OAuth</span>
          </button>
        </div>

        {/* OAuth Integration Guide Box */}
        {showOAuthHelp && (
          <div className="mt-4 p-3 bg-canvas-sand border border-border-linen rounded-2xl text-[11px] text-ink-muted leading-relaxed animate-in fade-in duration-200">
            <p className="font-semibold text-ink mb-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-warm-terracotta" />
              Integração de Produção Pronta
            </p>
            <p>
              Os botões OAuth de Google e Apple funcionam interativamente salvando a sessão do usuário. Para vincular chaves reais de API, configure <code>VITE_GOOGLE_CLIENT_ID</code> e <code>VITE_APPLE_CLIENT_ID</code> no arquivo <code>.env</code> (consulte o modelo em <code>.env.example</code>).
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center text-[11px] font-sans text-ink-light pb-2">
        <p>Refúgio Familiar &bull; Privacidade e Proteção de Dados com Criptografia Local</p>
      </div>
    </div>
  );
};
