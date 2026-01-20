/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Light futuristic theme
                'cyber-white': '#FFFFFF',
                'cyber-light': '#F8FAFC',
                'cyber-gray': '#E2E8F0',
                'cyber-blue': '#60A5FA',
                'cyber-purple': '#A78BFA',
                'cyber-pink': '#F472B6',
                'cyber-cyan': '#22D3EE',
                'cyber-accent': '#818CF8',
                'cyber-dark': '#1E293B',
                'cyber-text': '#0F172A',
            },
            fontFamily: {
                'display': ['Space Grotesk', 'sans-serif'],
                'body': ['Inter', 'sans-serif'],
                'mono': ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite',
                'slide-up': 'slideUp 0.6s ease-out',
                'fade-in': 'fadeIn 0.8s ease-out',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(100px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            backdropBlur: {
                'xs': '2px',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(96, 165, 250, 0.5)',
                'glow-lg': '0 0 40px rgba(96, 165, 250, 0.6)',
                'cyber': '0 8px 32px rgba(31, 38, 135, 0.15)',
            },
        },
    },
    plugins: [],
}
