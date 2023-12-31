import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "./lib/ApolloWrapper";
import RecoidContextProvider from "./lib/recoilContextProvider";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import NextAuthProvider from "./lib/NextAuthProvider";
import Init from "@/components/Init";

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
  return (
    <html lang="en" className="bg-black">
      <body className={inter.className}>
        <RecoidContextProvider>
          <NextAuthProvider>
            <ApolloWrapper>
              <div className="fixed top-0 left-0 w-full z-20">
                <NavBar />
              </div>
              <Init />
              <SideBar>{children}</SideBar>
            </ApolloWrapper>
          </NextAuthProvider>
        </RecoidContextProvider>
      </body>
    </html>
  );
}
