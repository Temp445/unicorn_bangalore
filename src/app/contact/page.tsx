import type { Metadata } from 'next';
import ContactClient from './ContactClient';

const domainUrl = process.env.NEXT_PUBLIC_API_FRONTEND_URL;

export const metadata: Metadata = {
  title: 'Contact Us | Unicorn (Bangalore) Pvt. Ltd',
  description: 'Reach Unicorn (Bangalore) Pvt. Ltd. for enquiries on precision turned components. Connect with our team for product details, support, and partnerships.',
  openGraph: {
    title: 'Contact Us | Unicorn (Bangalore) Pvt. Ltd',
    description: 'Reach Unicorn (Bangalore) Pvt. Ltd. for enquiries on precision turned components. Connect with our team for product details, support, and partnerships.',
    url: `${domainUrl}/contact`,
    siteName: 'Unicorn (Bangalore) Pvt. Ltd',
    images: [
      {
        url: `${domainUrl}/og-images/AceLogo.png`, 
        width: 1200,
        height: 630,
        alt: 'Unicorn (Bangalore) Pvt. Ltd',
      },
    ],
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactClient/>;
}