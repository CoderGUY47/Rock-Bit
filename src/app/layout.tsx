import type { Metadata } from 'next';
import '@/app/globals.css';
import { ThemeProvider } from '@/components/themeProvider';
import { DashboardShell } from '@/components/dashboardShell';
import { UserShell } from '@/components/userShell';
import { AppToastContainer } from '@/components/toastProvider';

export const metadata: Metadata = {
  title: 'Rock-Bit Crypto Exchange',
  description: 'Next-generation crypto portfolio tracking and exchange ecosystem.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-[#0c0c0e] text-gray-900 dark:text-white antialiased transition-colors duration-200">
        <ThemeProvider>
          <div className="min-h-full flex flex-col font-sans bg-white dark:bg-[#0c0c0e] transition-colors duration-200">
            <AppToastContainer />
            {/* Admin routes get sidebar + header shell */}
            <DashboardShell>
              {/* User/customer routes get Navbar + Footer shell */}
              <UserShell>
                {children}
              </UserShell>
            </DashboardShell>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
