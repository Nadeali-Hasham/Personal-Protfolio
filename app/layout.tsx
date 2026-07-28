import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getSiteUrl } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Nade Ali Hasham | Full-Stack Developer Portfolio",
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
    "Lahore Developer",
    "Portfolio"
  ],
  authors: [{ name: "Nade Ali Hasham" }],
  creator: "Nade Ali Hasham",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Nade Ali Hasham | Full-Stack Developer Portfolio",
    description:
      "Modern full-stack portfolio showcasing ASP.NET Core, React, Next.js, TypeScript, SQL Server, and production web projects.",
    url: siteUrl,
    siteName: "Nade Ali Hasham Portfolio",
    images: [
      {
        url: "/images/nade-ali-hasham.jpg",
        width: 720,
        height: 900,
        alt: "Nade Ali Hasham"
      }
    ],
    locale: "en_PK",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nade Ali Hasham | Full-Stack Developer Portfolio",
    description:
      "Full-stack developer portfolio focused on ASP.NET Core, React, Next.js, TypeScript, and SQL Server.",
    images: ["/images/nade-ali-hasham.jpg"]
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111827"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
