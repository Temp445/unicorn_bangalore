import type { Metadata } from 'next';

import HeroSection from "@/components/MachineryPage/HeroSection";
import MachineGallery from "@/components/MachineryPage/MachineGallery";
import InstrumentGallery from "@/components/MachineryPage/InstrumentGallery";
import CardSection from "@/components/MachineryPage/CardSection";

const domainUrl = process.env.NEXT_PUBLIC_API_FRONTEND_URL;

export const metadata: Metadata = {
  title: 'Advanced Machinery & Instruments | Unicorn (Bangalore) Pvt. Ltd.',
  description: 'Explore Unicorn (Bangalore) Pvt. Ltd.’s advanced machinery and instruments for precision turned components, ensuring high quality and reliable manufacturing.',
  openGraph: {
    title: 'Advanced Machinery & Instruments | Unicorn (Bangalore) Pvt. Ltd.',
    description: 'Explore Unicorn (Bangalore) Pvt. Ltd.’s advanced machinery and instruments for precision turned components, ensuring high quality and reliable manufacturing.',
    url: `${domainUrl}/machinery`,
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

const InfrastructurePage = () => {
  return (
     <>
     <HeroSection />
     <MachineGallery />
     <InstrumentGallery/>
     <CardSection/>
     </>
  );
};

export default InfrastructurePage;
