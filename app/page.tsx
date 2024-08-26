"use client"

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@tremor/react";

const CATEGORIES = [
  {
    id: 1,
    name: "Electronics",
    image: "/electronic.jpeg",
    url: "/search/electronics",
  },
  {
    id: 2,
    name: "Jewelry",
    image: "/jewelry.jpeg",
    url: "/search/jewelry",
  },
  {
    id: 3,
    name: "Men's Clothing",
    image: "/men-clothing.jpeg",
    url: "/search/mens-clothing",
  },
  {
    id: 4,
    name: "Women's Clothing",
    image: "/woman-clothing.jpeg",
    url: "/search/womens-clothing",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % CATEGORIES.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col justify-between bg-gradient-to-br from-gray-100 to-gray-200 py-4 px-2 sm:py-6 sm:px-4">
        <div className="w-full max-w-6xl mx-auto flex flex-col justify-between h-full">
          <div className="mb-4 sm:mb-6 flex-shrink-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl text-center font-bold mb-2 sm:mb-3 md:mb-5 text-gray-800">
              Happy Shopping! 🛍️
            </h1>
            <p className="text-center text-gray-600 text-xs sm:text-sm md:text-base">
              Explore our categories below!
            </p>
          </div>
          <div className="flex-grow flex flex-col justify-center">
            <div className="relative w-full pb-[95%] md:pb-[37.5%]">
              <div className="absolute inset-0 w-[75%] sm:w-[85%] h-[100%] sm:h-[95%] mx-auto my-auto overflow-hidden rounded-lg shadow-xl">
                {CATEGORIES.map((category, index) => (
                  <div
                    key={category.id}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                      index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <Link href={category.url}>
                        <span className="text-white text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold hover:underline cursor-pointer">
                          {category.name}
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-4 sm:mt-6">
              {CATEGORIES.map((_, index) => (
                <Button
                  key={index}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mx-1 ${
                    index === currentSlide ? "bg-indigo-600" : "bg-gray-400"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}