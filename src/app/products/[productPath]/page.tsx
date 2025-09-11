"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/ProductDetailPage/HeroSection";
import FAQSection from "@/components/ProductDetailPage/FAQSection";
import ProductImages from "@/components/ProductDetailPage/ProductImages";
import CustomerTestimonial from "@/components/ProductDetailPage/CustomerTestimonial";
import WhoNeedThis from "@/components/ProductDetailPage/WhoNeedThis";
import WhyChoose from "@/components/ProductDetailPage/WhyChoose";
import Features from "@/components/ProductDetailPage/Features";
import Whatis from "@/components/ProductDetailPage/Whatis";
import ResultsSection from "@/components/ProductDetailPage/ResultsSection";
import DemoCard from "@/components/ProductDetailPage/DemoCard";
import Footer from "@/components/Footer";

interface Product {
  _id: string;
  productName: string;
  productLink?: string;
  calendlyUrl?: string;
  productPath: string;
  description?: string;
  category?: string;
  why_choose_des?: string;
  who_need_des?: string;
  mainImage: string[];
  productImage: string[];
  whatis?: { title: string; description?: string }[];
  benefits?: { title: string; description?: string }[];
  FAQ?: { question: string; answer?: string }[];
  Result?: { title: string; description?: string }[];
  customerTestimonials?: {
    clientName: string;
    companyName?: string;
    description: string;
  }[];
}

const ProductPage = () => {
  const { productPath } = useParams<{ productPath: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/product/${productPath}`);
        const result = await res.json();
        setProduct(result.data || null);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productPath) fetchProduct();
  }, [productPath]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-[#205057] border-t-transparent border-b-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-slate-900 text-white">
        <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen">
        <HeroSection
          product={{
            productName: product.productName,
            description: product.description || "",
            productLink: product.productLink,
            productPath: product.productPath,
            mainImage: product.mainImage,
            Result: product.Result,
          }}
        />
        <Whatis
          product={{
            whatis: product.whatis,
            productPath: product.productPath,
            productName: product.productName,
          }}
        />

        <WhyChoose
          product={{
            productName: product.productName,
            why_choose_des: product.why_choose_des || "",
          }}
        />
        <ProductImages productImage={product.productImage} />

        <WhoNeedThis WhoNeed={product.who_need_des ?? ""} />

        <Features
          product={{
            benefits: product.benefits,
            mainImage: product.mainImage,
            productName: product.productName,
          }}
        />

        <ResultsSection
          product={{
            Result: product.Result,
            productName: product.productName,
          }}
        />

        <DemoCard />
        <FAQSection FAQ={product.FAQ ?? []} />

        <CustomerTestimonial
          customerTestimonials={product.customerTestimonials}
        />
      </div>

      <Footer />
    </>
  );
};

export default ProductPage;
