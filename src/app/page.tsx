import { Navbar } from "./components/ui/Navbar";
import { Hero } from "./components/sections/Hero";
import { AboutGuru } from "./components/sections/AboutGuru";
import { AcademyStats } from "./components/sections/AcademyStats";
import { Achievements3D } from "./components/sections/Achievements3D";
import { PerformanceVideos } from "./components/sections/PerformanceVideos";
import { Courses } from "./components/sections/Courses";
import { ContactFooter } from "./components/sections/ContactFooter";

export default function Home() {
  return (
    <main className="relative bg-surface min-h-screen selection:bg-secondary selection:text-primary">
      <Navbar />
      <Hero />
      <AboutGuru />
      <AcademyStats />
      <Achievements3D />
      <PerformanceVideos />
      <Courses />
      <ContactFooter />
    </main>
  );
}
