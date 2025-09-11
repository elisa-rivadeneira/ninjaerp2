/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./frontend/**/*.{html,js,ts,jsx,tsx,vue}", // 👈 aquí ajustamos para tu carpeta
    "./app/**/*.py", // 👈 si inyectas templates desde Python/Flask
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
