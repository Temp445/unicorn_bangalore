'use client';

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

const InstrumentUpload = () => {
  const router = useRouter();
  const [instrumentName, setInstrumentName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [instrumentImages, setInstrumentImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setInstrumentImages(filesArray);
      setPreviewUrls(filesArray.map((file) => URL.createObjectURL(file)));
    }
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instrumentName || instrumentImages.length === 0) {
      alert('Please provide instrument name and at least one image.');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('instrumentName', instrumentName);
      formData.append('brandName', brandName);
      instrumentImages.forEach((file) => formData.append('instrumentImage', file));

      await axios.post('/api/instrument', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Instrument uploaded successfully!');
      router.push('/admin/instrumentlist');
    } catch (error) {
      console.error(error);
      alert('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 container mx-auto">
      <Sidebar />

      <div className="flex-1 flex mt-[10vh] justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg h-fit p-8 bg-white border border-gray-300 shadow-lg rounded-xl space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Upload Instrument
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instrument Name
            </label>
            <input
              type="text"
              value={instrumentName}
              onChange={(e) => setInstrumentName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#205057] focus:outline-none"
              placeholder="Enter instrument name"
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
              placeholder="Enter brand name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instrument Images
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
              className="w-52 min-h-32 border-2 border-dashed rounded-lg flex flex-wrap items-center justify-start cursor-pointer hover:bg-gray-100 transition gap-2 overflow-auto"
              style={{ borderColor: '#205057' }}
              onClick={handleBoxClick}
            >
              {previewUrls.length === 0 ? (
                <p className="w-full text-center text-gray-500">Upload images</p>
              ) : (
                previewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="w-52 h-32 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50"
                  >
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-center"
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#205057] text-white py-3 rounded-lg font-semibold hover:bg-[#1b454b] transition"
          >
            {loading ? 'Uploading...' : 'Upload Instrument'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InstrumentUpload;
