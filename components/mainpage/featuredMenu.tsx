"use client";
import { Card, CardContent } from "@/components/ui/card";

interface MenuItem {
  id: string;
  nama_produk: string;
  image_url?: string;
}
interface FeaturedMenuProps {
  items: MenuItem[];
  loading?: boolean;
  error?: string | null;
  language?: "id" | "en";
  theme?: "minimalist" | "colorful";
}

export default function FeaturedMenu({
  items,
  loading,
  error,
  language = "id",
  theme,
}: FeaturedMenuProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold">
          {language === "id" ? "Menu Unggulan" : "Featured Menu"}
        </h3>
      </div>

      {loading ? (
        <div className="text-sm text-gray-500">
          {language === "id" ? "Memuat..." : "Loading..."}
        </div>
      ) : error ? (
        <div className="text-sm text-red-600">Error: {error}</div>
      ) : (
        <div className="px-0.5 pl-4">
          <div className="flex gap-3 rounded-2xl overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex-none h-35 w-3xs md:w-3xs md:h-40 snap-start"
              >
                <Card className="overflow-hidden transition-all hover:shadow-md bg-white p-0 h-full border-0 shadow-none group">
                  <CardContent className="p-0 h-full">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.nama_produk}
                          className="w-full h-full object-cover object-center"
                        />
                      ) : (
                        <div className="text-2xl">🍽️</div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-8 px-3 py-2">
                        <p className="text-white text-sm font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] line-clamp-2">
                          {item.nama_produk}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
