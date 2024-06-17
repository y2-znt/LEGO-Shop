import Image from "next/image";

type NullDataType = {
  title: string;
};

export default function NullData({ title }: NullDataType) {
  return (
    <div className="flex flex-col items-center justify-center gap-7">
      <p className="text-3xl text-center lg:text-4xl pt-20 font-bold max-sm:text-[1.7rem]">
        {title}
      </p>
      <Image
        src="/assets/acces_denied.jpeg"
        width={300}
        height={300}
        alt="lego stop"
        className="w-1/5 max-sm:w-1/2"
      ></Image>
    </div>
  );
}
