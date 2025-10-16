"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const ProductUpdate = () => {
  const { id } = useParams();
  const router = useRouter();

  const [productName, setProductName] = useState("");
  const [productImages, setProductImages] = useState<File[]>([]);
  const [existingProductImages, setExistingProductImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const productInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        const product = res.data;

        setProductName(product.productName || "");
        setExistingProductImages(product.productImage || []);
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleProductImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setProductImages(files);
    setExistingProductImages(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName.trim()) {
      alert("Please enter a product name.");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("productName", productName);
      productImages.forEach((file) => data.append("productImage", file));

      await axios.put(`/api/products/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product updated successfully!");
      router.push("/admin");
    } catch (err) {
      console.error(err);
      alert("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Update Product</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block font-semibold mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Product Images</label>
            <div className="flex flex-wrap gap-3 mb-3">
              {existingProductImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`product-${i}`}
                  className="w-32 h-32 object-cover rounded border"
                />
              ))}
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={productInputRef}
              className="w-full border border-gray-300 p-2 rounded"
              onChange={handleProductImagesChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductUpdate;
