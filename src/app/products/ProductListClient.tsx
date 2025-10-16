"use client";

import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Phone, Mail } from "lucide-react";
import Link from "next/link";

interface Product {
  _id: string;
  productName: string;
  productImage: string[];
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentProductIndex, setCurrentProductIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const result = await res.json();
        const data: Product[] = result.data || [];
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const openOverlay = (index: number) => setCurrentProductIndex(index);
  const closeOverlay = () => setCurrentProductIndex(null);
  const prevProduct = () =>
    currentProductIndex !== null &&
    setCurrentProductIndex(currentProductIndex === 0 ? products.length - 1 : currentProductIndex - 1);
  const nextProduct = () =>
    currentProductIndex !== null &&
    setCurrentProductIndex(currentProductIndex === products.length - 1 ? 0 : currentProductIndex + 1);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-[#205057] border-t-transparent border-b-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <>
      {currentProductIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center px-2 py-6 animate-fadeIn"
          onClick={closeOverlay}
        >
          <div
            className="relative max-w-5xl w-full flex flex-col items-center bg-white rounded-xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeOverlay}
              className="absolute top-4 right-4 text-gray-800 hover:text-gray-600 transition"
            >
              <X size={28} />
            </button>

            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 text-center">
              {products[currentProductIndex].productName}
            </h2>

            <div className="relative w-full flex items-center justify-center mb-4">
              <button
                onClick={prevProduct}
                className="absolute left-0 text-gray-800 bg-white/80 p-2 rounded-full hover:bg-white transition"
              >
                <ChevronLeft size={28} />
              </button>

              {products[currentProductIndex].productImage?.[0] && (
                <img
                  src={products[currentProductIndex].productImage[0]}
                  alt={products[currentProductIndex].productName}
                  className="max-h-[60vh] w-auto rounded-lg shadow-lg border border-gray-200 object-contain"
                />
              )}

              <button
                onClick={nextProduct}
                className="absolute right-0 text-gray-800 bg-white/80 p-2 rounded-full hover:bg-white transition"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            <div className="w-full bg-green-50 border border-emerald-300 rounded-lg shadow p-4 flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <Phone className="text-emerald-600" />
                <span className="font-medium text-gray-800">+91 9710946801</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-emerald-600" />
                <span className="font-medium text-gray-800">unicornpdy@gmail.com</span>
              </div>
              <Link
                href="/contact"
                className="mt-2 md:mt-0 px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="relative h-auto md:mb-32 overflow-hidden">
        <div className="text-center py-24 px-2 md:px-6 bg-[#205057] relative">
          <div className="mb-6">
            <h1 className="text-2xl md:text-5xl font-sans text-white mb-4">
              Explore Our Products
            </h1>
            <div className="w-40 h-1 bg-white mx-auto rounded-full"></div>
          </div>
          <p className="text-slate-200 mt-8 max-w-4xl mx-auto md:text-xl font-sans leading-relaxed">
            Discover precision-engineered solutions designed to optimize production, enhance efficiency, and ensure consistent quality in your manufacturing operations.
          </p>
        </div>

        <div className="container mx-auto px-4 xl:px-10 2xl:px-14 py-20 h-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={product._id}
                className="group relative bg-white border border-gray-500 rounded-xl overflow-hidden shadow-lg transition-all transform hover:scale-105 cursor-pointer"
                onClick={() => openOverlay(index)}
              >
                <div className="relative overflow-hidden h-64">
                  {product.productImage?.[0] && (
                    <img
                      src={product.productImage[0]}
                      alt={product.productName}
                      className="w-full h-full  transition-transform duration-700 group-hover:scale-110"
                    />
                  )}

                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-semibold bg-emerald-700 px-4 py-2 rounded-lg shadow">
                      View Product
                    </span>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h2 className="text-xl text-gray-800 font-bold">{product.productName}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
