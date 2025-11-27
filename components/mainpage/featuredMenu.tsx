"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Star, TrendingUp, Crown } from "lucide-react";

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
  theme = "minimalist",
}: FeaturedMenuProps) {
  const headerBgClass =
    theme === "minimalist"
      ? "bg-gradient-to-r from-[#A27B5C]/10 to-transparent"
      : "bg-gradient-to-r from-pink-100/50 to-purple-100/50";

  const iconColor = theme === "minimalist" ? "text-[#A27B5C]" : "text-pink-500";

  const badgeClass =
    theme === "minimalist"
      ? "bg-gradient-to-r from-[#A27B5C] to-[#8d6a4d] text-white"
      : "bg-gradient-to-r from-yellow-400 to-orange-500 text-white";

  const cardBorderClass =
    theme === "minimalist" ? "border-[#A27B5C]/20" : "border-purple-300/30";

  return (
    <div className="w-full">
      {/* Header dengan style yang lebih menarik */}
      <div
        className={`flex items-center justify-between mb-4 p-3 rounded-xl ${headerBgClass}`}
      >
        <div className="flex items-center gap-2">
          <div className={`${iconColor}`}>
            <Star className="w-5 h-5 fill-current" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            {language === "id" ? "Menu Unggulan" : "Featured Menu"}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-full border">
          <TrendingUp className="w-3.5 h-3.5 text-green-600" />
          <span className="text-xs font-bold text-gray-700">
            {items.length} {language === "id" ? "item" : "items"}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="text-sm text-gray-500">
              {language === "id" ? "Memuat..." : "Loading..."}
            </p>
          </div>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-600 font-medium">Error: {error}</p>
        </div>
      ) : (
        <div className="px-0.5 pl-2">
          <div className="flex gap-4 rounded-2xl overflow-x-auto -mx-4  px-4 md:mx-0 md:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="flex-none h-40 w-[180px] md:w-[200px] md:h-44 snap-start"
              >
                <Card
                  className={`
                  overflow-hidden 
                  transition-all duration-300 ease-out
                  hover:shadow-2xl hover:-translate-y-1
                  bg-white p-0 h-full 
                  border-2 ${cardBorderClass}
                  group
                  relative
                `}
                >
                  <CardContent className="p-0 h-full">
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      {/* Ranking badge untuk 3 item pertama */}
                      {index < 3 && (
                        <div
                          className={`
                          absolute top-2 left-2 z-10
                          ${badgeClass}
                          px-2 py-1 rounded-full
                          flex items-center gap-1
                          shadow-lg
                          animate-pulse
                        `}
                        >
                          <Crown className="w-3 h-3" />
                          <span className="text-xs font-black">
                            #{index + 1}
                          </span>
                        </div>
                      )}

                      {/* Image dengan overlay effect */}
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.nama_produk}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                          🍽️
                        </div>
                      )}

                      {/* Gradient overlay yang lebih stylish */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                      {/* Text container dengan animasi */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 transform group-hover:translate-y-0 transition-transform">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-white text-sm font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] line-clamp-2 flex-1">
                            {item.nama_produk}
                          </p>
                          <div
                            className={`
                            ${iconColor} bg-white/20 backdrop-blur-sm 
                            p-1.5 rounded-full
                            opacity-0 group-hover:opacity-100
                            transform translate-x-2 group-hover:translate-x-0
                            transition-all duration-300
                          `}
                          >
                            <Star className="w-3.5 h-3.5 fill-current" />
                          </div>
                        </div>

                        {/* Progress bar atau rating indicator */}
                        <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              theme === "minimalist"
                                ? "bg-[#A27B5C]"
                                : "bg-gradient-to-r from-yellow-400 to-orange-500"
                            }`}
                            style={{ width: `${100 - index * 15}%` }}
                          />
                        </div>
                      </div>

                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
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
