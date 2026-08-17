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
          blue: "var(--accent-blue)",
          yellow: "var(--accent-yellow)",
        },
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        card: "0 8px 25px rgba(15, 23, 42, 0.08)",
        toy: "0 4px 0 rgba(26, 26, 26, 0.08)",
      },
      maxWidth: {
        app: "430px",
        archive: "960px",
      },
    },
  },
  plugins: [],
};

export default config;
