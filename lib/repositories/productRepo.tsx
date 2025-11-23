// lib/repositories/productRepository.ts
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
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string | null;
};

export class ProductRepository {
  async getAll(): Promise<Product[]> {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return (data || []).map((item) => ({
      id: item.id,
      name: item.nama_produk || "",
      category: item.kategori || "",
      price: Number(item.harga) || 0,
      image: item.image_url || "🍽️",
      description: item.keterangan || "",
    }));
  }

  async create(input: ProductInput): Promise<void> {
    const { error } = await supabase.from("menu_items").insert([
      {
        nama_produk: input.name.trim(),
        kategori: input.category,
        harga: input.price,
        keterangan: input.description.trim(),
        image_url: input.imageUrl,
      },
    ]);

    if (error) throw error;
  }

  async update(id: string, input: ProductInput): Promise<void> {
    const { error } = await supabase
      .from("menu_items")
      .update({
        nama_produk: input.name.trim(),
        kategori: input.category,
        harga: input.price,
        keterangan: input.description.trim(),
        image_url: input.imageUrl,
      })
      .eq("id", id.trim());

    if (error) throw error;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("menu_items")
      .delete()
      .eq("id", id.trim());

    if (error) throw error;
  }
}
