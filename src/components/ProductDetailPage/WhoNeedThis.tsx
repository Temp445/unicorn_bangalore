import React from 'react';

interface ProductProps {
  WhoNeed?: string;
}

const WhoNeedThis = ({ WhoNeed }: ProductProps) => {
  return (
    <section className="py-10 md:py-24 bg-[#205057] container mx-auto">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-5xl font-extrabold text-white mb-4">
            Who Needs This
          </h2>
          <p className="text-base md:text-xl text-[#e5e5e5] max-w-3xl mx-auto">
            Everything you need to succeed, crafted with care to make your experience seamless.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {WhoNeed?.split('.').map((point, index) =>
            point.trim() ? (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl bg-white shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
              >
           
                <div className="flex-shrink-0">
                  <div className="w-4 h-4 bg-[#447c73] rounded-full mt-1 animate-pulse"></div>
                </div>
                <p className="text-slate-800 font-medium">{point.trim()}</p>
              </div>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
};

export default WhoNeedThis;
