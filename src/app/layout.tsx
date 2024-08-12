import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Container, PIXRFooter, PIXRHeader } from "./_containers";

const pretandard = localFont({
  src: "./_fonts/PretendardVariable.woff2",
  variable: "--font-pretandard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "People Interested In UXR",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretandard.className + " relative"}>
        <Container className="h-full bg-default flex flex-col w-full min-h-screen">
          <PIXRHeader />
          {children}
          <PIXRFooter />
        </Container>
      </body>
    </html>
  );
}
