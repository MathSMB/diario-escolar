/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#F7F4F0', // Creme de Linho
          sand: '#FAF8F6',    // Areia Suave
          pure: '#FFFFFF',
        },
        surface: {
          DEFAULT: '#FFFFFF', // Branco Alabastro
          subtle: '#FBFAF8',  // Off-white suave
          soft: '#F4EFEB',    // Cartão com tom de linho
        },
        warm: {
          peach: {
            light: '#F8ECE4',
            DEFAULT: '#EACFBD', // Pêssego Aveludado
            dark: '#D9B49E',
          },
          terracotta: {
            light: '#DDA694',
            DEFAULT: '#BC7C67', // Terracota Queimado
            dark: '#9F5F4B',
          }
        },
        calm: {
          sage: {
            light: '#EAF0EB',
            DEFAULT: '#8A9A8C', // Verde Sálvia desaturado
            dark: '#6D7E6F',
          },
          slate: {
            light: '#E9EFF4',
            DEFAULT: '#778899', // Azul Ardósia Suave
            dark: '#5D6E7E',
          }
        },
        ink: {
          DEFAULT: '#3D3A38', // Grafite Quente
          charcoal: '#4A443F', // Marrom Carvão
          muted: '#7A736E',   // Tinta Suave desaturada
          light: '#A09993',   // Placeholders e divisores suaves
        },
        border: {
          linen: '#ECE7E1',
          peach: '#F3E8DE',
          sage: '#DEE6DF',
        }
      },
      fontFamily: {
        serif: ['Fraunces', 'Lora', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -1px rgba(188, 124, 103, 0.05), 0 1px 4px 0 rgba(61, 58, 56, 0.03)',
        'warm-md': '0 8px 24px -4px rgba(188, 124, 103, 0.07), 0 2px 8px -1px rgba(61, 58, 56, 0.03)',
        'warm-lg': '0 16px 36px -6px rgba(188, 124, 103, 0.09), 0 6px 14px -2px rgba(61, 58, 56, 0.04)',
        'warm-hover': '0 20px 42px -6px rgba(188, 124, 103, 0.12), 0 8px 18px -3px rgba(61, 58, 56, 0.05)',
        'warm-inner': 'inset 0 2px 4px 0 rgba(61, 58, 56, 0.04)',
      },
      transitionTimingFunction: {
        'tactile': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
