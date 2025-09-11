"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Machinery {
  _id: string;
  machineryName: string;
  brandName: string;
  machineryImage: string[];
}

const MachineGallery = () => {
  const [machinery, setMachinery] = useState<Machinery[]>([]);

  useEffect(() => {
    const fetchMachinery = async () => {
      try {
        const { data } = await axios.get("/api/machinery");
        if (data.success && Array.isArray(data.data)) {
          setMachinery(data.data);
        } else {
          setMachinery([]);
        }
      } catch (error) {
        console.error(error);
        setMachinery([]);
      }
    };
    fetchMachinery();
  }, []);
  return (
    <section className="py-5 xl:py-20">
      <div className="container mx-auto px-2 lg:px-5">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl  font-extrabold mb-4">
            Our <span className="text-[#205057]">Advanced Machinery</span>
          </h2>
          <p className="text-[#071520] md:text-lg max-w-2xl mx-auto">
            Explore our comprehensive collection of precision equipment designed
            for excellence
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr auto-flow-dense">
          {machinery.map((machine, idx) => (
            <div
              key={idx}
              className="relative bg-white border-4 border-[#205057]/50 rounded-2xl overflow-hidden  transition-all duration-500  hover:shadow-xl"
            >
              <div className="absolute top-4 left-4 z-20 bg-[#205057] text-white text-xs px-3 py-1 rounded-full">
                {machine.brandName}
              </div>

              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img
                  src={machine.machineryImage[0]}
                  alt={machine.machineryName}
                  className="w-full h-full "
                />
              </div>
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#205057] to-transparent"></div>

              <div className=" p-2 md:p-4 relative text-center">
                <h3 className="font-bold text-base md:text-base leading-tight text-[#205057] transition-colors duration-300">
                  {machine.machineryName}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MachineGallery;
