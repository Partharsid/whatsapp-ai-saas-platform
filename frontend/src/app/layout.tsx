import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

// Sohne substitute
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sohne",
  display: "swap",
});

// Signifier substitute
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-signifier",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Steep — AI WhatsApp Automation",
  description: "Turn every conversation into a conversion with intelligent, isolated WhatsApp automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="font-sohne text-ink bg-pure-white antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
