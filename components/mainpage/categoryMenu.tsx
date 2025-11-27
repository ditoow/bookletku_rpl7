"use client";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORY_ICONS } from "@/lib/categoryIcons";

interface CategoryMenuProps {
  categories: string[];
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  theme: "minimalist" | "colorful";
  language: "id" | "en";
}

export default function CategoryMenu({
  categories,
  activeCategory,
  setActiveCategory,
  theme,
  language,
}: CategoryMenuProps) {
  const activeBgClass =
    theme === "minimalist"
      ? "bg-[#A27B5C] border-[#A27B5C]"
      : "bg-pink-500 border-pink-500";

  const translateCategory = (cat: string) => {
    if (language === "id") return cat;

    const map: Record<string, string> = {
      Semua: "All",
      Makanan: "Food",
      Minuman: "Drinks",
      Snack: "Snacks",
      Dessert: "Desserts",
    };
    return map[cat] || cat;
  };

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold">
          {language === "id" ? "Kategori" : "Categories"}
        </h3>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {categories.map((name: string) => {
          const isAll = name === "Semua";
          const isActive =
            (isAll && activeCategory === null) ||
            (!isAll && activeCategory === name);
          const icon = isAll ? "📋" : CATEGORY_ICONS[name] ?? "🥗";

          return (
            <Card
              key={name}
              className={`cursor-pointer transition-all hover:shadow-md min-w-[100px] shrink-0 md:min-w-0 md:w-auto ${
                isActive ? activeBgClass : "bg-white border-gray-200"
              }`}
              onClick={() => setActiveCategory(isAll ? null : name)}
            >
              <CardContent className="flex flex-col items-center justify-center p-0 text-center h-full">
                <div className="text-3xl mb-2">{icon}</div>
                <div
                  className={`text-sm font-medium whitespace-nowrap ${
                    isActive ? "text-white" : "text-gray-700"
                  }`}
                >
                  {translateCategory(name)}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
