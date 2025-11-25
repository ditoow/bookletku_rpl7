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
}

export default function FeaturedMenu({
  items,
  loading,
  error,
  language = "en",
}: FeaturedMenuProps) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">
        {language === "id" ? "Menu Unggulan" : "Featured Menu"}
      </h3>

      {loading ? (
        <div className="text-sm text-gray-500">
          {language === "id" ? "Memuat menu..." : "Loading menu..."}
        </div>
      ) : error ? (
        <div className="text-sm text-red-600">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-3 gap-4 auto-rows-auto">
          {items.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden transition-all hover:shadow-lg bg-white p-0"
            >
              <CardContent className="p-0 h-full md:h-[176]">
                <div className="relative p-0">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
