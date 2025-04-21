import React, { useState } from "react";
import Step1PersonalInfo from "./components/Step1PersonalInfo";
import Step2AcademicQualifications from "./components/Step2AcademicQualifications";
import Step3Publications from "./components/Step3Publications";
import Step4ResearchProjects from "./components/Step4ResearchProjects";
import Step5AcademicActivities from "./components/Step5AcademicActivities";
import Step6Adminduties from "./components/Step6AdminDuties";
import Step7Reviewssubmit from "./components/Step7Reviewsubmit";

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  switch (step) {
    case 1:
      return (
        <Step1PersonalInfo
          nextStep={nextStep}
          handleChange={handleChange}
          values={formData}
        />
      );
    case 2:
      return (
        <Step2AcademicQualifications
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={formData}
        />
      );
    case 3:
      return (
        <Step3Publications
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={formData}
        />
      );
    case 4:
      return (
        <Step4ResearchProjects
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={formData}
        />
      );
    case 5:
      return (
        <Step5AcademicActivities
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={formData}
        />
      );
    case 6:
      return (
        <Step6Adminduties
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={formData}
        />
      );
    case 7:
      return (
        <Step7Reviewssubmit
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={formData}
        />
      );
    // ... other steps
    default:
      return <h2>Step not found</h2>;
  }
}

export default MultiStepForm;
