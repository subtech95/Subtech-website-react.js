"use client";

import Marquee from "@/components/ui/marquee";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Rajesh Kumar",
    company: "Honda Power Equipment Dealer",
    body: "Subtech panels have completely eliminated motor burnouts at our dealership. The MPU protection is genuinely different from anything else in the market.",
  },
  {
    name: "Suresh Mehta",
    company: "Delhi Jal Board Engineer",
    body: "We have installed over 50 Subtech panels across our pumping stations. Zero failures in 3 years. The digital display makes troubleshooting so easy.",
  },
  {
    name: "Amit Singh",
    company: "NTPC Contractor",
    body: "The double single phasing protection saved our motor worth Rs 2 lakh last monsoon. Best investment we made.",
  },
  {
    name: "Priya Sharma",
    company: "Agricultural Cooperative UP",
    body: "Farmers in our cooperative used to burn motors every season. After Subtech starters not a single motor burned in two years.",
  },
  {
    name: "Vikram Tiwari",
    company: "Industrial Contractor Noida",
    body: "Installation is straightforward and the error codes on the display mean I can diagnose problems over phone without visiting the site.",
  },
  {
    name: "Mohammed Rashid",
    company: "DMRC Subcontractor",
    body: "Used Subtech MCC panels on our metro project. The build quality and certifications met all government tender requirements easily.",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// Split testimonials into 4 columns
const col1 = testimonials.slice(0, 2);
const col2 = testimonials.slice(2, 4);
const col3 = testimonials.slice(4, 6);
const col4 = [...testimonials.slice(0, 1), ...testimonials.slice(3, 4)];

function TestimonialCard({ name, company, body }: (typeof testimonials)[0]) {
  return (
    <Card className="bg-[#1A1A1A] border-0 border-l-[3px] border-l-[#CC0000] rounded-xl mx-2 my-3 min-w-[280px] shrink-0">
      <CardContent className="p-6">
        <p className="text-white/80 text-[15px] leading-[1.7] mb-5">{body}</p>
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="text-[18px] font-bold">{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-white text-[18px] font-semibold">{name}</p>
            <p className="text-[#CC0000] text-[14px]">{company}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="bg-[#0D0D0D] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-[48px] font-semibold text-white tracking-[-1px] leading-[1.2] mb-4">
          What Our Clients Say
        </h2>
        <p className="text-[#888888] text-lg">
          Trusted by engineers and contractors across India
        </p>
      </div>

      <div
        className="relative h-[600px] overflow-hidden w-full"
        style={{
          perspective: "800px",
        }}
      >
        <div
          className="flex gap-6 justify-center w-full"
          style={{
            transform:
              "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
          }}
        >
          <Marquee vertical pauseOnHover className="[--duration:20s] flex-1">
            {col1.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </Marquee>
          <Marquee vertical reverse pauseOnHover className="[--duration:24s] flex-1">
            {col2.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover className="[--duration:22s] flex-1">
            {col3.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </Marquee>
          <Marquee vertical reverse pauseOnHover className="[--duration:26s] flex-1 hidden md:flex">
            {col4.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </Marquee>
        </div>

        {/* Top and bottom fade gradients */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0D0D0D] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0D0D0D] to-transparent z-10" />
      </div>
    </section>
  );
}
