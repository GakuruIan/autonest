"use client";
import React from "react";

import { columns, CarProps } from "./Columns";

// data table
import { DataTable } from "./data-table";

import { useFetchCars } from "@/hooks/queries/useFetchCars";

import Spinner from "@/components/ui/Loaders/Spinner";

const CarListing = () => {
  const { data: cars, isLoading } = useFetchCars();

  if (isLoading) {
    return (
      <div className="h-44 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <DataTable columns={columns} data={cars} />;
};

export default CarListing;
