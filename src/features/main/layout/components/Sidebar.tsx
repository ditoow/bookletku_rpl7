"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/shared/lib/supabase";
import {
  LayoutDashboard,
  Package,
  QrCode,
  LogOut,
  X,
  User,
  ChevronRight
} from "lucide-react";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserEmail(data.user?.email ?? "Unknown");
    };

    getUser();
  }, []);

  const menu = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/admin/product", icon: Package },
    { name: "QR Management", href: "/admin/qr", icon: QrCode },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <>
      {/* Overlay Gelap untuk Mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={onClose}
      />

      {/* Glassmorphism Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 
          backdrop-blur-2xl bg-white/10 border-r border-white/20
          flex flex-col transition-transform duration-300 ease-in-out shadow-2xl
          md:static md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo & Close Button */}
        <div className="p-6 border-b border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <LayoutDashboard className="w-5 h-5 text-gray-800" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Admin Panel
            </h1>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-lg hover:bg-white/20 text-gray-700 transition-all duration-300"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Menu */}
        <nav className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  group flex items-center justify-between px-4 py-3 rounded-xl
                  transition-all duration-300 backdrop-blur-sm
                  ${isActive
                    ? "bg-white/30 text-gray-900 shadow-lg scale-105 border border-white/40"
                    : "text-gray-700 hover:bg-white/20 hover:text-gray-900 hover:translate-x-1 border border-transparent"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? "text-[#A27B5C]" : "text-gray-600"}`} />
                  <span className="font-medium">{item.name}</span>
                </div>
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-[#A27B5C] animate-pulse" />
                )}
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-500/20 hover:text-red-700 transition-all duration-300 group backdrop-blur-sm border border-transparent hover:border-red-300"
          >
            <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>

        {/* Profile Section */}
        <div className="p-4 border-t border-white/20 bg-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A27B5C] to-[#8d6a4d] flex items-center justify-center shrink-0 shadow-lg shadow-[#A27B5C]/30">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-600 font-medium">Logged in as</p>
              <p className="text-sm font-semibold text-gray-800 truncate">
                {userEmail ?? "Loading..."}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
