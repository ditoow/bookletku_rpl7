import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, ImageIcon } from "lucide-react";
import { type Product } from "../services/productService";

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onImageClick: (url: string) => void;
}

export function ProductTable({
  products,
  loading,
  onEdit,
  onDelete,
  onImageClick,
}: ProductTableProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (products.length === 0 && !loading) {
    return (
      <Card className="bg-white border shadow-sm mt-6">
        <CardContent className="p-0">
          <div className="text-center py-16 text-gray-500">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">Produk tidak ditemukan</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border shadow-sm mt-6">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">
                  Produk
                </th>
                <th className="text-center p-4 font-semibold text-gray-700">
                  Keterangan
                </th>
                <th className="text-center p-4 font-semibold text-gray-700">
                  Harga
                </th>
                <th className="text-center p-4 font-semibold text-gray-700">
                  Kategori
                </th>
                <th className="text-center p-4 font-semibold text-gray-700">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {product.image.startsWith("http") ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-14 h-14 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200 shadow-sm border"
                          onClick={() => onImageClick(product.image)}
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded-lg text-2xl">
                          {product.image}
                        </div>
                      )}
                      <span className="font-medium text-gray-800">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-center text-gray-600 max-w-xs truncate">
                    {product.description || "-"}
                  </td>
                  <td className="p-4 font-semibold text-center text-gray-800">
                    {formatPrice(product.price)}
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(product)}
                        className="hover:bg-blue-50 hover:border-blue-300"
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300"
                        onClick={() => onDelete(product.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
