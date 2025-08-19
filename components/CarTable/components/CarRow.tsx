import React from "react";

import Image from "next/image";

// car type
import { Car } from "@prisma/client";

type CarProps = Pick<Car, "id" | "brand" | "category" | "model" | "price"> & {
  thumbnail: {
    url: string;
  };
};

// icons
import { Trash } from "lucide-react";

import { TableCell, TableRow } from "@/components/ui/table";

const CarRow = React.memo(
  ({
    item,
    handleClick,
  }: {
    item: CarProps;
    handleClick: (id: string) => void;
  }) => (
    <TableRow key={item.id}>
      <TableCell>
        <div className="relative size-24 overflow-hidden rounded-md">
          <Image
            src={item.thumbnail.url}
            alt={`${item.brand} ${item.model}`}
            fill
          />
        </div>
      </TableCell>
      <TableCell>{item.model}</TableCell>
      <TableCell>{item.brand}</TableCell>
      <TableCell>{item.category}</TableCell>
      <TableCell>{item.price.toLocaleString()}</TableCell>
      <TableCell className="text-right">
        <button
          onClick={() => handleClick(item.id)}
          className="flex items-center gap-x-1 text-rose-500 font-medium justify-center p-1.5 rounded-sm hover:underline transition-colors cursor-pointer"
        >
          <Trash size={16} />
          Remove
        </button>
      </TableCell>
    </TableRow>
  )
);

CarRow.displayName = "CarRow";

export default CarRow;
