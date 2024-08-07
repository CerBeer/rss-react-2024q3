import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
