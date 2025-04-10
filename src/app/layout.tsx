import type { Metadata } from "next";
import SessionProviderWrapper from "../components/providers/SessionProviderWrapper"; // Import the Session Provider
import ReactQueryProvider from "../components/providers/ReactQueryProvider"; // Import the React Query Provider
import "./globals.css";
import Navbar from "@/components/Navbar";
import Container from "@/components/ui/Container";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/ui/Footer";
import { SearchNavBar } from "@/components/SearchNavBar";
import CompareProviderWrapper from "@/components/providers/CompareProvider";
import { CompareBar } from "@/components/ui/comparebar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"  suppressHydrationWarning>
      <body>
        <SessionProviderWrapper>
          <CompareProviderWrapper>
          <ReactQueryProvider>
            <SearchNavBar/>
            
            <Container>
              {children}
              <Toaster />
            </Container>
            <CompareBar/>
            {/* <Footer/> */}
          </ReactQueryProvider>
          </CompareProviderWrapper>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
