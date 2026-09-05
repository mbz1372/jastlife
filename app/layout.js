import "./globals.css";

export const metadata = {
  title: "JASTLIFE | Performance Outdoor Gear",
  description: "JASTLIFE curates camping, cycling, travel and outdoor tech for lighter movement, smarter systems and better time outside.",
  keywords: ["JASTLIFE", "outdoor gear", "camping", "cycling", "travel gear", "outdoor tech"],
  openGraph: {
    title: "JASTLIFE | Move lighter. Go farther.",
    description: "Curated outdoor gear and smart field systems for people who move.",
    type: "website",
    images: ["/hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "JASTLIFE | Move lighter. Go farther.",
    description: "Curated outdoor gear and smart field systems for people who move.",
    images: ["/hero.png"],
  },
};

export const viewport = {
  themeColor: "#07090d",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
