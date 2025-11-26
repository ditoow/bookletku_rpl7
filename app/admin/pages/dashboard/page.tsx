"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getTopPages,
  getMostViewedMenuItems,
  getBestSellingItems,
  getHighestRevenueItems,
  getCategoryStats,
  getTrackingStats,
  getMostAddedToCart,
  PageTrackingData,
  MenuItemViewData,
  MenuItemOrderStats,
  TableUsageData,
} from "@/app/admin/pages/dashboard/services/trackingServices";

import {
  Eye,
  Menu,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  Activity,
  Users,
  Package,
  LineChart as LineChartIcon,
} from "lucide-react";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface TrackingStats {
  totalPageAccesses: number;
  totalMenuItemViews: number;
  totalOrders: number;
  totalQuantitySold: number;
  totalRevenue: number;
  totalTableUsage: number;
  uniquePages: number;
  uniqueMenuItems: number;
  uniqueTables: number;
}

interface CategoryStats {
  kategori: string;
  total_ordered: number;
  total_quantity: number;
  total_revenue: number;
}

export default function AdminDashboard() {
  const [mostAddedToCart, setMostAddedToCart] = useState<any[]>([]);

  const [topPages, setTopPages] = useState<PageTrackingData[]>([]);
  const [mostViewedItems, setMostViewedItems] = useState<MenuItemViewData[]>(
    []
  );
  const [bestSellingItems, setBestSellingItems] = useState<
    MenuItemOrderStats[]
  >([]);
  const [highestRevenueItems, setHighestRevenueItems] = useState<
    MenuItemOrderStats[]
  >([]);
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
  const [stats, setStats] = useState<TrackingStats>({
    totalPageAccesses: 0,
    totalMenuItemViews: 0,
    totalOrders: 0,
    totalQuantitySold: 0,
    totalRevenue: 0,
    totalTableUsage: 0,
    uniquePages: 0,
    uniqueMenuItems: 0,
    uniqueTables: 0,
  });

  const [loading, setLoading] = useState(true);

  const chartData = mostViewedItems.map((item) => ({
    name: item.menu_items?.nama_produk ?? "Unknown",
    views: item.view_count,
  }));

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    setLoading(true);
    try {
      const [
        pages,
        viewedItems,
        bestItems,
        revenueItems,
        categories,
        statistics,
        addedCart,
      ] = await Promise.all([
        getTopPages(5),
        getMostViewedMenuItems(5),
        getBestSellingItems(5),
        getHighestRevenueItems(5),
        getCategoryStats(),
        getTrackingStats(),
        getMostAddedToCart(5), // ← NEW
      ]);

      setMostAddedToCart(addedCart);
      setTopPages(pages);
      setMostViewedItems(viewedItems);
      setBestSellingItems(bestItems);
      setHighestRevenueItems(revenueItems);
      setCategoryStats(categories);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }

  function formatNumber(num: number): string {
    return new Intl.NumberFormat("id-ID").format(num);
  }

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          Monitor performa menu, penjualan, dan aktivitas pengunjung
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Dari {formatNumber(stats.totalOrders)} pesanan
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Pesanan</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(stats.totalOrders)}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatNumber(stats.totalQuantitySold)} item terjual
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Views Menu</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(stats.totalMenuItemViews)}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.uniqueMenuItems} menu berbeda
            </p>
          </CardContent>
        </Card>
      </div>

      {/* GRID UTAMA */}
      <div className="grid grid-cols-1 gap-6">
        {/* === MENU PALING DITAMBAHKAN KE KERANJANG === */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Menu Paling Sering Ditambahkan ke Keranjang
            </CardTitle>
          </CardHeader>

          <CardContent>
            {mostAddedToCart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Belum ada data penambahan keranjang
              </p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* === KIRI: GRAFIK === */}
                <div className="w-full h-full py-5">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={mostAddedToCart.map((i) => ({
                        name: i.menu_items?.nama_produk,
                        total: i.total_added,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#4f46e5" // warna ungu Elegant (tidak apa, ini 1 warna)
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* === KANAN: LIST ITEM === */}
                <div className="space-y-3">
                  {mostAddedToCart.map((item: any, index: number) => (
                    <div
                      key={item.menu_item_id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                          {index + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {item.menu_items?.nama_produk}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.menu_items?.kategori}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          {formatNumber(item.total_added)}
                        </p>
                        <p className="text-xs text-gray-500">ditambahkan</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* === KATEGORI TERPOPULER === */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Kategori Populer
            </CardTitle>
          </CardHeader>
          <CardContent>
            {categoryStats.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Tidak ada data kategori
              </p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* === KIRI: GRAFIK === */}
                <div className="w-full h-full py-5">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={categoryStats.map((i) => ({
                        name: i.kategori,
                        total: i.total_quantity, // jumlah item terjual per kategori
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#10b981" // hijau emerald
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* === KANAN: LIST CATEGORY === */}
                <div className="space-y-3">
                  {categoryStats.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-semibold text-sm">
                          {index + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900">
                            {category.kategori}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatNumber(category.total_quantity)} item terjual
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">
                          {formatCurrency(category.total_revenue)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* === REVENUE TERTINGGI === */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Menu dengan Revenue Tertinggi
            </CardTitle>
          </CardHeader>
          <CardContent>
            {highestRevenueItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Belum ada data revenue
              </p>
            ) : (
              <div className="space-y-3">
                {highestRevenueItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {item.menu_items?.nama_produk}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatNumber(item.total_ordered)} pesanan
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">
                        {formatCurrency(Number(item.total_revenue))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
