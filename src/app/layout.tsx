import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";

import { Providers } from "./providers";

import "./globals.css";

const roboto = Roboto_Flex({
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  title: "Список репозиториев",
  description: "Список репозиториев по выбранному языку",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={roboto.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
