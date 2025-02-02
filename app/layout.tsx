import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
  weight: ["300"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const poppins_extrabold = Poppins({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-poppins-extrabold",
});

const poppins_bold = Poppins({
  weight: ["500"],
  subsets: ["latin"],
  variable: "--font-poppins-bold",
});

export const metadata: Metadata = {
  title: "Nextjs Boilerplate",
  description:
    "actually ship(fast) - a simple to use boilerplate right out of the box with auth, payments and db functions all packed with in!",
  twitter: {
    card: "summary_large_image", // For a large Twitter card
    site: "https://boilerplate-nextjs-delta.vercel.app/",
    title: "actually ship(fast) - Nextjs Boilerplate",
    description:
      "actually ship(fast) - a simple to use boilerplate right out of the box with auth, payments and db functions all packed with in!",
    images: "/twitter-image.png", // Twitter image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:site"
          content="https://boilerplate-nextjs-delta.vercel.app/"
        />
        <meta
          name="twitter:title"
          content="actually ship(fast) - Nextjs Boilerplate"
        />
        <meta
          name="twitter:description"
          content="actually ship(fast) - a simple to use boilerplate right out of the box with auth, payments and db functions all packed with in!"
        />
        <meta name="twitter:image" content="/twitter-image.png" />
      </Head>
      <body
        className={`${poppins.variable} ${poppins_extrabold.variable} ${poppins_bold.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
