import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Cairo } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { prisma } from "@/lib/db";
import { LanguageProvider } from "@/components/LanguageContext";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Aura - Strategic Business Solutions",
  description: "We Diagnose Bottlenecks and Drive Enterprise Growth.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ecosystemData = await prisma.suite.findMany({
    include: {
      products: true,
    },
  });

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${cairo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="font-body bg-void text-platinum antialiased min-h-screen flex flex-col transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LanguageProvider initialEcosystem={ecosystemData as any}>
            <Navbar />
            <div className="flex-1 flex flex-col">
              {children}
            </div>
            <ExitIntentPopup />
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
