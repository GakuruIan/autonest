import React, { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { toast } from "sonner";

import { useModal } from "@/hooks/use-modal-store";

import { useDeleteCar } from "@/hooks/mutations/useDeleteCar";

export const DeleteCarModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const deleteCarMutation = useDeleteCar();

  const { car } = data;

  const isModalOpen = isOpen && type === "DeleteCar";

  const handleSubmit = async () => {
    setIsLoading(true);
    return toast.promise(
      (async () => {
        try {
          await deleteCarMutation.mutateAsync(car?.id);
        } catch (error) {
          throw new Error(
            error?.errors?.[0]?.longMessage ||
              error.message ||
              "Deleting failed"
          );
        } finally {
          onClose();
          setIsLoading(false);
        }
      })(),
      {
        loading: "Deleting car...",
        success: "Car deleted successfully",
        error: (err: Error) => err.message,
      }
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="dark:bg-neutral-900 border dark:border-neutral-700/10 dark:text-white text-black bg-white overflow-hidden">
        <DialogHeader className="py-4 px-6">
          <DialogTitle className="text-center font-poppins tracking-wider mb-1">
            Delete Car
          </DialogTitle>
          <DialogDescription className="text-center font-saira text-base dark:text-gray-400 text-gray-500">
            Are you sure you want to delete ? <br />
            <span className="font-semibold text-indigo-400 mx-2">
              {car?.model}
            </span>
            Will be deleted permanently from our servers
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-y-2">
          <DialogClose asChild>
            <Button
              onClick={onClose}
              variant="destructive"
              disabled={isLoading}
              className=""
            >
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isLoading}>
            Delete car
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCarModal;
