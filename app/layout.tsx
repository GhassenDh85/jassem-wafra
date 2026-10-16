import type { Metadata, Viewport } from 'next';
import { Cairo, Fraunces, Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' });
const cairo = Cairo({ subsets: ['arabic', 'latin'], variable: '--font-cairo', display: 'swap' });

export const metadata: Metadata = {
  title: 'WAFRA | Commerce pour l’industrie',
  description:
    "WAFRA — des solutions fiables pour l'approvisionnement, le commerce industriel et l'exportation.",
  metadataBase: new URL('https://www.wafra.tn'),
  openGraph: {
    title: 'WAFRA | Commerce pour l’industrie',
    description:
      "WAFRA — des solutions fiables pour l'approvisionnement, le commerce industriel et l'exportation.",
    type: 'website',
    locale: 'fr_FR',
  },
};

export const viewport: Viewport = {
  themeColor: '#063F2C',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable} ${cairo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
