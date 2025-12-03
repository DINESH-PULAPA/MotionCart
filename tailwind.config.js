/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'desktop': '53em',
            },
            colors: {
                bg: '#000',
                text: '#fff',
                link: '#fff',
                'link-hover': '#fff', // Adjust if needed based on original CSS
            },
            fontFamily: {
                'area-normal': ['area-normal', 'sans-serif'],
                'anonymous-pro': ['anonymous-pro', 'monospace'],
            },
        },
    },
    plugins: [],
}
