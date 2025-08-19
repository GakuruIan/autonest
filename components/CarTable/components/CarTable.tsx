import React from "react";

// row components
import CarRow from "./CarRow";

// car type
import { Car } from "@prisma/client";

import { useRemoveFromWishlist } from "@/hooks/mutations/useRemoveFromWishlist";

type CarProps = Pick<Car, "id" | "brand" | "category" | "model" | "price"> & {
  thumbnail: {
    url: string;
  };
};

interface CarTableProps {
  cars: {
    id: string;
    car: CarProps;
  }[];
  showFooter?: boolean;
  footerContent?: React.ReactNode;
}

import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CarTable: React.FC<CarTableProps> = React.memo(
  ({ cars, showFooter = false, footerContent }) => {
    const removeFromWishlist = useRemoveFromWishlist();

    const handleDelete = async (id: string) => {
      await removeFromWishlist.mutateAsync(id);
    };

    return (
      <div>
        <div className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cars.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No cars found.
                  </TableCell>
                </TableRow>
              ) : (
                cars.map((item) => (
                  <CarRow
                    key={item.id}
                    item={item.car}
                    handleClick={() => handleDelete(item.car.id)}
                  />
                ))
              )}
            </TableBody>
            {showFooter && footerContent && (
              <TableFooter>
                <TableRow>{footerContent}</TableRow>
              </TableFooter>
            )}
          </Table>
        </div>
      </div>
    );
  }
);

CarTable.displayName = "CarTable";

export default CarTable;
