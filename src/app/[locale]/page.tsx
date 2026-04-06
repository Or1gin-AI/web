import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhitepaperCard from "@/components/WhitepaperCard";
import Services from "@/components/Services";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <WhitepaperCard />
        <div className="h-px bg-border mx-auto max-w-[1080px]" />
        <Services />
        <div className="h-px bg-border mx-auto max-w-[1080px]" />
        <Features />
        <div className="h-px bg-border mx-auto max-w-[1080px]" />
        <Pricing />
        <div className="h-px bg-border mx-auto max-w-[1080px]" />
        <FAQ />
        <div className="h-px bg-border mx-auto max-w-[1080px]" />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
