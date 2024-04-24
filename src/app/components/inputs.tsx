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

const Input = ({
  id,
  label,
  type = "text",
  disabled = false,
  required = false,
  register,
  errors,
}: inputType) => {
  return (
    <div className="w-full relative">
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={type}
      ></input>
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Input;
