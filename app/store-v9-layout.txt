import "./globals.css";

export const metadata = {
  title: "JASTLIFE | Outdoor Store",
  description: "JASTLIFE outdoor store for camping, cycling, travel and practical outdoor tech.",
  keywords: ["JASTLIFE", "outdoor store", "camping", "cycling", "travel gear", "outdoor tech"],
  openGraph: {
    title: "JASTLIFE | Outdoor Store",
    description: "Camping, cycling, travel and outdoor gear selected for real use.",
    type: "website",
    images: ["/hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "JASTLIFE | Outdoor Store",
    description: "Camping, cycling, travel and outdoor gear selected for real use.",
    images: ["/hero.png"],
  },
};

export const viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
