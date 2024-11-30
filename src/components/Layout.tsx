import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow pt-16">
        {children}
      </div>
      <Footer />
    </div>
  );
}