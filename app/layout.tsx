import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ConvexWithClerkClientProvider } from "@/components/providers/ConvexProviderWithClerk";
import {Toaster} from "sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ai.Notion",
  description: "The connected workspace where better faster work happens",
  icons : {
    icon : [
      {
        media : "(prefers-color-scheme : light)",
        url : "/logo.svg",
        href : "/logo.svg"
      },
      {
        media : "(prefers-color-scheme : dark)",
        url : "/logo.svg",
        href : "/logo.svg"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ConvexWithClerkClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
          >
            {children}

            <Toaster position={"bottom-right"} />
          </ThemeProvider>
        </ConvexWithClerkClientProvider>
      </body>
    </html>
  );
}
