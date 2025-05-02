import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

interface PageStateProps {
  title: string;
  imagePath: string;
  buttonText?: string;
  showButton?: boolean;
  imageWidth?: string;
  children?: React.ReactNode;
}

export default function PageState({
  title,
  imagePath,
  buttonText = "Return to home page",
  showButton = true,
  imageWidth = "w-1/2",
  children,
}: PageStateProps) {
  return (
    <div className="m-12 flex flex-col items-center text-3xl font-bold text-gray-700 max-sm:text-[1.7rem]">
      <Image
        src={imagePath}
        alt=""
        width={1000}
        height={1000}
        className={`${imageWidth} pb-12 max-sm:w-full`}
      />
      <p>{title}</p>
      {children}
      {showButton && (
        <Link href="/">
          <div className="flex pt-4">
            <Button size="lg">
              <span className="pr-2">
                <BsArrowLeft />
              </span>
              <p>{buttonText}</p>
            </Button>
          </div>
        </Link>
      )}
    </div>
  );
}
