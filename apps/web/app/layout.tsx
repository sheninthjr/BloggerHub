import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "./lib/ApolloWrapper";
import RecoidContextProvider from "./lib/recoilContextProvider";
import NavBar from "@/components/NavBar";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BloggerHub",
  description: "Created by Sheninth Jr",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession()
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <RecoidContextProvider>
            <ApolloWrapper>
              <NavBar />
              {children}
            </ApolloWrapper>
          </RecoidContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
