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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

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

export type ThemeType = "minimalist" | "colorful";

export default function FoodOrderApp() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<MenuRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [language, setLanguage] = useState<"id" | "en">("id");
  const [theme, setTheme] = useState<ThemeType>("minimalist");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const trackAddToCart = async (menuId: string) => {
    try {
      await supabase.from("cart_add_tracking").insert({ menu_item_id: menuId });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadMenu = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("menu_items")
        .select("*")
        .order("position", { ascending: true });
      if (data) setMenuItems(data as MenuRow[]);
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
    if (activeCategory && activeCategory !== "Semua")
      list = list.filter((m) => m.kategori === activeCategory);
    if (search)
      list = list.filter((m) =>
        m.nama_produk.toLowerCase().includes(search.toLowerCase())
      );
    return list;
  }, [menuItems, activeCategory, search]);

  const menuDishes = useMemo(() => menuItems.slice(0, 5), [menuItems]);
  const popularDishes = useMemo(() => filteredMenu.slice(), [filteredMenu]);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAdd = async (item: any) => {
    setIsCartOpen(true);
    trackAddToCart(item.id);
    setCartItems((prev: any[]) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist)
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
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

  const handleCheckoutClick = () =>
    cartItems.length > 0 && setIsConfirmOpen(true);

  const processCheckout = async () => {
    if (cartItems.length === 0) return;
    setIsProcessing(true);
    try {
      const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const { data: order } = await supabase
        .from("orders")
        .insert({ total_amount: total })
        .select()
        .single();
      await supabase.from("order_items").insert(
        cartItems.map((i) => ({
          order_id: order.id,
          menu_item_id: i.id,
          quantity: i.quantity,
          price: i.price,
        }))
      );
      window.open(
        `https:
          0,
          8
        )}`,
        "_blank"
      );
      setCartItems([]);
      setIsCartOpen(false);
      setIsConfirmOpen(false);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const bgClass =
    theme === "minimalist"
      ? "bg-[#DCD7C9]"
      : "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100";

  return (
    <div
      className={`min-h-screen p-4 md:p-6 transition-colors duration-500 ${bgClass}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 justify-center">
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
              theme={theme}
              setTheme={setTheme}
            />

            {/* Kirim language ke StoreBanner */}
            <StoreBanner
              totalItems={menuItems.length}
              totalCategories={Math.max(categories.length - 1, 0)}
              theme={theme}
              language={language}
            />

            {/* Kirim language ke FeaturedMenu */}
            <FeaturedMenu
              items={menuDishes}
              loading={loading}
              error={error}
              language={language}
              theme={theme}
            />

            {/* Kirim language ke Category */}
            <Category
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              theme={theme}
              language={language}
            />

            <div className="pb-20 md:pb-0">
              <MenuSection
                loading={loading}
                error={error}
                language={language}
                items={popularDishes}
                onAdd={handleAdd}
                theme={theme}
              />
            </div>
          </div>

          <div className="hidden md:block w-full md:w-auto">
            <div className="sticky top-6">
              {/* Kirim language ke CartSidebar */}
              <CartSidebar
                cartItems={cartItems}
                setCartItems={setCartItems}
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onCheckout={handleCheckoutClick}
                theme={theme}
                language={language}
              />
            </div>
          </div>

          <div className="block md:hidden">
            {/* Kirim language ke CartMobile */}
            <CartMobile
              cartItems={cartItems}
              setCartItems={setCartItems}
              onCheckout={processCheckout}
              theme={theme}
              language={language}
            />
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <CartButton
          totalItems={totalQuantity}
          onClick={() => setIsCartOpen((prev) => !prev)}
          theme={theme}
        />
      </div>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === "id" ? "Konfirmasi Pesanan" : "Confirm Order"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === "id"
                ? "Sudah yakin dengan pesanan anda?"
                : "Are you sure about your order?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>
              {language === "id" ? "Batal" : "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                processCheckout();
              }}
              className={`${
                theme === "colorful"
                  ? "bg-purple-600"
                  : "bg-linear-to-r from-[#2C3930] via-[#3F4F44] to-[#2C3930]"
              } text-white`}
              disabled={isProcessing}
            >
              {isProcessing
                ? language === "id"
                  ? "Memproses..."
                  : "Processing..."
                : language === "id"
                ? "Pesan via Whatsapp"
                : "Order via Whatsapp"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function MenuSection({ loading, error, language, items, onAdd, theme }: any) {
  return (
    <div>
      {/* Judul Menu Dinamis */}
      <h3 className="text-xl font-bold mb-4">
        {language === "id" ? "Menu" : "Menu"}
      </h3>
      {loading ? (
        <div className="text-sm text-gray-500">
          {language === "id" ? "Memuat..." : "Loading..."}
        </div>
      ) : error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : (
        <MenuDish items={items} onAdd={onAdd} theme={theme} />
      )}
    </div>
  );
}
