import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { AUTH_CONFIG } from '../../config/authConfig';
import {
  X,
  User,
  Shield,
  Calendar,
  LogOut,
  Check,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
];

export const UserProfileModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { user, updateProfile, logout } = useAuth();

  if (!isOpen || !user) return null;

  const [name, setName] = useState(user.name);
  const [role, setRole] = useState<UserRole>(user.role);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim(),
      role,
      avatarUrl: avatarUrl.trim() || undefined,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const getProviderBadge = () => {
    switch (user.authProvider) {
      case 'google':
        return { label: 'Conectado via Google', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'apple':
        return { label: 'Conectado via Apple', bg: 'bg-zinc-100 text-zinc-800 border-zinc-300' };
      case 'guest':
        return { label: 'Modo Visitante', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
      default:
        return { label: 'Conta E-mail', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    }
  };

  const badge = getProviderBadge();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface w-full max-w-lg rounded-3xl border border-border-linen shadow-warm-xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border-linen flex items-center justify-between bg-canvas-sand/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-warm-peach-light rounded-xl text-warm-terracotta">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-ink">Perfil do Responsável</h2>
              <p className="font-sans text-xs text-ink-muted">Gerencie suas preferências e credenciais</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-canvas text-ink-muted hover:text-ink transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="p-6 space-y-5">
          {/* Avatar and Info Header */}
          <div className="flex items-center gap-4 p-4 bg-canvas-sand/40 border border-border-linen rounded-2xl">
            <div className="relative">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={user.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-border-peach shadow-warm-sm"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-warm-terracotta-light/30 border-2 border-border-peach flex items-center justify-center text-warm-terracotta text-2xl font-serif font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-serif font-bold text-base text-ink truncate">
                  {user.name}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-medium border ${badge.bg}`}>
                  {badge.label}
                </span>
              </div>
              <p className="text-xs font-sans text-ink-muted truncate">{user.email}</p>
            </div>
          </div>

          {/* Avatar Presets Selection */}
          <div>
            <label className="block text-xs font-sans font-medium text-ink mb-2">
              Escolha ou altere a foto de perfil
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {AVATAR_PRESETS.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAvatarUrl(url)}
                  className={`relative rounded-xl overflow-hidden flex-shrink-0 transition-transform ${
                    avatarUrl === url ? 'ring-2 ring-warm-terracotta scale-105' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt={`Avatar ${idx}`} className="w-10 h-10 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-sans font-medium text-ink mb-1">
                Nome de Exibição
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-canvas-sand/50 border border-border-linen rounded-2xl text-xs sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-sans font-medium text-ink mb-1">
                Papel Familiar
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3.5 py-2.5 bg-canvas-sand/50 border border-border-linen rounded-2xl text-xs sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
              >
                {AUTH_CONFIG.roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-sans font-medium text-ink mb-1">
              URL de Foto Personalizada (Opcional)
            </label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://exemplo.com/minha-foto.jpg"
              className="w-full px-3.5 py-2.5 bg-canvas-sand/50 border border-border-linen rounded-2xl text-xs sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-warm-terracotta/30 focus:border-warm-terracotta transition-all"
            />
          </div>

          {/* Metadata Footer Box */}
          <div className="p-3 bg-canvas-sand/30 border border-border-linen rounded-2xl flex items-center justify-between text-[11px] text-ink-muted">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-ink-light" />
              Membro desde {new Date(user.createdAt).toLocaleDateString('pt-BR')}
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-warm-sage" />
              Sessão Ativa e Segura
            </span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-border-linen">
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-sans font-medium transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair da Conta</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-2xl border border-border-linen text-ink-muted hover:bg-canvas-sand text-xs font-sans font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 bg-warm-terracotta hover:bg-warm-terracotta-dark text-surface text-xs font-sans font-semibold rounded-2xl shadow-warm-sm hover:shadow-warm-md transition-all active:scale-[0.98]"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Salvo!</span>
                  </>
                ) : (
                  <span>Salvar Alterações</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
