import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ISA-FACIST — National Cultural Threat Bulletin",
  description: "A public awareness initiative issued in reluctant service by the Agnostic Society for the Study of Isa Fascism.",
  openGraph: {
    title: "ISA IS A FACIST",
    description: "We cannot stop what is coming. We can only educate the public.",
    siteName: "isaisafacist.club",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
