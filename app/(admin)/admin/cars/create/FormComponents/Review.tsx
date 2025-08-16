import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface props {
  form: any;
}

const Review = ({ form }: props) => {
  return (
    <div className="space-y-3">
      <div className="">
        <h6 className="text-2xl dark:text-neutral-200 mb-2.5">
          Car Basic information
        </h6>

        <div className="space-y-3">
          {/* model */}
          <div className="inline-flex items-center justify-between w-full  gap-x-4">
            <p className="dark:text-neutral-300 ">Model</p>
            <p className="dark:text-neutral-300 text-base">
              {form.getValues("model")}
            </p>
          </div>

          <div className="inline-flex items-center justify-between w-full  gap-x-4">
            <p className="dark:text-neutral-300 ">Brand</p>
            <p className="dark:text-neutral-300 text-base">
              {form.getValues("brand")}
            </p>
          </div>

          <div className="inline-flex items-center justify-between w-full  gap-x-4">
            <p className="dark:text-neutral-300 ">Category</p>
            <p className="dark:text-neutral-300 text-base">
              {form.getValues("category")}
            </p>
          </div>

          <div className="inline-flex items-center justify-between w-full  gap-x-4">
            <p className="dark:text-neutral-300 ">Car year of manufacture</p>
            <p className="dark:text-neutral-300 text-base">
              {form.getValues("year")}
            </p>
          </div>

          <div className="inline-flex items-center justify-between w-full  gap-x-4">
            <p className="dark:text-neutral-300 text-lg">In stock</p>
            <p className="dark:text-neutral-300 text-base">
              {form.getValues("in_stock")}
            </p>
          </div>
        </div>
      </div>

      {/* car images */}
      <div className="">
        <h6 className="text-2xl dark:text-neutral-200">Car Photos</h6>

        {form.getValues("thumbnail") ? (
          <div className="relative size-32">
            <Image
              src={
                form.getValues("thumbnail") instanceof File
                  ? URL.createObjectURL(form.getValues("thumbnail"))
                  : form.getValues("thumbnail")
              }
              alt="Car preview"
              className="object-cover w-full h-full rounded-lg shadow"
              fill
              onLoad={(e) => {
                if (form.getValues("thumbnail") instanceof File) {
                  URL.revokeObjectURL((e.target as HTMLImageElement).src);
                }
              }}
            />
          </div>
        ) : (
          <p className="text-neutral-500">No photo uploaded</p>
        )}

        <div className="flex flex-wrap gap-4 mt-3">
          {form.getValues("photos")?.length > 0 ? (
            form.getValues("photos").map((file: File, idx: number) => {
              const previewUrl = URL.createObjectURL(file);
              return (
                <div key={idx} className="relative size-24">
                  <Image
                    src={previewUrl}
                    alt={`Car ${idx + 1}`}
                    fill
                    className="object-cover w-full h-full rounded-lg shadow"
                    onLoad={() => URL.revokeObjectURL(previewUrl)} // cleanup
                  />
                </div>
              );
            })
          ) : (
            <p className="text-neutral-500">No photos uploaded</p>
          )}
        </div>
      </div>

      <div className="">
        <h6 className="text-2xl dark:text-neutral-200 mb-2.5">
          Car Specifications
        </h6>

        <div className="space-y-3">
          {/* model */}
          <div className="inline-flex items-center justify-between w-full  gap-x-4">
            <p className="dark:text-neutral-300 ">Car engine</p>
            <p className="dark:text-neutral-300 text-base">
              {form.getValues("engine")}
            </p>
          </div>

          <div className="inline-flex items-center justify-between w-full  gap-x-4">
            <p className="dark:text-neutral-300 ">Transmission</p>
            <p className="dark:text-neutral-300 text-base">
              {form.getValues("transmission")}
            </p>
          </div>

          <div className="inline-flex items-center justify-between w-full  gap-x-4">
            <p className="dark:text-neutral-300 ">Fuel type</p>
            <p className="dark:text-neutral-300 text-base">
              {form.getValues("fuel_type")}
            </p>
          </div>

          <div className="inline-flex items-center justify-between w-full  gap-x-4">
            <p className="dark:text-neutral-300 ">Mileage</p>
            <p className="dark:text-neutral-300 text-base">
              {form.getValues("mileage")}
            </p>
          </div>

          <div className="inline-flex items-center justify-between w-full  gap-x-4">
            <p className="dark:text-neutral-300 text-lg">Seating capacity</p>
            <p className="dark:text-neutral-300 text-base">
              {form.getValues("seating_capacity")}
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <h6 className="text-2xl dark:text-neutral-200 mb-2.5">Car Features</h6>

        <div className="space-y-3">
          <div className="inline-flex items-center justify-between w-full  gap-x-4">
            <p className="dark:text-neutral-300 text-lg">Car Rating</p>
            <p className="dark:text-neutral-300 text-base">
              {form.getValues("rating")}
            </p>
          </div>

          <div className=" w-full  gap-x-4">
            <p className="dark:text-neutral-300 text-lg">Description</p>
            <p className="dark:text-neutral-300 text-base">
              {form.getValues("description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
