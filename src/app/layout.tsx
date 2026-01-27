import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SkipNav } from "@/components/shared/skip-nav";
import { Toaster } from "sonner";
import { AuthInitializer } from "@/components/providers/auth-initializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GTM Match - Solve Your GTM Problems",
  description: "A community marketplace where growth teams share challenges with metrics and get battle-tested solutions with proof.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthInitializer />
        <SkipNav />
        <Navbar />
        <main id="main-content" className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
