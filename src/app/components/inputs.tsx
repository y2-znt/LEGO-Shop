import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type inputType = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

const Inputs = ({
  id,
  label,
  type = "text",
  disabled = false,
  required = false,
  register,
  errors,
}: inputType) => {
  return (
    <div className="m-auto relative py-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={type}
        className={`${errors[id] ? "border-rose-400" : "border-slate-300"}`}
      ></Input>
    </div>
  );
};

export default Inputs;
