import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type inputType = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

const Inputs: React.FC<inputType> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getInputType = () => {
    if (type === "password") {
      return showPassword ? "text" : "password";
    }
    return type || "text";
  };

  return (
    <div className="m-auto relative py-2 font">
      <Label htmlFor={id}>{label}</Label>
      <Input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={getInputType()}
        className={`w-full ${
          errors[id] ? "border-red-500" : "border-slate-300"
        }`}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={`absolute bottom-[1.2rem] right-0 flex items-center pr-3 text-sm text-gray-500 ${
            errors[id] ? "mb-5" : ""
          }`}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
      {errors[id] && (
        <p className="text-xs font-semibold text-red-500 mt-1">
          This field is required
        </p>
      )}
    </div>
  );
};

export default Inputs;
