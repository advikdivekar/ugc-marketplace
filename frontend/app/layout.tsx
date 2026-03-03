import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SupportChat from "@/components/SupportChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clario — UGC Script Marketplace",
  description:
    "Connect brands with elite UGC script writers. Get viral scripts faster with Clario's AI-powered marketplace.",
  keywords: ["UGC", "script marketplace", "content creation", "brand marketing", "viral scripts"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <CustomCursor />
          <SupportChat />
          <div className="noise-bg" aria-hidden="true" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
