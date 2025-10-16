"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2, UploadCloud } from "lucide-react";

const UploadProduct = () => {
  const [productName, setProductName] = useState("");
  const [productImages, setProductImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  // Open file dialog when box clicked
  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setProductImages(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName.trim() || productImages.length === 0) {
      alert("Please enter a product name and select at least one image.");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("productName", productName);
      productImages.forEach((file) => data.append("productImage", file));

      await axios.post("/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product uploaded successfully!");
      router.push("/admin");
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl border border-gray-200 p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Upload New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Product Images */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Product Images <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />

            <div
              className="w-fit min-h-[150px] border-2 border-dashed rounded-lg flex flex-wrap items-center justify-center cursor-pointer hover:bg-gray-100 transition gap-3 p-3 overflow-auto"
              style={{ borderColor: "#205057" }}
              onClick={handleBoxClick}
            >
              {previewUrls.length === 0 ? (
                <div className="flex flex-col items-center text-gray-500">
                  <UploadCloud size={32} className="mb-2" />
                  <span className="text-sm font-medium">Click to upload image</span>
                </div>
              ) : (
                previewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="w-32 h-32 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center"
                  >
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Uploading...
              </>
            ) : (
              "Upload Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
