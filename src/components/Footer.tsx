import Link from "next/link";
import { Facebook, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 lg:pr-10 py-12 flex gap-5 xl:gap-24 lg:gap-10 flex-wrap xl:flex-nowrap  lg:justify-evenly">
        <div className="flex gap-10 flex-col md:flex-row">
          <div>
            <div className="flex gap-2">
              <Image
                src={logo}
                alt="Company Logo"
                className="h-9 md:h-8 w-8 -mt-1"
              />
              <h2 className="text-base lg:text-lg font-bold text-white mb-4">
                Unicorn (Bangalore) Pvt. Ltd
              </h2>
            </div>
            <p className="text-sm md:text-base mt-3 leading-relaxed max-w-sm flex gap-2">
              A leading manufacturer of precision-turned components for critical
              and safety applications, committed to excellence, quality, and
              innovation.
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="#">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className=" mt-1">
                <BsTwitterX className="text-lg" />
              </Link>
              <Link href="#">
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link href="#">
                <Youtube className="w-6 h-6" />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:font-bold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:font-bold transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:font-bold transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:font-bold transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          <div className="">
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 mb-4 max-w-sm">
              <li className="flex items-center gap-3">
                <span className="rounded-full bg-white p-1.5">
                  <MapPin className="w-5 h-5 text-[#205057]" />
                </span>
                <p>
                  B 69/70, PIPDIC Industrial Estate, Mettupalayam,
                  Puduchery-605009{" "}
                </p>
              </li>

              <li className="flex items-center gap-3">
                <span className="rounded-full bg-white p-1.5">
                  <Phone className="w-5 h-5 text-[#205057]" />
                </span>
                <div className="flex flex-col">
                  <a href="tel:+919701946123">+91 9701946123</a>
                  <a href="tel:+919841706116">+91 9841706116</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded-full bg-white p-1.5">
                  <Mail className="w-5 h-5 text-[#205057]" />
                </span>
                <div className="flex flex-col">
                  <a href="mailto:abishek@infantengineers.in">
                    abishek@infantengineers.in
                  </a>
                  <a href="mailto:rajasekaran@infantengineers.in">
                    rajasekaran@infantengineers.in
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className=" w-full lg:w-1/2 h-52 rounded-lg overflow-hidden border border-gray-700 lg:hidden xl:block">
            <iframe
              title="Unicorn ERP Location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15546.402389406661!2d80.215027!3d13.061076!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266947093a395%3A0x10b037f79c6e698f!2sBrindavanam%20Apartments!5e0!3m2!1sen!2sus!4v1755847210839!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 py-4 text-center text-sm text-gray-400">
        © 2025 Unicorn (Bangalore) Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
