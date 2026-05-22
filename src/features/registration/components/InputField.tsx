import type { InputHTMLAttributes } from "react";

import {
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
};

const InputField = <T extends FieldValues>({
  name,
  label,
  type = "text",
  placeholder,
}: InputFieldProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const errorMessage = errors[name]?.message as
    | string
    | undefined;

  return (
    <div className="field-wrapper">
      <label
        htmlFor={name}
        className="field-label"
      >
        {label}
      </label>

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!errorMessage}
        aria-describedby={`${name}-error`}
        className={`field-input ${
          errorMessage ? "field-input-error" : ""
        }`}
        {...register(name)}
      />

      {errorMessage && (
        <p
          id={`${name}-error`}
          className="error-text"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;