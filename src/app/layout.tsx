/* eslint-disable @next/next/no-sync-scripts */
import { Metadata, Viewport } from 'next';
import Head from 'next/head'; // Importar o componente Head do Next.js
import Layout from '@/lib/layout';
import { fontSans } from '@/lib/styles/fonts';
import { cn } from '@/lib/styles/utils';
import '@/lib/styles/globals.css';

const APP_NAME = 'Vuscan';

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'algorítimo de calculo de vunerabilidade costeiras',
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
    url: '',
    title: 'Vuscan',
    description: '',
    images: {
      url: 'https://og-image.sznm.dev/**nextarter-tailwind**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250',
      alt: 'nextarter-tailwind.sznm.dev og-image',
    },
  },
  twitter: {
    creator: '@jvittor',
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
        <Head>
          <script src="https://js.arcgis.com/4.31/"></script>{' '}
          {/* Adicionando o script do ArcGIS */}
        </Head>
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
