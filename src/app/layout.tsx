import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "remixicon/fonts/remixicon.css";
import "./globals.css";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Asset Management System",
  description: "Track and manage company assets efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.className} h-full bg-[#F1F5F9]`}>
        <NextTopLoader color="#4d4ad0" showSpinner={false} />
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
