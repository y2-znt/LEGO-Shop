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
    <div className="my-52 flex flex-col items-start lg:gap-0">
      <div className="lg:text-left">
        <h1 className="text-3xl font-bold max-lg:pt-0 max-sm:text-[1.7rem] lg:text-4xl">
          Contact
        </h1>
      </div>
      <div className="mt-12 flex min-h-[30vh] w-full justify-evenly rounded-xl max-lg:items-center max-lg:pb-12 max-sm:flex-col">
        <Image
          src="/assets/contact-lego.png"
          width={1000}
          height={1000}
          alt=""
          className="-pr-2 rounded- relative w-1/6 max-lg:mr-14 max-lg:rounded-3xl max-sm:w-1/3"
        ></Image>
        <Card className="w-[450px] max-sm:mt-12 max-sm:w-full">
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
            <Button className="mt-3 w-full py-5">Confirm</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
