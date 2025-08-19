import React from "react";

import Image from "next/image";

// icons
import { HeartPlus } from "lucide-react";

import Link from "next/link";

// util function
import { cn } from "@/lib/utils";

// hooks
import { useAddToWishList } from "@/hooks/mutations/useAddToWishList";
import { useRemoveFromWishlist } from "@/hooks/mutations/useRemoveFromWishlist";

interface props {
  id: string;
  image: string;
  model: string;
  brand: string;
  category: string;
  price: number;
  isSaved: boolean;
}

const CarCard: React.FC<props> = ({
  id,
  image,
  model,
  brand,
  category,
  price,
  isSaved,
}) => {
  const addToWishlistMutation = useAddToWishList();
  const removeFromWishlistMutation = useRemoveFromWishlist();

  const handleWishList = async () => {
    if (!isSaved) {
      await addToWishlistMutation.mutateAsync(id);
    } else {
      await removeFromWishlistMutation.mutateAsync(id);
    }
  };

  return (
    <div className="hover-card w-full rounded-xl overflow-hidden border dark:border-neutral-500/20 flex flex-col shadow-md">
      {/* Image section with heart icon */}
      <div className="relative h-44 overflow-hidden">
        <Image src={image} alt={model} fill className="image-hover" />
        <button
          onClick={handleWishList}
          className="cursor-pointer absolute top-3 right-3 backdrop-blur-md bg-white/30 dark:bg-neutral-100/20 p-2 rounded-full shadow hover:scale-105 transition"
        >
          <HeartPlus
            size={18}
            fill={isSaved ? "red" : "white"}
            className={cn(isSaved ? "text-rose-600" : "text-white")}
          />
        </button>
      </div>

      {/* Car details */}
      <div className="px-4 py-3 flex-1">
        <div className="inline-flex items-center w-full justify-between">
          <h3 className="text-base font-semibold dark:text-neutral-300">
            {model}
          </h3>
          <p className="text-sm dark:text-neutral-300">
            {price.toLocaleString()}
          </p>
        </div>
        <p className="text-sm text-gray-500 dark:text-neutral-300">
          {brand} • <Link href={`/cars?category=${category}`}>{category}</Link>
        </p>
      </div>

      {/* Footer button */}
      <div className="px-4 pb-4">
        <Link
          href={`/cars/${id}`}
          className="bg-primary dark:bg-white dark:hover:bg-white/60 dark:text-neutral-800 text-primary-foreground shadow-xs hover:bg-primary/90 w-full inline-flex rounded-md text-sm items-center justify-center gap-2 whitespace-nowrap font-medium p-1.5"
        >
          View Car
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
