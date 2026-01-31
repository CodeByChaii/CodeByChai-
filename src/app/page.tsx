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
    <div className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)] transition-colors duration-300">
      <a
        href="#main-content"
        className="absolute -left-[9999px] top-4 z-[100] rounded bg-[color:var(--accent)] px-4 py-2 text-[color:var(--accent-foreground)] focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <Header site={settings.site} />
      <main id="main-content" aria-label="Main content">
        <HeroSection hero={settings.hero} site={settings.site} />
        <ProjectsSection projects={projects} />
        <AboutSection site={settings.site} />
        <ContactSection site={settings.site} />
      </main>
      <footer
        className="border-t py-6 text-center text-sm"
        style={{ borderColor: "var(--border)", color: "var(--muted)" }}
      >
        © {new Date().getFullYear()} {settings.site?.fullName ?? "Atthachai"} ({settings.site?.name ?? "CodeByChai"})
        {" · "}
        <a
          href="/admin"
          className="underline transition hover:text-[color:var(--foreground)]"
          style={{ color: "var(--muted)" }}
        >
          Admin
        </a>
      </footer>
    </div>
  );
}
