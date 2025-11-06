import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moonbeam | Stream better",
  description:
    "Discover music, playlists, and albums powered by free Deezer charts, wrapped in a Spotify-inspired experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen bg-black/70 text-white antialiased`}
      >
        <Sidebar />
        <div className="relative flex min-h-screen flex-1 flex-col">
          <main className="flex-1 overflow-y-auto px-5 pb-24 pt-6 sm:px-8 lg:px-12 lg:pb-10">
            {children}
          </main>
          <MobileNav />
        </div>
      </body>
    </html>
  );
}
