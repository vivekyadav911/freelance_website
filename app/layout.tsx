import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/siteConfig";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: SITE.title,
  description: "CSE3CWA Assignment 1 - HTML Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Header />

        {/* Main content */}
        <main style={{ flex: 1, padding: "20px", overflow: "auto" }}>
          {children}
        </main>

        {/* Footer always at bottom */}
        <Footer />
      </body>
    </html>
  );
}