"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";
import Sidebar from "@/components/Sidebar";

interface Client {
  _id: string;
  clientName: string;
  clientImage: string[];
}

const ClientsList = () => {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data } = await axios.get("/api/client");
        if (data.success && Array.isArray(data.data)) {
          setClients(data.data);
        } else {
          setClients([]);
        }
      } catch (error) {
        console.error(error);
        setClients([]);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client?")) return;
    try {
      await axios.delete(`/api/client/${id}`);
      setClients(clients.filter((p) => p._id !== id));
      alert("Client deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete client");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 container mx-auto">
      <Sidebar />
      <div className="flex-1 px-6 lg:px-16 py-12">

        <div className="flex flex-col sm:flex-row justify-center items-center mb-10 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center sm:text-left">
            Clients List
          </h1>
        </div>

          <button
            onClick={() => router.push("/admin/clientslist/upload")}
            className="inline-flex items-center gap-2 px-6 py-3 mb-5  border-[#205057] text-[#205057] border rounded font-semibold shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
          >
            Add New Client
          </button>

        {loading ? (
          <div className="flex justify-center items-center h-[30vh]">
      <div className="w-16 h-16 border-4 border-[#205057] border-t-transparent border-b-transparent rounded-full animate-spin"></div>
    </div>
        ) : clients.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">
            No clients found. Add new clients to get started.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {clients.map((client) => (
              <div
                key={client._id}
                className="bg-white border border-gray-300 rounded shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="p-4 flex justify-center items-center bg-gray-50">
                  <img
                    src={client.clientImage[0]}
                    alt={client.clientName}
                    className="w-full h-48 object-contain rounded-md"
                  />
                </div>

                <div className="px-4 py-3">
                  <h3 className="text-black font-semibold text-base line-clamp-2">
                    {client.clientName}
                  </h3>
                </div>

                <div className="flex divide-x divide-gray-200">
                  <button
                    onClick={() =>
                      router.push(`/admin/clientslist/update/${client._id}`)
                    }
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-orange-500 text-white font-semibold transition"
                  >
                    <Edit className="w-5 h-5" /> update
                  </button>
                  <button
                    onClick={() => handleDelete(client._id)}
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

export default ClientsList;