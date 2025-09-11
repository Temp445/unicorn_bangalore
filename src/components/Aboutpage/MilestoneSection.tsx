'use client';
import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Goal } from 'lucide-react';

const MilestoneSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 50 });

  const endIconY = useTransform(smoothProgress, (value) => {
    const maxHeight = 1450; 
    return value * maxHeight;
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-10 xl:pb-20 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#071520]">
            Our Key <span className="text-[#205057]">Achievements</span>
          </h2>
          <div className="w-52 h-1 bg-[#205057] mx-auto rounded-full mt-2"></div>
        </motion.div>

        <div className="relative">
          <motion.div
            style={{ scaleY: smoothProgress }}
            className="absolute hidden lg:block left-1/2 top-0 w-1 h-full mt-7 bg-[#447c73] origin-top rounded"
          />

          <motion.div
            style={{ y: endIconY }}
            className="absolute hidden lg:flex left-1/2 ml-1 -translate-x-1/2 w-12 h-12 bg-[#447c73] rounded-full items-center justify-center text-white shadow-lg"
          >
            <Goal className="w-9 h-9" />
          </motion.div>

          <div className="space-y-10 md:space-y-24 mt-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="hidden lg:block"></div>
              <div className="relative bg-gradient-to-br from-orange-50 to-sky-100 backdrop-blur-sm border border-gray-400 rounded-xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Strategic Growth</h3>
                <p className="text-gray-700 leading-relaxed">
                 The company’s scope and demand for the services offered by them is constantly growing due to their strategic location and proximity to the OEM’s & Tier 1 Automobile Manufacturers.                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-14 items-center lg:flex-row-reverse">
              <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 backdrop-blur-sm border border-gray-400 rounded-xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Employee Development</h3>
                <p className="text-gray-700 leading-relaxed">
                  Regular Training is imparted to all levels of employees and training effectiveness is evaluated by the respective department heads.
                </p>
              </div>
              <div className="hidden lg:block"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="hidden lg:block"></div>
              <div className="relative bg-gradient-to-br from-orange-50 to-red-50 backdrop-blur-sm border border-gray-400 rounded-xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Quality Excellence</h3>
                <p className="text-gray-700 leading-relaxed">
                  High level impetus is given to quality as most of the parts manufactured by the organization is used in critical components.
                </p>
              </div>
            </div>

             <div className="grid lg:grid-cols-2 gap-14 items-center lg:flex-row-reverse">
              <div className="relative bg-gradient-to-br from-rose-50 to-pink-50 backdrop-blur-sm border border-gray-400 rounded-xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Regular Audits</h3>
                <p className="text-gray-700 leading-relaxed">
                  Regular audits are conducted to ensure the customer requirements are met. 
                </p>
              </div>
              <div className="hidden lg:block"></div>
            </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="hidden lg:block"></div>
              <div className="relative bg-gradient-to-br from-orange-50 to-red-50 backdrop-blur-sm border border-gray-400 rounded-xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Environmental Responsibility</h3>
                <p className="text-gray-700 leading-relaxed">
                The organization discharges zero effluents into environment and organization is endorsed for compliance by Pollution Control Board.
                </p>
              </div>
            </div>

                <div className="grid lg:grid-cols-2 gap-14 items-center lg:flex-row-reverse">
              <div className="relative bg-gradient-to-br from-rose-50 to-pink-50 backdrop-blur-sm border border-gray-400 rounded-xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Regulatory Adherence</h3>
                <p className="text-gray-700 leading-relaxed">
                The organization attaches great significance to statutory compliance and adherence is reviewed by top management in regular intervals.
                </p>
              </div>
              <div className="hidden lg:block"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MilestoneSection;
