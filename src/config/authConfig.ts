/**
 * Configurações de Autenticação e Provedores OAuth
 * 
 * Para habilitar provedores OAuth em ambiente de produção:
 * 1. Google OAuth: Crie credenciais no Google Cloud Console (https://console.cloud.google.com/apis/credentials)
 *    e configure a variável VITE_GOOGLE_CLIENT_ID no arquivo .env.
 * 2. Apple OAuth: Crie um Service ID no Apple Developer Portal (https://developer.apple.com)
 *    e configure a variável VITE_APPLE_CLIENT_ID no arquivo .env.
 * 3. Ou conecte um backend BaaS como Supabase ou Firebase Auth.
 */

export const AUTH_CONFIG = {
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    redirectUri: window.location.origin,
    isConfigured: Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID),
  },
  apple: {
    clientId: import.meta.env.VITE_APPLE_CLIENT_ID || '',
    redirectUri: window.location.origin,
    isConfigured: Boolean(import.meta.env.VITE_APPLE_CLIENT_ID),
  },
  roles: [
    'Mamãe',
    'Papai',
    'Avós',
    'Cuidador(a)',
    'Tio(a)',
    'Outro',
  ] as const,
  storageKeys: {
    session: 'refugio_familiar_user_session',
    usersDatabase: 'refugio_familiar_registered_users',
  },
};
