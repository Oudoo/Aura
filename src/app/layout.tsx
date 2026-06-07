import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Cairo } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { prisma } from "@/lib/db";
import { LanguageProvider } from "@/components/LanguageContext";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { ecosystem as fallbackEcosystem } from "@/data/ecosystem";
import type { EcosystemSuite } from "@/lib/types";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aura.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aura — Strategic Business Solutions",
    template: "%s | Aura",
  },
  description:
    "Aura diagnoses operational bottlenecks and drives enterprise growth with a unified suite of AI-powered business systems.",
  keywords: [
    "enterprise software",
    "ERP",
    "CRM",
    "business automation",
    "AI transformation",
    "digital transformation",
  ],
  applicationName: "Aura",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Aura",
    title: "Aura — Strategic Business Solutions",
    description: "We diagnose bottlenecks and drive enterprise growth.",
    url: siteUrl,
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Aura" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura — Strategic Business Solutions",
    description: "We diagnose bottlenecks and drive enterprise growth.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The navbar mega-menu needs the ecosystem, but a DB hiccup must never take
  // down the entire site (this layout wraps every page, including static ones).
  // Fall back to the bundled ecosystem data so navigation still renders.
  let ecosystemData: EcosystemSuite[] = fallbackEcosystem;
  try {
    ecosystemData = await prisma.suite.findMany({
      include: {
        products: true,
      },
    });
  } catch (e) {
    console.error("Layout: failed to load ecosystem from DB, using static fallback:", e);
  }

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${cairo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="font-body bg-void text-platinum antialiased min-h-screen flex flex-col transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <LanguageProvider initialEcosystem={ecosystemData}>
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
