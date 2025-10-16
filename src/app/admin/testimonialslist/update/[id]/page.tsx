"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const TestimonialUpdate = () => {
  const { id } = useParams();
  const router = useRouter();

  const [clientName, setClientName] = useState("");
  const [clientRole, setClientRole] = useState("");
  const [description, setDescription] = useState("");
  const [existingLogos, setExistingLogos] = useState<string[]>([]);
  const [newLogos, setNewLogos] = useState<(File | null)[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const { data } = await axios.get(`/api/testimonial/${id}`);
        if (data.success && data.data) {
          const testimonial = data.data;
          setClientName(testimonial.clientName || "");
          setClientRole(testimonial.clientRole || "");
          setDescription(testimonial.description || "");
          setExistingLogos(testimonial.clientLogo || []);
          setNewLogos(new Array(testimonial.clientLogo?.length || 0).fill(null));
        }
      } catch (error) {
        console.error("Error fetching testimonial:", error);
      }
    };
    if (id) fetchTestimonial();
  }, [id]);

  const handleLogoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const updatedNew = [...newLogos];
      updatedNew[index] = file;
      setNewLogos(updatedNew);

      const updatedExisting = [...existingLogos];
      updatedExisting[index] = URL.createObjectURL(file); 
      setExistingLogos(updatedExisting);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientRole) {
      alert("Client name and role are required");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("clientName", clientName);
      formData.append("clientRole", clientRole);
      formData.append("description", description);

      existingLogos.forEach((logo, idx) => {
        if (newLogos[idx]) {
          formData.append("clientLogo", newLogos[idx] as File);
        } else {
          formData.append("existingLogos", logo);
        }
      });

      await axios.put(`/api/testimonial/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Testimonial updated successfully!");
      router.push("/admin/testimonialslist");
    } catch (error) {
      console.error("Error updating testimonial:", error);
      alert("Failed to update testimonial");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6 lg:p-12">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white border shadow-lg rounded-2xl p-8 space-y-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Update Testimonial
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client Name
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Enter client name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name or Role
            </label>
            <input
              type="text"
              value={clientRole}
              onChange={(e) => setClientRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Enter company name or role"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Enter description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client Logo
            </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
         {existingLogos.length > 0 ? (
         existingLogos.map((logo, idx) => (
      <div
        key={idx}
        className="relative group rounded-lg overflow-hidden border"
      >
        <img
          src={logo}
          alt={`Logo ${idx}`}
          className="w-full h-28 object-contain bg-gray-50"
        />
        <label className="absolute inset-0 flex items-center justify-center bg-[#205057]/70 text-white text-sm font-bold opacity-0 group-hover:opacity-100 cursor-pointer">
          update
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleLogoChange(e, idx)}
          />
        </label>
      </div>
    ))
  ) : (
    <div
      className="w-full h-28 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
      style={{ borderColor: '#205057' }}
      onClick={() => document.getElementById('addImageInput')?.click()}
    >
      <p className="text-gray-500 font-medium">+ Add Logo</p>
    </div>
  )}
</div>
    </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#205057] text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Updating..." : "Update Testimonial"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestimonialUpdate;
