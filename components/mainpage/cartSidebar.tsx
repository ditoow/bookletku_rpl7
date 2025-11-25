"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";

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
}

export default function CartSidebar({
  cartItems,
  setCartItems,
}: CartSidebarProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const final = subtotal;

  return (
    <div className="shrink-0">
      {cartItems.length > 0 ? (
        <Card className="sticky p-0 top-6 max-w-[420px] bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Keranjang</h3>
            </div>

            <div className="space-y-4 mb-6">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                  Keranjang Kosong
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg  bg-gray-100 flex items-center justify-center overflow-hidden">
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

                    <div className="flex-1">
                      <div className="flex flex-col gap-0.5 text-sm">
                        <span className="text-gray-700">{item.name}</span>
                        <div>
                          <span>x</span>
                          <span className="font-medium">{item.quantity}</span>
                          <div className="text-black font-semibold">
                            Rp.{item.price * item.quantity}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-md">
                      {/* Minus */}
                      <Button
                        size="icon"
                        className="w-7 h-7 rounded-full bg-[#A27B5C] text-white hover:bg-[#8d6a4d]"
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
                        <Minus className="w-4 h-4" />
                      </Button>

                      {/* Input Qty */}
                      <Input
                        type="number"
                        className="
                          w-12 text-center
                          [&::-webkit-inner-spin-button]:appearance-none
                          [&::-webkit-outer-spin-button]:appearance-none
                          [-moz-appearance:textfield]
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

                      {/* Plus */}
                      <Button
                        size="icon"
                        className="w-7 h-7 rounded-full bg-[#A27B5C] text-white hover:bg-[#8d6a4d]"
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
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Total */}
            <div className="border-t pt-4 justify-center items-center space-y-3">
              <div className="flex justify-between text-sm">
                <div className="flex gap-8">
                  <span className="text-gray-600">Total</span>
                  <span>x{totalQuantity}</span>
                </div>
                <span className="font-medium">{subtotal.toFixed(0)}</span>
              </div>

              <div className="flex justify-between items-center pt-3 border-t">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold text-[#A27B5C]">
                  Rp.{final.toFixed()}
                </span>
              </div>
            </div>

            <Button className="w-full mt-6 bg-[#2C3930] hover:bg-[#3F4F44] text-white py-6 text-lg font-semibold">
              Checkout
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="hidden"></div>
      )}
    </div>
  );
}
