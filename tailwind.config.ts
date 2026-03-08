import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
      },
      // Tutaj wchodzą Twoje parametry najs1
      typography: {
        DEFAULT: {
          css: {
            color: '#1a1a1a',
            lineHeight: '1.625', // leading-relaxed
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
};
export default config;
