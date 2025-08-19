"use client";
import React from "react";

// components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";

import { FeaturedCar } from "@/types/types";

interface props {
  FeaturedCars: FeaturedCar[];
}

const Featured: React.FC<props> = ({ FeaturedCars }) => {
  return (
    <div className="container  mx-auto my-8 px-2 md:px-0">
      <div className="grid md:grid-cols-2 gap-4 grid-cols-1  items-center mb-6">
        <h1 className="text-5xl md:text-7xl font-jura mb-3 md:mb-6">
          Featured Cars
        </h1>
        <p className="text-base dark:text-white">
          Handpicked selections just for you — explore top-rated, best value,
          and newest arrivals in one place.
        </p>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-5xl"
      >
        <CarouselContent>
          {FeaturedCars.map((car) => (
            <CarouselItem key={car.id} className="pl-1  md:basis-64">
              <div className="p-1">
                <div className="h-48 w-full relative mb-1">
                  <Image
                    src={car.thumbnail.url}
                    alt="car"
                    fill
                    className="rounded-md"
                  />
                </div>
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-base dark:text-white">{car.model}</h2>
                  <h2 className="text-base dark:text-neutral-400">
                    Ksh {car.price.toLocaleString()}
                  </h2>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Featured;
