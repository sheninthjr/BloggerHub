import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "./lib/ApolloWrapper";
import RecoidContextProvider from "./lib/recoilContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BloggerHub",
  description: "Created by Sheninth Jr",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>
        <RecoidContextProvider>
          <ApolloWrapper>{children}</ApolloWrapper>
        </RecoidContextProvider>
      </body>
    </html>
  );
}
