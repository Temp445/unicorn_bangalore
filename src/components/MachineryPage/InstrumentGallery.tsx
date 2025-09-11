'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Instrument {
  _id: string;
  instrumentName: string;
  brandName: string;
  instrumentImage: string[];
}

const InstrumentGallery = () => {
   const [instrument, setInstrument] = useState<Instrument[]>([]);
  
    useEffect(() => {
      const fetchInstrument = async () => {
        try {
          const { data } = await axios.get("/api/instrument");
          if (data.success && Array.isArray(data.data)) {
            setInstrument(data.data);
          } else {
            setInstrument([]);
          }
        } catch (error) {
          console.error(error);
          setInstrument([]);
        }
      };
      fetchInstrument();
    }, []);

  return (
    <section className=" py-10 md:mb-20 bg-[#205057]">
      <div className="container mx-auto px-0  lg:px-5">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-white  font-extrabold mb-6">
            Our{" "}
            <span className="">
              Measuring & Inspection Instruments
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-10 gap-2 auto-rows-[300px] md:auto-rows-[250px] grid-flow-dense">
          {instrument.map((inst, idx) => {
            const isLarge = idx === 0 || idx === 3;
            return (
              <div
                key={idx}
                className={`relative bg-white border-2 border-[#e5e5e5] rounded overflow-hidden  transition-all duration-500 hover:shadow-xl group
          ${
            isLarge
              ? "md:col-span-4 md:row-span-2"
              : "md:col-span-2 md:row-span-1"
          }`}
              >
                <div className="absolute top-2 left-2 z-20 bg-[#205057] text-white text-xs px-3 py-1 rounded-full hidden group-hover:block">
                  {inst.brandName}
                </div>

                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={inst.instrumentImage[0]}
                    alt={inst.instrumentName}
                    className="w-full h-full"
                  />
                </div>

                <div className="absolute bottom-0 w-full bg-[#205057] p-2 hidden group-hover:block">
                  <h3 className="text-white font-semibold text-base">
                    {inst.instrumentName}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InstrumentGallery;
