import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gotas ECBR - Ranking e Prêmios WEB3 ARENA | Ganhe Ledger Stax, Flex e OneKey",
  description: "Participe do sistema de gamificação do WEB3 ARENA. Colete gotas em palestras e concorra a prêmios: Ledger Stax (R$ 5.124), Ledger Flex (R$ 3.334), FuseLabs (R$ 3.000) e OneKey Classic. Ranking em tempo real.",
  keywords: "WEB3 ARENA, gotas, ranking, prêmios, Ledger Stax, Ledger Flex, OneKey, FuseLabs, gamificação, blockchain, criptomoedas, hardware wallet",
  authors: [{ name: "WEB3 ARENA" }],
  creator: "WEB3 ARENA",
  publisher: "WEB3 ARENA",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Gotas ECBR - Ranking e Prêmios WEB3 ARENA",
    description: "Colete gotas, suba no ranking e ganhe hardware wallets premium. Prêmios de até R$ 5.124,28!",
    url: "https://gotas-ecbr.vercel.app",
    siteName: "Gotas ECBR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gotas ECBR - Sistema de Ranking WEB3 ARENA",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gotas ECBR - Ranking WEB3 ARENA",
    description: "Participe e ganhe hardware wallets premium!",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://gotas-ecbr.vercel.app",
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
