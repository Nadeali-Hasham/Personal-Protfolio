import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Nade Ali Hasham | Full-Stack Developer",
  description:
    "Portfolio of Nade Ali Hasham, a Full-Stack Developer in Lahore specializing in ASP.NET Core, React.js, Next.js, TypeScript, and SQL Server.",
  keywords: [
    "Nade Ali Hasham",
    "Full-Stack Developer",
    "ASP.NET Core",
    "React.js",
    "Next.js",
    "TypeScript",
    "SQL Server",
    "Lahore Developer"
  ],
  authors: [{ name: "Nade Ali Hasham" }],
  creator: "Nade Ali Hasham",
  openGraph: {
    title: "Nade Ali Hasham | Full-Stack Developer",
    description:
      "Modern full-stack portfolio showcasing ASP.NET Core, React, Next.js, TypeScript, SQL Server, and production web projects.",
    url: "https://nade-portfolio.vercel.app",
    siteName: "Nade Ali Hasham Portfolio",
    locale: "en_PK",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111827"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
