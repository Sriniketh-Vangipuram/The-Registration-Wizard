import type { RegistrationFormData } from "../schemas/registration.schema";

import InputField from "./InputField";

const StepOne = () => {
  return (
    <div>
      <h2 className="step-title">
        Personal Information
      </h2>

      <InputField<RegistrationFormData>
        name="firstName"
        label="First Name"
        placeholder="Enter your first name"
      />

      <InputField<RegistrationFormData>
        name="lastName"
        label="Last Name"
        placeholder="Enter your last name"
      />

      <InputField<RegistrationFormData>
        name="dob"
        label="Date of Birth"
        type="date"
      />
    </div>
  );
};

export default StepOne;