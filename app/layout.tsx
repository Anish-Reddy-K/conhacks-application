import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ConHacks 2026 Registration",
  description: "Register for ConHacks 2026 - Conestoga College Hackathon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full">
        {children}
      </body>
    </html>
  );
}
