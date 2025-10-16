"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import image1 from "@/assets/operator.jpg";
import { CalendarRange, Sparkles, Factory } from "lucide-react";
import { MdEngineering } from "react-icons/md";

const WhoWeSection = () => {
  return (
    <section className=" pb-5 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className=" mx-auto grid lg:grid-cols-2 gap-10 items-center"
        >
          <div className="order-2">
            <h2 className="text-2xl md:text-4xl font-sans font-semibold text-[#071520] mb-6">
              Who <span className="text-[#205057]">We Are</span>
            </h2>
            <p className="md:text-lg text-gray-700 leading-relaxed text-justify md:text-left">
              <span className="text-[#205057] font-bold">
                Unicorn (Bangalore) Private Limited
              </span>{" "}
              is part of a diversified group of companies that have achieved
              many milestones in the businesses in which they operate, setting
              the highest standards of excellence in corporate governance,
              quality standards, employee satisfaction, and industry leadership.
            </p>
            <p className="md:text-lg text-gray-700 leading-relaxed text-justify md:text-left">
              The company was started in{" "}
              <span className="text-[#205057] font-bold">1957</span> , and in
              2001 it was acquired by Ace Group of Companies. Presently, it is
              an associated company of “Infant Engineers Private Limited” and
              has a turnover of{" "}
              <span className="text-[#205057]">INR 30 million</span>.
            </p>
            <div className="mt-12">
              <Link
                href="/about"
                className="text-[#205057] px-5 py-2.5 rounded-lg font-semibold border"
              >
                Learn More
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-lg hidden md:block order-1 lg:order-2"
          >
            <Image
              src={image1}
              alt="about manufacturing"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        <div className="mt-5 md:mt-16 grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 lg:gap-12">
          <motion.div
            className="rounded-xl md:rounded-full md:mt-20 xl:w-60 xl:h-60 flex items-center justify-center bg-gradient-to-br from-slate-50 via-sky-100 to-teal-50 shadow-lg md:rotate-45 border-[#205057] border md:border-0 md:border-x"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl md:rounded-full  h-36 md:w-40 md:h-40 xl:w-52 xl:h-52 flex flex-col items-center justify-center p-4 gap-4 shadow-md md:-rotate-45">
              <CalendarRange className="w-14 h-12 text-[#205057]" />
              <h3 className="md:text-lg font-semibold text-gray-700 text-center">
                31+ Years in Business
              </h3>
            </div>
          </motion.div>

          <motion.div
            className="rounded-xl md:rounded-full  h-36 md:w-40 md:h-40 xl:w-60 xl:h-60 flex items-center justify-center bg-gradient-to-br from-slate-50 via-sky-100 to-teal-50 shadow-lg md:rotate-45 md:border-[#071520] md:border-0 md:border-y"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl md:rounded-full h-36 md:w-40 md:h-40 xl:w-52 xl:h-52 flex flex-col items-center justify-center p-2 md:p-4 gap-4 shadow-md md:-rotate-45 border border-[#071520] md:border-0">
              <Sparkles className="w-10 h-10 text-[#071520] -rotate-6" />
              <h3 className="text-base md:text-lg font-semibold text-gray-700 text-center">
                99% Client Satisfaction
              </h3>
            </div>
          </motion.div>

          <motion.div
            className="rounded-xl md:rounded-full md:mt-20 h-36 md:w-40 md:h-40 xl:w-60 xl:h-60 flex items-center justify-center bg-gradient-to-br from-slate-50 via-sky-100 to-teal-50 shadow-lg md:rotate-45 md:border-[#205057] md:border-0 md:border-x"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl md:rounded-full h-36 md:w-40 md:h-40 xl:w-52 xl:h-52 flex flex-col items-center justify-center p-2 gap-4 shadow-md md:-rotate-45 border border-[#205057] md:border-0">
              <MdEngineering className="w-12 h-12 text-[#205057]" />
              <h3 className=" md:text-lg font-semibold text-gray-700 text-center">
                High-Quality Standards
              </h3>
            </div>
          </motion.div>

          <motion.div
            className="rounded-xl md:rounded-full  h-36 md:w-40 md:h-40 xl:w-60 xl:h-60 flex items-center justify-center bg-gradient-to-br from-slate-50 via-sky-100 to-teal-50 shadow-lg md:rotate-45 md:border-[#071520] border md:border-0 md:border-y"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="rounded-xl md:rounded-full h-full md:h-40 md:w-40 xl:w-52 xl:h-52 flex flex-col items-center justify-center gap-4 p-2 bg-white shadow-md md:-rotate-45">
              <Factory className="w-12 h-12 text-[#071520]" />
              <h3 className=" md:text-lg font-semibold text-gray-700 text-center">
                Serving Multiple Industries
              </h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeSection;
