/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Catppuccin Frappé colors
        'frappe': {
          'base': '#232634',
          'surface0': '#414559',
          'surface1': '#51576d',
          'surface2': '#626880',
          'overlay0': '#737994',
          'overlay1': '#838ba7',
          'overlay2': '#949cbb',
          'text': '#c6d0f5',
          'subtext0': '#a5adce',
          'subtext1': '#b5bfe2',
          'blue': '#8caaee',
          'lavender': '#babbf1',
          'sapphire': '#85c1dc',
          'sky': '#99d1db',
          'teal': '#81c8be',
          'green': '#a6d189',
          'yellow': '#e5c890',
          'peach': '#ef9f76',
          'maroon': '#ea999c',
          'red': '#e78284',
          'mauve': '#ca9ee6',
          'pink': '#f4b8e4',
          'flamingo': '#eebebe',
          'rosewater': '#f2d5cf',
        },
      },
    },
  },
  plugins: [],
};
