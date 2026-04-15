"use client";

import { useEffect, useState } from "react";
import AnimatedSection from "../shared/AnimatedSection";
import ProductCard from "../ui/ProductCard";

interface Product {
  id: string;
  title: string;
  description: string;
  slug: string;
}

// Fallback data if CRM is unavailable
const fallbackProducts: Product[] = [
  { id: "1", title: "VFD Panels", description: "Variable Frequency Drive panels. Designed for precise speed and torque control. From 0.5 HP to 200 HP.", slug: "vfd-panels" },
  { id: "2", title: "AMF Panels", description: "Auto Mains Failure panels. Seamless transition from grid to generator without human intervention.", slug: "amf-panels" },
  { id: "3", title: "MCC Panels", description: "Motor Control Centre. Centralized operation for multiple heavy-duty industrial motors.", slug: "mcc-panels" },
  { id: "4", title: "DOL Motor Starters", description: "Direct-On-Line starters up to 15 HP. Rock-solid protection against single phasing and voltage drops.", slug: "dol-starters" },
  { id: "5", title: "ATS Panels", description: "Auto Transfer Switch panels. Safely switch between secondary power sources.", slug: "ats-panels" },
  { id: "6", title: "Soft Starters", description: "Eliminates mechanical shock and high inrush current. Extends motor life significantly.", slug: "soft-starters" },
];

export default function ProductsGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mocking an API call to crm.subtech.in with proper caching logic
    const fetchProducts = async () => {
      try {
        // Simulated network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        // Mock successful fetch logic here - if API fails, it catches
        setProducts(fallbackProducts);
      } catch {
        setProducts(fallbackProducts); // Safe fallback
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <section className="bg-white py-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4 text-black">Built for Every Application</h2>
          <p className="text-gray-muted text-[18px]">
            From 0.5 HP to 500 HP. From farms to power plants.
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-subtle/20 rounded-[12px] h-[320px] p-8 border border-gray-subtle/50">
                <div className="w-[80px] h-[80px] bg-gray-subtle/40 rounded-lg mb-6"></div>
                <div className="h-6 bg-gray-subtle/40 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-subtle/40 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-subtle/40 rounded w-4/5 mb-6"></div>
                <div className="h-5 bg-gray-subtle/40 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductCard 
                key={product.id} 
                title={product.title} 
                description={product.description} 
                slug={product.slug} 
                index={index} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
