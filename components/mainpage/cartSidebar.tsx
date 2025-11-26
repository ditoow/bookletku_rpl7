"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus, X, Trash2 } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartSidebarProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartSidebar({
  cartItems,
  setCartItems,
  isOpen,
  onClose,
  onCheckout,
}: CartSidebarProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const final = subtotal;

  const showSidebar = isOpen;

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="shrink-0">
      {showSidebar ? (
        <Card className="sticky p-0 top-6 w-full md:w-[400px] bg-white shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Keranjang</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto pr-2">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 py-10 flex flex-col items-center gap-2">
                  <span className="text-4xl">🛒</span>
                  <p>Keranjang masih kosong</p>
                  <Button variant="outline" className="mt-2" onClick={onClose}>
                    Kembali Belanja
                  </Button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    {/* Gambar Item */}
                    <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl">🍽️</span>
                      )}
                    </div>

                    {/* Info Item */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-gray-700 truncate font-medium text-sm pr-2">
                          {item.name}
                        </span>
                        {/* Tombol Hapus (Trash) */}
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Hapus item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-semibold text-[#A27B5C]">
                          Rp {(item.price * item.quantity).toLocaleString()}
                        </span>

                        {/* Kontrol Kuantitas */}
                        <div className="flex items-center gap-1 rounded-md bg-gray-50 p-0.5 border">
                          <Button
                            size="icon"
                            className="w-5 h-5 rounded bg-white text-black shadow-sm hover:bg-gray-200"
                            onClick={() =>
                              setCartItems((prev) =>
                                prev
                                  .map((ci) =>
                                    ci.id === item.id
                                      ? { ...ci, quantity: ci.quantity - 1 }
                                      : ci
                                  )
                                  .filter((ci) => ci.quantity > 0)
                              )
                            }
                          >
                            <Minus className="w-3 h-3" />
                          </Button>

                          <Input
                            type="number"
                            className="
                              w-8 h-5 p-0 text-center border-none bg-transparent text-xs font-medium
                              [&::-webkit-inner-spin-button]:appearance-none
                              [&::-webkit-outer-spin-button]:appearance-none
                              [-moz-appearance:textfield] focus-visible:ring-0
                            "
                            value={item.quantity}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setCartItems((prev) =>
                                prev
                                  .map((ci) =>
                                    ci.id === item.id
                                      ? { ...ci, quantity: val }
                                      : ci
                                  )
                                  .filter((ci) => ci.quantity > 0)
                              );
                            }}
                          />

                          <Button
                            size="icon"
                            className="w-5 h-5 rounded bg-[#A27B5C] text-white hover:bg-[#8d6a4d]"
                            onClick={() =>
                              setCartItems((prev) =>
                                prev.map((ci) =>
                                  ci.id === item.id
                                    ? { ...ci, quantity: ci.quantity + 1 }
                                    : ci
                                )
                              )
                            }
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Total */}
            {cartItems.length > 0 && (
              <>
                <div className="border-t pt-4 justify-center items-center space-y-3 bg-white">
                  <div className="flex justify-between text-sm">
                    <div className="flex gap-2 text-gray-600">
                      <span>Total Item:</span>
                      <span className="font-bold text-black">
                        {totalQuantity}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="text-2xl font-bold text-[#A27B5C]">
                      Rp {final.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                {/* BUTTON CHECKOUT DISINI, CLASSNAME TETAP SAMA */}
                <Button
                  className="w-full mt-6 bg-[#2C3930] hover:bg-[#3F4F44] text-white py-6 text-lg font-semibold shadow-lg"
                  onClick={onCheckout}
                >
                  Checkout
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="hidden"></div>
      )}
    </div>
  );
}
