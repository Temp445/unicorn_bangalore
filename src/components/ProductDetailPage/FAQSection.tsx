"use client"

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer?: string;
}

interface ProductProps {
  FAQ: FAQItem[]
}

const FAQSection = ({FAQ}:ProductProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

    if (!FAQ || FAQ.length === 0) {
    return null;
  }


  return (
    <section className="py-10 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className=" text-2xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className=" lg:text-xl text-slate-500 max-w-3xl mx-auto">
            Have questions? We've got answers. Explore the most common queries below.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {FAQ.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
              >
                <span className="text-lg font-semibold text-slate-900">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-[#205057]" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-[#205057]" />
                )}
              </button>

              <div
                className={`px-6 pb-6 text-slate-600 text-lg transition-all duration-300 ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
