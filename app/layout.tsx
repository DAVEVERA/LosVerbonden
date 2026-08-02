import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://losverbonden.nl"),
  title: {
    default: "Los Verbonden | Begeleiding tijdens en na een scheiding",
    template: "%s | Los Verbonden",
  },
  description: "Persoonlijke begeleiding tijdens en na een scheiding in Tilburg. Vind rust, richting en verbinding met gesprekken, muziek en ontmoeting.",
  keywords: ["begeleiding na scheiding", "scheidingscoach Tilburg", "hulp bij scheiding", "ouderschap na scheiding", "persoonlijke begeleiding Tilburg", "wandelen en praten Tilburg"],
  alternates: { canonical: "/" },
  icons: { icon: "/icons/icons8/heart.png", shortcut: "/icons/icons8/heart.png", apple: "/icons/icons8/heart.png" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "/",
    siteName: "Los Verbonden",
    title: "Je relatie eindigde. Je leven niet.",
    description: "Met aandacht voor wat blijft. Persoonlijke begeleiding tijdens en na een scheiding in Tilburg.",
    images: [{ url: "/og.png", width: 1732, height: 909, alt: "Los Verbonden — Je relatie eindigde. Je leven niet." }],
  },
  twitter: { card: "summary_large_image", title: "Je relatie eindigde. Je leven niet.", description: "Los Verbonden helpt je opnieuw grond te vinden — in jouw tempo.", images: ["/og.png"] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#263d2d",
  colorScheme: "light",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Los Verbonden",
  url: "https://losverbonden.nl",
  email: "info@losverbonden.nl",
  telephone: "+31643574633",
  areaServed: { "@type": "City", name: "Tilburg" },
  description: "Persoonlijke begeleiding tijdens en na een scheiding, met gesprekken, muziek, kleine groepen en laagdrempelige wandelingen.",
  knowsAbout: ["begeleiding na scheiding", "ouderschap na scheiding", "persoonlijke ontwikkeling", "lotgenotencontact"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
