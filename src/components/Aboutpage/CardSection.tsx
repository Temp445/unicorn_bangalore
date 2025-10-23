import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CardSection = () => {
  return (
    <section className="container mx-auto px-4 pb-16 lg:py-16">
      <div className="rounded-3xl bg-[#205057] to-transparent p-8 md:p-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl md:text-4xl font-sans text-white">
              High-Quality Auto Turned Parts <br /> & Components Maker
            </h3>
            <p className="mt-3 text-[#e5e5e5] max-w-xl font-sans">
              We build, design, and optimize high-precision auto components with
              unmatched quality. Partner with us to enhance your manufacturing
              efficiency.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-[#071520] text-white font-semibold"
              >
                Explore Products <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 border text-white transition"
              >
                Contact us
              </Link>
            </div>
          </div>

          <div className="lg:grid grid-cols-2 gap-4 hidden">
            <div className="rounded-lg border border-gray-300 bg-gray-50 p-6 text-center flex flex-col">
              <a href="tel:+919701946123" className="xl:text-lg font-bold text-[#205057]">+91 9701946123</a>
              <a href="tel:+919841706116" className="xl:text-lg font-bold text-[#205057]">+91 9841706116</a>
              <p className="text-sm text-[#071520]">Phone</p>
            </div>

            <div className="rounded-lg border border-gray-300 bg-gray-50 p-6 w-60 xl:w-auto text-center flex flex-col">
              <a href="mailto:unicornpdy@gmail.com" className="xl:text-lg font-bold text-[#205057]">unicornpdy@gmail.com</a>
              <a href="mailto:planthead@unicornpdy.in" className="xl:text-lg font-bold text-[#205057]">planthead@unicornpdy.in</a>
              <p className="text-sm text-[#071520]">Email Id</p>
            </div>

            <div className="rounded-lg border border-gray-300 bg-gray-50 p-6 text-center">
              <p className="text-xl font-bold text-[#205057]">&lt; 2 hrs</p>
              <p className="text-sm text-[#071520]">Avg. response</p>
            </div>

            <div className="rounded-lg border border-gray-300 bg-gray-50 p-6 text-center">
              <p className="text-xl font-bold text-[#205057]">500+</p>
              <p className="text-sm text-[#071520]">Happy clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSection;
