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
                  <a href="mailto:unicornpdy@gmail.com">
                    unicornpdy@gmail.com
                  </a>
                  <a href="mailto:planthead@unicornpdy.in">
                    planthead@unicornpdy.in
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className=" w-full lg:w-1/2 h-52 rounded-lg overflow-hidden border border-gray-700 lg:hidden xl:block">
            <iframe
              title="Unicorn ERP Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15613.472201393637!2d79.76085149746156!3d11.949000022116811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5360de8befe401%3A0xbb1923e32e967a0a!2sPipdic%20Industrial%20Estate%2C%20Mettupalayam%2C%20Marie%20Oulgaret%2C%20Puducherry%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1761212517045!5m2!1sen!2sin"
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
