'use client'

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Factory, Cog, Truck, ShieldCheck, Wrench, BarChart3 } from 'lucide-react';
import Link from 'next/link';

const cards = [
  { 
    name: "Advanced Production", 
    desc: "Leverage modern machinery and automation for precision-driven manufacturing processes.",
    icon: Factory 
  },
  { 
    name: "Engineering Excellence",  
    desc: "Deliver innovative designs with high accuracy, reliability, and consistency across all parts.",
    icon: Cog
  },
  { 
    name: "Supply Chain Efficiency", 
    desc: "Streamlined logistics and sourcing ensure timely delivery and reduced downtime.",
    icon: Truck
  },
  { 
    name: "Quality & Safety", 
    desc: "Strict quality checks and global safety standards guarantee durable and reliable products.",
    icon: ShieldCheck
  },
  { 
    name: "Maintenance & Support",  
    desc: "Dedicated support teams ensure seamless after-production service and client satisfaction.",
    icon: Wrench
  },
  { 
    name: "Data-Driven Insights",  
    desc: "Real-time monitoring and analytics for optimized performance and cost efficiency.",
    icon: BarChart3
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const productVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
};

const ManufacturingSector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return; 
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className='container mx-auto px-4 md:px-6 lg:px-12 pb-10 mt-10 lg:mt-16'>
      <motion.div
        className="mb-20 md:px-4 mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-2xl md:text-4xl font-extrabold text-[#071520] mb-6"
          variants={itemVariants}
        >
          Driving Innovation in{' '}
          <span className="text-[#205057]">
            Manufacturing
          </span>
        </motion.h2>
        <motion.p
          className="md:text-lg text-gray-600 mb-16 max-w-6xl mx-auto text-justify"
          variants={itemVariants}
        >
          We specialize in automobile and spare parts manufacturing with advanced 
          technologies, strict quality control, and streamlined processes. 
          From concept to delivery, our focus is on efficiency, durability, and excellence 
          to meet the evolving needs of the global automotive industry.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {cards.map((card, index) => {
              const isActive = hoverIndex === index || (hoverIndex === null && activeIndex === index);
              const Icon = card.icon;

              return (
                <motion.div
                  key={index}
                  className={`relative p-10 rounded-xl border transition-all duration-500 cursor-pointer ${
                    isActive
                      ? `bg-[#205057] border-white/30 scale-105 shadow-lg`
                      : 'bg-white border-gray-500 hover:bg-white/10'
                  } group`}
                  onMouseEnter={() => {
                    setHoverIndex(index);
                    setIsPaused(true);
                  }}
                  onMouseLeave={() => {
                    setHoverIndex(null);
                    setIsPaused(false);
                  }}
                  variants={productVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  layout
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <Icon className={`w-7 h-7 ${isActive ? 'text-white' : 'text-[#205057]'}`} />
                      <h3
                        className={`text-xl font-semibold text-left ${
                          isActive ? 'text-white' : 'text-gray-800'
                        }`}
                      >
                        {card.name}
                      </h3>
                    </div>
                    <p
                      className={`text-base font-medium leading-relaxed text-left ${
                        isActive ? 'text-white' : 'text-gray-800'
                      }`}
                    >
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-[#071520] rounded md:rounded-3xl p-5 md:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h3 className="text-xl lg:text-4xl font-black mb-6">
              Ready to Redefine Manufacturing Excellence?
            </h3>
            <p className="md:text-lg mb-12 text-white/90 max-w-3xl mx-auto font-medium leading-relaxed">
              Discover how our advanced automobile manufacturing capabilities can 
              deliver precision, efficiency, and durability for your business growth.
            </p>
            
            <div className="flex sm:flex-row gap-6 justify-center items-center">
              <Link href="/products"
                className="text-white bg-[#205057]  px-5 py-3 md:px-10 md:py-5 rounded-xl font-black text-sm md:text-base  transition-all duration-500 shadow-2xl hover:shadow-3xl hover:scale-105"
              >
                Explore Our Products
              </Link>
              <Link href="/contact"
                className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white px-5 py-2.5 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-sm md:text-base hover:bg-white/20 transition-all duration-500 hover:scale-105"
              >
               Contact Us
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default ManufacturingSector
