// Stats Cards with Brown/Minimalist Theme
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Eye, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";

interface StatsCardsProps {
    stats: {
        totalRevenue: number;
        totalOrders: number;
        totalQuantitySold: number;
        totalMenuItemViews: number;
        uniqueMenuItems: number;
    };
    formatNumber: (num: number) => string;
    formatCurrency: (amount: number) => string;
}

export default function StatsCards({ stats, formatNumber, formatCurrency }: StatsCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Revenue Card */}
            <Card className="border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-xl bg-white/20 overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#A27B5C]/30 to-[#8d6a4d]/30 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                    <CardTitle className="text-sm font-medium text-gray-700">Total Revenue</CardTitle>
                    <div className="p-3 bg-gradient-to-br from-[#A27B5C] to-[#8d6a4d] backdrop-blur-sm rounded-xl shadow-lg shadow-[#A27B5C]/30">
                        <DollarSign className="h-5 w-5 text-white" />
                    </div>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-[#A27B5C] to-[#8d6a4d] bg-clip-text text-transparent">
                        {formatCurrency(stats.totalRevenue)}
                    </div>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-[#A27B5C]" />
                        Dari {formatNumber(stats.totalOrders)} pesanan
                    </p>
                </CardContent>
            </Card>

            {/* Orders Card */}
            <Card className="border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-xl bg-white/20 overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#A27B5C]/30 to-[#8d6a4d]/30 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                    <CardTitle className="text-sm font-medium text-gray-700">Total Pesanan</CardTitle>
                    <div className="p-3 bg-gradient-to-br from-[#A27B5C] to-[#8d6a4d] backdrop-blur-sm rounded-xl shadow-lg shadow-[#A27B5C]/30">
                        <ShoppingCart className="h-5 w-5 text-white" />
                    </div>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-[#A27B5C] to-[#8d6a4d] bg-clip-text text-transparent">
                        {formatNumber(stats.totalOrders)}
                    </div>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-[#A27B5C]" />
                        {formatNumber(stats.totalQuantitySold)} item terjual
                    </p>
                </CardContent>
            </Card>

            {/* Views Card */}
            <Card className="border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-xl bg-white/20 overflow-hidden relative group md:col-span-2 lg:col-span-1">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#A27B5C]/30 to-[#8d6a4d]/30 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                    <CardTitle className="text-sm font-medium text-gray-700">Views Menu</CardTitle>
                    <div className="p-3 bg-gradient-to-br from-[#A27B5C] to-[#8d6a4d] backdrop-blur-sm rounded-xl shadow-lg shadow-[#A27B5C]/30">
                        <Eye className="h-5 w-5 text-white" />
                    </div>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-[#A27B5C] to-[#8d6a4d] bg-clip-text text-transparent">
                        {formatNumber(stats.totalMenuItemViews)}
                    </div>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-[#A27B5C]" />
                        {stats.uniqueMenuItems} menu berbeda
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
