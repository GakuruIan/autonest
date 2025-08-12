import React from "react";

// components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

interface props {
  form: any;
}

const BasicInformation = ({ form }: props) => {
  return (
    <div className="flex flex-col space-y-8 ">
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

      {/* category */}
      <div className="grid gap-3 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider text-sm mb-1.5">
                Car Category
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a car category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="hatch_back">HatchBack</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* car year */}
      <div className="grid gap-3">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider text-sm mb-1.5">
                Car year of manufacture
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

      {/* in stock */}
      <div className="grid gap-3">
        <FormField
          control={form.control}
          name="inStock"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Available for Sale</FormLabel>
                <FormDescription>
                  Check this if the car is currently available in your
                  inventory.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default BasicInformation;
