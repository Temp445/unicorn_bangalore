"use client"

import React, { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  description: string;
  clientName: string;
  companyName?: string;
}

interface ProductProps {
  customerTestimonials?: Testimonial[];
}

const CustomerTestimonial = ({ customerTestimonials = [] }: ProductProps) => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  if (customerTestimonials.length === 0) return null;

  const nextTestimonial = () => {
    setCurrentTestimonialIndex(
      (prev) => (prev + 1) % customerTestimonials.length
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex(
      (prev) => (prev - 1 + customerTestimonials.length) %
        customerTestimonials.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000); 

    return () => clearInterval(interval); 
  }, [customerTestimonials.length]);

  const currentTestimonial = customerTestimonials[currentTestimonialIndex];

  return (
    <section className="py-24 bg-[#205057] text-white relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className=" text-3xl md:text-4xl font-extrabold mb-6">
              Customer Success Stories
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Discover how businesses grow smarter and work more efficiently.
            </p>

            <div className="flex items-center gap-4">
              <button
                className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition"
                onClick={nextTestimonial}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="bg-white text-slate-800 rounded-2xl shadow-xl p-10 relative transition-all duration-500 ease-in-out">
            <Quote className="w-12 h-12 text-white bg-[#447c73] rounded-full p-2 absolute -top-6 -left-6" />
            <p className="text-xl italic mb-8">
              "{currentTestimonial.description}"
            </p>
            <div className="flex items-center gap-4">
              <div>
                <p className="font-bold">{currentTestimonial.clientName}</p>
                {currentTestimonial.companyName && (
                  <p className="text-slate-500">
                    {currentTestimonial.companyName}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonial;
