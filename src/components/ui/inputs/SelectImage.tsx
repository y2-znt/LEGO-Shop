"use client";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../shadcn/button";

type ImageType = {
  item?: File;
  handleFileChange: (value: File) => void;
};

export default function SelectImage({ item, handleFileChange }: ImageType) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        handleFileChange(file);
      }
    },
    [handleFileChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp", ".svg"] },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-slate-400 cursor-pointer text-sm font-normal text-slate-400 flex items-center justify-center rounded-lg p-10 text-center"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here</p>
      ) : item ? (
        <div>
          <Image
            src={URL.createObjectURL(item)}
            alt="Preview"
            width={200}
            height={200}
            className="my-2 mx-auto max-h-48"
          />
          <p>{item.name}</p>
          <Button className="bg-transparent text-gray-700 hover:text-black mt-2">
            Cancel
          </Button>
        </div>
      ) : (
        <p>Drag & drop an image here, or click to select one</p>
      )}
    </div>
  );
}
