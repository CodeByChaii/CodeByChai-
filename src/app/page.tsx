import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { getSiteSettings } from "@/lib/db/site-settings";
import { getProjects } from "@/lib/data/public";

export default async function Home() {
  const [settings, projects] = await Promise.all([
    getSiteSettings(),
    getProjects(),
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-200">
      <a
        href="#main-content"
        className="absolute -left-[9999px] top-4 z-[100] rounded bg-indigo-600 px-4 py-2 text-white focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <Header site={settings.site} />
      <main id="main-content" aria-label="Main content">
        <HeroSection hero={settings.hero} site={settings.site} />
        <AboutSection site={settings.site} />
        <ProjectsSection projects={projects} />
        <ContactSection site={settings.site} />
      </main>
      <footer className="border-t border-zinc-800 py-6 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} {settings.site?.fullName ?? "Atthachai"} ({settings.site?.name ?? "CodeByChai"})
        {" · "}
        <a href="/admin" className="text-zinc-500 hover:text-zinc-400 underline">Admin</a>
      </footer>
    </div>
  );
}
