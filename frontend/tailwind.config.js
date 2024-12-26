/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-red-300',
    'bg-yellow-300',
    'bg-orange-300',
    'bg-green-300',
    'bg-pink-300',
    'bg-slate-300',
    'bg-blue-300',
    'bg-violet-300',
    'bg-zinc-300',
    'bg-lime-300',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}