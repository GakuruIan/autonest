"use client";
import React, { useState } from "react";

// components
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// props
interface props {
  form: any;
}

interface Features {
  id: string;
  name: string;
  value: string;
}

// animation
import { AnimatePresence, motion } from "motion/react";

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const Features = ({ form }: props) => {
  const [features, setFeatures] = useState<Features[]>([
    { id: "1", value: "Air Conditioning", name: "Air Conditioning" },
    { id: "2", value: "Power Steering", name: "Power Steering" },
    { id: "3", value: "ABS", name: "ABS" },
    { id: "4", value: "Airbags", name: "Airbags" },
  ]);

  return (
    <div>
      <div className="flex flex-col space-y-6">
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wider text-sm mb-1.5">
                  Car Rating
                </FormLabel>
                <FormControl>
                  <Input
                    id="carengine"
                    type="text"
                    placeholder="e.g 3"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Car rating should be between 1 - 5
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* car description*/}
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="description"
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

        {/* car features */}
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wider text-sm mb-2">
                  Choose car features
                </FormLabel>
                <ScrollArea className="max-h-96 w-full  p-1">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <AnimatePresence>
                      {features.map((feature, index) => {
                        const isChecked = field.value?.includes(feature.value);
                        return (
                          <motion.div
                            key={feature.id}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{ delay: index * 0.05 }}
                          >
                            <FormControl>
                              <Label className="hover:bg-accent/50 dark:hover:bg-neutral-500/40 hover:cursor-pointer flex items-start gap-3 rounded-lg border dark:border-neutral-500/30 p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                                <Checkbox
                                  id={feature.id}
                                  checked={isChecked}
                                  onCheckedChange={(checked) => {
                                    const updatedValues = checked
                                      ? [...(field.value || []), feature.value]
                                      : (field.value || []).filter(
                                          (val: string) => val !== feature.value
                                        );

                                    field.onChange(updatedValues);
                                  }}
                                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                />
                                <div className="grid gap-1.5 font-normal">
                                  <p className="text-sm leading-none font-medium">
                                    {feature.name}
                                  </p>
                                </div>
                              </Label>
                            </FormControl>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </ScrollArea>

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
