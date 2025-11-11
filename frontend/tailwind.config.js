/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          hover: '#1d4ed8',
          light: '#3b82f6',
        },
        background: {
          DEFAULT: '#f3f4f6',
          card: '#ffffff',
        },
        text: {
          primary: '#1f2937',
          secondary: '#6b7280',
        },
        border: {
          DEFAULT: '#d1d5db',
          focus: '#2563eb',
        },
      },
      spacing: {
        'form-padding': '2rem',
        'input-padding-x': '1rem',
        'input-padding-y': '0.5rem',
      },
      borderRadius: {
        'card': '0.5rem',
        'input': '0.375rem',
      },
    },
  },
  plugins: [],
}

