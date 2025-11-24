"use client";

import React, { useState } from "react";
import { Menu, Search, ShoppingCart, Plus, Edit2, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function FoodOrderApp() {
  const [cartItems] = useState([
    {
      id: 1,
      name: "Crunchy Cashew ...",
      quantity: 2,
      price: 1500,
      image: "🥗",
    },
    { id: 2, name: "Coke", quantity: 3, price: 8000, image: "🥤" },
    { id: 3, name: "Steak meat", quantity: 1, price: 7655, image: "🥩" },
    { id: 4, name: "Pizza", quantity: 1, price: 15000, image: "🍕" },
  ]);

  const categories = [
    { name: "Makanan", icon: "🥗", active: false },
    { name: "Minuman", icon: "🥗", active: true },
    { name: "Snack", icon: "🍕", active: false },
    { name: "Desert", icon: "🥩", active: false },
  ];

  const popularDishes = [
    {
      name: "Fresh and Health Salad",
      calories: 60,
      persons: 4,
      price: 2.65,
      image: "🥗",
    },
    {
      name: "Cashew Nut Chicken Salad",
      calories: 60,
      persons: 4,
      price: 2.65,
      image: "🥗",
      featured: true,
    },
    {
      name: "Crunchy Cashew Salad",
      calories: 60,
      persons: 4,
      price: 2.65,
      image: "🥗",
    },
    {
      name: "Sesame Dressing Salad",
      calories: 60,
      persons: 4,
      price: 2.65,
      image: "🥗",
    },
    {
      name: "Sesame Dressing Salad",
      calories: 60,
      persons: 4,
      price: 2.65,
      image: "🥗",
    },
    {
      name: "Sesame Dressing Salad",
      calories: 60,
      persons: 4,
      price: 2.65,
      image: "🥗",
    },
    {
      name: "Sesame Dressing Salad",
      calories: 60,
      persons: 4,
      price: 2.65,
      image: "🥗",
    },
    {
      name: "Sesame Dressing Salad",
      calories: 60,
      persons: 4,
      price: 2.65,
      image: "🥗",
    },
    {
      name: "Sesame Dressing Salad",
      calories: 60,
      persons: 4,
      price: 2.65,
      image: "🥗",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 10;
  const final = subtotal - discount;

  return (
    <div className="min-h-screen bg-[#DCD7C9] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <Button className="bg-[#A27B5C] hover:bg-[#8d6a4d] text-white w-12 h-12">
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search"
                  className="pl-10 bg-white border-0 shadow-sm"
                />
              </div>
              <Button variant="ghost" className="w-12 h-12">
                <span className="text-2xl">😋</span>
              </Button>
              <Button variant="ghost" className="w-12 h-12 relative">
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 bg-[#2C3930] text-white rounded-full w-5 h-5 p-0 flex items-center justify-center text-xs">
                  12
                </Badge>
              </Button>
            </div>

            {/* Breadcrumb */}
            <div className="text-sm text-gray-600">
              Store <span className="mx-2">›</span>{" "}
              <span className="font-medium">Bell fresh</span>
            </div>

            {/* Store Banner */}
            <Card className="bg-gradient-to-r from-[#2C3930] via-[#3F4F44] to-[#2C3930] text-white border-0 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#A27B5C] rounded-full w-16 h-16 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        Bell.
                      </span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Bell fresh</h2>
                      <p className="text-[#DCD7C9] text-sm">
                        Fresh & healthy food recipe
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#A27B5C]">
                        24
                      </div>
                      <div className="text-sm text-[#DCD7C9]">Total item</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#A27B5C]">
                        09
                      </div>
                      <div className="text-sm text-[#DCD7C9]">Category</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#A27B5C]">
                        04
                      </div>
                      <div className="text-sm text-[#DCD7C9]">Outdate</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <div className="grid grid-cols-6 gap-3">
              {categories.map((cat, idx) => (
                <Card
                  key={idx}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    cat.active
                      ? "bg-[#A27B5C] border-[#A27B5C]"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{cat.icon}</div>
                    <div
                      className={`text-sm font-medium ${
                        cat.active ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {cat.name}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Popular Dish */}
            <div>
              <h3 className="text-xl font-bold mb-4">Popular Dish</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {popularDishes.map((dish, idx) => (
                  <Card
                    key={idx}
                    className={`overflow-hidden transition-all hover:shadow-lg ${
                      dish.featured
                        ? "bg-[#A27B5C] border-[#A27B5C]"
                        : "bg-white"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="relative mb-3">
                        <div
                          className={`w-full aspect-square rounded-full ${
                            dish.featured ? "bg-[#8d6a4d]" : "bg-gray-100"
                          } flex items-center justify-center text-6xl mb-3`}
                        >
                          {dish.image}
                        </div>
                      </div>
                      <h4
                        className={`font-semibold mb-2 text-center ${
                          dish.featured ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {dish.name}
                      </h4>
                      <div
                        className={`text-xs text-center mb-3 ${
                          dish.featured ? "text-white/90" : "text-gray-500"
                        }`}
                      >
                        {dish.calories} calories • {dish.persons} persons
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xl font-bold ${
                            dish.featured ? "text-white" : "text-gray-800"
                          }`}
                        >
                          ${dish.price.toFixed(2)}
                        </span>
                        <Button
                          size="icon"
                          className={`rounded-full ${
                            dish.featured
                              ? "bg-white text-[#A27B5C] hover:bg-gray-100"
                              : "bg-[#A27B5C] text-white hover:bg-[#8d6a4d]"
                          }`}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">My cart</h3>
                  <Button variant="ghost" size="icon">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">
                        {item.image}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col gap-0.5 text-sm">
                          <span className="text-gray-700">{item.name}</span>
                          <div>
                            <span>x</span>
                            <span className="font-medium">{item.quantity}</span>
                            <div className="text-black font-semibold">
                              Rp.{item.price * item.quantity}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-md">
                        <Button
                          size="icon"
                          className="w-7 h-7 rounded-full bg-[#A27B5C] text-white hover:bg-[#8d6a4d]"
                        >
                          <Minus className="w-1 h1" />
                        </Button>

                        <Input
                          type="number"
                          className="
    w-12 text-center
    [&::-webkit-inner-spin-button]:appearance-none
    [&::-webkit-outer-spin-button]:appearance-none
    [-moz-appearance:textfield]
  "
                          defaultValue={item.quantity}
                        />

                        <Button
                          size="icon"
                          className="w-7 h-7 rounded-full bg-[#A27B5C] text-white hover:bg-[#8d6a4d]"
                        >
                          <Plus className="w-1 h1" />
                        </Button>
                      </div>
                    </div>
                    // <div className="flex"></div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Final</span>
                    <span className="font-medium">{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-[#2C3930] font-medium">
                      %{discount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="font-semibold">Final</span>
                    <span className="text-2xl font-bold text-[#A27B5C]">
                      ${final.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-[#2C3930] hover:bg-[#3F4F44] text-white py-6 text-lg font-semibold">
                  Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
