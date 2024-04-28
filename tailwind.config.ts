import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/app/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          850: '#1A1A1E',
          900: '#121214',
        },
      },
    },
  },
  plugins: [],
}
export default config
