import { cn } from "@/lib/utils";

interface TitleProps {
  text: string;
  className?: string;
}

export default function Title({ text, className }: TitleProps) {
  return (
    <h1
      className={cn(
        "text-3xl font-bold max-sm:text-[1.7rem] lg:text-4xl",
        className
      )}
    >
      {text}
    </h1>
  );
}
