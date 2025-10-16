'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Edit, Trash2 } from 'lucide-react';

interface Instrument {
  _id: string;
  instrumentName: string;
  brandName?: string;
  instrumentImage: string[];
}

const InstrumentList = () => {
  const router = useRouter();
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const { data } = await axios.get('/api/instrument');

        const instrumentArray = Array.isArray(data)
          ? data
          : Array.isArray(data.data)
          ? data.data
          : [];

        setInstruments(instrumentArray);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch instruments.');
        setInstruments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchInstruments();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this instrument?')) return;
    try {
      await axios.delete(`/api/instrument/${id}`);
      setInstruments(instruments.filter((m) => m._id !== id));
      alert('Instrument deleted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to delete instrument.');
    }
  };

  return (
    <div className="flex min-h-screen container mx-auto">
      <main className="flex-1 bg-gradient-to-br from-slate-50 via-indigo-50 to-orange-100">
        <div className="px-2 lg:px-5 py-16 container mx-auto">
          <div className="flex justify-center items-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Instrument List</h1>
          </div>

          <button
            onClick={() => router.push('/admin/instrumentlist/upload')}
            className="group relative border border-[#205057] text-[#205057] px-8 py-2 mb-5 rounded shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <span className="relative flex items-center gap-2">Add New Instrument</span>
          </button>

          {loading ? (
            <div className="flex justify-center items-center h-[30vh]">
              <div className="w-16 h-16 border-4 border-[#205057] border-t-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
              {instruments.map((instrument) => (
                <div
                  key={instrument._id}
                  className="group relative bg-white/70 backdrop-blur-xl rounded shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/50 overflow-hidden"
                >
                  <div className="relative bg-white/80 backdrop-blur-xl rounded overflow-hidden">
                    <div className="relative overflow-hidden">
                      {instrument.instrumentImage && instrument.instrumentImage.length > 0 ? (
                        <div className="relative">
                          <img
                            src={instrument.instrumentImage[0]}
                            alt={instrument.instrumentName}
                            className="w-full h-64 object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-64 bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center">
                          <p className="text-slate-500 font-medium">No Image Available</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="mb-4 p-2">
                        <h3 className="text-base font-bold text-slate-800 mb-1 line-clamp-2">
                          {instrument.instrumentName}
                        </h3>
                      </div>

                      {instrument.brandName && (
                        <div className="absolute top-0 bg-[#205057] w-fit px-2 py-1 text-white text-sm">
                          <h3>{instrument.brandName}</h3>
                        </div>
                      )}

                      <div className="flex divide-x divide-gray-200">
                        <button
                          onClick={() =>
                            router.push(`/admin/instrumentlist/update/${instrument._id}`)
                          }
                          className="flex-1 flex items-center justify-center gap-2 py-2 bg-orange-500 text-white font-semibold transition"
                        >
                          <Edit className="w-5 h-5" /> Update
                        </button>
                        <button
                          onClick={() => handleDelete(instrument._id)}
                          className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-600 text-white font-semibold"
                        >
                          <Trash2 className="w-5 h-5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default InstrumentList;
