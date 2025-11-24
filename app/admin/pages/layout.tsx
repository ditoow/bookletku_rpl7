"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminSidebar from "@/components/sidebar/sidebar";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Cek apakah ada session aktif
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          // Jika tidak login, tendang ke halaman login
          router.replace("/admin/login");
        } else {
          // Jika login, izinkan akses
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        router.replace("/admin/login");
      }
    };

    checkSession();
  }, [router]);

  // Tampilkan loading screen saat sedang mengecek status login
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

  // Render halaman admin jika sudah lolos pengecekan
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-y-auto h-screen">{children}</main>
    </div>
  );
}
