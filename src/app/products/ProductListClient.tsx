"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { MoveRight } from "lucide-react";
import Footer from "@/components/Footer";
import Link from "next/link";
interface Product {
  _id: string;
  productName: string;
  productPath: string;
  description?: string;
  category?: string;
  mainImage: string[];
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const result = await res.json();
        const data: Product[] = result.data || [];
        await new Promise((resolve) => setTimeout(resolve, 500));
        setProducts(data);
        const uniqueCategories = Array.from(
          new Set(data.map((p) => p.category).filter(Boolean))
        );
        setCategories(uniqueCategories as string[]);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "all" || product.category === selectedCategory
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-[#205057] border-t-transparent border-b-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="h-auto md:mb-32  relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-center py-24 px-2 md:px-6 bg-[#205057] relative">
            <div className="mb-6">
              <h1 className="text-2xl md:text-4xl font-black text-white mb-4 z-20">
                Explore Our <span className="">Products</span>
              </h1>
              <div className="w-52 h-1 bg-white mx-auto rounded-full"></div>
            </div>
            <p className="text-slate-300 mt-8 max-w-4xl mx-auto  md:text-2xl font-light leading-relaxed">
              Discover precision-engineered solutions designed to optimize
              production, enhance efficiency, and ensure consistent quality in
              your manufacturing operations.
            </p>
          </div>

          {categories.length > 0 && (
            <div className="flex flex-wrap  gap-4 mt-10 mb-16 px-6 container mx-auto justify-center items-center">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-6 py-2 rounded-full font-semibold text-sm md:text-base transition-all duration-300 border ${
                  selectedCategory === "all"
                    ? "bg-[#205057] text-white border-transparent shadow-md"
                    : "bg-gray-700 text-gray-300 border-gray-500 hover:bg-gray-600 hover:text-white hover:shadow-sm"
                }`}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full font-semibold text-sm md:text-base transition-all duration-300 border ${
                    selectedCategory === cat
                      ? "bg-[#447c73] text-white border-transparent shadow-md"
                      : " text-black border-gray-800 hover:shadow-sm"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="container mx-auto px-6 pb-20 h-auto">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-32">
                <p className="text-slate-600 text-2xl font-light">
                  No products found
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 relative">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className="group relative bg-white/10 backdrop-blur-lg border border-gray-400 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 transform hover:scale-105 "
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <Link href={`/products/${product.productPath}`}>
                      <div className="relative overflow-hidden h-64">
                        {product.mainImage?.[0] && (
                          <img
                            src={product.mainImage[0]}
                            alt={product.productName}
                            className="w-full h-full  transition-transform duration-700 group-hover:scale-125"
                          />
                        )}
                      </div>
                    </Link>

                    <div className="relative p-6 space-y-4 pb-20">
                      <h2 className="text-xl text-black font-bold transition-all duration-300">
                        {product.productName}
                      </h2>
                      <p className="text-black text-base leading-relaxed line-clamp-3">
                        {product.description}
                      </p>
                    </div>

                    <Link
                      href={`/products/${product.productPath}`}
                      className="bg-[#205057] pt-1 flex absolute bottom-0 w-full "
                    >
                      <div className="flex items-center justify-center gap-6">
                        <div className="flex gap-2 px-6 py-3 rounded-xl text-white  font-semibold transition-transform duration-300 hover:scale-105">
                          View Details{" "}
                          <span>
                            <MoveRight />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
