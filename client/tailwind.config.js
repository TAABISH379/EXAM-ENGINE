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
                    light: '#a5b4fc', // Soft Indigo
                    DEFAULT: '#6366f1', // Electric Violet
                    dark: '#4338ca', // Deep Indigo
                    accent: '#f472b6', // Soft Pink/Coral
                },
                slate: {
                    850: '#1e293b', // Deep Slate for headings
                }
            },
            backgroundImage: {
                'zen-gradient': 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                'glass-gradient': 'linear-gradient(145deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.1))',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
                'glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.05)',
                'glow': '0 0 20px rgba(99, 102, 241, 0.4)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shine': 'shine 3s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
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
