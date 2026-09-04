import "./globals.css";

export const metadata = {
  title: "JASTLIFE | Outdoor Gear, Camping, Cycling & Smart Tech",
  description: "JASTLIFE curates outdoor gear, camping essentials, cycling equipment and smart tools built for movement, travel and life outside.",
  keywords: ["JASTLIFE", "outdoor gear", "camping", "cycling", "smart gadgets", "travel gear"],
  openGraph: {
    title: "JASTLIFE | Go Outside. Live More.",
    description: "Curated outdoor gear, camping, cycling and smart tech for people who move.",
    type: "website",
    images: ["/hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "JASTLIFE | Go Outside. Live More.",
    description: "Curated outdoor gear, camping, cycling and smart tech for people who move.",
    images: ["/hero.png"],
  },
};

export const viewport = {
  themeColor: "#05070a",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
