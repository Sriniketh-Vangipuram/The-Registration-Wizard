import type { RegistrationFormData } from "../schemas/registration.schema";

import InputField from "./InputField";
import PasswordField from "./PasswordField";

const StepTwo = () => {
  return (
    <div>
      <h2 className="step-title">
        Account Details
      </h2>

      <InputField<RegistrationFormData>
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
      />

      <PasswordField<RegistrationFormData>
        name="password"
        label="Password"
        placeholder="Enter your password"
      />

      <PasswordField<RegistrationFormData>
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
      />
    </div>
  );
};

export default StepTwo;