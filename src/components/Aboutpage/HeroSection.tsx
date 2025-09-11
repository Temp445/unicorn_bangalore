"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#205057]">
      <div className="container mx-auto px-2 md:px-6 h-fit py-10 lg:py-32 flex flex-col items-center justify-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <p className="uppercase tracking-widest text-white font-semibold text-sm">
            About Us
          </p>
          <h1 className="mt-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight text-white">
            Turning Business Challenges into{" "}
            <span className="underline  ">Growth</span> Opportunities
          </h1>
          <p className="mt-6 text-sm text-justify lg:text-balance md:text-lg text-[#e5e5e5] leading-relaxed px-5">
            <span className="font-bold">
              Unicorn (Bangalore) Private Limited
            </span>{" "}
            is paris part of a diversified group of companies that have achieved
            many milestones in the businesses in which they operate, setting the
            highest standards of excellence in corporate governance, quality
            standards, employee satisfaction, and industry leadership, and is
            engaged in the manufacturing of precision-turned components for
            critical and safety applications, such as brakes and engines.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-[#071520] text-white font-semibold rounded-full shadow-lg  transition-all duration-500 hover:scale-105"
            >
              Contact Us
            </Link>
            <Link
              href="/products"
              className="px-8 py-3 border text-white font-semibold rounded-full"
            >
              Our Products
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
