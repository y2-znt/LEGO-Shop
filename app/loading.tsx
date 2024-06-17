import { AiOutlineLoading } from "react-icons/ai";
export default function loading() {
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <AiOutlineLoading
          size={150}
          color="rgb(253 230 138)"
          className="animate-spin"
        />
      </div>
    </div>
  );
}
