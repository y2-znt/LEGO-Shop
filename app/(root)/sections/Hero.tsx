import Image from "next/image";

export default function Hero() {
  return (
    <section>
      <div className="flex min-h-[60vh] flex-col items-start pt-36 lg:gap-0">
        <div className="lg:text-left">
          <h1 className="text-3xl font-bold max-lg:pt-0 max-sm:text-[1.7rem] lg:text-4xl">
            LEGO Shop
          </h1>
        </div>
        <div className="mt-12 flex min-h-[40vh] w-full justify-between rounded-xl bg-[#FFD300] max-lg:flex-col max-lg:items-center max-lg:pb-12">
          <p className="p-12 text-4xl font-bold text-black lg:text-5xl">
            You never get too old <br />
            to play,
            <span className="text-red-700"> Right?</span>
          </p>

          <Image
            src="/assets/hero-lego.png"
            width={2000}
            height={2000}
            alt=""
            className="-pr-2 rounded- relative w-2/6 max-lg:mr-14 max-lg:w-1/3 max-lg:rounded-3xl max-sm:w-1/2"
          ></Image>
        </div>
      </div>
    </section>
  );
}
