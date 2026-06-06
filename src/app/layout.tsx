import type { Metadata } from "next";
import { Noto_Sans_Kannada, Plus_Jakarta_Sans, Baloo_Tamma_2, Geist } from "next/font/google";
import "./globals.css";
import { LocalBusinessSchema } from "./components/seo/LocalBusinessSchema";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const kannada = Noto_Sans_Kannada({
  subsets: ["kannada"],
  variable: "--font-kannada",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const baloo = Baloo_Tamma_2({
  subsets: ["kannada", "latin"],
  variable: "--font-baloo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sri Veena Vani Sangeetha Vidyalaya | Chaitra Dambal",
  description: "Premier Music Academy in Muddebihal. Learn Classical, Light Music, and Instruments from Vidvath Chaitra Dambal.",
  keywords: ["Music Classes Muddebihal", "Classical Music", "Vocal Training", "Chaitra Dambal", "Veena Vani Sangeetha Vidyalaya"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "scroll-smooth", kannada.variable, jakarta.variable, baloo.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-surface text-foreground font-jakarta">
        <LocalBusinessSchema />
        {children}
      </body>
    </html>
  );
}
