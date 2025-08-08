"use client";

import Image from "next/image";
import React, { useState } from "react";

const carImages = ["/bmw2.jpg", "/bmw_sedan.jpg"];

// components
import { Button } from "@/components/ui/button";
import CarCard from "@/components/ui/CarCard";

const CarDetails = () => {
  const [selectedImage, setSelectedImage] = useState(carImages[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Image Gallery */}
      <div>
        <div className="w-full h-96 relative  overflow-hidden rounded-xl ">
          <Image src={selectedImage} alt="Selected Car" fill />
        </div>

        <div className="mt-4 flex gap-3 overflow-x-auto">
          {carImages.map((img, idx) => (
            <div
              className="relative w-24 h-16 cursor-pointer"
              key={idx}
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className={`border-2 rounded-md transition ${
                  selectedImage === img
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Car Details */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-medium font-poppins">
            Toyota Corolla Altis 2021
          </h1>
          <p className="text-gray-600 dark:text-neutral-400 text-lg mt-1">
            $18,000 or Financing Available
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium dark:text-neutral-200">Engine</p>
            <p className="text-gray-500 dark:text-neutral-400">
              1.8L 4-Cylinder
            </p>
          </div>
          <div>
            <p className="font-medium dark:text-neutral-200">Transmission</p>
            <p className="text-gray-500 dark:text-neutral-400">Automatic CVT</p>
          </div>
          <div>
            <p className="font-medium dark:text-neutral-200">Mileage</p>
            <p className="text-gray-500 dark:text-neutral-400">32,000 km</p>
          </div>
          <div>
            <p className="font-medium dark:text-neutral-200">Fuel Type</p>
            <p className="text-gray-500 dark:text-neutral-400">Petrol</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button className="flex-1">Add to cart</Button>

          <Button className="flex-1" variant="outline">
            Buy now
          </Button>
        </div>

        <div>
          <h2 className="text-lg font-medium font-poppins mb-2">
            Car Description
          </h2>
          <p className="text-gray-700 dark:text-neutral-300">
            The 2021 Toyota Corolla Altis offers exceptional fuel efficiency, a
            stylish design, and reliable performance. Great for city and highway
            use.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium font-poppins mb-2 tracking-wide">
            Features
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-neutral-300 space-y-1">
            <li>Keyless Entry</li>
            <li>Touchscreen Infotainment System</li>
            <li>Rear Parking Camera</li>
            <li>Adaptive Cruise Control</li>
            <li>ABS & Airbags</li>
          </ul>
        </div>
      </div>

      {/* Related Cars Section */}
      <div className="col-span-2 mt-10">
        <h2 className="text-xl font-medium font-poppins mb-4">Related Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[1, 2].map((i) => (
            <div className="" key={i}>
              <div className="w-full h-44 relative mb-2.5 overflow-hidden rounded-md">
                <Image src="/bmw2.jpg" fill alt="photo name" />
              </div>
              <div className="flex items-center justify-between">
                <h1 className="text-lg dark:text-white">Car name</h1>
                <p className="text-sm dark:text-neutral-300">ksh 12000</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
