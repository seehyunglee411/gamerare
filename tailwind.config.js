/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#fe5502",
          dark: "#d84600",
          soft: "#fff0e8",
        },
        ink: "#111827",
        muted: "#6b7280",
        line: "#e5e7eb",
        surface: "#ffffff",
        soft: "#f7f7f8",
        pageBg: "#f5f7fb",
        info: "#2563eb",
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 16px 40px rgba(15, 23, 42, 0.06)",
        cardLg: "0 16px 40px rgba(15, 23, 42, 0.08)",
        primary: "0 12px 28px rgba(254, 85, 2, 0.16)",
        primarySm: "0 6px 14px rgba(254, 85, 2, 0.24)",
      },
      borderRadius: {
        card: "20px",
        cardLg: "22px",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};
