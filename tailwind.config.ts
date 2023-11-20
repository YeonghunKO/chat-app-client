import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "chat-background": "url('/chat-bg.png')",
      },
      animation: {
        "fade-in-bottom": "fade-in-bottom 500ms ease-in-out ",
        "contact-slide-left": "contact-slide-left 500ms ease-in-out forwards",
        "contact-slide-right": "contact-slide-right 500ms ease-in-out forwards",
        "fade-out-bottom": "fade-out-bottom 500ms ease-in-out forwards",
        "shake-bottom": "shake-bottom 1000ms infinite ease-in-out",
        spinning: "spinning 2s infinite",
      },
      keyframes: {
        "fade-in-bottom": {
          "0%": {
            transform: "translateY(100px)",
          },
          "100%": {
            transform: "translateY(0px)",
            opacity: "1",
          },
        },
        "contact-slide-left": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
        "contact-slide-right": {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        "fade-out-bottom": {
          "0%": {
            transform: "translateY(0px)",
          },
          "100%": {
            transform: "translateY(100px)",
            opacity: "1",
          },
        },

        "shake-bottom": {
          "0%,100%": {
            transform: "translateY(0)",
          },
          "10%,30%,50%,70%": {
            transform: "translateY(-6px)",
          },
          "20%,40%,60%": {
            transform: "translateY(6px)",
          },
          "80%": {
            transform: "translateY(4.4px)",
          },
          "90%": {
            transform: "translateY(-4.4px)",
          },
        },
        spinning: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(720deg)",
          },
        },
      },
      colors: {
        secondary: "#8696a0",
        "teal-light": "#7ae3c3",
        "photopicker-overlay-background": "rgba(30,42,49,0.8)",
        "dropdown-background": "#233138",
        "dropdown-background-hover": "#182229",
        "input-background": " #2a3942",
        "primary-strong": "#e9edef",
        "panel-header-background": "#202c33",
        "panel-header-icon": "#aebac1",
        "icon-lighter": "#8696a0",
        "icon-green": "#00a884",
        "search-input-container-background": "#111b21",
        "conversation-border": "rgba(134,150,160,0.15)",
        "conversation-panel-background": "#0b141a",
        "background-default-hover": "#202c33",
        "incoming-background": "#202c33",
        "outgoing-background": "#005c4b",
        "bubble-meta": "hsla(0,0%,100%,0.6)",
        "icon-ack": "#53bdeb",
      },
      gridTemplateColumns: {
        main: "1fr 3fr",
      },
    },
  },
  plugins: [],
};
export default config;
