
import Link from "next/link";
import React from "react";
import { MessageSquareMore } from 'lucide-react';


const DemoCard  = () => {
  return (
    <section className="relative py-10 md:py-24 bg-[#205057] text-center overflow-hidden">
      <div className="container relative mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-8 leading-tight text-white">
             Ready to Begin?
          </h2>
          <p className="text-base md:text-2xl text-[#e5e5e5] mb-16 leading-relaxed">
            Take the next step towards transforming your business. 
            Our team is ready to help you succeed.
          </p>

          <div className="flex gap-6 justify-center flex-wrap">
              <Link
                href="/contact"
                className="px-10 py-5 border-2 flex gap-2 border-white text-white rounded-2xl font-bold text-lg  hover:text-white transition-all duration-300"
              >
             <span className="mt-0.5"><MessageSquareMore/></span> Talk to Expert
              </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoCard;
