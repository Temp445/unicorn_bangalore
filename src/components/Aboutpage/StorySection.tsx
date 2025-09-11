"use client";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import about from "@/assets/operator2.jpg";

const StorySection = () => {
  const points = [
    "Certified ISO 9001-2000 in 2002; upgraded to IATF 16949–2016 & ISO 9001–2015 in 2022.",
    "Core business: Manufacturing precision-turned components for critical and safety applications such as brakes, engines, and carburetors.",
    "Tier 2 vendor/supplier to major automobile OEMs like Hyundai and Maruti through Tier 1 manufacturers.",
  ];

  return (
    <section className="bg-white relative overflow-hidden py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Our story began with a{" "}
              <span className="text-[#205057]">passion for precision</span>
            </h2>

            <p className="mt-6 text-gray-700 md:text-lg leading-relaxed text-justify">
              <span className="text-[#205057] font-bold">
                Unicorn (Bangalore) Private Limited’s
              </span>{" "}
              factory and core R&D team are strategically located at PIPDIC
              Industrial Estate, Pondicherry, India, alongside major automobile
              manufacturers.
            </p>

            <p className="mt-4 text-gray-700 md:text-lg leading-relaxed text-justify">
              UBPL is led by experienced technocrats and a skilled management
              team in technical, finance, and marketing, supported by a
              qualified workforce for efficient operations.
            </p>

            <ul className="mt-6 space-y-4 text-gray-700">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#205057] w-6 h-6 flex-shrink-0 mt-1" />
                  <span className="font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="w-full max-w-2xl mx-auto aspect-[4/3] rounded-3xl border border-gray-200  to-transparent p-1 shadow-xl">
              <div className="h-full w-full rounded-[22px] bg-white flex items-center justify-center overflow-hidden">
                <Image
                  src={about}
                  alt="About Us"
                  className="object-cover w-full h-full rounded-[22px]"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
