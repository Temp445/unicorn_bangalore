"use client";

import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import image1 from "@/assets/operator3.jpg";
import Image from "next/image";
import Link from "next/link";

const benefits = [
  "High Precision Production",
  "Cost Efficiency",
  "Enhanced Safety",
  "Scalable Operations",
];

const WhyWeStandOut = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.5, when: "beforeChildren" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="max-h-fit relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10 pt-10 md:pt-14 md:py-10">
        <motion.div
          className="text-center md:mb-24 mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-2xl md:text-4xl font-sans font-bold text-[#071520] mb-5 md:mb-8"
            variants={itemVariants}
          >
            Why We <span className="text-[#205057]">Stand Out</span>
          </motion.h2>

          <motion.p
            className="md:text-lg text-[#071520] leading-relaxed mb-12 max-w-6xl mx-auto font-medium text-justify md:text-center"
            variants={itemVariants}
          >
            Our automobile manufacturing facilities produce a wide range of
            high-quality spare parts. With advanced production lines,
            automation, and strict quality control, we ensure every component
            meets the highest standards of performance and durability.{" "}
          </motion.p>

          <motion.div
            className="flex justify-center gap-4 mb-16 flex-wrap"
            variants={containerVariants}
          >
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit}
                className="rounded-full p-3 flex border gap-1 md:gap-3 border-[#205057] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                variants={itemVariants}
                style={{ originX: 0.5 }}
                transition={{ delay: i * 0.1 }}
              >
                <CheckCircle className="w-5 h-5 text-[#38716b] mx-auto " />
                <span className="font-bold text-[#071520] text-sm">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="p-2 max-w-7xl mx-auto relative overflow-hidden  rounded-lg mb-5 md:mb-20 lg:mb-0">
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <motion.div
              className="w-full lg:w-1/2 flex-shrink-0 relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-500"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={image1}
                alt="Automobile Manufacturing"
                className="w-full h-auto object-cover transform hover:scale-105 hover:rotate-1 transition-transform duration-500"
              />
            </motion.div>

            <motion.div
              className="w-full lg:w-1/2 space-y-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="text-2xl md:text-4xl font-sans mb-3 text-[#071520]">
                  Experience Excellence in{" "} <br />
                  <span className="text-[#205057] text-xl md:text-3xl">Automotive Production</span>
                </h2>
                <div className="w-32 h-1 rounded-full bg-[#071520]" />
              </div>

              <p className="md:text-lg xl:text-lg leading-relaxed text-gray-700 font-sans  text-justify">
                Our manufacturing plants leverage cutting-edge technology and
                automation to produce vehicles with unmatched precision,
                efficiency, and safety standards. Each process is designed for
                scalability and real-time operational insights.
              </p>

              <div className="pt-4">
                <div className="flex flex-wrap gap-3 mb-10">
                  <span className="px-3 py-1 text-[#205057] border rounded-full text-sm font-medium">
                    Automation
                  </span>
                  <span className="px-3 py-1 text-[#205057] border rounded-full text-sm font-medium">
                    Quality Control
                  </span>
                  <span className="px-3 py-1 text-[#205057] border rounded-full hidden md:block text-sm font-medium">
                    Safety Standards
                  </span>
                </div>

                <Link
                  href="/products"
                  className="text-gray-800 bg-white px-5 py-2.5 rounded-lg font-semibold border transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeStandOut;
