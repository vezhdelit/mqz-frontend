import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "@/assets/css/tailwind.css";
import Providers from "@/providers";
import Surface from "@/components/ui/surface";
import { ErrorBoundary } from "@/components/error-boundary";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MQZ - Quiz Game Platform",
  description: "Interactive quiz game platform with real-time scoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0e0729] flex flex-col h-screen max-h-screen overflow-hidden`}
      >
        <ErrorBoundary>
          <Providers>
            <main className="containerize p-4 md:p-5 flex flex-1">
              <Surface className="flex flex-1 overflow-auto">
                {children}
              </Surface>
            </main>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
