import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a1a1a',
};

export const metadata: Metadata = {
  title: "ISA-FASCIST — National Cultural Threat Bulletin",
  description: "A public awareness initiative issued in reluctant service by the Agnostic Society for the Study of Isa Fascism.",
  openGraph: {
    title: "ISA IS A FASCIST",
    description: "We cannot stop what is coming. We can only educate the public.",
    siteName: "isaisafacist.club",
    type: "website",
  },
  other: {
    'color-scheme': 'light',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Stardos+Stencil:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=JetBrains+Mono:wght@400;500;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Stardos+Stencil:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=JetBrains+Mono:wght@400;500;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
