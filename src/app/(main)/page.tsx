import Image from "next/image";
import Layout from "@/components/Layout";
import Checker from "@/components/Checker";
import ChecksHeader from "@/components/ChecksHeader";
import CheckerStats from "@/components/CheckerStats";
export default function Home() {
  return (
    <div className="items-center justify-items-center gap-6 sm:gap-8 md:gap-16 mt-40 lg:mt-48 px-4 md:px-6 lg:px-0 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 sm:gap-12 md:gap-28 justify-center items-center w-full max-w-4xl mx-auto">
        <Checker />
        <ChecksHeader />
        <CheckerStats />
      </main>
    </div>
  );
};
