import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        noema: {
          bg: "var(--bg)",
          surface: "var(--surface)",
          surfaceSoft: "var(--surface-soft)",
          line: "var(--line)",
          text: "var(--text)",
          muted: "var(--muted)",
          accent: "var(--accent)",
          accentSoft: "var(--accent-soft)",
        },
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        card: "0 8px 25px rgba(26, 42, 105, 0.35)",
      },
      maxWidth: {
        app: "430px",
      },
    },
  },
  plugins: [],
};

export default config;
