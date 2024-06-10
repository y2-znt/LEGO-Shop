import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import Image from "next/image";

export default function Contact() {
  return (
    <div className="flex flex-col lg:gap-0 items-start my-52">
      <div className="lg:text-left">
        <h1 className="text-3xl lg:text-4xl font-bold  max-lg:pt-0 max-sm:text-[1.7rem]">
          Contact
        </h1>
      </div>
      <div className="mt-12 min-h-[30vh] w-full rounded-xl flex justify-evenly max-sm:flex-col max-lg:items-center max-lg:pb-12">
        <Image
          src="/assets/contact-lego.png"
          width={1000}
          height={1000}
          alt=""
          className="relative w-1/6 -pr-2 rounded- max-lg:rounded-3xl max-sm:w-1/3 max-lg:mr-14"
        ></Image>
        <Card className="w-[450px] max-sm:w-full max-sm:mt-12">
          <CardHeader>
            <CardTitle className="font-bold">CONTACT US</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="framework">E-mail</Label>
                  <Input id="name" placeholder="Your E-mail" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full py-5 mt-3">Confirm</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
