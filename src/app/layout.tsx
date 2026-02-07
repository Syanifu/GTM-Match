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
  title: "GTM Match - B2B SaaS Go-to-Market Solutions",
  description: "The community for B2B SaaS growth teams. Share go-to-market challenges, get battle-tested playbooks from operators who've scaled ARR.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
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
