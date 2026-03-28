import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ORIN - Smart Hospitality Stack",
  description: "A pixel-perfect clone of the ORIN smart hospitality platform, featuring guest experience, hardware setup, and staff dashboard views.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
