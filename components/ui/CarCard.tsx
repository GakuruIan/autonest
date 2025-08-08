import React from "react";

import Image from "next/image";

// icons
import { Heart } from "lucide-react";
import { Button } from "./button";

interface props {
  image: string;
  name: string;
  brand: string;
  category: string;
  price: number;
}

const CarCard: React.FC<props> = ({ image, name, brand, category, price }) => {
  return (
    <div className="hover-card w-full rounded-xl overflow-hidden border dark:border-neutral-500/20 flex flex-col shadow-md">
      {/* Image section with heart icon */}
      <div className="relative h-44 overflow-hidden">
        <Image src="/bmw_sedan.jpg" alt={name} fill className="image-hover" />
        <button className="cursor-pointer absolute top-3 right-3 backdrop-blur-md bg-white/30 dark:bg-neutral-900/30 p-2 rounded-full shadow hover:scale-105 transition">
          <Heart size={18} />
        </button>
      </div>

      {/* Car details */}
      <div className="px-4 py-3 flex-1">
        <div className="inline-flex items-center w-full justify-between">
          <h3 className="text-base font-semibold dark:text-neutral-300">
            {name}
          </h3>
          <p className="text-sm dark:text-neutral-300">{price}</p>
        </div>
        <p className="text-sm text-gray-500 dark:text-neutral-300">
          {brand} • {category}
        </p>
      </div>

      {/* Footer button */}
      <div className="px-4 pb-4">
        <Button className="w-full">Add cart</Button>
      </div>
    </div>
  );
};

export default CarCard;
