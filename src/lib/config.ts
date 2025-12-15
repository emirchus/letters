import { Lexend as Font, Outfit as FontHeading, Source_Code_Pro as FontMono } from 'next/font/google';

export const fontHeading = FontHeading({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
});

export const fontBody = Font({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const siteConfig = {
  name: 'Letters',
  url: 'https://saltos.bana.emirchus.ar',
  ogImage: 'https://saltos.bana.emirchus.ar/og.png',
  description:
    'Los Saltos de Bana es una empresa familiar dedicada a la producción de miel de abeja y productos relacionados. Fundada en 2015, hemos cultivado una reputación sólida por la calidad de nuestros productos y nuestro compromiso con la excelencia.',
  links: {
    twitter: 'https://twitter.com/emirchus',
    github: 'https://github.com/emirchus',
  },
};

export type SiteConfig = typeof siteConfig;
