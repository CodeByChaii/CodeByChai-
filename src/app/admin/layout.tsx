import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AdminLogout } from "./AdminLogout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Login page: no sidebar
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-200 flex">
      <aside className="w-56 border-r border-zinc-800 p-4 flex flex-col">
        <Link href="/admin" className="text-lg font-semibold text-white mb-6">
          Admin
        </Link>
        <nav className="flex flex-col gap-2">
          <Link
            href="/admin"
            className="rounded-lg px-3 py-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/site"
            className="rounded-lg px-3 py-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            Site & hero
          </Link>
          <Link
            href="/admin/projects"
            className="rounded-lg px-3 py-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            Projects
          </Link>
        </nav>
        <div className="mt-auto pt-4 border-t border-zinc-800">
          <Link href="/" className="block rounded-lg px-3 py-2 text-zinc-400 hover:bg-zinc-800 hover:text-white text-sm mb-2">
            View site
          </Link>
          <AdminLogout />
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
