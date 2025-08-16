"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Car } from "@prisma/client";

// icons
import { MoreHorizontal, Copy, Eye, Trash, Edit } from "lucide-react";

// components
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import Image from "next/image";

// toast
import { toast } from "sonner";
import { useModal } from "@/hooks/use-modal-store";

export type CarProps = Pick<
  Car,
  "id" | "brand" | "category" | "price" | "model"
> & {
  thumbnail: {
    url: string;
  };
};

export const columns: ColumnDef<CarProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorFn: (row) => row.thumbnail.url,
    id: "thumbnail",
    header: "Image",
    cell: ({ getValue, row }) => {
      const url = getValue() as string;
      return (
        <div className="relative size-16 rounded-md overflow-hidden">
          <Image
            src={url}
            alt={`Car ${row.original.model}`}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
    enableSorting: true,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const car = row.original;
      const { onOpen } = useModal();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(car.id);
                toast.success("Car ID copied");
              }}
            >
              <Copy /> Copy car ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Edit /> Edit car
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Eye /> View car details
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => onOpen("DeleteCar", { car })}>
              <Trash /> Delete car
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
