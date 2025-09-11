"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";
import Sidebar from "@/components/Sidebar";

interface Testimonial {
  _id: string;
  clientName: string;
  clientRole: string;
  description: string;
  clientLogo: string[];
}

const TestimonialList = () => {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await axios.get("/api/testimonial");
        if (data.success && Array.isArray(data.data)) {
          setTestimonials(data.data);
        } else {
          setTestimonials([]);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await axios.delete(`/api/testimonial/${id}`);
      setTestimonials(testimonials.filter((t) => t._id !== id));
      alert("Testimonial deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete testimonial");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 container mx-auto">
      <Sidebar />
      <div className="flex-1 px-6 lg:px-16 py-12">
        <div className="flex flex-col sm:flex-row justify-center items-center mb-10 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center sm:text-left">
            Testimonials List
          </h1>
        </div>

        <button
          onClick={() => router.push("/admin/testimonialslist/upload")}
          className="inline-flex items-center gap-2 px-6 py-3 mb-5 border-[#205057] text-[#205057] border rounded font-semibold shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
        >
          Add New Testimonial
        </button>

        {loading ? (
          <div className="flex justify-center items-center h-[30vh]">
            <div className="w-16 h-16 border-4 border-[#205057] border-t-transparent border-b-transparent rounded-full animate-spin"></div>
          </div>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">
            No testimonials found. Add new testimonials to get started.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-300 rounded shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 overflow-hidden"
              >
               {item.clientLogo && item.clientLogo.length > 0 ? (
               <div className="p-4 flex flex-wrap justify-center items-center gap-2 bg-gray-50">
                 {item.clientLogo.map((url, i) => (
                   <img
                     key={i}
                     src={url}
                     alt={item.clientName}
                     className="w-full h-24 rounded border object-contain"
                   />
                 ))}
               </div>
             ) : (
               <div className="p-4 w-full h-32 flex justify-center items-center bg-gray-50 text-gray-400">
                 No Logo Available
               </div>
             )}

                

                <div className="px-4 py-3">
                  <h3 className="text-black font-semibold text-base line-clamp-2">
                    {item.clientName}
                  </h3>
                  <p className="text-sm text-gray-600">{item.clientRole}</p>
                  {item.description && (
                    <p className="mt-2 text-gray-700 text-sm line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="flex divide-x divide-gray-200">
                  <button
                    onClick={() =>
                      router.push(`/admin/testimonialslist/update/${item._id}`)
                    }
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-orange-500 text-white font-semibold transition"
                  >
                    <Edit className="w-5 h-5" /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-600 text-white font-semibold"
                  >
                    <Trash2 className="w-5 h-5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialList;
