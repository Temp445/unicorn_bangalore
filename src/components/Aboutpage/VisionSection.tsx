import React from 'react';

const VisionSection = () => {
  const sections = [
    {
      title: 'Our Vision',
      content:
        'To reach, connect, and provide innovative solutions to the industry and corporate segments of all sizes, always striving to exceed expectations.',
    },
    {
      title: 'Our Mission',
      content:
        'To deliver top-quality products, innovative solutions, and services, supported by expert knowledge, empowering businesses to optimize operations, achieve growth, and excel in a competitive marketplace.',
    },
    {
      title: 'Our Values',
      content:
        'We uphold accountability for our products and services, strive for excellence in performance, stability, and growth, ensure commitment and timely delivery, and consistently provide solutions that meet customer requirements.',
    },
  ];

  return (
    <section className=" py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-[#205057] rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl md:text-3xl font-sans font-semibold text-white mb-4">
                {section.title}
              </h2>
              <p className="text-[#e5e5e5] font-extralight leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
