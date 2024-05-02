import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        "calc-header": "calc(100vh - 95px)",
      },
      backgroundColor: {
        default: "#F7F6F5",
        muted: "#F0EDEB",
        secondary: "#D9D2CE",
        teriary: "#575452",
      },
      borderColor: {
        default: "#F7F6F5",
        muted: "#F0EDEB",
        secondary: "#D9D2CE",
        teriary: "#575452",
      },
      textColor: {
        title: "#2B2A29",
        default: "#575452",
        sub: "#827E7B",
        muted: "#D9D2CE",
        accent: "#FFFFFF",
      },
      dropShadow: {
        s: "0 2px 4px rgba(224, 219, 215, 1)",
        m: "0 4px 8px rgba(224, 219, 215, 1)",
        lg: "0 8px 16px rgba(224, 219, 215, 1)",
        xl: "0 16px 24px rgba(224, 219, 215, 1)",
      },
      colors: {
        "primary-brown": "#D9D2CE",
        "primary-red": "#E65656",
        "btn-default": "#E65656",
        "btn-hover": "#EB7777",
        "icon-default": "#827E7B",
        "icon-unselect": "#ADA8A4",
        "icon-selected": "#575452",
        error: {
          100: "#F9D3D3",
          200: "#F4A7A7",
          300: "#EE7B7B",
          400: "#E94F4F",
          500: "#E32323",
          600: "#B61C1C",
          700: "#881515",
          800: "#5B0E0E",
          900: "#2D0707",
        },
        "custom-red": {
          100: "#FADDDD",
          200: "#F5BBBB",
          300: "#F09999",
          400: "#EB7777",
          500: "#E65656",
          600: "#B84444",
          700: "#8A3333",
          800: "#5C2222",
          900: "#2E1111",
        },
        brown: {
          100: "#F7F6F5",
          200: "#F0EDEB",
          300: "#E8E4E1",
          400: "#E0DBD7",
          500: "#D9D2CE",
          600: "#ADA8A4",
          700: "#827E7B",
          800: "#575452",
          900: "#2B2A29",
        },
      },
    },
  },
  plugins: [],
};
export default config;
