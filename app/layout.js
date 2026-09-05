import "./globals.css";

export const metadata = {
  title: "JASTLIFE | Curated Outdoor Gear",
  description: "JASTLIFE curates camping, cycling, travel and outdoor tech for lighter movement and better time outside.",
  keywords: ["JASTLIFE", "outdoor gear", "camping", "cycling", "travel gear", "outdoor tech"],
  openGraph: {
    title: "JASTLIFE | Carry Less. Live More.",
    description: "Curated outdoor gear for people who move lighter and live outside better.",
    type: "website",
    images: ["/hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "JASTLIFE | Carry Less. Live More.",
    description: "Curated outdoor gear for people who move lighter and live outside better.",
    images: ["/hero.png"],
  },
};

export const viewport = {
  themeColor: "#f3f1ec",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
