import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      // Color/font tokens for the "Portfolio Blog" design (imported from
      // Claude Design). Defined here — rather than as plain JS constants in
      // src/ — because Panda's static css() extraction only understands
      // literal values and its own token references; a value pulled in from
      // an imported JS module is invisible to it and silently emits no CSS.
      tokens: {
        colors: {
          portfolioBg: { value: "#0a0021" },
          portfolioText: { value: "#f5f2fb" },
          portfolioAccent: { value: "#b478ff" },
          portfolioAccentHover: { value: "#d1a8ff" },
          portfolioAccent2: { value: "#c084fc" },
          portfolioMuted: { value: "#a89fc2" },
          portfolioMutedDark: { value: "#8a7fb0" },
          portfolioBody: { value: "#b7aed4" },
          portfolioBodyAlt: { value: "#c3bcdc" },
          portfolioCard: { value: "#150a35" },
          portfolioBorder: { value: "rgba(180,120,255,.28)" },
          portfolioHeaderBg: { value: "rgba(10,0,33,.92)" },
          portfolioHeaderBorder: { value: "rgba(180,120,255,.15)" },
          portfolioPillBg: { value: "rgba(180,120,255,.1)" },
          portfolioPillBorder: { value: "rgba(180,120,255,.25)" },
          portfolioFooterText: { value: "#786e9e" },
          portfolioFooterBorder: { value: "rgba(180,120,255,.12)" },
        },
        fonts: {
          portfolioSerif: { value: "var(--font-newsreader), 'Noto Serif JP', serif" },
          portfolioSans: { value: "var(--font-public-sans), 'Hiragino Kaku Gothic ProN', sans-serif" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
