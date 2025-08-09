import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import Navbar from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resume builder",
  description:
    "Effortlessly build and customize your resume with features like automatic parsing, translation, and resume generation from job descriptions.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased h-screen`}>
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navbar />
            <main>{children}</main>
            <footer className="py-4 not-last:border-t border-border">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex space-x-4">
                  <Link href="/privacy-policy">Privacy</Link>
                  <Link href="/terms-of-service">Terms</Link>
                  <Link href="/support">Feedback</Link>
                </div>
                <div className="">
                  <p className="text-sm text-muted-foreground text-center">
                    &copy; {new Date().getFullYear()} Adaptify
                  </p>
                </div>
              </div>
            </footer>
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
