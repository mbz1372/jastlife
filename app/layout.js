
import "./globals.css";

export const metadata = {
  title: "JASTLIFE | Outdoor Gear & Smart Gadgets",
  description: "Smart outdoor gear, camping essentials and cycling equipment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body>{children}</body>
    </html>
  );
}
