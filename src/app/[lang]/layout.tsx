import Providers from "../providers";
import "@rainbow-me/rainbowkit/styles.css";
import "./../../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.boudica.emancipa.xyz"),
  title: "Boudica",
  description:
    "We will not be banned. Todos los géneros, todos los amores, todas las vidas, no seremos prohibidos. Women will not stay banned. زن زندگی آزادی",
  twitter: {
    card: "summary_large_image",
    site: "@emmajane1313",
    title: "Boudica",
    description:
      "We will not be banned. Todos los géneros, todos los amores, todas las vidas, no seremos prohibidos. Women will not stay banned. زن زندگی آزادی",
    images: [
      "https://thedial.infura-ipfs.io/ipfs/QmYte34KVQnhzCxjkjssobFDdWuRJURXCpM9xSrru3KjRk",
    ],
  },
  robots: {
    googleBot: {
      index: true,
      follow: true,
    },
  },
  keywords:
    "Web3, Web3 Fashion, Moda Web3, Open Source, CC0, Emma-Jane MacKinnon-Lee, Open Source LLMs, DIGITALAX, F3Manifesto, www.digitalax.xyz, www.f3manifesto.xyz, Women, Life, Freedom.",
  openGraph: {
    title: "Boudica",
    description:
      "We will not be banned. Todos los géneros, todos los amores, todas las vidas, no seremos prohibidos. Women will not stay banned. زن زندگی آزادی",
    images:
      "https://thedial.infura-ipfs.io/ipfs/QmYte34KVQnhzCxjkjssobFDdWuRJURXCpM9xSrru3KjRk",
  },
};

export async function generateStaticParams() {
  return [
    { lang: "en" },
    { lang: "es" },
    { lang: "ar" },
    { lang: "he" },
    { lang: "uk" },
    { lang: "fa" },
    { lang: "pt" },
    { lang: "fr" },
    { lang: "yi" },
    { lang: "ja" },
    { lang: "ym" },
    { lang: "hu" },
    { lang: "tu" },
  ];
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
