"use client";

import React, { useState } from "react";

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

// components
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import CarCard from "@/components/ui/CarCard";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loaders/Loader";
import Spinner from "@/components/ui/Loaders/Spinner";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";

// fetch hook
import { useFetchCars } from "@/hooks/queries/useFetchCars";

//car suggestion hook
import { useFetchCarSuggestions } from "@/hooks/queries/useFetchCarSuggestions";

// debounce hook
import { useDebounce } from "@/hooks/useDebounce";

// prisma car type
import { Car } from "@prisma/client";

import Link from "next/link";

// icons
import { Search, SlidersHorizontal } from "lucide-react";

import { useSearchParams } from "next/navigation";

type CarProps = Pick<Car, "id" | "brand" | "category" | "price" | "model"> & {
  thumbnail: {
    url: string;
  };
};

const Page = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 600);

  const { data: suggestions, isLoading: suggestionLoading } =
    useFetchCarSuggestions(debouncedSearch);

  if (!suggestionLoading) {
    console.log(suggestions);
  }

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

  const { isLoading, data: cars, error } = useFetchCars(category);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-72px)]">
        <p className="dark:text-neutral-300 font-poppins">{error.message}</p>
      </div>
    );
  }

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
        <div className="py-2 relative">
          <Form {...form}>
            <form>
              <div className="flex items-center gap-x-1.5 ">
                <FormField
                  control={form.control}
                  name="search_term"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="What type of car are you interested in?"
                          {...field}
                          value={search}
                          onChange={(e) => {
                            field.onChange(e);
                            setSearch(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-x-1">
                  <Button type="button" variant="outline">
                    <SlidersHorizontal />
                  </Button>
                </div>
              </div>
            </form>
          </Form>

          <Popover open={debouncedSearch.length > 0}>
            <PopoverAnchor asChild>
              <div />
            </PopoverAnchor>
            <PopoverContent
              className="p-1.5 mt-2 w-[var(--radix-popover-trigger-width)]"
              side="bottom"
              align="start"
            >
              {suggestionLoading ? (
                <div className="flex justify-center p-2">
                  <Spinner size="xs" />
                </div>
              ) : suggestions?.length ? (
                <div className="flex flex-col gap-2">
                  {suggestions.map((car: CarProps) => (
                    <Link
                      key={car.id}
                      href={`/cars/${car.id}`}
                      className="px-3 flex items-center gap-x-3 py-2 hover:bg-accent rounded-md transition"
                    >
                      <span className="text-base ">{car.model}</span>
                      <span className="font-sm text-muted-foreground">
                        ({car.brand})
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-center text-muted-foreground p-2">
                  No results found
                </p>
              )}
            </PopoverContent>
          </Popover>
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
          {cars?.map((car: CarProps) => {
            return (
              <CarCard
                id={car.id}
                key={car.id}
                model={car.model}
                price={car.price}
                category={car.category}
                brand={car.brand}
                image={car.thumbnail.url}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
