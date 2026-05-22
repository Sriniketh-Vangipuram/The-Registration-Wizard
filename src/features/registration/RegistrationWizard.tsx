// src/features/registration/RegistrationWizard.tsx

import { useState } from "react";

import {
  FormProvider,
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  registrationSchema,
  type RegistrationFormData,
} from "./schemas/registration.schema";

import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepReview from "./components/StepReview";

type Step = 1 | 2 | 3;

const TOTAL_STEPS = 3;

const RegistrationWizard = () => {
  const [currentStep, setCurrentStep] =
    useState<Step>(1);

  const [isSubmitted, setIsSubmitted] =
    useState(false);

  const methods = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),

    mode: "onChange",

    defaultValues: {
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    trigger,
    handleSubmit,
    getValues,
    watch,

    formState: { errors },
  } = methods;

  // Step configuration

  const stepFields: Record<
    Exclude<Step, 3>,
    (keyof RegistrationFormData)[]
  > = {
    1: ["firstName", "lastName", "dob"],

    2: [
      "email",
      "password",
      "confirmPassword",
    ],
  };

  // Progress

  const progressPercentage =
    (currentStep / TOTAL_STEPS) * 100;

  // Current step validation

  const currentStepFields =
    currentStep === 1
      ? stepFields[1]
      : stepFields[2];

  const watchedValues = watch(
    currentStepFields
  );

  const isCurrentStepValid =
    watchedValues.every(
      (value) => value?.toString().trim() !== ""
    ) &&
    currentStepFields.every(
      (field) => !errors[field]
    );

  // Navigation

  const handleNext = async () => {
    if (currentStep === 3) return;

    const isStepValid = await trigger(
      stepFields[currentStep]
    );

    if (!isStepValid) return;

    setCurrentStep(
      (prev) => (prev + 1) as Step
    );
  };

  const handleBack = () => {
    setCurrentStep(
      (prev) => (prev - 1) as Step
    );
  };

  // Submit

  const onSubmit = (
    data: RegistrationFormData
  ) => {
    const finalPayload = {
      firstName: data.firstName,
      lastName: data.lastName,
      dob: data.dob,
      email: data.email,
    };

    console.log(finalPayload);

    setIsSubmitted(true);
  };

  // Success state

  if (isSubmitted) {
    return (
      <div className="wizard-container success-state">
        <h1>
          Registration Successful 🎉
        </h1>

        <p>
          Your onboarding flow has been
          completed successfully.
        </p>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        className="wizard-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Header */}

        <div className="wizard-header">
          <h1 className="wizard-title">
            Registration Wizard
          </h1>

          {/* Progress */}

          <div className="progress-container">
            <p className="progress-text">
              Step {currentStep} of{" "}
              {TOTAL_STEPS}
            </p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${progressPercentage}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Steps */}

        {currentStep === 1 && <StepOne />}

        {currentStep === 2 && <StepTwo />}

        {currentStep === 3 && (
          <StepReview
            formData={getValues()}
          />
        )}

        {/* Navigation */}

        <div className="navigation-buttons">
          {currentStep > 1 ? (
            <button
              type="button"
              className="secondary-button"
              onClick={handleBack}
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 && (
            <button
              type="button"
              className="primary-button"
              onClick={handleNext}
              disabled={!isCurrentStepValid}
            >
              Next
            </button>
          )}

          {currentStep === 3 && (
            <button
              type="submit"
              className="primary-button"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default RegistrationWizard;