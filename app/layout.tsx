import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { JetBrains_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { Nav } from '@/components/shared/Nav';
import './globals.css';

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'GTM Match — Technical GTM Skill Assessment',
  description:
    'Skill gap assessment for marketers transitioning into DevRel, Developer Marketing, and Technical PMM.',
  openGraph: {
    title: 'GTM Match',
    description: 'Are you ready for a technical GTM role?',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${jetbrains.variable} min-h-screen font-sans antialiased`}
        style={
          {
            '--font-sans': GeistSans.style.fontFamily,
            '--font-mono': jetbrains.style.fontFamily,
          } as React.CSSProperties
        }
      >
        <Nav />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
