import type { Config } from "tailwindcss";

const fontSize = {
  "headline-lg": "32px",
  "headline-md": "28px",
  "headline-sm": "24px",
  "title-lg": "22px",
  "display-sm": "36px",
  "display-md": "45px",
};

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      fontSize: {
        ...fontSize,
      },
      boxShadow: {
        "overlay-1": "inset 0 0 0 2000px rgb(0 0 0 / 50%)",
        "overlay-2": "inset 0 0 0 2000px rgb(0 0 0 / 36%)",
      },
    },
  },
} satisfies Config;
