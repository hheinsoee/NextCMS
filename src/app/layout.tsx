import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import app from "@config";
import { Suspense } from "react";
import Loading  from "@components/Loading";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: app.title,
  description: app.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
