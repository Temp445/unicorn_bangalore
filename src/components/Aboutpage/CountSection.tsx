"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cog, Layers, Users, Award } from "lucide-react";
import { useInView } from "react-intersection-observer";

const CountSection = () => {
  const stats = [
    { label: "Years in Business", value: "31+", icon: Layers },
    { label: "Satisfied Clients", value: "99%", icon: Users },
    { label: "Rejection Rate", value: "<100 PPM", icon: Cog },
    { label: "Automotive Projects", value: "500+", icon: Award },
  ];

  const [counts, setCounts] = useState<(number | string)[]>(stats.map(() => 0));
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      stats.forEach((stat, i) => {
        const numericValue = parseFloat(stat.value.replace(/[^\d.]/g, ""));
        const isNumeric = !isNaN(numericValue);

        if (isNumeric) {
          let start = 0;
          const interval = setInterval(() => {
            start += Math.ceil(numericValue / 50);
            if (start >= numericValue) {
              start = numericValue;
              clearInterval(interval);
            }
            setCounts((prev) => {
              const newCounts = [...prev];
              newCounts[i] = start;
              return newCounts;
            });
          }, 30);
        } else {
          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[i] = stat.value;
            return newCounts;
          });
        }
      });
    }
  }, [inView]);

  return (
    <section ref={ref} className="relative md:py-14 overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4 md:px-14 lg:px-2 2xl:px-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;

            const match = stat.value.match(/([^0-9]*)(\d+)(.*)/);
            const prefix = match ? match[1] : "";
            const suffix = match ? match[3] : "";

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group bg-white rounded-lg p-6 text-center mx-auto shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border border-[#205057]"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="rounded-full p-3 bg-[#447c73] hidden md:block"
                  >
                    <Icon className="text-white w-8 h-8" />
                  </motion.div>
                  <div>
                    <p className="text-xl md:text-2xl xl:text-3xl font-extrabold font-sans text-[#071520] group-hover:text-[#205057] transition-colors">
                      {prefix}
                      {counts[i]}
                      {suffix}
                    </p>
                    <p className="text-sm  md:text-base font-medium text-gray-700">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CountSection;
