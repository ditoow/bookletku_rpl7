"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { Plus, Search, Loader2, X } from "lucide-react";
import { useProducts } from "@/features/admin/hooks/useProduct";
import { Product, updateMenuOrder } from "@/features/admin/services/productService";
import { ProductTable } from "@/features/admin/components/Product/productTable";
import { ProductFormDialog } from "@/features/admin/components/Product/productFormDialog";
import { ProductDeleteDialog } from "@/features/admin/components/Product/productDeleteDialog";

export default function Dashboard() {
  const {
    products,
    loading,
    error,
    actionLoading,
    addProduct,
    editProduct,
    removeProduct,
  } = useProducts();

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    try {
      if (editingProduct) {
        await editProduct(editingProduct.id, data);
      } else {
        await addProduct(data);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal menyimpan");
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      try {
        await removeProduct(deleteConfirmId);
        setDeleteConfirmId(null);
      } catch (err) {
        alert("Gagal menghapus produk");
      }
    }
  };

  const handleReorder = async (newOrder: any[]) => {
    try {
      await updateMenuOrder(newOrder);
      console.log("Urutan tersimpan!");
    } catch (err) {
      alert("Gagal menyimpan urutan.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF9B6A]" />
        <p className="text-gray-500">Memuat produk...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-2 md:p-0">
      {/* --- Header --- */}
      <div className="backdrop-blur-xl bg-white/30 border border-white/40 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Products Management
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-1">
              Kelola menu dan produk restoran Anda
            </p>
          </div>
          <Button
            onClick={handleAddClick}
            className="bg-gradient-to-br from-[#A27B5C] to-[#8d6a4d] hover:from-[#8d6a4d] hover:to-[#7a5d44] text-white rounded-xl w-full sm:w-auto shadow-lg shadow-[#A27B5C]/30 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus size={20} className="mr-2" />
            Tambah Produk
          </Button>
        </div>
      </div>

      {/* --- Search Bar (Responsif) --- */}
      <div className="backdrop-blur-xl bg-white/30 border border-white/40 rounded-2xl p-4 md:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg md:text-xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Daftar Produk
            </h3>
            <span className="text-sm text-gray-600">
              {products.length} produk tersedia
            </span>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <Input
              placeholder="Cari produk..."
              className="pl-10 w-full bg-white/50 backdrop-blur-sm border-white/60 focus:border-[#A27B5C] rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 backdrop-blur-xl bg-red-100/50 border border-red-300/50 rounded-xl text-red-700 shadow-lg">
          <p className="font-semibold">Terjadi Kesalahan: {error}</p>
        </div>
      )}

      {/* Tabel sudah responsive karena ProductTable.tsx memiliki overflow-x-auto */}
      <ProductTable
        products={filteredProducts}
        loading={loading}
        onEdit={handleEditClick}
        onDelete={setDeleteConfirmId}
        onImageClick={setPreviewImage}
        onReorder={handleReorder}
      />

      <ProductFormDialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        productToEdit={editingProduct}
        onSubmit={handleFormSubmit}
        loading={actionLoading}
      />

      <ProductDeleteDialog
        open={!!deleteConfirmId}
        onOpenChange={(open) => !open && setDeleteConfirmId(null)}
        onConfirm={handleDeleteConfirm}
        loading={actionLoading}
      />

      <Dialog
        open={!!previewImage}
        onOpenChange={(open) => !open && setPreviewImage(null)}
      >
        <DialogContent className="max-w-4xl p-2 backdrop-blur-2xl bg-black/90 border border-white/20 shadow-2xl">
          <div className="relative flex items-center justify-center">
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="max-w-full max-h-[90vh] rounded-lg object-contain"
              />
            )}
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 backdrop-blur-xl bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/40"
            >
              <X size={20} />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
