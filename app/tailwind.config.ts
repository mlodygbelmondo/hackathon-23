import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./node_modules/preline/preline.js", "./src/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [require("preline/plugin"), require("@tailwindcss/forms")],
} satisfies Config;
