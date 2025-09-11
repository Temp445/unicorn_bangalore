import React from "react";
import { FileText , BookOpen } from "lucide-react";
import Link from "next/link";

interface WhatIsItem {
  title: string;
  description?: string;
}

interface ProductProps {
  product: {
    whatis?: WhatIsItem[];
    productPath?: string;
    productName?: string;
  };
}

const Whatis = ({ product }: ProductProps) => {
  const hasWhatis = product.whatis && product.whatis.length > 0;

  return (
    <section className="pt-2 px-2 lg:pt-24 relative container mx-auto">
      <div className="container mx-auto lg:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:-mt-32 relative z-10">
          {hasWhatis ? (
            product.whatis!.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 md:p-12 lg:rounded-xl md:shadow-2xl border border-slate-200 hover:shadow-3xl transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-[#205057] rounded-xl">
                    <BookOpen  className="w-10 h-10 text-[#e5e5e5]" />
                  </div>
                  <div>
                    <h2 className=" text-2xl md:text-3xl font-black text-slate-900">
                      {item.title}
                    </h2>
                    <div className="w-16 h-1 bg-[#205057] mt-2 rounded-full"></div>
                  </div>
                </div>
                <p className="text-slate-600 leading-loose md:text-lg">
                  {item.description}
                </p>
              </div>
            ))
          ) : (
            <div className="bg-white p-4 md:p-12 rounded-xl shadow-2xl border border-slate-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-blue-100 rounded-xl">
                  <BookOpen className="w-10 h-10 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    What is {product.productName}?
                  </h2>
                  <div className="w-16 h-1 bg-orange-500 mt-2 rounded-full"></div>
                </div>
              </div>
              <p className="text-slate-600 leading-loose md:text-lg">
               {product.productName} is designed to streamline business operations, enhance productivity, and provide actionable insights that drive growth. 
               It centralizes key processes into a single platform, helping teams reduce manual work, improve collaboration, and make data-driven decisions with confidence. 
               By automating routine tasks and offering real-time visibility into performance, {product.productName} empowers businesses to achieve higher efficiency, 
               optimize resources, and stay competitive in a fast-changing market.

              </p>
            </div>
          )}
        </div>
      </div>

      <div className="lg:flex justify-end items-end xl:px-6 pt-16 hidden">
        <div className="absolute max-w-lg w-full top-5 z-10">
          <div
            className="relative bg-[#2A629A] p-10 rounded shadow-3xl hover:shadow-4xl transition-all duration-500
                      [clip-path:polygon(0_0,95%_0,100%_10%,100%_100%,5%_100%,0_90%)]"
          >
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="p-3 bg-white rounded-full">
                <FileText className="w-8 h-8 text-gray-900" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">Looking for Precision Parts</h2>
                <div className="w-32 h-1 bg-white/70 mt-1 rounded"></div>
              </div>
            </div>

            <p className="text-white/90 leading-relaxed text-lg relative z-10 mb-10">
          Enhance your production with precision components built for efficiency and long-term reliability. </p>

              <Link href={"/contact"} className="px-5 py-2 relative bg-white text-gray-900 text-sm font-bold rounded shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
              Contact Us
              </Link>
     

          </div>
        </div>
      </div>
    </section>
  );
};

export default Whatis;
