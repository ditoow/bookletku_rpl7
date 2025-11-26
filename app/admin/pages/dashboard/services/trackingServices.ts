import { supabase } from "@/lib/supabase";


// ===== TYPES =====
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
  total_ordered: number;
  total_quantity: number;
  total_revenue: number;
  last_ordered: string;
  created_at: string;
  menu_items?: {
    nama_produk: string;
    kategori: string;
    harga: number;
    image_url?: string;
  };
}

export interface TableUsageData {
  id: string;
  table_id: string;
  usage_count: number;
  last_used: string;
  created_at: string;
  tables?: {
    table_number: number;
  };
}

// ===== PAGE TRACKING =====

/**
 * Track page/menu access
 */


// === GET MENU PALING SERING DITAMBAHKAN KE CART ===
export async function getMostAddedToCart(limit = 5) {
  const { data, error } = await supabase
    .from("cart_add_tracking")
    .select(
      `
        id,
        menu_item_id,
        menu_items (
          nama_produk,
          kategori,
          harga
        )
      `
    );

  if (error) {
    console.error("Error fetching cart added tracking:", error);
    return [];
  }

  // GROUP & COUNT
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

  // Convert to array & sort
  const result = Object.values(grouped)
    .sort((a: any, b: any) => b.total_added - a.total_added)
    .slice(0, limit);

  return result;
}

export async function trackPageAccess(pageName: string): Promise<void> {
  try {
    const { data: existing } = await supabase
      .from('page_tracking')
      .select('*')
      .eq('page_name', pageName)
      .single();

    if (existing) {
      await supabase
        .from('page_tracking')
        .update({
          access_count: existing.access_count + 1,
          last_accessed: new Date().toISOString()
        })
        .eq('page_name', pageName);
    } else {
      await supabase
        .from('page_tracking')
        .insert({
          page_name: pageName,
          access_count: 1
        });
    }
  } catch (error) {
    console.error('Error tracking page access:', error);
  }
}

/**
 * Get top accessed pages
 */
export async function getTopPages(limit: number = 10): Promise<PageTrackingData[]> {
  try {
    const { data, error } = await supabase
      .from('page_tracking')
      .select('*')
      .order('access_count', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching top pages:', error);
    return [];
  }
}

// ===== MENU ITEM VIEWS TRACKING =====

/**
 * Track menu item view
 */
export async function trackMenuItemView(menuItemId: string): Promise<void> {
  try {
    const { data: existing } = await supabase
      .from('menu_item_views')
      .select('*')
      .eq('menu_item_id', menuItemId)
      .single();

    if (existing) {
      await supabase
        .from('menu_item_views')
        .update({
          view_count: existing.view_count + 1,
          last_viewed: new Date().toISOString()
        })
        .eq('menu_item_id', menuItemId);
    } else {
      await supabase
        .from('menu_item_views')
        .insert({
          menu_item_id: menuItemId,
          view_count: 1
        });
    }
  } catch (error) {
    console.error('Error tracking menu item view:', error);
  }
}

/**
 * Get most viewed menu items
 */
export async function getMostViewedMenuItems(limit: number = 10): Promise<MenuItemViewData[]> {
  try {
    const { data, error } = await supabase
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

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching most viewed menu items:', error);
    return [];
  }
}

// ===== MENU ITEM ORDER STATS =====

/**
 * Get best selling menu items (by order count)
 */
export async function getBestSellingItems(limit: number = 10): Promise<MenuItemOrderStats[]> {
  try {
    const { data, error } = await supabase
      .from('menu_item_order_stats')
      .select(`
        *,
        menu_items (
          nama_produk,
          kategori,
          harga,
          image_url
        )
      `)
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
 */
export async function getHighestRevenueItems(limit: number = 10): Promise<MenuItemOrderStats[]> {
  try {
    const { data, error } = await supabase
      .from('menu_item_order_stats')
      .select(`
        *,
        menu_items (
          nama_produk,
          kategori,
          harga,
          image_url
        )
      `)
      .order('total_revenue', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching highest revenue items:', error);
    return [];
  }
}

// ===== TABLE USAGE TRACKING =====

/**
 * Get most used tables
 */


// ===== STATISTICS =====

/**
 * Get comprehensive tracking statistics
 */
export async function getTrackingStats() {
  try {
    // Total page accesses
    const { data: pageData } = await supabase
      .from('page_tracking')
      .select('access_count');
    const totalPageAccesses = pageData?.reduce((sum, item) => sum + item.access_count, 0) || 0;

    // Total menu item views
    const { data: viewData } = await supabase
      .from('menu_item_views')
      .select('view_count');
    const totalMenuItemViews = viewData?.reduce((sum, item) => sum + item.view_count, 0) || 0;

    // Total orders and revenue
    const { data: orderStatsData } = await supabase
      .from('menu_item_order_stats')
      .select('total_ordered, total_quantity, total_revenue');
    
    const totalOrders = orderStatsData?.reduce((sum, item) => sum + item.total_ordered, 0) || 0;
    const totalQuantitySold = orderStatsData?.reduce((sum, item) => sum + item.total_quantity, 0) || 0;
    const totalRevenue = orderStatsData?.reduce((sum, item) => sum + Number(item.total_revenue), 0) || 0;

    // Total table usage
  

    // Unique counts
    const { count: uniquePages } = await supabase
      .from('page_tracking')
      .select('*', { count: 'exact', head: true });

    const { count: uniqueMenuItems } = await supabase
      .from('menu_item_views')
      .select('*', { count: 'exact', head: true });


    return {
      totalPageAccesses,
      totalMenuItemViews,
      totalOrders,
      totalQuantitySold,
      totalRevenue,

      uniquePages: uniquePages || 0,
      uniqueMenuItems: uniqueMenuItems || 0,

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

// ===== KATEGORI ANALYSIS =====

/**
 * Get category performance statistics
 */
export async function getCategoryStats() {
  try {
    const { data, error } = await supabase
      .from('menu_item_order_stats')
      .select(`
        *,
        menu_items (
          kategori
        )
      `);

    if (error) throw error;

    // Group by category
    const categoryMap = new Map();
    
    data?.forEach(item => {
      const category = item.menu_items?.kategori || 'Unknown';
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