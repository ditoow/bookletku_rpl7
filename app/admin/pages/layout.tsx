"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminSidebar from "@/components/sidebar/sidebar";
import { Loader2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.replace("/admin/login");
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        router.replace("/admin/login");
      }
    };

    checkSession();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-[#FF9B6A]" />
          <p className="text-sm text-gray-500">Memverifikasi akses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar dengan props kontrol */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col w-full">
        {/* Header Mobile (Hanya muncul di layar kecil) */}
        <header className="md:hidden bg-white border-b p-4 flex items-center gap-4 sticky top-0 z-30">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            className="-ml-2"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </Button>
          <h1 className="font-bold text-lg text-gray-800">Admin Panel</h1>
        </header>

        {/* Konten Halaman */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
