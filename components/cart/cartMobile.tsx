"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
}

export function CartMobile({ cartItems, setCartItems }: CartProps) {
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

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <Dialog>
      <div className="fixed bottom-4 left-0 right-0 px-4 z-50">
        <DialogTrigger asChild>
          <button className="w-full bg-linear-to-r from-[#2C3930] via-[#3F4F44] to-[#2C3930] text-white rounded-2xl p-4 flex items-center justify-between shadow-xl transition-all">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/40 rounded-xl flex items-center justify-center text-white text-lg font-semibold">
                {totalQty}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-lg">Lihat Keranjang</span>
                <span className="text-white/80 text-sm">
                  {totalQty} item terpilih
                </span>
              </div>
            </div>
            <span className="font-bold text-lg">
              Rp {subtotal.toLocaleString("id-ID")}
            </span>
          </button>
        </DialogTrigger>
      </div>

      <DialogContent className="max-w-[450px] rounded-3xl p-0 overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-orange-500" />
            Pesanan Anda
          </h2>

          <div className="space-y-3 mb-4 max-h-[400px] overflow-y-auto">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white border rounded-2xl p-4"
              >
                <div className="flex items-center gap-3 flex-1">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-xl"
                    />
                  )}

                  <div className="flex flex-col flex-1">
                    <span className="font-semibold text-gray-900">
                      {item.name}
                    </span>
                    <span className="text-gray-500 text-sm">
                      @ Rp {item.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-[#A27B5C] text-white hover:bg-[#8d6a4d] flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <span className="font-semibold text-sm">
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between text-gray-500 mb-2">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>
          </div>

          <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl py-4 text-lg transition-colors">
            Pesan via WhatsApp
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
