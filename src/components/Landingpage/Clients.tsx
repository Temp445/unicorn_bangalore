'use client'

import Marquee from 'react-fast-marquee';
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Client {
  _id: string;
  clientName: string;
  clientImage: string[];
}

const Clients = () => {
    const [clients, setClients] = useState<Client[]>([]);

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
      }
    };
    fetchClients();
  }, []);
  return (
    <section className="relative py-20 overflow-hidden bg-[#205057] ">

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
     
          <h2 className="text-3xl md:text-5xl  font-sans text-white  leading-tight">
            Our Clients
          </h2>
          <div className='w-32 h-1 mx-auto bg-white rounded-full mb-6'></div>
          
          <p className=" md:text-lg text-[#e5e5e5] max-w-2xl mx-auto leading-relaxed">
            We're proud to work with forward-thinking companies that trust us to deliver 
            exceptional results and drive innovation in their industries.
          </p>
        </div>
              {clients.length > 4 ? (
        <div className="relative">
       
          <Marquee 
            gradient={false} 
            pauseOnHover={true} 
            speed={50}
            className=" md:py-10"
          >
            {clients.map((client, index) => (
              <div
                key={`${client._id}-${index}`}
                className="group flex-shrink-0 mx-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200/50 hover:border-orange-200/50 hover:bg-white"
              >
                <div className="relative">                  
                  <img
                    src={client.clientImage[0]}
                    alt={client.clientName}
                    width={160}
                    height={160}
                    className="mx-auto relative z-10 transition-all duration-500 group-hover:scale-105 rounded"
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </div>
              ):(
     <div className="relative">
  <div className="py-10 flex flex-wrap justify-center gap-6">
    {clients.map((client, index) => (
      <div
        key={`${client._id}-${index}`}
        className="group flex-shrink-0 w-fit p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200/50 hover:border-orange-200/50 hover:bg-white"
      >
        <div className="relative">                  
          <img
            src={client.clientImage[0]}
            alt={client.clientName}
            width={160}
            height={160}
            className="mx-auto relative z-10 transition-all duration-500 group-hover:scale-105 rounded"
          />
        </div>
      </div>
    ))}
  </div>
</div>
   
              )}
      </div>
    </section>
  );
};

export default Clients;