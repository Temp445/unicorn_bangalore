import React from "react";
import { Target, ArrowBigRightDash } from "lucide-react";

interface ProductProps {
  product: {
    productName: string;
    why_choose_des?: string;
  };
}

const WhyChoose = ({ product }: ProductProps) => {
  return (
    <section className="pt-10 pb-10 md:pb-20 container mx-auto">
      <div className="container mx-auto px-2 md:px-6">
        {product.why_choose_des && (
          <div className="bg-white rounded md:rounded-3xl md:shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-8 md:py-5 bg-[#205057] ">
              <div className="p-4 bg-white rounded-full hidden lg:block">
                <Target className="w-10 h-10 text-[#205057]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3">
                  Why Choose {product.productName}?
                </h2>
                <div className="w-52 h-1 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="p-4 md:p-12 space-y-4 text-[#071520] text-base md:text-xl">
              {product.why_choose_des
                ?.split(".")
                .map((point, index) =>
                  point.trim() ? (
                    <div
                      key={index}
                      className="flex items-start gap-4  p-3 rounded-lg transition-colors duration-300"
                    >
                      <ArrowBigRightDash className="mt-1 text-[#205057] w-6 h-6 flex-shrink-0" />
                      <p>{point.trim()}.</p>
                    </div>
                  ) : null
                )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyChoose;
