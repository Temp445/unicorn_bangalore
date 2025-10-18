import Image from "next/image";
import Rajasekaran from "@/assets/Rajasekaran.png";
import Rajagopalan from "@/assets/Rajagopalan.png";
import Abishek from "@/assets/Abishek.png";

const Founder = () => {
  return (
    <section className="relative py-20 bg-[#205057]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-[#205057] uppercase border bg-white px-4 py-2 rounded-full mb-4">
            Leadership
          </span>

          <p className="text-lg text-[#e5e5e5]  mx-auto">
            Visionary leaders with decades of industry expertise driving
            innovation and excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
          <div className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2">
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-full">
                <Image
                  src={Rajagopalan}
                  alt="R. Rajagopalan"
                  width={200}
                  height={200}
                  className="relative rounded-full w-52 h-52 border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-sans font-semibold text-slate-900 mb-2">
                R. Rajagopalan
              </h3>
              <div className="inline-block bg-[#205057] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                Managing Director
              </div>

              <p className="text-[#071520] font-sans leading-relaxed mb-6">
                Managing Director of Unicorn (Bangalore) Private Limited is a Diploma
                Holder with over {" "}
                <span className="font-bold text-[#205057]">
                  35 years’ experience
                </span>{" "}
                in Automobile Industry in Industrial Engineering, Production
                Planning, Shop Floor Systems and Materials Management provides
                Strategic inputs for the organizational growth.
              </p>
            </div>
          </div>
          <div className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2">
            <div className="mb-8 flex justify-center">
              <div className="relative group">
                <Image
                  src={Rajasekaran}
                  alt="S. Rajasekaran"
                  width={200}
                  height={200}
                  className="relative rounded-full h-52 w-52 border-4 border-white shadow-xl transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-semibold font-sans text-slate-900 mb-2">
                S. Rajasekaran
              </h3>
              <div className="inline-block bg-[#205057] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
               Joint Managing Director
              </div>

              <p className="text-[#071520] font-sans leading-relaxed mb-6">
               Joint Managing Director of Unicorn (Bangalore) Private Limited is a
                PhD Graduate in Mechanical Engineering with over{" "}
                <span className="font-bold text-[#205057]">
                  {" "}
                  25 years’ experience
                </span>{" "}
                in Materials Management & System Design and Finance is also the
                Founder & CEO of ASSPL, who leads the day-to-day functions on a
                strategic level with his domain expertise.
              </p>
            </div>
          </div>
           <div className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2">
            <div className="mb-8 flex justify-center">
              <div className="relative group">
                <Image
                  src={Abishek}
                  alt="Abishek"
                  width={200}
                  height={200}
                  className="relative rounded-full h-52 w-52 border-4 border-white shadow-xl transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-semibold font-sans text-slate-900 mb-2">
                R. Abishek Karthik
              </h3>
              <div className="inline-block bg-[#205057] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
               Special Director
              </div>

              <p className="text-[#071520] font-sans leading-relaxed mb-6">
                Special Director of unicorn(Bangalore) Private Limited is BE(Mechanical Engineering), MBA Graduate with over {" "}
                <span className="font-bold text-[#205057]">
                  {" "}
                  10 years’ Experience
                </span>{" "}
              in operations Management , who leads the New Product Development and sourcing requirements of the organization. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
