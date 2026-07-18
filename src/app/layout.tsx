import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { ChatAssistant } from "@/shared/ChatAssistant";

export const metadata: Metadata = {
  title: "Rock-Bit — Trade & Exchange Cryptocurrency",
  description:
    "Next-generation secure cryptocurrency trading platform and portfolio manager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans bg-white dark:bg-[#0c0c0e] transition-colors duration-200">
        <ThemeProvider>
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
          <ChatAssistant />
        </ThemeProvider>
      </body>
    </html>
  );
}
