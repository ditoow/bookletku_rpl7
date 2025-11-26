"use client";

import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

import FeaturedMenu from "@/components/mainpage/featuredMenu";
import Category from "@/components/mainpage/categoryMenu";
import MenuDish from "@/components/mainpage/menuDish";
import Header from "@/components/mainpage/header";
import StoreBanner from "@/components/mainpage/storeBanner";
import CartSidebar from "@/components/mainpage/cartSidebar";
import { CartMobile } from "@/components/cart/cartMobile";
import CartButton from "@/components/mainpage/CartButton";

// Tipe data untuk Menu
type MenuRow = {
  id: string;
  nama_produk: string;
  kategori: string;
  harga: number;
  image_url?: string;
  keterangan?: string;
  created_at?: string;
  position?: number;
};

export default function FoodOrderApp() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  // ==== DATA DARI SUPABASE ====
  const [menuItems, setMenuItems] = useState<MenuRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [language, setLanguage] = useState<"id" | "en">("id");

  const [isCartOpen, setIsCartOpen] = useState(false);

  // === TRACKING ADD TO CART KE SUPABASE ===
  const trackAddToCart = async (menuId: string) => {
    try {
      const { error } = await supabase
        .from("cart_add_tracking")
        .insert({ menu_item_id: menuId });

      if (error) console.error("Gagal tracking add to cart:", error);
    } catch (err) {
      console.error("Tracking error:", err);
    }
  };

  // 1. Load Data dengan URUTAN POSITION
  useEffect(() => {
    const loadMenu = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .order("position", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        setError(error.message);
      } else if (data) {
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

  const categories = useMemo(() => {
    const unique = Array.from(new Set(menuItems.map((m) => m.kategori)));
    return ["Semua", ...unique];
  }, [menuItems]);

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

  // 2. FEATURED MENU: Ambil 5 item teratas
  const menuDishes = useMemo(() => menuItems.slice(0, 5), [menuItems]);

  // Menu filtered
  const popularDishes = useMemo(() => filteredMenu.slice(), [filteredMenu]);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // === HANDLE ADD PATCHED WITH TRACKING ===
  const handleAdd = async (item: any) => {
    setIsCartOpen(true);

    // 🔥 TRACKING DI SINI
    trackAddToCart(item.id);

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
    <div className="min-h-screen bg-[#DCD7C9] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 justify-center">
          {/* Main Content */}
          <div className="w-full max-w-4xl space-y-6 mx-auto">
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

            <StoreBanner
              totalItems={menuItems.length}
              totalCategories={Math.max(categories.length - 1, 0)}
            />

            <FeaturedMenu
              items={menuDishes}
              loading={loading}
              error={error}
              language={language}
            />

            <Category
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />

            <div className="pb-20 md:pb-0">
              <MenuSection
                loading={loading}
                error={error}
                language={language}
                items={popularDishes}
                onAdd={handleAdd}
              />
            </div>
          </div>

          {/* Sidebar Desktop */}
          <div className="hidden md:block w-full md:w-auto">
            <div className="sticky top-6">
              <CartSidebar
                cartItems={cartItems}
                setCartItems={setCartItems}
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
              />
            </div>
          </div>

          {/* Cart Mobile */}
          <div className="block md:hidden">
            <CartMobile cartItems={cartItems} setCartItems={setCartItems} />
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <CartButton
          totalItems={totalQuantity}
          onClick={() => setIsCartOpen((prev) => !prev)}
        />
      </div>
    </div>
  );
}

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
