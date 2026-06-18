import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: "#f2f8f1",
          100: "#dfeedd",
          300: "#9cc693",
          500: "#3d7d45",
          700: "#19452b",
          900: "#10291d"
        },
        gold: {
          50: "#fff7df",
          100: "#f5df9b",
          400: "#c8972c",
          600: "#94620d"
        },
        clay: {
          50: "#fbf6ed",
          100: "#f2e5cf",
          300: "#b9956f",
          700: "#6a4934"
        },
        ink: "#121712",
        mist: "#eef3f0"
      },
      boxShadow: {
        soft: "0 16px 40px rgba(16, 41, 29, 0.10)",
        lift: "0 24px 70px rgba(16, 41, 29, 0.16)"
      },
      fontFamily: {
        display: ["Rubik", "Aptos Display", "Segoe UI", "sans-serif"],
        body: ["Nunito Sans", "Aptos", "Segoe UI", "sans-serif"]
      },
      keyframes: {
        revealUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        floatBottle: {
          "0%, 100%": { transform: "translateY(0) rotate(-1deg)" },
          "50%": { transform: "translateY(-10px) rotate(1deg)" }
        },
        slowSpin: {
          "0%": { transform: "rotateY(-18deg) rotateX(5deg)" },
          "100%": { transform: "rotateY(342deg) rotateX(5deg)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-220% 0" },
          "100%": { backgroundPosition: "220% 0" }
        }
      },
      animation: {
        reveal: "revealUp 520ms ease-out both",
        floatBottle: "floatBottle 6s ease-in-out infinite",
        slowSpin: "slowSpin 12s linear infinite",
        shimmer: "shimmer 4s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
