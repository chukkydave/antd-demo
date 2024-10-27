import Image from "next/image";
import Layout from "@/components/Layout";
import Checker from "@/components/Checker";
import ChecksHeader from "@/components/ChecksHeader";
import CheckerStats from "@/components/CheckerStats";
export default function Home() {
  return (
    <div className="items-center justify-items-center gap-16 mt-36 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-28 justify-center items-center max-w-4xl mx-auto">
        <Checker />
        <ChecksHeader />
        <CheckerStats />
      </main>
    </div>
  );
}
