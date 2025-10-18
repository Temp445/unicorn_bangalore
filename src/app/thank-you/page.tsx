
import { CheckCircle, Mail, Phone, Sparkles } from "lucide-react";
import Link from "next/link";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="relative w-full max-w-lg transform transition-all duration-1000">
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-200">

          <div className="px-6 md:px-8 py-10 md:py-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-green-100 rounded-full blur-2xl opacity-60 animate-pulse"></div>
                <CheckCircle className="relative w-20 h-20 text-emerald-400  drop-shadow-lg" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl text-center font-bold bg-emerald-600 bg-clip-text text-transparent mb-3">
              Thank You!
            </h2>

            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <p className="text-gray-600 text-sm font-medium">
                We're excited to connect with you
              </p>
              <Sparkles className="w-4 h-4 text-emerald-500" />
            </div>

            <p className="text-gray-600 text-sm md:text-base text-center mb-8 leading-relaxed">
              Your request has been received successfully! We'll review your
              message and get back to you within 24 hours with all the details
              you need.
            </p>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent my-6"></div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer group">
                <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                  <Phone className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex flex-col">
                  <a href="tel:+919701946123" className="text-gray-700 font-medium">
                    +91 9701946123
                  </a>
                  <a href="tel:+919841706116" className="text-gray-700 font-medium">
                    +91 9841706116
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer group">
                <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-200 transition-colors">
                  <Mail className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <a
                    href="mailto:abishek@infantengineers.in"
                    className="text-gray-700 font-medium"
                  >
                    abishek@infantengineers.in
                  </a>{" "}
                  <br />
                  <a
                    href="mailto:rajasekaran@infantengineers.in"
                    className="text-gray-700 font-medium"
                  >
                    rajasekaran@infantengineers.in
                  </a>
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="block w-full bg-gray-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ThankYouPage;
