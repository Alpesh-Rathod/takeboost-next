"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Banner() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const bottle = document.querySelector('.boost-image-container') as HTMLElement | null;

    // Use ScrollTrigger's pin functionality to smoothly make the bottle "fixed" without layout/dimension jumps
    if (bottle) {
      // 1. Pin the bottle to fix it in placing during scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=99999", // Keeps it pinned practically indefinitely
        pin: bottle,
        pinSpacing: false, // Do not add extra scrolling space
      });

      // 2. Safely translate it precisely to the center of the viewport
      gsap.to(bottle, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=800", // Scroll duration for the centering move
          scrub: true,
          invalidateOnRefresh: true, // Ensure center gets perfectly re-calculated on resize
        },
        x: () => {
          const currentX = (gsap.getProperty(bottle, "x") as number) || 0;
          return window.innerWidth / 2 - (bottle.getBoundingClientRect().left - currentX + bottle.offsetWidth / 2);
        },
        y: () => {
          const currentY = (gsap.getProperty(bottle, "y") as number) || 0;
          return window.innerHeight / 2 - (bottle.getBoundingClientRect().top - currentY + bottle.offsetHeight / 2);
        },
        ease: "power2.inOut"
      });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="banner-section h-auto min-h-[600px] relative">
      <div className="w-full mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10 gap-10">

        {/* Left Side: Text */}
        <div className="flex flex-col z-10 w-full lg:w-[65%] xl:w-[80%]">
          <h1 className="flex flex-col font-extrabold pb-8 uppercase tracking-normal m-0 text-white drop-shadow-sm whitespace-nowrap " style={{ fontSize: 'clamp(5rem, 13vw, 15rem)', lineHeight: '0.85' }}>
            <span className="block">Because</span>
            <span className="block">Being Sick</span>
            <div className="flex items-end gap-6 flex-wrap lg:flex-nowrap">
              <span className="block">Sucks</span>
              <div className="hidden md:flex flex-col pb-2 lg:pb-3 xl:pb-4 whitespace-nowrap lg:pl-8 pl-4">
                <span className="text-xl md:text-2xl lg:text-3xl tracking-normal font-bold leading-tight capitalize">
                  BOOST Immunity
                </span>
                <span className="text-xl md:text-2xl lg:text-3xl tracking-normal font-bold leading-tight capitalize">
                  Gummy Vitamin
                </span>
              </div>
            </div>
          </h1>
          <div className="md:hidden flex flex-col mt-4 whitespace-nowrap lg:pl-4 pl-2">
            <span className="text-xl font-bold leading-tight capitalize">
              BOOST Immunity
            </span>
            <span className="text-xl font-bold leading-tight capitalize">
              Gummy Vitamin
            </span>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="relative w-full lg:w-[35%] xl:w-[20%] flex justify-center lg:justify-end z-20">
          <div className="boost-image-container relative">
            <img
              src="/img/right-botal.png"
              alt="Boost Immunity Gummy Vitamin Bottle"
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
            <div className="absolute top-[12%] right-[2%] md:right-[-2%] z-30">
              <button className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-20 lg:h-20 bg-[#fffcf4] text-black font-semibold text-lg sm:text-xl lg:text-2xl rounded-full border-[3px] border-black shadow-lg hover:scale-105 transition-transform animate-pulse-ring cursor-pointer select-none">
                BUY
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration if needed */}
    </section>
  );
}
