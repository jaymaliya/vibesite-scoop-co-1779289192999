/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffb59d",
        secondary: "#7bdb85",
        accent: "#59d5fb",
        surface: "#201f1f",
        bg: "#131313",
        muted: "#e1bfb5",
        text: "#e5e2e1",
      },
      fontFamily: {
        heading: ["Bebas Neue", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        brand: "16px",
      },
      boxShadow: {
        brand: "none",
        card: "0 1px 3px rgba(0,0,0,0.07), 0 8px 24px rgba(0,0,0,0.04)",
        hover: "0 4px 12px rgba(0,0,0,0.10), 0 20px 48px rgba(0,0,0,0.08)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(to bottom, rgba(10,10,10,0.4), rgba(10,10,10,0.9))",
      },
      animation: {
        "page-fade": "pageFade 0.4s ease",
        "slide-in-right": "slideInRight 0.35s cubic-bezier(0.4,0,0.2,1) both",
        shimmer: "shimmer 1.5s infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
      },
      keyframes: {
        pageFade: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(60px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};