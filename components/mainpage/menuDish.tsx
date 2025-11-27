"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface MenuItem {
  id: string;
  nama_produk: string;
  keterangan?: string;
  harga: number;
  image_url?: string;
}

interface MenuDishProps {
  items: MenuItem[];
  onAdd: (item: MenuItem) => void;
  theme: "minimalist" | "colorful";
}

export default function MenuDish({ items, onAdd, theme }: MenuDishProps) {
  const buttonClass =
    theme === "minimalist"
      ? "bg-[#A27B5C] hover:bg-[#8d6a4d]"
      : "bg-pink-500 hover:bg-pink-600";

  const priceColor =
    theme === "minimalist" ? "text-gray-800" : "text-purple-700";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-0">
      {items.map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden p-0 transition-all hover:shadow-lg h-full flex flex-col"
        >
          <CardContent className="p-3 md:p-4 h-full">
            {/* ---------- MOBILE LAYOUT ---------- */}
            <div className="flex md:hidden items-center gap-4">
              <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.nama_produk}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl">🍽️</span>
                )}
              </div>

              <div className="flex flex-col flex-1">
                <h4 className="font-semibold text-sm text-gray-800 line-clamp-2">
                  {item.nama_produk}
                </h4>
                <span className={`text-base font-bold ${priceColor} mt-1`}>
                  Rp {Number(item.harga).toLocaleString("id-ID")}
                </span>
              </div>

              <Button
                size="icon"
                className={`rounded-full text-white w-10 h-10 transition-colors ${buttonClass}`}
                onClick={() => onAdd(item)}
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>

            {/* ---------- DESKTOP LAYOUT ---------- */}
            <div className="hidden md:flex flex-col h-full justify-between gap-3">
              <div className="w-full aspect-square rounded-xl flex items-center justify-center mb-2 bg-gray-50 overflow-hidden">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.nama_produk}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl">🍽️</span>
                )}
              </div>
              <h4 className="font-semibold text-base text-center text-gray-800 line-clamp-2">
                {item.nama_produk}
              </h4>
              <div className="text-xs text-center mb-3 line-clamp-2 text-gray-500">
                {item.keterangan || "Menu spesial kami"}
              </div>
              <div className="flex items-center justify-between gap-2 mt-auto">
                <span className={`text-xl font-bold ${priceColor}`}>
                  Rp {Number(item.harga).toLocaleString("id-ID")}
                </span>
                <Button
                  size="icon"
                  className={`rounded-full text-white w-10 h-10 transition-colors ${buttonClass}`}
                  onClick={() => onAdd(item)}
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
