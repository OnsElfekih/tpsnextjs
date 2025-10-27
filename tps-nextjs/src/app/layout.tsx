"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const links = [
  { name: "Accueil", href: "/" },
  { name: "À propos", href: "/about" },
  { name: "Nos Produits", href: "/products" },
  { name: "Contact", href: "/contact" },
] as const;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/login" || pathname === "/register";

  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {!hideNavbar && <Navbar links={links} />}
        {children}
      </body>
    </html>
  );
}
