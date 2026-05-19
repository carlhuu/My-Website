import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://carlhuu.vercel.app/"),
  title: "carl",
  description: "Carl Hu's website",
  openGraph: {
    title: "carl",
    description: "Carl Hu's website",
    url: "https://carlhuu.vercel.app/",
    images: [
      {
        url: "/images/preview.png",
        alt: "Carl Hu website preview",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative min-h-screen">
        <div className="absolute top-8 w-full flex z-50 pointer-events-auto justify-center">
          <div className="description text-[#9a9a9a]">
            <Link href="/">Home</Link>
            <span className="mx-6">
              <Link href="/experience">Experience</Link>
            </span>
            <Link href="/projects">Projects</Link>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
