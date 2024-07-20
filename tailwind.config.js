/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      baseColor: "#4B5563",
      primary: "#2e83b4",
      bgPrimary: "#eaf3f8",
      navy: "#005F8F",
      warning: "#FACC15",
      secondary: "#f39518",
      white: "#FFFFFF",
      black: "#000000",
      gray: "#808080",
      red: "#FF0000",
      purple: "#A020F0",
      green: "#2DABA0",
      darkGreen: "#166534",
      success: "#4ADE80",
      danger: "#EF4444",
      indigo: "#E0E7FF",
      amber: "#FEF3C7",
    },
    fontSize: {
      sm: [
        "12px",
        {
          lineHeight: "16px",
        },
      ],
      base: [
        "14px",
        {
          lineHeight: "17.5px",
        },
      ],
      lg: [
        "20px",
        {
          lineHeight: "28px",
        },
      ],
      xl: [
        "24px",
        {
          lineHeight: "32px",
        },
      ],
      "2xl": [
        "28px",
        {
          lineHeight: "36px",
        },
      ],
    },
  },
  plugins: [],
};
