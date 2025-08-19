"use client";

import React, { useState, useEffect } from "react";

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

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
import { SlidersHorizontal } from "lucide-react";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

type CarProps = Pick<Car, "id" | "brand" | "category" | "price" | "model"> & {
  thumbnail: {
    url: string;
  };
  isSaved: boolean;
};

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState("");

  const category = searchParams.get("category");
  const sortFromUrl = searchParams.get("sort");
  const minPriceFromUrl = searchParams.get("minPrice");
  const maxPriceFromUrl = searchParams.get("maxPrice");

  const [sortBy, setSortBy] = useState(sortFromUrl || "newest");
  const [minPrice, setMinPrice] = useState(minPriceFromUrl || "");
  const [maxPrice, setMaxPrice] = useState(maxPriceFromUrl || "");

  const debouncedSearch = useDebounce(search, 600);

  const { data: suggestions, isLoading: suggestionLoading } =
    useFetchCarSuggestions(debouncedSearch);

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

  const filters = {
    category,
    sort: sortFromUrl,
    minPrice: minPriceFromUrl,
    maxPrice: maxPriceFromUrl,
  };

  const { isLoading, data: cars, error } = useFetchCars(filters);

  useEffect(() => {
    setSortBy(sortFromUrl || "newest");
    setMinPrice(minPriceFromUrl || "");
    setMaxPrice(maxPriceFromUrl || "");
  }, [sortFromUrl, minPriceFromUrl, maxPriceFromUrl]);

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

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    // Update or remove filter params
    if (sortBy && sortBy !== "newest") {
      params.set("sort", sortBy);
    } else {
      params.delete("sort");
    }

    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button type="button" variant="outline">
                        <SlidersHorizontal />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Filters</DialogTitle>
                        <DialogDescription>
                          choose filters to apply
                        </DialogDescription>
                      </DialogHeader>

                      <div className="mb-2">
                        <h1 className="font-medium text-sm dark:text-neutral-300 text-gray-500 mb-2">
                          Sort by
                        </h1>
                        <div className="">
                          <RadioGroup
                            value={sortBy}
                            onValueChange={setSortBy}
                            defaultValue="newest"
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="newest" id="r1" />
                              <Label htmlFor="r1">Newest first</Label>
                            </div>
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="oldest" id="r2" />
                              <Label htmlFor="r2">Oldest first</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>

                      <div className="mb-2">
                        <h1 className="font-medium text-sm dark:text-neutral-300 text-gray-500 mb-2">
                          Price range
                        </h1>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="">
                            <Label className="mb-2">Minimum price</Label>
                            <Input
                              placeholder="minimum price"
                              value={minPrice}
                              onChange={(e) => setMinPrice(e.target.value)}
                              type="text"
                            />
                          </div>
                          <div className="">
                            <Label className="mb-2">Maximum price</Label>
                            <Input
                              placeholder="maximum price"
                              value={maxPrice}
                              onChange={(e) => setMaxPrice(e.target.value)}
                              type="text"
                            />
                          </div>
                        </div>
                      </div>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={applyFilters}>Apply Filters</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
          <h6 className="text-base font-medium font-poppins">
            Popular category:
          </h6>
          {/* popular  */}
          <div className="flex items-center gap-x-4">
            <Badge variant="outline" asChild>
              <Link href="/cars">All</Link>
            </Badge>
            <Badge variant="outline" asChild>
              <Link href="/cars?category=luxury">Luxury</Link>
            </Badge>
            <Badge variant="outline" asChild>
              <Link href="/cars?category=hatchback">Hatch back</Link>
            </Badge>
            <Badge variant="outline" asChild>
              <Link href="/cars?category=sedan">Sedan</Link>
            </Badge>
            <Badge variant="outline" asChild>
              <Link href="/cars?category=suv">SUV</Link>
            </Badge>
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
                isSaved={car.isSaved}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
