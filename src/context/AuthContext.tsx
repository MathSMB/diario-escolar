import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSession, UserRole } from '../types';
import { AUTH_CONFIG } from '../config/authConfig';

interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // Em ambiente front-end simulamos armazenamento seguro com hash simples
  role: UserRole;
  avatarUrl?: string;
  authProvider: 'email' | 'google' | 'apple' | 'guest';
  createdAt: string;
}

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  registerWithEmail: (data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    avatarUrl?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  loginWithOAuth: (provider: 'google' | 'apple') => Promise<{ success: boolean; error?: string }>;
  loginAsGuest: () => void;
  updateProfile: (data: Partial<UserSession>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Contas de demonstração pré-configuradas para testes imediatos
const INITIAL_DEMO_USERS: RegisteredUser[] = [
  {
    id: 'user_mariana_01',
    name: 'Mariana Silva',
    email: 'mariana@refugio.com',
    passwordHash: 'senha123',
    role: 'Mamãe',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    authProvider: 'email',
    createdAt: '2024-01-15T08:00:00.000Z',
  },
  {
    id: 'user_carlos_02',
    name: 'Carlos Eduardo',
    email: 'carlos@refugio.com',
    passwordHash: 'senha123',
    role: 'Papai',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    authProvider: 'email',
    createdAt: '2024-02-10T14:30:00.000Z',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Inicializa a base de usuários e a sessão a partir do localStorage
  useEffect(() => {
    try {
      // 1. Inicializar banco de usuários se ainda não existir
      const existingUsersRaw = localStorage.getItem(AUTH_CONFIG.storageKeys.usersDatabase);
      if (!existingUsersRaw) {
        localStorage.setItem(
          AUTH_CONFIG.storageKeys.usersDatabase,
          JSON.stringify(INITIAL_DEMO_USERS)
        );
      }

      // 2. Recuperar sessão ativa
      const savedSession = localStorage.getItem(AUTH_CONFIG.storageKeys.session);
      if (savedSession) {
        const parsedSession: UserSession = JSON.parse(savedSession);
        setUser(parsedSession);
      }
    } catch (err) {
      console.error('Erro ao inicializar sessão de usuário:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getRegisteredUsers = (): RegisteredUser[] => {
    try {
      const raw = localStorage.getItem(AUTH_CONFIG.storageKeys.usersDatabase);
      return raw ? JSON.parse(raw) : INITIAL_DEMO_USERS;
    } catch {
      return INITIAL_DEMO_USERS;
    }
  };

  const saveRegisteredUsers = (users: RegisteredUser[]) => {
    localStorage.setItem(AUTH_CONFIG.storageKeys.usersDatabase, JSON.stringify(users));
  };

  const setSession = (sessionUser: UserSession) => {
    setUser(sessionUser);
    localStorage.setItem(AUTH_CONFIG.storageKeys.session, JSON.stringify(sessionUser));
  };

  // Login tradicional com e-mail e senha
  const loginWithEmail = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400)); // Pequena latência simulada para UX natural

    const normalizedEmail = email.trim().toLowerCase();
    const users = getRegisteredUsers();
    const foundUser = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!foundUser) {
      setIsLoading(false);
      return { success: false, error: 'E-mail não encontrado. Crie uma conta para começar.' };
    }

    if (foundUser.passwordHash !== password) {
      setIsLoading(false);
      return { success: false, error: 'Senha incorreta. Verifique suas credenciais.' };
    }

    const session: UserSession = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      avatarUrl: foundUser.avatarUrl,
      role: foundUser.role,
      authProvider: foundUser.authProvider,
      createdAt: foundUser.createdAt,
      lastLoginAt: new Date().toISOString(),
    };

    setSession(session);
    setIsLoading(false);
    return { success: true };
  };

  // Cadastro de novo usuário
  const registerWithEmail = async (data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    avatarUrl?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const normalizedEmail = data.email.trim().toLowerCase();
    const users = getRegisteredUsers();

    if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      setIsLoading(false);
      return { success: false, error: 'Este e-mail já está cadastrado. Faça login ou use outro.' };
    }

    if (data.password.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'A senha deve ter pelo menos 6 caracteres.' };
    }

    const newUser: RegisteredUser = {
      id: `user_${Date.now()}`,
      name: data.name.trim(),
      email: normalizedEmail,
      passwordHash: data.password,
      role: data.role,
      avatarUrl: data.avatarUrl || undefined,
      authProvider: 'email',
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    saveRegisteredUsers(updatedUsers);

    const session: UserSession = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      avatarUrl: newUser.avatarUrl,
      role: newUser.role,
      authProvider: newUser.authProvider,
      createdAt: newUser.createdAt,
      lastLoginAt: new Date().toISOString(),
    };

    setSession(session);
    setIsLoading(false);
    return { success: true };
  };

  // Login via OAuth (Google ou Apple)
  const loginWithOAuth = async (provider: 'google' | 'apple'): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const isGoogle = provider === 'google';
    const oauthEmail = isGoogle ? 'familia.conectada@gmail.com' : 'responsavel@icloud.com';
    const oauthName = isGoogle ? 'Família Conectada (Google)' : 'Responsável Familiar (Apple)';
    const oauthAvatar = isGoogle
      ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      : undefined;

    const users = getRegisteredUsers();
    let existingUser = users.find((u) => u.email.toLowerCase() === oauthEmail);

    if (!existingUser) {
      existingUser = {
        id: `oauth_${provider}_${Date.now()}`,
        name: oauthName,
        email: oauthEmail,
        passwordHash: '',
        role: 'Mamãe',
        avatarUrl: oauthAvatar,
        authProvider: provider,
        createdAt: new Date().toISOString(),
      };
      saveRegisteredUsers([...users, existingUser]);
    }

    const session: UserSession = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      avatarUrl: existingUser.avatarUrl,
      role: existingUser.role,
      authProvider: provider,
      createdAt: existingUser.createdAt,
      lastLoginAt: new Date().toISOString(),
    };

    setSession(session);
    setIsLoading(false);
    return { success: true };
  };

  // Modo Convidado / Acesso Rápido
  const loginAsGuest = () => {
    const guestSession: UserSession = {
      id: 'guest_user',
      name: 'Visitante da Família',
      email: 'visitante@refugio.local',
      role: 'Cuidador(a)',
      authProvider: 'guest',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    setSession(guestSession);
  };

  // Atualizar dados de perfil
  const updateProfile = (data: Partial<UserSession>) => {
    if (!user) return;
    const updatedSession: UserSession = {
      ...user,
      ...data,
    };
    setSession(updatedSession);

    // Sincronizar com base local
    const users = getRegisteredUsers();
    const updatedUsers = users.map((u) =>
      u.id === user.id
        ? {
            ...u,
            name: data.name ?? u.name,
            role: data.role ?? u.role,
            avatarUrl: data.avatarUrl ?? u.avatarUrl,
          }
        : u
    );
    saveRegisteredUsers(updatedUsers);
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_CONFIG.storageKeys.session);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        loginWithEmail,
        registerWithEmail,
        loginWithOAuth,
        loginAsGuest,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};
