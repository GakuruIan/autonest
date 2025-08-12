import React, { useState } from "react";

//components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FileUploadProps {
  label: string;
  name: string;
  form: any;
  accept?: string;
  multiple?: boolean;
  placeholder: string;
}

// animation
import { AnimatePresence, motion } from "motion/react";

// icons
import { X, FileText } from "lucide-react";

import Image from "next/image";

const FileUpload = ({
  label,
  name,
  form,
  accept,
  multiple = false,
  placeholder,
}: FileUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (multiple) {
      const newFiles = files.filter(
        (file) => !selectedFiles.some((f) => f.name === file.name)
      );
      const updatedFiles = [...selectedFiles, ...newFiles];
      setSelectedFiles(updatedFiles);
      form.setValue(name, updatedFiles);
    } else {
      const file = files[0];
      if (file) {
        setSelectedFiles([file]);
        form.setValue(name, file);
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    if (multiple) {
      const updatedFiles = selectedFiles.filter((_, i) => i !== index);
      setSelectedFiles(updatedFiles);
      form.setValue(name, updatedFiles);
    } else {
      setSelectedFiles([]);
      form.setValue(name, null);
    }
  };

  return (
    <div className="mb-2">
      <FormField
        control={form.control}
        name={name}
        render={() => (
          <FormItem className="mb-6">
            <FormLabel className="tracking-wider text-sm">{label}</FormLabel>
            <FormControl>
              <div>
                <Input
                  id={name}
                  type="file"
                  accept={accept}
                  multiple={multiple}
                  placeholder={placeholder}
                  onChange={handleFileChange}
                />

                <AnimatePresence>
                  {selectedFiles.length > 0 &&
                    selectedFiles.map((file, index) => {
                      const isImage = file.type.startsWith("image/");
                      return (
                        <motion.div
                          key={file.name}
                          layout
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.25 }}
                          className="flex items-center justify-between dark:bg-neutral-500/10 bg-gray-200 rounded-md px-2 py-1.5 mt-1.5"
                        >
                          <div className="flex items-center gap-x-1.5 truncate">
                            {isImage ? (
                              <Image
                                src={URL.createObjectURL(file)}
                                alt="preview"
                                width={20}
                                height={20}
                                objectFit="contain"
                                className="size-8 rounded object-cover"
                              />
                            ) : (
                              <FileText
                                size={20}
                                className="text-neutral-800 dark:text-neutral-300"
                              />
                            )}
                            <p className="text-sm dark:text-neutral-300 truncate">
                              {file.name}
                            </p>
                          </div>

                          <button
                            onClick={() => handleRemoveFile(index)}
                            type="button"
                            className="p-1.5 rounded-md bg-gray-300 dark:bg-neutral-500/10 cursor-pointer hover:dark:bg-neutral-500/20 hover:bg-gray-500 transition-colors duration-75"
                          >
                            <X size={18} className="dark:text-neutral-400" />
                          </button>
                        </motion.div>
                      );
                    })}
                </AnimatePresence>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FileUpload;
