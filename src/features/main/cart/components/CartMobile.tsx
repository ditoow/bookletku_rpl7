"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/shared/components/ui/dialog";
import { ShoppingCart, Plus, Minus, Trash2, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface CartProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onCheckout: () => void;
  theme: "minimalist" | "colorful";
  language: "id" | "en";
}

export function CartMobile({
  cartItems,
  setCartItems,
  onCheckout,
  theme,
  language,
}: CartProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (cartItems.length === 0) return null;

  const barBgClass =
    theme === "minimalist"
      ? "bg-gradient-to-r from-[#2C3930] via-[#3F4F44] to-[#2C3930]"
      : "bg-gradient-to-r from-pink-500 to-violet-500";

  const buttonClass =
    theme === "minimalist"
      ? "bg-gradient-to-br from-[#A27B5C] to-[#8d6a4d] hover:from-[#8d6a4d] hover:to-[#7a5d44]"
      : "bg-pink-500 hover:bg-pink-600";

  const t = {
    viewCart: language === "id" ? "Lihat Keranjang" : "View Cart",
    itemsSelected: language === "id" ? "item terpilih" : "items selected",
    yourOrder: language === "id" ? "Pesanan Anda" : "Your Order",
    subtotal: language === "id" ? "Subtotal" : "Subtotal",
    total: "Total",
    checkout: language === "id" ? "Pesan" : "Checkout",
  };

  return (
    <Dialog>
      <div className="fixed bottom-4 left-0 right-0 px-4 z-50">
        <DialogTrigger asChild>
          <button
            className={`w-full ${barBgClass} text-white rounded-2xl p-4 flex items-center justify-between shadow-2xl transition-all hover:shadow-3xl hover:scale-[1.02] active:scale-[0.98] duration-300`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white text-lg font-semibold shadow-lg">
                {totalQty}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-lg">{t.viewCart}</span>
                <span className="text-white/80 text-sm">
                  {totalQty} {t.itemsSelected}
                </span>
              </div>
            </div>
            <span className="font-bold text-lg">
              Rp {subtotal.toLocaleString("id-ID")}
            </span>
          </button>
        </DialogTrigger>
      </div>

      <DialogContent className="max-w-[450px] rounded-3xl p-0 overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <div className={`p-2 rounded-xl ${theme === "minimalist" ? "bg-[#A27B5C]/10" : "bg-pink-100"}`}>
                <ShoppingCart className={`w-5 h-5 ${theme === "minimalist" ? "text-[#A27B5C]" : "text-pink-600"}`} />
              </div>
              {t.yourOrder}
            </h2>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${theme === "minimalist" ? "bg-[#A27B5C]/10 text-[#A27B5C]" : "bg-pink-100 text-pink-600"}`}>
              {totalQty} item
            </div>
          </div>

          {/* Cart Items */}
          <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100">
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between backdrop-blur-xl bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 animate-in fade-in-0 slide-in-from-bottom-2"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3 flex-1">
                  {item.image && (
                    <div className="relative group">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl ring-2 ring-gray-200 group-hover:ring-gray-300 transition-all"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  )}
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-semibold text-gray-900 truncate">
                      {item.name}
                    </span>
                    <span className="text-gray-500 text-sm">
                      @ Rp {item.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition-all hover:scale-110 active:scale-95"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="w-8 text-center font-semibold text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className={`w-7 h-7 rounded-lg text-white shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${buttonClass}`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Price & Delete */}
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm ${theme === "minimalist" ? "text-[#A27B5C]" : "text-pink-600"}`}>
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all hover:scale-110"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border-t-2 border-dashed border-gray-200 pt-4 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>{t.subtotal}</span>
              <span className="font-semibold">Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-2xl font-bold">
              <span>{t.total}</span>
              <span className={theme === "minimalist" ? "text-[#A27B5C]" : "text-pink-600"}>
                Rp {subtotal.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={onCheckout}
            className={`w-full ${barBgClass} mt-6 text-white font-bold rounded-2xl py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group`}
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <span className="relative z-10 flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              {t.checkout}
            </span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
