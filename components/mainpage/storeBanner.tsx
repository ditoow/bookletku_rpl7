"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function StoreBanner({
  totalItems,
  totalCategories,
}: {
  totalItems: number;
  totalCategories: number;
}) {
  return (
    <Card className="bg-linear-to-r from-[#2C3930] via-[#3F4F44] to-[#2C3930] text-white border-0 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-[#A27B5C] rounded-full w-16 h-16 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">Bell.</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Bell fresh</h2>
              <p className="text-[#DCD7C9] text-sm">
                Fresh &amp; healthy food recipe
              </p>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#A27B5C]">
                {totalItems.toString().padStart(2, "0")}
              </div>
              <div className="text-sm text-[#DCD7C9]">Total item</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-[#A27B5C]">
                {totalCategories.toString().padStart(2, "0")}
              </div>
              <div className="text-sm text-[#DCD7C9]">Category</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
