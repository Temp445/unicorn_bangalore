'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

const MachineryUpdate = () => {
  const router = useRouter();
  const { id } = useParams();

  const [machineryName, setMachineryName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);
  const [newImages, setNewImages] = useState<File[]>([]);

  useEffect(() => {
    const fetchMachinery = async () => {
      try {
        const { data } = await axios.get(`/api/machinery/${id}`);
        setMachineryName(data.machineryName);
        setBrandName(data.brandName);
        setExistingImages(data.machineryImage);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch machinery');
      }
    };
    fetchMachinery();
  }, [id]);

  const handleReplaceClick = (index: number) => {
    setReplaceIndex(index);
    const fileInput = document.getElementById('replaceImageInput');
    fileInput?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && replaceIndex !== null) {
      const file = e.target.files[0];
      if (!file) return;

      const updatedExisting = [...existingImages];
      updatedExisting[replaceIndex] = URL.createObjectURL(file);
      setExistingImages(updatedExisting);

      const updatedNew = [...newImages];
      updatedNew[replaceIndex] = file;
      setNewImages(updatedNew);

      setReplaceIndex(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!machineryName) {
      alert('Machinery name is required');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('machineryName', machineryName);
      formData.append('brandName', brandName);
      existingImages.forEach((img) => formData.append('existingImages', img));
      newImages.forEach((file) => file && formData.append('machineryImage', file));

      await axios.put(`/api/machinery/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Machinery updated successfully!');
      router.push('/admin/machinerylist');
    } catch (error) {
      console.error(error);
      alert('Failed to update machinery');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex mt-[10vh] justify-center p-6 h-fit">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white border border-gray-300 shadow-lg rounded-xl p-8 space-y-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Update Machinery
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Machinery Name
            </label>
            <input
              type="text"
              value={machineryName}
              onChange={(e) => setMachineryName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#205057] focus:outline-none"
              placeholder="Enter machinery name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Name
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#205057] focus:outline-none"
              placeholder="Enter machinery name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Machinery Images
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
         {existingImages.length > 0 ? (
              existingImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative group cursor-pointer rounded-lg overflow-hidden border transition"
                  onClick={() => handleReplaceClick(idx)}
                >
                  <img
                    src={img}
                    alt={`Existing ${idx}`}
                    className="w-full h-28 object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-80 bg-[#205057]/70 text-white font-bold">
                    update
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
            onChange={handleImageChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#205057] text-white py-3 rounded-lg font-semibold hover:bg-[#1b454b] transition"
          >
            {loading ? 'Updating...' : 'Update Machinery'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MachineryUpdate;
