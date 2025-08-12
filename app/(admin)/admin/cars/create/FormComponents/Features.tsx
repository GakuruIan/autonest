import React from "react";

import { Textarea } from "@/components/ui/textarea";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface props {
  form: any;
}

const Features = ({ form }: props) => {
  return (
    <div>
      <div className="flex flex-col space-y-8">
        {/* car model */}
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wider text-sm mb-1.5">
                  Car model
                </FormLabel>
                <FormControl>
                  <Input
                    id="carname"
                    type="text"
                    placeholder="e.g Toyota Camry"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* car description*/}
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wider text-sm mb-1.5">
                  Car Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    id="description"
                    placeholder="Type your description here."
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
