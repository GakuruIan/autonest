"use client";

import React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

// form utils
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import CarCard from "@/components/ui/CarCard";

const Page = () => {
  const searchSchema = z.object({
    search_term: z
      .string()
      .min(1, "Search term is required")
      .max(50, "Search can't be more than 50 characters")
      .trim(),
  });

  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search_term: "",
    },
  });

  const cars = [
    {
      image: "https://images.unsplash.com/photo-1605369178370-19f0a3c16d9b",
      name: "Corolla Altis",
      brand: "Toyota",
      category: "Sedan",
      price: 18000,
    },
    {
      image: "https://images.unsplash.com/photo-1617434778949-cd3e364a3e44",
      name: "Civic Sport",
      brand: "Honda",
      category: "Sedan",
      price: 22000,
    },
    {
      image: "https://images.unsplash.com/photo-1610642053169-d5e47f2a1ecf",
      name: "Model 3",
      brand: "Tesla",
      category: "Electric",
      price: 35000,
    },
    {
      image: "https://images.unsplash.com/photo-1622022046904-e2b9ff48853b",
      name: "Mustang GT",
      brand: "Ford",
      category: "Coupe",
      price: 42000,
    },
    {
      image: "https://images.unsplash.com/photo-1583267746741-371cb60f7331",
      name: "CX-5",
      brand: "Mazda",
      category: "SUV",
      price: 27000,
    },
  ];

  return (
    <div className="container mx-auto py-6 px-2 md:px-0">
      <div className="flex flex-col space-y-3">
        <header className="">
          <h2 className="text-3xl md:text-5xl  dark:text-white font-jura mb-3">
            Discover the World’s Finest Cars
          </h2>
          <p className="text-sm font-jura dark:text-neutral-300 md:max-w-lg text-gray-500">
            Explore listings from trusted sellers and top dealerships—find your
            next car with confidence and ease.
          </p>
        </header>

        {/* search form */}
        <div className="py-2">
          <Form {...form}>
            <form action="">
              <FormField
                control={form.control}
                name="search_term"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="What type of car are you interested in?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <div className="flex items-center gap-x-2">
          <h6 className="text-base font-medium font-poppins">Popular:</h6>
          {/* popular  */}
          <div className="flex items-center gap-x-4">
            <Badge variant="outline">Mark X</Badge>
            <Badge variant="outline">Rav 4</Badge>
            <Badge variant="outline">Madza cx5</Badge>
          </div>
        </div>

        {/* CAR    */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {cars.map((car, index) => (
            <CarCard
              key={index}
              name={car.name}
              price={car.price}
              category={car.category}
              brand={car.brand}
              image={car.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
