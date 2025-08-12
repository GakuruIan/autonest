import Image from "next/image";
import React from "react";

// components
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

// cars

const Page = () => {
  const cars = [1];
  return (
    <div className="flex flex-col space-y-6 container mx-auto py-6 px-2 md:px-0">
      <header className="">
        <h2 className="text-3xl md:text-5xl  dark:text-white font-jura mb-3">
          Your cart
        </h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* cart */}

        <div className="cols-span-full md:col-span-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Car name</TableHead>
                <TableHead>Car brand</TableHead>
                <TableHead>Car category</TableHead>
                <TableHead className="">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cars.map((car) => (
                <TableRow key={car}>
                  <TableCell>
                    <div className="relative size-24 overflow-hidden rounded-md">
                      <Image src="/bmw2.jpg" alt="car name" fill />
                    </div>
                  </TableCell>
                  <TableCell>Car name</TableCell>
                  <TableCell>Car brand</TableCell>
                  <TableCell>car price</TableCell>
                  <TableCell>car category</TableCell>
                  <TableCell className="text-right">
                    <button className="flex items-center gap-x-1 text-rose-500 font-medium justify-center p-1.5 rounded-sm hover:underline transition-colors cursor-pointer">
                      <Trash size={16} />
                      Remove
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>Total</TableCell>
                <TableCell>$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>

        {/* summary */}
        <div className="col-span-full md:col-span-4">
          <div className="border dark:border-neutral-600/10 p-4 rounded-md">
            <div className="border-b dark:border-b-neutral-600/10 mb-4">
              <h1 className="font-jura text-lg mb-2">Order summary</h1>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <h6 className="text-sm dark:text-neutral-200">Sub total</h6>
                <p className="text-sm text-gray-500 dark:text-neutral-300">
                  Ksh 1.2M
                </p>
              </div>
              {/* shipping */}
              <div className="flex items-center justify-between">
                <h6 className="text-sm dark:text-neutral-200">Shipping Fee</h6>
                <p className="text-sm text-gray-500 dark:text-neutral-300">
                  100,000
                </p>
              </div>
              {/* total */}
              <div className="border-t dark:border-t-neutral-600/10 py-2 mb-4">
                <div className="flex items-center justify-between">
                  <h6 className="text-sm dark:text-neutral-200">Total</h6>
                  <p className="text-sm text-gray-500 dark:text-neutral-300">
                    1,300,000
                  </p>
                </div>
              </div>

              {/* checkout */}
              <Button className="w-full">Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
