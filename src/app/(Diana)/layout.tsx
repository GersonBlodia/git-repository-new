import { Footer } from "@/components/footer/Footer";
import { HeaderComponents } from "@/components/header/Header";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
         
      >
      <HeaderComponents/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
