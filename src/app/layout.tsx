import type { Metadata } from "next";
import ThemeProvider from "../features/theme-provider";
import HeadPage from "./head-page";
import LoaderProvider from "../features/loader-provider";

export const metadata: Metadata = {
  title: "Star Wars",
  description: "Search for Star Wars person or character",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <ThemeProvider>
          <LoaderProvider>
            <HeadPage>{children}</HeadPage>
          </LoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
