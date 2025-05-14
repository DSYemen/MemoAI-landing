
import type {Metadata} from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const cairoFont = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'], 
  display: 'swap', 
});

export const metadata: Metadata = {
  title: 'MemoAI: Your Intelligent Knowledge Hub',
  description: 'Capture, connect, and create with the power of AI. Transform your notes into actionable insights.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cairoFont.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
