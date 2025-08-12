import React from "react";

// components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import FileUpload from "./FileUpload/FileUpload";

interface props {
  form: any;
}

const PricingImage = ({ form }: props) => {
  return (
    <div>
      <div className="flex flex-col space-y-8 ">
        {/* car price */}
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wider text-sm mb-1.5">
                  Car Price (KSH)
                </FormLabel>
                <FormControl>
                  <Input
                    id="carname"
                    type="number"
                    placeholder="e.g 850,000"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-3 ">
          {/* car Thumbnail */}

          <FileUpload
            form={form}
            name="photo"
            label="Choose a Car Thumbnail"
            placeholder="choose an image"
            accept=".jpg,.jpeg"
          />
        </div>

        {/* category */}
        <div className="grid gap-3 ">
          {/* car photos */}

          <FileUpload
            form={form}
            name="photo"
            label="Choose a Car photos"
            placeholder="choose an image"
            accept=".jpg,.jpeg"
          />
        </div>
      </div>
    </div>
  );
};

export default PricingImage;
