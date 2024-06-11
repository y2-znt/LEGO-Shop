"use client";
import CustomCheckBox from "@/components/ui/inputs/CustomCheckBox";
import Inputs from "@/components/ui/inputs/inputs";
import SelectImage from "@/components/ui/inputs/SelectImage";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from "sonner";
import firebaseApp from "../../../../../prisma/firebase";

export default function AddProductForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      price: "",
      inStock: false,
      image: null,
    },
  });

  const handleFileChange = (file: File) => {
    setValue("image", file);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Upload image to Firebase
    setIsLoading(true);

    if (!data.image) {
      setIsLoading(false);
      return toast.error("No selected image!");
    }

    const handleImageUpload = async () => {
      toast("Creating LEGO, please wait...");
      try {
        const item = data.image;
        const filename = new Date().getTime() + "-" + item.name;
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, `product/${filename}`);
        const uploadTask = uploadBytesResumable(storageRef, item);

        const downloadURL = await new Promise<string>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              console.log("Error uploading image : ", error);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  console.log("File available at :", downloadURL);
                  resolve(downloadURL);
                })
                .catch((error) => {
                  console.log("Error getting the download URL : ", error);
                  reject(error);
                });
            }
          );
        });

        return downloadURL;
      } catch (error) {
        setIsLoading(false);
        console.log("Error handling image upload", error);
        toast.error("Error handling image upload");
        throw error;
      }
    };

    const imageUrl = await handleImageUpload();
    const productData = { ...data, image: imageUrl };
    console.log("productData:", productData);

    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("LEGO created successfully");
        setValue("image", null);
        reset();
      })
      .catch((error) => {
        toast.error(
          "Something went wrong when saving the product to db",
          error
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div className="pt-20"></div>
      <div className="w-full max-sm:w-full m-auto"></div>
      <Card className="mx-auto max-w-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Add a LEGO</CardTitle>
          <CardDescription>
            Enter the name, price and image to add the LEGO
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Inputs
            id="name"
            label="Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Inputs
            id="price"
            label="Price"
            disabled={isLoading}
            register={register}
            errors={errors}
            type="number"
            required
          />
          <CustomCheckBox
            id="inStock"
            register={register}
            label="This LEGO is in stock"
          />
          <SelectImage
            item={watch("image")}
            handleFileChange={handleFileChange}
          />
          <Button className="w-full my-4" onClick={handleSubmit(onSubmit)}>
            {isLoading ? (
              <>
                <AiOutlineLoading className="animate-spin inline-block mr-2" />
                Adding LEGO...
              </>
            ) : (
              "Add LEGO"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
