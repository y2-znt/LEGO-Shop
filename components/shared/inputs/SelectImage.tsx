import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../../ui/shadcn/button";

type ImageType = {
  item: File | null;
  handleFileChange: (value: File) => void;
  resetFlag: boolean;
};

export default function SelectImage({
  item,
  handleFileChange,
  resetFlag,
}: ImageType) {
  const [file, setFile] = useState<File | null>(item || null);

  useEffect(() => {
    if (resetFlag) {
      setFile(null);
    }
  }, [resetFlag]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setFile(file);
        handleFileChange(file);
      }
    },
    [handleFileChange],
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
      className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-400 p-10 text-center text-sm font-normal text-slate-400"
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
            className="mx-auto my-2 h-28 w-auto"
          />
          <p>{file.name}</p>
          <Button
            className="mt-2 bg-transparent text-gray-700 hover:text-black"
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
