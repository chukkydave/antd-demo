'use client';

import { useState } from 'react';
import Checker from "@/components/Checker";
import ChecksHeader from "@/components/ChecksHeader";
import CheckerStats from "@/components/CheckerStats";
import { ServiceProvider } from "@/contexts/ServiceContext";

export default function Home() {
  const [activeService, setActiveService] = useState<'checker' | 'unlock'>('checker');

  return (
    <ServiceProvider value={{ activeService, setActiveService }}>
      <div className="items-center justify-items-center gap-6 sm:gap-8 md:gap-16 mt-32 md:mt-40 px-4 md:px-6 lg:px-0 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 sm:gap-12 md:gap-28 justify-center items-center w-full max-w-4xl mx-auto">
          <Checker />
          <ChecksHeader />
          <CheckerStats />
        </main>
      </div>
    </ServiceProvider>
  );
}
