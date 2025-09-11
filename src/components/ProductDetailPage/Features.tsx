import React from 'react'
import { CheckCircle} from "lucide-react";

interface Benefits {
 title: string; 
 description?: string ;
}

interface ProductProps {
product: {
  benefits?: Benefits[];
  productName: string;
  mainImage: string[];
  }
}

const Features = ({product}: ProductProps ) => {
  return (
    <div>
        <section className="py-24 bg-white">
  <div className="container mx-auto px-4 md:px-6 relative">
    <div className="grid lg:grid-cols-5 gap-16">
      
      <div className="lg:col-span-3 space-y-12 order-2 lg:order-1">
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#071520] mb-8">
            Powerful <span className='text-[#205057]'>Features</span>
          </h2>
          <p className=" text-base lg:text-xl text-slate-600 leading-relaxed">
            Our product is crafted with precision and designed for performance. 
            Every detail has been carefully considered to deliver the best possible experience.
          </p>
        </div>

        <div className="grid gap-4 md:gap-6">
          {product.benefits?.slice(0, 7).map((benefit, index) => (
            <div key={index} className="flex items-start gap-6 py-4 md:py-0 lg:p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
              <div className="flex-shrink-0 p-3 bg-[#447c73] rounded-xl">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-600">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 order-1 lg:order-2">
        {product.mainImage[0] && (
          <div className="sticky top-32">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-200 rounded-3xl transform rotate-3"></div>
              <div className="absolute -inset-2 bg-orange-200 rounded-3xl transform -rotate-2"></div>
              <img
                src={product.mainImage[0]}
                alt={product.productName}
                className="relative rounded-3xl shadow-2xl w-full  h-96 transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Features