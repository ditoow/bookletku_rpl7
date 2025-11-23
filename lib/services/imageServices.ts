// lib/services/imageService.ts
import { supabase } from "@/lib/supabase";

export class ImageService {
  private readonly MAX_SIZE = 5 * 1024 * 1024; // 5MB

  validateImage(file: File): void {
    if (!file.type.startsWith("image/")) {
      throw new Error("File harus berupa gambar!");
    }

    if (file.size > this.MAX_SIZE) {
      throw new Error("Ukuran gambar maksimal 5MB!");
    }
  }

  async upload(file: File): Promise<string> {
    this.validateImage(file);

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

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("menu-images").getPublicUrl(filePath);

    return publicUrl;
  }

  createPreview(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}