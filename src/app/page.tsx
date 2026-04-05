import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhitepaperCard from "@/components/WhitepaperCard";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <WhitepaperCard />
      </main>
    </>
  );
}
