import Navbar from "@/components/Navbar";
import Top from "@/components/Top";
import "./globals.css";
import StoreProvider from "./StoreProvider";
export const metadata = {
  title: "EcomNepal",
  description: "A ecommerce website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <StoreProvider>
          <Top />
          <Navbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
