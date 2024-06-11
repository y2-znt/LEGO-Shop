"use client";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../shadcn/button";

type ImageType = {
  item?: File;
  handleFileChange: (value: File) => void;
};

export default function SelectImage({ item, handleFileChange }: ImageType) {
  const [file, setFile] = useState<File | null>(item || null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setFile(file);
        handleFileChange(file);
      }
    },
    [handleFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp", ".svg"] },
  });

  const handleCancel = (e: React.MouseEvent) => {
    // method to avoid upload a file when cancel button is clicked
    e.stopPropagation();

    setFile(null);

    // call handleFileChange with empty file
    handleFileChange(new File([], ""));
  };

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-slate-400 cursor-pointer text-sm font-normal text-slate-400 flex items-center justify-center rounded-lg p-10 text-center"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here</p>
      ) : file ? (
        <div>
          <Image
            src={URL.createObjectURL(file)}
            alt="Aperçu"
            width={200}
            height={200}
            className="my-2 mx-auto max-h-48"
          />
          <p>{file.name}</p>
          <Button
            className="bg-transparent text-gray-700 hover:text-black mt-2"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <p>Drag & drop an image here, or click to select one</p>
      )}
    </div>
  );
}
