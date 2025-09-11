"use client";

import { ReactNode } from "react";
import { Factory, Wrench, Cog, Shield } from "lucide-react";

interface HighlightCardProps {
  icon: ReactNode;
  title: string;
  desc: string;
}

const highlights: HighlightCardProps[] = [
  {
    icon: <Factory className="w-10 h-10" />,
    title: "Modern Facility",
    desc: "State-of-the-art infrastructure with climate-controlled environments and advanced safety systems.",
  },
  {
    icon: <Wrench className="w-10 h-10" />,
    title: "Ultra-High Precision",
    desc: "CNC machines and automated systems with tolerances up to ±0.001mm for perfect accuracy.",
  },
  {
    icon: <Cog className="w-10 h-10" />,
    title: "Infinite Scalability",
    desc: "Modular production lines capable of handling prototypes to millions of units with ease.",
  },
  {
    icon: <Shield className="w-10 h-10" />,
    title: "Premium Standards",
    desc: "Multiple ISO certifications, streamlined processes, and continuous quality monitoring.",
  },
];

const HeroSection = () => {
  return (
    <div className="py-10  px-12 bg-[#205057]">
      <div className="text-center mb-20">
        <h1 className="text-3xl md:text-4xl lg:text-4xl font-extrabold text-white mb-6 leading-tight">
          Our Machinery
        </h1>

        <p className="md:text-lg text-[#e5e5e5] max-w-3xl mx-auto mb-8 leading-relaxed">
          Powered by cutting-edge machinery and advanced technology, our
          world-class manufacturing facility delivers unmatched precision,
          consistency, and quality in every product we create.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
        {highlights.map((item, idx) => (
          <div
            key={idx}
            className="group relative p-8 bg-white border border-orange-200 rounded-2xl hover:shadow-xl  transition-all duration-500 hover:scale-105"
          >
            <div className="inline-flex p-4 rounded-2xl bg-[#447c73] text-white mb-6 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold text-[#071520] mb-4 group-hover:text-[#205057] transition-colors">
              {item.title}
            </h3>
            <p className="text-gray-700 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
