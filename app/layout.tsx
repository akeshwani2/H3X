'use client';
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PrivyProvider } from '@privy-io/react-auth';
import NavBar from "@/components/NavBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <PrivyProvider
            appId="cm2ywlbq1005fq23pxj63x26n"
            config={{
              appearance: {
                theme: 'dark',
                accentColor: '#676FFF',
                logo: 'https://github.com/akeshwani2/test/blob/main/test%20(1).png?raw=true',
              },
              embeddedWallets: {
                createOnLogin: 'users-without-wallets',
              },
            }}
          >
            <NavBar />
            {children}
          </PrivyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}