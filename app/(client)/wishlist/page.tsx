"use client";
import React from "react";

// car table component
import CarTable from "@/components/CarTable/components/CarTable";

// custom loader
import Loader from "@/components/ui/Loaders/Loader";

// hook
import { useFetchWishList } from "@/hooks/queries/useFetchWishList";

const Page = () => {
  const { data, isLoading, error } = useFetchWishList();

  if (isLoading) {
    return <Loader />;
  }

  console.log(data);

  return (
    <div className="container mx-auto py-6 px-2 md:px-0">
      <CarTable cars={data} />
    </div>
  );
};

export default Page;
