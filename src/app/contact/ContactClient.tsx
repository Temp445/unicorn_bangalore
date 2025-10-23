"use client";

import React, { useRef, useState, useEffect, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { sendWhatsappMessage } from "@/services/whatsapp/whatsappService";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Facebook, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";
import contact from "@/assets/contact.svg";
import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { useRouter } from "next/navigation";

const service_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const template_ID = process.env.NEXT_PUBLIC_EMAILJS_ENQ_TEMPLATE_ID || "";
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

const endpoint = "/api/proxy-validate-email";

const ContactClient = () => {
  const countryCode = "IN";
  const router = useRouter()

  const form = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [phoneError, setPhoneError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateEmail = async (email: string): Promise<string> => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.status !== 200) return "Invalid Email";

      const data = await response.json();
      if (data.success) {
        return data.isValid ? "" : "Invalid Email Address";
      } else {
        return ` Failed: ${data.error}`;
      }
    } catch (err) {
      console.error("Email validation error:", err);
      return "Validation unavailable";
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const formCurrent = form.current;
    if (!formCurrent) return;

    const emailValidationMessage = await validateEmail(email);
    if (emailValidationMessage) {
      setEmailError(emailValidationMessage);

      emailInputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      emailInputRef.current?.focus();
      return;
    } else {
      setEmailError("");
    }

    if (!phone || !isValidPhoneNumber(phone)) {
      setPhoneError("Please enter a valid phone number");
      return;
    } else {
      setPhoneError("");
    }

    const phoneWithoutPlus = phone.replace(/[\s+]/g, "");

    const formData = {
      Full_Name: (formCurrent["Name"] as HTMLInputElement)?.value || "",
      Company_Name: formCurrent["company"]?.value || "",
      Business_Email: email,
      Mobile_Number: phoneWithoutPlus,
      Location: formCurrent["location"]?.value || "",
      Message: formCurrent["queries"]?.value || "",
      Product_Interested: formCurrent["product"]?.value || "",
      Originate_From: "Unicorn ERP Contact Page",
    };

    setLoading(true);

    try {
      await emailjs.send(service_ID, template_ID, formData, publicKey);
      router.push('/thank-you')
      formCurrent.reset();
      setEmail("");
      setPhone("");
    } catch (error) {
      console.error("Email sending failed:", error);
      alert("Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }

    try {
      await sendWhatsappMessage("enquiry_form", {
        originateFrom: formData.Originate_From,
        fullName: formData.Full_Name,
        companyName: formData.Company_Name,
        businessEmail: formData.Business_Email,
        mobileNumber: formData.Mobile_Number,
        location: formData.Location,
        productInterest: formData.Product_Interested,
        message: formData.Message,
      });

      await sendWhatsappMessage(
        "customer_greetings",
        {
          fullName: formData.Full_Name,
          product: formData.Product_Interested,
          siteUrl: "https://acesoft.in",
          imageUrl:
            "https://res.cloudinary.com/dohyevc59/image/upload/v1749124753/Enquiry_Greetings_royzcm.jpg",
        },
        phoneWithoutPlus
      );
    } catch (error) {
      console.error("WhatsApp sending error:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen">
        <div className="bg-[#205057] text-white py-20 text-center relative">
          <p className="text-3xl md:text-4xl font-bold">Contact Us</p>
          <h1 className="mt-4 text-base md:text-xl">
            Reach Out for Details on Our Manufacturing Solutions
          </h1>
        </div>

        <div className="container mx-auto px-2 md:px-6 py-16 flex justify-center relative">
          <div className="w-full lg:w-1/2 mx-auto bg-white rounded-lg p-4 md:p-8 border border-dashed">
            <h2 className="text-2xl md:text-3xl font-bold  text-center">
              Product Enquiry
            </h2>
            <div className="w-44 h-1 bg-[#205057] rounded mx-auto mb-6"></div>
            <form ref={form} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="Name"
                  placeholder="Enter your name *"
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-1 focus:ring-gray-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Company Name</label>
                <input
                  type="text"
                  name="company"
                  placeholder="Enter your company name *"
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-1 focus:ring-gray-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Business Email</label>
                <input
                  ref={emailInputRef}
                  type="email"
                  name="email"
                  placeholder="Enter your email *"
                  onChange={(e) => setEmail(e.target.value.trim())}
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-gray-700 focus:outline-none"
                />
                {emailError && (
                  <p id="email-error" className="text-red-500 text-sm mt-1">
                    {emailError}
                  </p>
                )}
              </div>

              <div>
                <label className=" font-medium">Mobile Number</label>
                <PhoneInput
                  international
                  defaultCountry={countryCode}
                  value={phone}
                  onChange={setPhone}
                  className="!shadow-none rounded !bg-transparent border border-gray-300 mt-1 p-2 [&>input]:border-none [&>input]:outline-none [&>input]:bg-transparent"
                />
                {phoneError && (
                  <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">Your Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter Your location *"
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-1 focus:ring-gray-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Product Interested
                </label>
                <input
                  type="text"
                  name="product"
                  placeholder="Enter the product"
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-1 focus:ring-gray-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Queries</label>
                <textarea
                  name="queries"
                  placeholder="Enter your queries"
                  rows={5}
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-1 focus:ring-gray-700 focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#071520] text-white py-3 rounded-md hover:bg-[#205057] transition-colors"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>

          <div className="w-1/2 hidden lg:block">
            <Image
              src={contact}
              alt="contact"
              className="sticky top-10 w-full"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 px-7 pb-10 md:pb-0">
          <div className="bg-white shadow-lg rounded-lg p-6 flex-1 text-center border border-[#205057]">
            <h3 className="font-semibold text-lg mb-2">Email</h3>
         <div className="flex flex-col">
             <a href="mailto:unicornpdy@gmail.com">unicornpdy@gmail.com</a>
            <a href="mailto:planthead@unicornpdy.in">planthead@unicornpdy.in</a>
         </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 flex-1 text-center border border-[#205057]">
            <h3 className="font-semibold text-lg mb-2">Phone</h3>
         <div className="flex flex-col">
             <a href="tel:+919701946123">+91 9701946123</a>
            <a href="tel:+919841706116">+91 9841706116</a>
         </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 flex-1 text-center border border-[#205057]">
            <h3 className="font-semibold text-lg mb-2">Location</h3>
            <p className="text-sm">
              B 69/70, PIPDIC Industrial Estate, Mettupalayam, Puduchery-605009 
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 py-16 max-w-fit hidden md:block">
          <div className="gap-10">
            <div className="bg-[#205057] shadow-lg rounded-full py-3 px-5 gap-10 flex items-center justify-around">
              <Link
                href="#"
                className="text-white transition-all duration-500 hover:text-blue-600 p-1 hover:bg-white rounded"
              >
                <Facebook size={32} />
              </Link>
              <Link
                href="#"
                className="mt-1 p-1 rounded text-white hover:text-black hover:bg-white"
              >
                <BsTwitterX size={28} />
              </Link>
              <Link
                href="#"
                className="text-white p-1 transition-all duration-500 hover:bg-blue-500 rounded"
              >
                <Linkedin size={32} />
              </Link>

              <Link
                href="#"
                className="text-white transition-all duration-500 hover:text-red-800 hover:bg-white p-1 rounded"
              >
                <Youtube size={32} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactClient;
