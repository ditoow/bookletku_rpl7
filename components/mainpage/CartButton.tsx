"use client";

import { ShoppingCart } from "lucide-react";

interface CartButtonProps {
  onClick: () => void;
  totalItems: number;
}

export default function CartButton({ onClick, totalItems }: CartButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-4 right-4 z-50
        bg-linear-to-r from-[#2C3930] via-[#3F4F44] to-[#2C3930]
        text-white font-semibold
        rounded-full shadow-lg
        w-16 h-16
        flex items-center justify-center
      "
    >
      <div className="relative">
        <ShoppingCart className="w-7 h-7" />
        {totalItems > 0 && (
          <span
            className="
              absolute -top-2 -right-2
              bg-red-600 text-white
              text-xs font-bold
              rounded-full w-5 h-5
              flex items-center justify-center
            "
          >
            {totalItems}
          </span>
        )}
      </div>
    </button>
  );
}
