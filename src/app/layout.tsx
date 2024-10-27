import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import localFont from "next/font/local";
import CssBaseline from "@mui/material/CssBaseline";
import "@/styles/global.css";
import AppProviders from "@/providers/AppProviders";

const imbVga = localFont({
  src: "./fonts/IBM_VGA.woff",
  variable: "--font-ibm-vga",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Pokemon card",
  description: "Create your pokemon app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={imbVga.variable}>
        <AppRouterCacheProvider>
          <AppProviders>
            <CssBaseline />
            {children}/
          </AppProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
