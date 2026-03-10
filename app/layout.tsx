import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from "./components/Navbar"; // 👈 Import it here
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Civic Bharat",
  description: "Citizen Grievance Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          
          {/* 1. Navbar goes here to show on every page */}
          {/* <Navbar /> */}
          
          {/* 2. The main page content flows below it */}
          <main>
             {children}
             <Footer />

             
          </main>
          
        </body>
      </html>
    </ClerkProvider>
  );
}