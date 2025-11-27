"use client";

import { useState } from "react";
import { Menu, Search, Palette, Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ThemeType = "minimalist" | "colorful";

interface HeaderProps {
  language: "id" | "en";
  setLanguage: (lang: "id" | "en") => void;
  showLanguageMenu: boolean;
  setShowLanguageMenu: (value: boolean | ((prev: boolean) => boolean)) => void;
  search: string;
  setSearch: (value: string) => void;
  cartItems: any[];
  setCartItems: (value: any) => void;

  theme: ThemeType;
  setTheme: (t: ThemeType) => void;
}

export default function Header({
  language,
  setLanguage,
  showLanguageMenu,
  setShowLanguageMenu,
  search,
  setSearch,
  cartItems,
  setCartItems,
  theme,
  setTheme,
}: HeaderProps) {
  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);
  const [isLangDialogOpen, setIsLangDialogOpen] = useState(false);

  const openThemeDialog = () => {
    setShowLanguageMenu(false);
    setIsThemeDialogOpen(true);
  };

  const openLangDialog = () => {
    setShowLanguageMenu(false);
    setIsLangDialogOpen(true);
  };

  return (
    <>
      <div className="flex items-center gap-4 ">
        {/* Tombol Menu Utama */}
        <div className="relative">
          <Button
            className={`${
              theme === "colorful"
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-[#A27B5C] hover:bg-[#8d6a4d]"
            } text-white w-12 h-12 rounded-xl shadow-md transition-colors`}
            onClick={() => setShowLanguageMenu((prev) => !prev)}
          >
            <Menu className="w-6 h-6" />
          </Button>

          {/* Dropdown Menu (Tema & Bahasa) */}
          {showLanguageMenu && (
            <div className="absolute left-0 mt-2 w-48 rounded-xl border bg-white text-gray-800 shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <button
                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100"
                onClick={openThemeDialog}
              >
                <Palette className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Ganti Tema</span>
              </button>
              <button
                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                onClick={openLangDialog}
              >
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Ganti Bahasa</span>
              </button>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder={
              language === "id" ? "Cari produk..." : "Search product here..."
            }
            className="pl-10 bg-white border-0 shadow-sm h-12 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* --- DIALOG TEMA (Bottom Sheet di Mobile) --- */}
      <Dialog open={isThemeDialogOpen} onOpenChange={setIsThemeDialogOpen}>
        <DialogContent className="sm:max-w-md bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 translate-y-0 top-auto fixed w-full rounded-t-2xl sm:rounded-xl border-0 p-0 gap-0 bg-white">
          <div className="p-6">
            <DialogHeader className="mb-4 text-left">
              <DialogTitle className="text-lg font-bold flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Pilih Tampilan
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-3">
              {/* Opsi Minimalist */}
              <button
                onClick={() => {
                  setTheme("minimalist");
                  setIsThemeDialogOpen(false);
                }}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  theme === "minimalist"
                    ? "border-[#A27B5C] bg-[#A27B5C]/10 ring-1 ring-[#A27B5C]"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#DCD7C9] border flex items-center justify-center text-xs font-bold text-[#A27B5C]">
                    M
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Minimalist</p>
                    <p className="text-xs text-gray-500">
                      Warna kalem & elegan
                    </p>
                  </div>
                </div>
                {theme === "minimalist" && (
                  <Check className="w-5 h-5 text-[#A27B5C]" />
                )}
              </button>

              {/* Opsi Colorful */}
              <button
                onClick={() => {
                  setTheme("colorful");
                  setIsThemeDialogOpen(false);
                }}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  theme === "colorful"
                    ? "border-purple-500 bg-purple-50 ring-1 ring-purple-500"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-200 to-pink-200 flex items-center justify-center text-xs font-bold text-purple-600">
                    C
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Colorful</p>
                    <p className="text-xs text-gray-500">Ceria & penuh warna</p>
                  </div>
                </div>
                {theme === "colorful" && (
                  <Check className="w-5 h-5 text-purple-600" />
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* --- DIALOG BAHASA (Bottom Sheet di Mobile) --- */}
      <Dialog open={isLangDialogOpen} onOpenChange={setIsLangDialogOpen}>
        <DialogContent className="sm:max-w-md bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 translate-y-0 top-auto fixed w-full rounded-t-2xl sm:rounded-xl border-0 p-0 gap-0 bg-white">
          <div className="p-6">
            <DialogHeader className="mb-4 text-left">
              <DialogTitle className="text-lg font-bold flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Pilih Bahasa
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-3">
              <button
                onClick={() => {
                  setLanguage("id");
                  setIsLangDialogOpen(false);
                }}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  language === "id"
                    ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span className="font-medium text-gray-900">🇮🇩 Indonesia</span>
                {language === "id" && (
                  <Check className="w-5 h-5 text-blue-500" />
                )}
              </button>

              <button
                onClick={() => {
                  setLanguage("en");
                  setIsLangDialogOpen(false);
                }}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  language === "en"
                    ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span className="font-medium text-gray-900">🇬🇧 English</span>
                {language === "en" && (
                  <Check className="w-5 h-5 text-blue-500" />
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
