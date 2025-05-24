import { AiOutlineLoading } from "react-icons/ai";

export default function loading() {
  return (
    <div className="-mt-24 flex h-svh items-center justify-center">
      <AiOutlineLoading
        size={150}
        color="rgb(253 230 138)"
        className="animate-spin"
      />
    </div>
  );
}
