import CarListing from "@/components/Datatable/CarListing/CarListing";
import { Button } from "@/components/ui/button";
import React from "react";

const page = () => {
  return (
    <div className="dark:bg-neutral-500/10 rounded-sm border dark:border-neutral-700/20 p-4">
      <div className="flex flex-end mb-4">
        <Button className="font-poppins font-medium tracking-wide text-sm">
          Create Car
        </Button>
      </div>

      <CarListing />
    </div>
  );
};

export default page;
