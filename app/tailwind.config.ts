import { type Config } from "tailwindcss";

export default {
  content: [
    "./node_modules/preline/preline.js",
    "./src/**/*.tsx",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [require("preline/plugin"), require("@tailwindcss/forms")],
} satisfies Config;
