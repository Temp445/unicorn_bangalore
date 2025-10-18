'use client'; 

import Link from 'next/link';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-5 md:right-5 z-50 flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
    >
      <span className='text-4xl font-black'>
      <FaWhatsapp className='font-extrabold' />

      </span>
    </Link>
  );
};

export default WhatsAppButton;
