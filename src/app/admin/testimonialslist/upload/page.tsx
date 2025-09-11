"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

const TestimonialUpload = () => {
  const [clientName, setClientName] = useState("");
  const [clientRole, setClientRole] = useState("");
  const [description, setDescription] = useState("");
  const [clientLogos, setClientLogos] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setClientLogos(files);
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
  };

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName || !clientRole) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("clientName", clientName);
      formData.append("clientRole", clientRole);
      formData.append("description", description);
      clientLogos.forEach((file) => {
        if (file) formData.append("clientLogo", file);
      });

      await axios.post("/api/testimonial", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Testimonial uploaded successfully");
      router.push("/admin/testimonialslist");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex items-center justify-center p-6 py-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white max-w-3xl shadow-lg rounded-xl p-8 space-y-6 w-full border border-gray-300"
        >
          <h1 className="text-2xl font-bold mb-6 text-center text-[#205057]">
            Upload Testimonial
          </h1>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Client Name *
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#205057] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name or Role
            </label>
            <input
              type="text"
              value={clientRole}
              onChange={(e) => setClientRole(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#205057] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#205057] focus:outline-none"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client Logo
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
              className="w-52 min-h-32 border-2 border-dashed rounded-lg flex flex-wrap items-center justify-center cursor-pointer hover:bg-gray-100 transition gap-2"
              style={{ borderColor: "#205057" }}
              onClick={handleBoxClick}
            >
              {previewUrls.length === 0 ? (
                <p className="text-gray-500">upload logo</p>
              ) : (
                previewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="w-52 h-32 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50"
                  >
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#205057] text-white py-2 px-4 rounded-lg shadow hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Testimonial"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestimonialUpload;
