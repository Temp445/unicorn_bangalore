"use client";

import { useState } from "react";

interface ProductImagesProps {
  productImage: string[];
}

const ProductImages = ({ productImage }: ProductImagesProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    productImage?.[0] || ""
  );
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  if (!productImage || productImage.length === 0) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleClick = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="container mx-auto px-2 md:px-10 bg-white mb-28">
      <h1 className="text-center text-[#205057] mb-10 text-2xl md:text-4xl font-extrabold">
        Product Preview
      </h1>

      <div className="flex gap-2 md:gap-8">
      
        <div className="flex flex-col gap-4">
          {productImage.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`product-${i}`}
              onClick={() => setSelectedImage(img)}
              className={`w-24 h-24 rounded-lg border cursor-pointer transition-transform duration-300 
                hover:scale-105 ${selectedImage === img ? "ring-2 ring-orange-500" : ""}`}
            />
          ))}
        </div>

        
        <div
          className="flex-1 flex justify-center overflow-hidden relative cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        >
          <img
            src={selectedImage}
            alt="Selected Product"
            className={`w-full max-w-3xl md:h-[500px] rounded-lg border shadow-lg transition-transform duration-300 ease-out ${
              isZoomed ? "scale-[3]" : "scale-100"
            }`}
            style={{
              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
