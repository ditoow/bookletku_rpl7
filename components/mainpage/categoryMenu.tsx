"use client";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORY_ICONS } from "@/lib/categoryIcons";

interface CategoryMenuProps {
  categories: string[];
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
}

export default function CategoryMenu({
  categories,
  activeCategory,
  setActiveCategory,
}: CategoryMenuProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
      {categories.map((name: string) => {
        const isAll = name === "Semua";
        const isActive =
          (isAll && activeCategory === null) ||
          (!isAll && activeCategory === name);

        const icon = isAll ? "📋" : CATEGORY_ICONS[name] ?? "🥗";

        return (
          <Card
            key={name}
            className={`cursor-pointer transition-all hover:shadow-md ${
              isActive
                ? "bg-[#A27B5C] border-[#A27B5C]"
                : "bg-white border-gray-200"
            }`}
            onClick={() => setActiveCategory(isAll ? null : name)}
          >
            <CardContent className="text-center">
              <div className="text-3xl mb-2">{icon}</div>
              <div
                className={`text-sm font-medium ${
                  isActive ? "text-white" : "text-gray-700"
                }`}
              >
                {name}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
