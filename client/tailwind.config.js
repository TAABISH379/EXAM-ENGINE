/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Outfit', 'sans-serif'],
            },
            colors: {
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    900: '#0c4a6e',
                },
                brand: {
                    light: '#c084fc', // Soft Purple
                    DEFAULT: '#7c3aed', // CSS Violet
                    dark: '#4c1d95', // Deep Violet
                    accent: '#22d3ee', // Cyan Neon
                    glow: '#e879f9', // Fuchsia
                },
                cosmic: {
                    100: '#e0e7ff',
                    900: '#1e1b4b',
                },
                slate: {
                    850: '#0f172a', // Deepest Space
                }
            },
            backgroundImage: {
                'cosmic-mesh': 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.15) 0%, rgba(15, 23, 42, 0) 50%)',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                'glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.1)',
                'glow': '0 0 20px rgba(124, 58, 237, 0.5)',
                'neon': '0 0 10px rgba(34, 211, 238, 0.6), 0 0 20px rgba(34, 211, 238, 0.3)',
            },
            animation: {
                'float': 'float 8s ease-in-out infinite',
                'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shine': 'shine 4s linear infinite',
                'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'blob': 'blob 10s infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                shine: {
                    '0%': { backgroundPosition: '200% center' },
                    '100%': { backgroundPosition: '-200% center' },
                }
            }
        },
    },
    plugins: [],
}
