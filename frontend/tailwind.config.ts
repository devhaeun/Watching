/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // 기존 styled-components의 &:before 로직 (왼쪽 그라데이션)
        "backdrop-side":
          "linear-gradient(90deg, #000 5%, #000000b3 30%, #00000073 50%, #0003 80%, #0000 100%)",
        // 기존 styled-components의 &:after 로직 (하단 그라데이션)
        "backdrop-bottom":
          "linear-gradient(#0000 0%, #00000073 30%, #000c 55%, #000000e6 68%, #000 86%)",
      },
    },
  },
  plugins: [],
};
