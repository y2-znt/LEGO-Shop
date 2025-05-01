import Image from "next/image";

type NullDataType = {
  title: string;
};

export default function NullData({ title }: NullDataType) {
  return (
    <div className="flex flex-col items-center justify-center gap-7">
      <p className="pt-20 text-center text-3xl font-bold max-sm:text-[1.7rem] lg:text-4xl">
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
