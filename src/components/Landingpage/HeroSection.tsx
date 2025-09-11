'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, CheckCircle, Shield, Award } from 'lucide-react';

import image1 from '@/assets/LandingImage-1.jpg';
import image2 from '@/assets/LandingImage-2.jpg';
import image3 from '@/assets/LandingImage-3.jpg';
import image4 from '@/assets/LandingImage-4.jpg';
import image5 from '@/assets/LandingImage-5.jpg';

const HeroSection = () => {

  return (
    <section className="relative pt-5 pb-14 lg:py-20 bg-[#205057] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-14 relative z-10">
        
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2  border rounded-full text-[#e5e5e5] text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Precision Engineering
          </div>

          <h1 className="text-2xl lg:text-3xl xl:text-5xl font-extrabold leading-tight text-white mb-4">
            Engineered Parts for Automotive and Industry
          </h1>

          <p className="mt-2 text-justify md:text-base text-[#e5e5e5] max-w-2xl mx-auto lg:mx-0 lg:text-left">
            We deliver high-quality, reliable engineered components for automotive and industrial applications, ensuring performance, durability, and safety in critical systems like brakes, engines, and machinery.
          </p>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }} 
        className="hidden md:flex flex-wrap gap-6 mt-6 justify-center lg:justify-start">
          <div className="flex items-center gap-2 border border-gray-300 py-1.5 px-4 rounded-full shadow-2xl bg-white">
            <Shield className="w-10 h-10 text-white bg-[#447c73] rounded-full p-2" />
            <span className="font-medium text-[#205057]">Safety Certified</span>
          </div>
        
          <div className="hidden md:flex lg:flex xl:flex items-center gap-2 border border-gray-300 py-1.5 px-4 rounded-full shadow-2xl bg-white">
            <Award className="w-10 h-10 text-white bg-[#447c73] rounded-full p-2" />
            <span className="font-medium text-[#205057]">ISO Compliant</span>
          </div>
        
          <div className="flex items-center gap-2 text-gray-700 border border-gray-300 py-1.5 px-4 rounded-full shadow-2xl bg-white">
            <CheckCircle className="w-10 h-10 text-white bg-[#447c73] rounded-full p-2" />
            <span className="font-medium text-[#205057]">Quality Assured</span>
          </div>
        </motion.div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start md:mt-14">
            <Link
              href="/products"
              className="px-6 py-3 bg-[#071520] hover:bg-[#1888b5] text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:scale-105  transition-all duration-300"
              aria-label="Explore Products"
            >
              Explore Product <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#e5e5e5] border text-[#071520] rounded-lg font-semibold hover:scale-105 transition"
              aria-label="Contact Us"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>


  <motion.div className="flex-1 grid grid-cols-3 gap-5">
  <motion.div className="col-span-2 row-span-2"
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} whileHover={{ scale: 1.05 }}>
    <Image src={image1} alt="Precision Component 1" className="rounded-lg shadow-2xl object-cover w-full h-full border-4 border-[#e5e5e5]" />
  </motion.div>

  <motion.div 
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} whileHover={{ scale: 1.05 }}>
    <Image src={image2} alt="Precision Component 2" className="rounded-lg shadow-2xl object-cover w-full h-full border-4 border-[#e5e5e5]" />
  </motion.div>

  <motion.div 
    initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} whileHover={{ scale: 1.05 }}>
    <Image src={image3} alt="Precision Component 3" className="rounded-lg shadow-2xl object-cover w-full h-full border-4 border-[#e5e5e5]" />
  </motion.div>

  <motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} whileHover={{ scale: 1.05 }}>
    <Image src={image4} alt="Precision Component 4" className="rounded-lg shadow-2xl object-cover w-full h-full border-4 border-[#e5e5e5]" />
  </motion.div>
  
  <motion.div className="col-span-2" 
    initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} whileHover={{ scale: 1.05 }}>
    <Image src={image5} alt="Precision Component 4" className="rounded-lg shadow-2xl object-cover w-full h-40 border-4 border-[#e5e5e5]" />
  </motion.div>
</motion.div>

      </div>
    </section>
  );
}

export default HeroSection

