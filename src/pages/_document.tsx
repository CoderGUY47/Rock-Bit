import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="h-full antialiased">
      <Head />
      <body className="min-h-full font-sans bg-white dark:bg-[#0c0c0e] text-gray-900 dark:text-white transition-colors duration-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
