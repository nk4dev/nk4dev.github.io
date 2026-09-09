import { Newsreader, Public_Sans } from "next/font/google";

// Serif display font used for headings / kickers in the "Portfolio Blog" design.
export const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  variable: "--font-newsreader",
  display: "swap",
});

// Sans-serif body/UI font used for nav, chips and body copy.
export const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-public-sans",
  display: "swap",
});
