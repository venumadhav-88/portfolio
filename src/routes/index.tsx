import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Certifications } from "@/components/portfolio/Certifications";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { ParticleField } from "@/components/portfolio/ParticleField";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { CommandPalette } from "@/components/portfolio/CommandPalette";
import { SideRail } from "@/components/portfolio/SideRail";
import { StatusDock } from "@/components/portfolio/StatusDock";
import { EasterEgg } from "@/components/portfolio/EasterEgg";
import { AmbientSound } from "@/components/portfolio/AmbientSound";
import { Aurora } from "@/components/portfolio/Aurora";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Venu Madhav Kasaraneni — Student Researcher, ML Engineer & Developer" },
      {
        name: "description",
        content:
          "Portfolio of Venu Madhav Kasaraneni — student researcher, ML engineer, and software developer building with Python, AI/ML, AWS, and open-source tools.",
      },
      { property: "og:title", content: "Venu Madhav Kasaraneni — ML Engineer & Developer" },
      {
        property: "og:description",
        content:
          "Research-driven engineering across AI/ML, systems, and software. Available for collaboration.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <LoadingScreen />
      <SmoothScroll />
      <CustomCursor />
      <Aurora />
      <ParticleField />
      <CommandPalette />
      <SideRail />
      <StatusDock />
      <EasterEgg />
      <AmbientSound />

      <Navbar />

      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
