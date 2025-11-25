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
}

export default function MenuDish({ items, onAdd }: MenuDishProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-0">
      {items.map((item, idx) => {
        const dish = idx === 0;
        return (
          <Card
            key={item.id}
            className="overflow-hiddenp p-0 transition-all hover:shadow-lg h-[380px]"
          >
            <CardContent className="p-4 pb-5 flex flex-col justify-between h-full ">
              <div className="flex flex-col">
                <div className="w-full rounded-2xl flex items-center justify-center mb-3">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.nama_produk}
                      className=" w-max object-cover rounded-2xl"
                    />
                  ) : (
                    <span className="text-4xl">🍽️</span>
                  )}
                </div>

                <h4 className="font-semibold mb-2 text-center text-gray-800">
                  {item.nama_produk}
                </h4>

                <div className="text-xs text-center mb-3 line-clamp-2 text-gray-500">
                  {item.keterangan || "Menu spesial kami"}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-800">
                  Rp {Number(item.harga).toLocaleString("id-ID")}
                </span>

                <Button
                  size="icon"
                  className="rounded-full bg-[#A27B5C] text-white hover:bg-[#8d6a4d]"
                  onClick={() => onAdd(item)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
