import React from "react";

import Image from "next/image";

// components
import { Button } from "@/components/ui/button";

const Banner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] h-full w-full pb-6 mb-8">
      <div className="container mx-auto">
        <div className="relative flex flex-col gap-y-8 w-full items-center justify-center mt-8 px-2 md:px-0">
          <div className="">
            <div className="relative group mb-4">
              <button className="relative w-56 border dark:border-neutral-600 dark:bg-neutral-800 hover:dark:bg-neutral-700/30 rounded-lg leading-none px-4 py-2">
                <p className="text-sm px-6 py-1 dark:text-white font-jura tracking-wide">
                  Trusted by 1200
                </p>
              </button>
            </div>
          </div>

          {/* content */}
          <div className="mb-6 flex items-center justify-center flex-col space-y-8">
            <h1 className="font-jura  text-5xl text-center  md:text-8xl">
              Find Your Next Ride Today
            </h1>
            <p className="text-base text-center dark:text-white max-w-4xl font-jura">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure ex
              exercitationem sint quaerat, asperiores possimus vel, odit
              incidunt, corrupti optio expedita assumenda voluptatibus impedit!
              Deserunt est dicta repudiandae ratione expedita.
            </p>

            <Button variant="default" className="w-44 font-semibold">
              Get Started
            </Button>
          </div>
        </div>
      </div>
      <div className="relative w-full h-96 md:h-[500px] lg:max-w-9xl">
        <Image
          src="/bmw2.jpg"
          alt="Car"
          fill
          className="object-cover"
          priority // loads the banner faster
        />
      </div>
    </div>
  );
};

export default Banner;
