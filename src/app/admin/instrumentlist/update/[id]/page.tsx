'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import Sidebar from '@/components/Sidebar';

const InstrumentUpdate = () => {
  const router = useRouter();
  const { id } = useParams();

  const [instrumentName, setInstrumentName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);
  const [newImages, setNewImages] = useState<File[]>([]);

  useEffect(() => {
    const fetchInstrument = async () => {
      try {
        const res = await axios.get(`/api/instrument/${id}`);
        if (res.data.success && res.data.data) {
          const instrument = res.data.data;
          setInstrumentName(instrument.instrumentName || '');
          setBrandName(instrument.brandName || '');
          setExistingImages(instrument.instrumentImage || []);
        } else {
          alert(res.data.message || 'Failed to fetch instrument');
        }
      } catch (error) {
        console.error(error);
        alert('Failed to fetch instrument data');
      }
    };

    fetchInstrument();
  }, [id]);

  const handleReplaceClick = (index: number) => {
    setReplaceIndex(index);
    document.getElementById('replaceImageInput')?.click();
  };

  const handleReplaceImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && replaceIndex !== null) {
      const file = e.target.files[0];
      if (!file) return;

      const updatedExisting = [...existingImages];
      updatedExisting[replaceIndex] = URL.createObjectURL(file);
      setExistingImages(updatedExisting);

      const updatedNewImages = [...newImages];
      updatedNewImages[replaceIndex] = file;
      setNewImages(updatedNewImages);

      setReplaceIndex(null);
    }
  };

  const handleAddNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (!file) return;

      setExistingImages([...existingImages, URL.createObjectURL(file)]);
      setNewImages([...newImages, file]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instrumentName) {
      alert('Instrument name is required');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('instrumentName', instrumentName);
      formData.append('brandName', brandName);

      newImages.forEach((file) => file && formData.append('instrumentImage', file));

      await axios.put(`/api/instrument/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Instrument updated successfully!');
      router.push('/admin/instrumentlist');
    } catch (error) {
      console.error(error);
      alert('Failed to update instrument');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex justify-center p-6 mt-[5vh] h-fit">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white border border-gray-300 shadow-lg rounded-xl p-8 space-y-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">Update Instrument</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instrument Name</label>
            <input
              type="text"
              value={instrumentName || ''}
              onChange={(e) => setInstrumentName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#205057] focus:outline-none"
              placeholder="Enter instrument name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
            <input
              type="text"
              value={brandName || ''}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#205057] focus:outline-none"
              placeholder="Enter brand name"
            />
          </div>
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">Instrument Images</label>
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
             {existingImages.length > 0 ? (
               existingImages.map((img, idx) => (
                 <div
                   key={idx}
                   className="relative group cursor-pointer rounded-lg overflow-hidden border transition hover:shadow-md"
                   onClick={() => handleReplaceClick(idx)}
                 >
                   <img
                     src={img}
                     alt={`Instrument ${idx}`}
                     className="w-full h-28 object-contain bg-gray-50"
                   />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-80 bg-[#205057]/70 text-white font-bold transition">
                     Update
                   </div>
                 </div>
               ))
             ) : (
               <div
                 className="w-full h-28 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
                 style={{ borderColor: '#205057' }}
                 onClick={() => document.getElementById('addImageInput')?.click()}
               >
                 <p className="text-gray-500 font-medium">+ Add Image</p>
               </div>
             )}
           </div>
         </div>

          <input
            id="replaceImageInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleReplaceImage}
          />
          <input
            id="addImageInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAddNewImage}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#205057] text-white py-3 rounded-lg font-semibold hover:bg-[#1b454b] transition"
          >
            {loading ? 'Updating...' : 'Update Instrument'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InstrumentUpdate;
