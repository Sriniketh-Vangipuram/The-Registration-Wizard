// src/features/registration/components/PasswordField.tsx

import { useState } from "react";

import {
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";

type PasswordFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder: string;
};

const PasswordField = <T extends FieldValues>({
  name,
  label,
  placeholder,
}: PasswordFieldProps<T>) => {
  const [showPassword, setShowPassword] =
    useState(false);

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

      <div className="password-wrapper">
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          aria-invalid={!!errorMessage}
          aria-describedby={`${name}-error`}
          className={`field-input ${
            errorMessage ? "field-input-error" : ""
          }`}
          {...register(name)}
        />

        <button
          type="button"
          className="toggle-button"
          aria-label="Toggle password visibility"
          onClick={() =>
            setShowPassword((prev) => !prev)
          }
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

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

export default PasswordField;