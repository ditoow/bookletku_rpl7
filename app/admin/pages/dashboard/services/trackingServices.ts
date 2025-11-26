import { supabase } from "@/lib/supabase";


export interface PageTrackingData {
  id: string;
  page_name: string;
  access_count: number;
  last_accessed: string;
  created_at: string;
}

export interface MenuItemViewData {
  id: string;
  menu_item_id: string;
  view_count: number;
  last_viewed: string;
  created_at: string;
  menu_items?: {
    nama_produk: string;
    kategori: string;
    harga: number;
    image_url?: string;
  };
}


export interface MenuItemOrderStats {
  id: string;
  menu_item_id: string;
  nama_produk: string; 
  kategori: string;
  harga: number;
  image_url?: string;
  total_ordered: number;
  total_quantity: number;
  total_revenue: number;
  last_ordered: string;
  created_at: string;
}


export async function getMostAddedToCart(limit = 5) {
  const { data, error } = await supabase
    .from("cart_add_tracking")
    .select(`
        id,
        menu_item_id,
        menu_items (
          nama_produk,
          kategori,
          harga
        )
      `);

  if (error) {
    console.error("Error fetching cart added tracking:", error);
    return [];
  }

  const grouped = data.reduce((acc: any, item: any) => {
    if (!acc[item.menu_item_id]) {
      acc[item.menu_item_id] = {
        menu_item_id: item.menu_item_id,
        menu_items: item.menu_items,
        total_added: 0,
      };
    }
    acc[item.menu_item_id].total_added += 1;
    return acc;
  }, {});

  return Object.values(grouped)
    .sort((a: any, b: any) => b.total_added - a.total_added)
    .slice(0, limit);
}


export async function trackPageAccess(pageName: string): Promise<void> {
  try {
    const { data: existing } = await supabase
      .from('page_tracking')
      .select('*')
      .eq('page_name', pageName)
      .single();

    if (existing) {
      await supabase.from('page_tracking').update({
          access_count: existing.access_count + 1,
          last_accessed: new Date().toISOString()
        }).eq('page_name', pageName);
    } else {
      await supabase.from('page_tracking').insert({
          page_name: pageName,
          access_count: 1
        });
    }
  } catch (error) {
    console.error('Error tracking page access:', error);
  }
}

export async function getTopPages(limit: number = 10): Promise<PageTrackingData[]> {
  const { data } = await supabase
    .from('page_tracking')
    .select('*')
    .order('access_count', { ascending: false })
    .limit(limit);
  return data || [];
}


export async function trackMenuItemView(menuItemId: string): Promise<void> {
  try {
    const { data: existing } = await supabase
      .from('menu_item_views')
      .select('*')
      .eq('menu_item_id', menuItemId)
      .single();

    if (existing) {
      await supabase.from('menu_item_views').update({
          view_count: existing.view_count + 1,
          last_viewed: new Date().toISOString()
        }).eq('menu_item_id', menuItemId);
    } else {
      await supabase.from('menu_item_views').insert({
          menu_item_id: menuItemId,
          view_count: 1
        });
    }
  } catch (error) {
    console.error('Error tracking menu item view:', error);
  }
}

export async function getMostViewedMenuItems(limit: number = 10): Promise<MenuItemViewData[]> {
  const { data } = await supabase
    .from('menu_item_views')
    .select(`
      *,
      menu_items (
        nama_produk,
        kategori,
        harga,
        image_url
      )
    `)
    .order('view_count', { ascending: false })
    .limit(limit);
  return data || [];
}



/**
 * Get best selling menu items (by order count)
 * FIXED: Mengambil langsung dari View yang sudah lengkap (tanpa join di code)
 */
export async function getBestSellingItems(limit: number = 10): Promise<MenuItemOrderStats[]> {
  try {
    const { data, error } = await supabase
      .from('menu_item_order_stats')
      .select('*') 
      .order('total_ordered', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching best selling items:', error);
    return [];
  }
}

/**
 * Get highest revenue menu items
 * FIXED: Mengambil langsung dari View yang sudah lengkap
 */
export async function getHighestRevenueItems(limit: number = 10): Promise<MenuItemOrderStats[]> {
  try {
    const { data, error } = await supabase
      .from('menu_item_order_stats')
      .select('*') 
      .order('total_revenue', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching highest revenue items:', error);
    return [];
  }
}



/**
 * Get comprehensive tracking statistics
 * FIXED: Menghitung Total Revenue & Orders dari tabel transaksi asli
 */
export async function getTrackingStats() {
  try {
    
    const { data: pageData } = await supabase
      .from('page_tracking')
      .select('access_count');
    const totalPageAccesses = pageData?.reduce((sum, item) => sum + item.access_count, 0) || 0;

    
    
    const { count: totalCartAdds } = await supabase
      .from('cart_add_tracking')
      .select('*', { count: 'exact', head: true });

    
    const { count: totalOrders } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true });

    
    const { data: revenueData } = await supabase
      .from('orders')
      .select('total_amount');
    const totalRevenue = revenueData?.reduce((sum, item) => sum + (Number(item.total_amount) || 0), 0) || 0;

    
    const { data: itemsSoldData } = await supabase
      .from('order_items')
      .select('quantity');
    const totalQuantitySold = itemsSoldData?.reduce((sum, item) => sum + item.quantity, 0) || 0;

    
    const { count: uniquePages } = await supabase
      .from('page_tracking')
      .select('*', { count: 'exact', head: true });
      
    const { count: uniqueMenuItems } = await supabase
      .from('menu_items')
      .select('*', { count: 'exact', head: true });

    
    return {
      totalPageAccesses,
      totalMenuItemViews: totalCartAdds || 0, 
      totalOrders: totalOrders || 0,
      totalQuantitySold,
      totalRevenue,
      uniquePages: uniquePages || 0,
      uniqueMenuItems: uniqueMenuItems || 0,
      totalTableUsage: 0,
      uniqueTables: 0, 
    };
  } catch (error) {
    console.error('Error fetching tracking stats:', error);
    
    return {
      totalPageAccesses: 0,
      totalMenuItemViews: 0,
      totalOrders: 0,
      totalQuantitySold: 0,
      totalRevenue: 0,
      totalTableUsage: 0,
      uniquePages: 0,
      uniqueMenuItems: 0,
      uniqueTables: 0 
    };
  }
}



/**
 * Get category performance statistics
 * FIXED: Mengambil dari View yang sudah lengkap
 */
export async function getCategoryStats() {
  try {
    const { data, error } = await supabase
      .from('menu_item_order_stats')
      .select('*'); 

    if (error) throw error;

    
    const categoryMap = new Map();
    
    data?.forEach(item => {
      const category = item.kategori || 'Unknown';
      const existing = categoryMap.get(category) || {
        kategori: category,
        total_ordered: 0,
        total_quantity: 0,
        total_revenue: 0
      };

      categoryMap.set(category, {
        kategori: category,
        total_ordered: existing.total_ordered + item.total_ordered,
        total_quantity: existing.total_quantity + item.total_quantity,
        total_revenue: existing.total_revenue + Number(item.total_revenue)
      });
    });

    return Array.from(categoryMap.values())
      .sort((a, b) => b.total_revenue - a.total_revenue);
  } catch (error) {
    console.error('Error fetching category stats:', error);
    return [];
  }
}