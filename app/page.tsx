"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Menu, Search, ShoppingCart, Plus, Edit2, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";

import FeaturedMenu from "@/components/mainpage/featuredMenu";
import Category from "@/components/mainpage/categoryMenu";
import MenuDish from "@/components/mainpage/menuDish";
import { Cart } from "@/components/cart/Cart";
import Header from "@/components/mainpage/header";
import StoreBanner from "@/components/mainpage/storeBanner";
import CartSidebar from "@/components/mainpage/cartSidebar";

// Tipe baris dari tabel Supabase
type MenuRow = {
  id: string; // uuid
  nama_produk: string;
  kategori: string;
  harga: number;
  image_url?: string;
  keterangan?: string;
  created_at?: string;
};

// icon default per kategori
const CATEGORY_ICONS: Record<string, string> = {
  Makanan: "🍛",
  Minuman: "🥤",
  Snack: "🍟",
  Dessert: "🍰",
};

function MenuSection({
  loading,
  error,
  language,
  items,
  onAdd,
}: {
  loading: boolean;
  error: string | null;
  language: "id" | "en";
  items: any[];
  onAdd: (item: any) => void;
}) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Menu</h3>
      {loading ? (
        <div className="text-sm text-gray-500">
          {language === "id" ? "Memuat menu..." : "Loading menu..."}
        </div>
      ) : error ? (
        <div className="text-sm text-red-600">Error: {error}</div>
      ) : (
        <MenuDish items={items} onAdd={onAdd} />
      )}
    </div>
  );
}

export default function FoodOrderApp() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  // ==== DATA DARI SUPABASE ====
  const [menuItems, setMenuItems] = useState<MenuRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [language, setLanguage] = useState<"id" | "en">("id"); // buat teks UI aja

  // ambil data dari Supabase saat pertama kali render
  useEffect(() => {
    const loadMenu = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Supabase error:", error);
        setError(error.message);
      } else if (data) {
        // convert null fields to undefined to satisfy MenuItem type compatibility
        const mappedData = data.map((item: any) => ({
          ...item,
          image_url: item.image_url ?? undefined,
          keterangan: item.keterangan ?? undefined,
        }));
        setMenuItems(mappedData as MenuRow[]);
      }

      setLoading(false);
    };

    loadMenu();
  }, []);

  // daftar kategori: "Semua" + kategori unik dari DB
  const categories = useMemo(() => {
    const unique = Array.from(new Set(menuItems.map((m) => m.kategori)));
    return ["Semua", ...unique];
  }, [menuItems]);

  // filter menu berdasarkan kategori + search
  const filteredMenu = useMemo(() => {
    let list = [...menuItems];

    if (activeCategory) {
      list = list.filter((m) => m.kategori === activeCategory);
    }

    const term = search.trim().toLowerCase();
    if (term) {
      list = list.filter((m) => m.nama_produk.toLowerCase().includes(term));
    }

    return list;
  }, [menuItems, activeCategory, search]);

  // popular dishes: ambil maksimal 3 item pertama dari hasil filter
  const menuDishes = useMemo(() => filteredMenu.slice(0, 3), [filteredMenu]);
  const popularDishes = useMemo(() => filteredMenu.slice(), [filteredMenu]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 0;
  const final = subtotal - discount;

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAdd = (item: any) => {
    setCartItems((prev: any[]) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.nama_produk,
          price: item.harga,
          quantity: 1,
          image: item.image_url,
        },
      ];
    });
  };

  return (
    <div className="min-h-screen bg-[#DCD7C9] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6 justify-center">
          {/* Main Content */}
          <div className="w-full max-w-4xl space-y-6 mx-auto">
            {/* Header */}
            <Header
              language={language}
              setLanguage={setLanguage}
              showLanguageMenu={showLanguageMenu}
              setShowLanguageMenu={setShowLanguageMenu}
              search={search}
              setSearch={setSearch}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
            {/* Store Banner */}
            <StoreBanner
              totalItems={menuItems.length}
              totalCategories={Math.max(categories.length - 1, 0)}
            />
            {/* Rekomendasi Menu */}
            <FeaturedMenu
              items={menuDishes}
              loading={loading}
              error={error}
              language={language}
            />
            {/* Categories */}
            <Category
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
            {/* List Menu */}
            <MenuSection
              loading={loading}
              error={error}
              language={language}
              items={popularDishes}
              onAdd={handleAdd}
            />
          </div>
          {/* Cart Sidebar */}
          <CartSidebar cartItems={cartItems} setCartItems={setCartItems} />
        </div>
      </div>
    </div>
  );
}
