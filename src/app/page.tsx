import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
      </main>
    </>
  );
}
