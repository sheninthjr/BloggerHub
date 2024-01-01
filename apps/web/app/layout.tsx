import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "./lib/ApolloWrapper";
import RecoidContextProvider from "./lib/recoilContextProvider";
import NavBar from "@/components/NavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/authOptions";
import SideBar from "@/components/SideBar";

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
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>
          <RecoidContextProvider>
            <ApolloWrapper>
              <NavBar />
              <SideBar/>
              {children}
            </ApolloWrapper>
          </RecoidContextProvider>
      </body>
    </html>
  );
}
