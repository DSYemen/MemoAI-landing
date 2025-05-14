import type {Metadata} from 'next';
import { Cairo } from 'next/font/google'; // Updated import
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

// Updated font setup for Cairo
const cairoFont = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'], // Added Arabic subset
  display: 'swap', // Ensures text is visible while font loads
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
      {/* Updated body className to use Cairo font variable */}
      <body className={`${cairoFont.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
