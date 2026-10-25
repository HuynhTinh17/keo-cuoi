import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kèo Cưới — Đám cưới theo cách của bạn",
  description: "Kèo Cưới — wedding planning cá nhân hoá, linh hoạt theo câu chuyện, ngân sách và nhu cầu của bạn.",
};

export const viewport = {
  themeColor: "#f7f1e7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <div className="announcement">YOUR DAY, YOUR WAY · LẬP KẾ HOẠCH CƯỚI THEO CÁCH CỦA BẠN</div>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
