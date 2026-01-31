import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SITE } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const title = `${SITE.name} | ${SITE.fullName} — Portfolio`;
const description =
  "Portfolio of playful builds by Atthachai (CodeByChai). Try or download coding projects on the web.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(SITE.url),
  keywords: ["portfolio", "web development", "motion", "remotion", "react", "typescript", "next.js", "coding projects"],
  authors: [{ name: SITE.fullName, url: SITE.url }],
  creator: SITE.fullName,
  openGraph: {
    title,
    description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@CodeByChai",
    site: "@CodeByChai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE.url}/#person`,
      name: SITE.fullName,
      alternateName: SITE.name,
      url: SITE.url,
      sameAs: [SITE.github, SITE.twitter],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description,
      publisher: { "@id": `${SITE.url}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const themeCookie = cookieStore?.get?.("theme")?.value;
  const isValidTheme = themeCookie === "light" || themeCookie === "dark" || themeCookie === "system";
  const initialTheme = isValidTheme ? themeCookie : "system";
  const htmlTheme = themeCookie === "light" || themeCookie === "dark" ? themeCookie : undefined;

  return (
    <html lang="en" data-theme={htmlTheme}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider initialTheme={initialTheme}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
