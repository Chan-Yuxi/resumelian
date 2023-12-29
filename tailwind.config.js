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
    },
  },
  plugins: [],
  // resolve conflicts with Antd
  corePlugins: {
    preflight: false,
  },
};
