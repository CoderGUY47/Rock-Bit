import type { AppProps } from 'next/app';
import '@/app/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/layout/Navbar';
import { Footer } from '@/layout/Footer';
import { ChatAssistant } from '@/shared/ChatAssistant';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div className="min-h-full flex flex-col font-sans bg-white dark:bg-[#0c0c0e] transition-colors duration-200">
        <Navbar />
        <main className="grow">
          <Component {...pageProps} />
        </main>
        <Footer />
        <ChatAssistant />
      </div>
    </ThemeProvider>
  );
}
