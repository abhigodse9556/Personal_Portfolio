import {
  Hero,
  About,
  Navbar,
  ThemeToggle,
  Skills,
  Projects,
} from "@/components";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ThemeToggle />
    </>
  );
}
