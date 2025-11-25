"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useMemo, useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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

export function Cart({ cartItems, setCartItems }: CartProps) {
  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum: number, item: CartItem) => sum + item.price * item.quantity,
        0
      ),
    [cartItems]
  );
  const final = subtotal;
  const totalQuantity = useMemo(
    () =>
      cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
    [cartItems]
  );
  return (
    <Dialog>
      {/* <form> */}
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-12 h-12 relative">
          <ShoppingCart className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[425px]">
        <DialogTitle className="">Keranjang </DialogTitle>

        <div className="shrink-0 p-0 w-full">
          {cartItems.length > 0 ? (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 ">
                    <div className="w-12 h-12 rounded-lg  flex items-center justify-center overflow-hidden">
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
                      <span className="text-gray-700">{item.name}</span>
                      <div className="text-black font-semibold">
                        Rp.{item.price * item.quantity}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        className="w-7 h-7 rounded-full bg-[#A27B5C] text-white"
                        onClick={() =>
                          setCartItems((prev: CartItem[]) =>
                            prev
                              .map((ci: CartItem) =>
                                ci.id === item.id
                                  ? { ...ci, quantity: ci.quantity - 1 }
                                  : ci
                              )
                              .filter((ci: CartItem) => ci.quantity > 0)
                          )
                        }
                      >
                        <Minus className="w-4 h-4" />
                      </Button>

                      <Input
                        type="number"
                        className="w-12 text-center"
                        value={item.quantity}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setCartItems((prev: CartItem[]) =>
                            prev
                              .map((ci: CartItem) =>
                                ci.id === item.id
                                  ? { ...ci, quantity: val }
                                  : ci
                              )
                              .filter((ci: CartItem) => ci.quantity > 0)
                          );
                        }}
                      />

                      <Button
                        size="icon"
                        className="w-7 h-7 rounded-full bg-[#A27B5C] text-white"
                        onClick={() =>
                          setCartItems((prev: CartItem[]) =>
                            prev.map((ci: CartItem) =>
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
                ))}
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold text-[#A27B5C]">
                  Rp.{final.toFixed()}
                </span>
              </div>

              <Button className="w-full mt-6 bg-[#2C3930] hover:bg-[#3F4F44] text-white py-6 text-lg font-semibold">
                Checkout
              </Button>
            </>
          ) : (
            <div className="hidden"></div>
          )}
        </div>
      </DialogContent>
      {/* </form> */}
    </Dialog>
  );
}
