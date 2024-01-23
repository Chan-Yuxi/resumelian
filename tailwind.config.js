/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        a4: "210 / 297", // almost in proportion to A4 paper
      },
      height: {
        "reach-bottom": "calc(100vh - 64px)",
      },
      minHeight: {
        "reach-bottom": "calc(100vh - 64px)",
      },
      animation: {
        slideIn: "slide 0.5s ease-in-out",
        fadeIn: "fade 0.2s linear",
      },
      keyframes: {
        slide: {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        fade: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
  // resolve conflicts with Antd
  corePlugins: {
    preflight: false,
  },
};
