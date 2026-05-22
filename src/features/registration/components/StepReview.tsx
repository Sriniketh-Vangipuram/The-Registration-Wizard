import type { RegistrationFormData } from "../schemas/registration.schema";

type StepReviewProps = {
  formData: RegistrationFormData;
};

const StepReview = ({
  formData,
}: StepReviewProps) => {
  return (
    <div>
      <h2 className="step-title">
        Review Your Details
      </h2>

      <div className="review-item">
        <strong>First Name:</strong>{" "}
        {formData.firstName}
      </div>

      <div className="review-item">
        <strong>Last Name:</strong>{" "}
        {formData.lastName}
      </div>

      <div className="review-item">
        <strong>Date of Birth:</strong>{" "}
        {formData.dob}
      </div>

      <div className="review-item">
        <strong>Email:</strong>{" "}
        {formData.email}
      </div>
    </div>
  );
};

export default StepReview;