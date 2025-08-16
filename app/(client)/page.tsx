"use client";
import Loader from "@/components/ui/Loaders/Loader";

import Banner from "../components/Banner";
import Featured from "../components/Featured";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";
import Whyus from "../components/Whyus";

import { useFetchFeaturedCars } from "@/hooks/queries/useFetchFeatured";

export default function Home() {
  const { data: cars, isLoading, error } = useFetchFeaturedCars();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="">
      <Banner />
      <Featured FeaturedCars={cars} />
      <Whyus />
      <NewsLetter />
      <Footer />
    </div>
  );
}
