import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import { AntdRegistry } from '@ant-design/nextjs-registry';
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from 'react-hot-toast';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import ClientLoader from '@/components/ClientLoader';
import { Providers } from './providers';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Almost Free IMEI Checker and Unlocker",
  description: "Ogabassey Never Disappoints",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FAFAFA]`}
      >
        <Toaster position="top-right" />
        <Providers>
          <CurrencyProvider>
            <AuthProvider>
              <ClientLoader>
                {children}
              </ClientLoader>
            </AuthProvider>
          </CurrencyProvider>
        </Providers>
      </body>
    </html>
  );
}
