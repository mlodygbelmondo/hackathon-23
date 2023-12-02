import { type Config } from "tailwindcss";

export default {
  content: ["./node_modules/preline/preline.js", "./src/**/*.tsx"],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [require("preline/plugin"), require("@tailwindcss/forms")],
} satisfies Config;
