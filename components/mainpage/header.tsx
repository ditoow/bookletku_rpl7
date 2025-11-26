"use client";

import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartMobile } from "../cart/cartMobile";

interface HeaderProps {
  language: "id" | "en";
  setLanguage: (lang: "id" | "en") => void;
  showLanguageMenu: boolean;
  setShowLanguageMenu: (value: boolean | ((prev: boolean) => boolean)) => void;
  search: string;
  setSearch: (value: string) => void;
  cartItems: any[];
  setCartItems: (value: any) => void;
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
}: HeaderProps) {
  return (
    <div className="flex items-center gap-4 ">
      {/* Garis 3 */}
      <div className="relative">
        <Button
          className="bg-[#A27B5C] hover:bg-[#8d6a4d] text-white w-12 h-12"
          onClick={() => setShowLanguageMenu((prev) => !prev)}
        >
          <Menu className="w-5 h-5" />
        </Button>

        {showLanguageMenu && (
          <div className="absolute left-0 mt-2 w-32 rounded-lg border bg-white text-gray-800 shadow-lg z-10">
            <button
              className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                language === "id" ? "font-semibold" : ""
              }`}
              onClick={() => {
                setLanguage("id");
                setShowLanguageMenu(false);
              }}
            >
              Indonesia
            </button>
            <button
              className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                language === "en" ? "font-semibold" : ""
              }`}
              onClick={() => {
                setLanguage("en");
                setShowLanguageMenu(false);
              }}
            >
              English
            </button>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder={
            language === "id" ? "Cari produk..." : "Search product here..."
          }
          className="pl-10 bg-white border-0 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Cart
      <Cart cartItems={cartItems} setCartItems={setCartItems} /> */}
    </div>
  );
}
