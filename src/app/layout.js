import { Montserrat, Open_Sans, Alex_Brush } from 'next/font/google';
import './globals.css';
import { siteConfig } from '../data/site';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const alexBrush = Alex_Brush({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://clipskinetics.com'),
  title: `${siteConfig.name} | ${siteConfig.tagline} | ${siteConfig.brandName}`,
  description: `Portfolio of ${siteConfig.name} (${siteConfig.brandName}), freelance video editor based in ${siteConfig.location}. Specialising in high-retention short-form reels, YouTube long-form, and cinematic storytelling.`,
  keywords: [
    'Sohom Paul',
    'Clips Kinetics',
    'Video Editor',
    'Freelance Video Editor',
    'Asansol Video Editor',
    'Reels Editor',
    'YouTube Video Editor',
    'Cinematic Colour Grading',
    'Motion Graphics'
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://clipskinetics.com',
    siteName: siteConfig.brandName,
    title: `${siteConfig.name} | Freelancer Video Editor`,
    description: `High-retention video editing for creators and brands. Based in ${siteConfig.location}.`,
    images: [
      {
        url: '/images/sohom-paul.jpg',
        width: 640,
        height: 640,
        alt: `${siteConfig.name} - ${siteConfig.brandName}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | ${siteConfig.brandName}`,
    description: `Freelancer Video Editor with 3+ years experience and 80+ clients.`,
    images: ['/images/sohom-paul.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: '#0B0B10',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable} ${alexBrush.variable}`}
    >
      <body className="bg-bg-base text-text-primary min-h-screen flex flex-col antialiased selection:bg-accent selection:text-bg-base font-body">
        {children}
      </body>
    </html>
  );
}
