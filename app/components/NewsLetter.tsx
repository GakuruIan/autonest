import React from "react";

// components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NewsLetter = () => {
  return (
    <section className="pb-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl  font-jura mb-4">
          Get the Best Car Deals in Your Inbox
        </h2>
        <p className="text-gray-500 dark:text-neutral-300 max-w-lg mx-auto mb-8">
          Subscribe to stay updated on the latest arrivals, exclusive offers,
          and expert car-buying tips — straight to your email.
        </p>

        <form className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          <Input placeholder="Enter your email address" type="email" />
          <Button>Subscribe now</Button>
        </form>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default NewsLetter;
