"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  formatPrice?: boolean;
  disabled?: boolean;
  label?: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input = ({
  id,
  type,
  formatPrice,
  disabled,
  label,
  required,
  register,
  errors,
}: InputProps) => {
  return (
    <div className="w-full relative">
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={label}
        type={type}
        className={`
            peer
            w-full
            p-4
            font-light
            bg-white
            border-2
            rounded-md
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${formatPrice ? "pl-9" : "pl-4"}
            ${
              errors[id]
                ? "border-rose-500 focus:border-rose-500"
                : "border-neutral-300 focus:border-black"
            }
        `}
      />
    </div>
  );
};

export default Input;
