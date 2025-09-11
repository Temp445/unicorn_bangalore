import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CardSection = () => {
  return (
    <div>
      <div className="relative mb-32 md:px-10">
        <div className="text-center  rounded p-4 md:p-12">
          <h2 className="text-2xl md:text-4xl text-[#205057] font-bold mb-6 ">
            Connect with Us Today
          </h2>
          <p className="md:text-lg text-[#071520] mb-8 max-w-3xl mx-auto leading-relaxed">
            We’re here to assist you with tailored solutions for your business
            needs, providing expert guidance, personalized support, and
            innovative strategies to help your operations achieve maximum
            efficiency and growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 bg-[#071520] text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105"
            >
              Contact Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-[#205057] font-medium transition-colors duration-300 border  px-6 py-3 rounded-full bg-white"
            >
              Our Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSection;
