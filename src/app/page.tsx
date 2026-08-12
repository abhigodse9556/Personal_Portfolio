import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Work } from '@/components/sections/Work';
import { Experience } from '@/components/sections/Experience';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';
import { BackToTop } from '@/components/ui/BackToTop';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1" id="main-content">
        <Hero />
        <Work />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      
      <Footer />
      
      <BackToTop />
    </div>
  );
}