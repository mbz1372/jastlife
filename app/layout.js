import "./globals.css";
import { CartProvider } from "./cart-provider";

export const metadata = {
  metadataBase: new URL("https://jastlife.vercel.app"),
  title: "JASTLIFE | Outdoor Store",
  description: "فروشگاه تجهیزات کمپ، دوچرخه، سفر و تکنولوژی فضای باز JASTLIFE.",
  openGraph: {
    title: "JASTLIFE | Outdoor Store",
    description: "تجهیزات کاربردی برای کمپ، سفر، دوچرخه و طبیعت‌گردی.",
    images: ["/hero.png"],
    type: "website",
  },
};

export const viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return <html lang="fa" dir="rtl">
    <body><CartProvider>{children}</CartProvider></body>
  </html>;
}
