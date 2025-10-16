'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import axios from 'axios';

interface Testimonial {
  _id: string;
  clientName: string;
  clientRole: string;
  description: string;
  clientLogo: string[];
}

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/testimonial');
        setTestimonials(res.data?.data || []);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-sans font-semibold text-[#071520]">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-[#205057] mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            See how our high-quality parts make a difference in modern manufacturing.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial._id}
              className="relative bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="absolute -top-5 left-6 bg-[#447c73] p-3 rounded-full shadow-md">
                <Quote className="w-5 h-5 text-white" />
              </div>

              <p className="text-gray-700 italic leading-relaxed">
                "{testimonial.description}"
              </p>

              <div className="mt-6 flex items-center gap-4">
                {testimonial.clientLogo?.length > 0 && (
                  <img
                    src={testimonial.clientLogo[0]}
                    alt={testimonial.clientName}
                    className="w-fit h-12 rounded-full border object-"
                  />
                )}
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.clientName}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {testimonial.clientRole}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
