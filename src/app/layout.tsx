'use client'
import ThemeProvider from "@/providers/ThemeProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { CssBaseline, styled } from "@mui/material";


const motserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "800"],
  variable: "--montserrat",
});

const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  
  // const Body = styled('body') (
  //   ({ theme }) => `
  //   background-color: ${theme.palette.primary.dark}
  //   `
  // )
  
  return (
    <ThemeProvider>
      <CssBaseline enableColorScheme />
      <html lang="en">
        <body className={motserrat.className}>{children}</body>
      </html>
    </ThemeProvider>
  );
}
