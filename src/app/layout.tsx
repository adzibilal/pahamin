import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Oswald, Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Pahamin - AI Study Buddy",
  description: "Aplikasi web edukatif berbasis AI untuk membantu memahami materi pelajaran dengan lebih mudah dan interaktif",
  keywords: "AI, education, learning, study buddy, pahamin, indonesia",
  authors: [{ name: "Adzi Bilal" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="id">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} ${inter.variable} antialiased`}
          suppressHydrationWarning={true}
        >
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
