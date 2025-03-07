import { Metadata, Viewport } from 'next';
// import Head from 'next/head';  // Importar o componente Head do Next.js
import Layout from '@/lib/layout';
import { fontSans } from '@/lib/styles/fonts';
import { cn } from '@/lib/styles/utils';
import '@/lib/styles/globals.css';

const APP_NAME = 'nextarter-tailwind';

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Next.js + TailwindCSS v3 + TypeScript template',
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    url: 'https://nextarter-tailwind.sznm.dev',
    title: 'nextarter-tailwind',
    description: 'Next.js + TailwindCSS v3 + TypeScript template',
    images: {
      url: 'https://og-image.sznm.dev/**nextarter-tailwind**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250',
      alt: 'nextarter-tailwind.sznm.dev og-image',
    },
  },
  twitter: {
    creator: '@agstnsnathaniel',
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Adicionar a chave API do ArcGIS diretamente */}
        {/* <script src="https://js.arcgis.com/4.24/?apikey=AAPTxy8BH1VEsoebNVZXo8HurF6Gi5n_rauMuGZ_nfRTcScuUOx-7qWr8679vu9Fs9pyWFk0kS3bqJ1mxcOXJLJfM9aoVS0j0QJ6LdoRz4LlpZgw91ACKW1XpErsWydCpjxNkil5OsPdHs3nqxo0RSvbd65UaVBZwTOReluZPx_4ccI0CrNAaYTiyLdc2iOzYrIF9xXJysjNtl3qZGT-fLJ1a5k354We5-mTCKyHTMtcbww.AT1_kpz6whSJ" /> */}
      </head>
      <body
        className={cn(
          'min-h-screen w-full bg-black font-sans antialiased',
          fontSans.variable
        )}
      >
        <Layout>
          <div className="w-full flex-1">{children}</div>
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;
