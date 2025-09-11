"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";
import AdminProtectedRoute from "@/components/ProductedRoute";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

interface Product {
  _id: string;
  productName: string;
  productPath: string;
  description?: string;
  category?: string;
  mainImage: string[];
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      setDeleting(id);
      await axios.delete(`/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("Product deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <AdminProtectedRoute>
      <div className="flex min-h-screen container mx-auto ">
        <Sidebar />
        <div className="max-w-7xl mx-auto p-6 h-auto pb-20">
          <div className="pb-10  text-black">
            <h1 className="text-3xl font-extrabold mb-10 text-center tracking-wide">
              Products List
            </h1>

            <div className="gap-6 flex justify-start items-start">
              <Link
                href="/admin/productupload"
                className="p-2 rounded border shadow-lg hover:scale-105 transition-transform text-center font-semibold text-[#205057]"
              >
                Upload New Product
              </Link>
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-[40vh]">
              <div className="w-16 h-16 border-4 border-[#205057] border-t-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border flex flex-col"
                >
                  {product.mainImage?.length > 0 && (
                    <img
                      src={product.mainImage[0]}
                      alt={product.productName}
                      className="h-56 w-fit mx-auto object-contain"
                    />
                  )}

                  <div className="p-4 flex-1 flex flex-col space-y-3">
                    <h2 className="text-xl font-semibold">
                      {product.productName}
                    </h2>
                    <p className="text-gray-600 line-clamp-3">
                      {product.description}
                    </p>

                    <div className="flex justify-between items-center mt-4 gap-2">
                      <button
                        onClick={() =>
                          router.push(`/products/${product.productPath}`)
                        }
                        className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        View
                      </button>

                      <div className="flex rounded overflow-hidden">
                        <button
                          onClick={() =>
                            router.push(`/admin/productupdate/${product._id}`)
                          }
                          className="flex items-center gap-1 bg-orange-500 text-white px-3 py-1 text-sm hover:bg-orange-600"
                        >
                          <Edit className="w-4 h-4" /> Update
                        </button>

                        <button
                          onClick={() => handleDelete(product._id)}
                          disabled={deleting === product._id}
                          className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 text-sm hover:bg-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                          {deleting === product._id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
