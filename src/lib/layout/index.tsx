import type { ReactNode } from 'react';

import { ThemeProvider } from '@/lib/components/theme-provider';

// import { Footer } from './components/footer';
// import { Header } from './components/header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen w-full flex-col">
        <main className="wrapper">{children}</main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
