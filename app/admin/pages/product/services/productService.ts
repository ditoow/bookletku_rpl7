import { supabase } from "@/lib/supabase";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
};

export type ProductInput = {
  nama_produk: string;
  kategori: string;
  harga: number;
  keterangan: string;
  image_url: string | null;
};

// --- Fetch Data ---
export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  // Mapping data dari database ke tipe Product aplikasi kita
  return (data || []).map((item) => ({
    id: item.id,
    name: item.nama_produk || "",
    category: item.kategori || "",
    price: Number(item.harga) || 0,
    image: item.image_url || "🍽️",
    description: item.keterangan || "",
  }));
};

// --- Upload Image ---
export const uploadProductImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}_${Math.random()
    .toString(36)
    .substring(2)}.${fileExt}`;
  const filePath = `product-images/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("menu-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) throw new Error(uploadError.message);

  const {
    data: { publicUrl },
  } = supabase.storage.from("menu-images").getPublicUrl(filePath);

  return publicUrl;
};

// --- Create Product ---
export const createProduct = async (product: ProductInput) => {
  const { error } = await supabase.from("menu_items").insert([product]);
  if (error) throw new Error(error.message);
};

// --- Update Product ---
export const updateProduct = async (id: string, product: ProductInput) => {
  const { error } = await supabase
    .from("menu_items")
    .update(product)
    .eq("id", id);
  if (error) throw new Error(error.message);
};

// --- Delete Product ---
export const deleteProductById = async (id: string) => {
  const { error } = await supabase.from("menu_items").delete().eq("id", id);
  if (error) throw new Error(error.message);
};