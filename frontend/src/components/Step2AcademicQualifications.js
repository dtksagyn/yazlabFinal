import React from "react";

function Step2AcademicQualifications({
  nextStep,
  prevStep,
  handleChange,
  values,
}) {
  const continueStep = (e) => {
    e.preventDefault();
    nextStep();
  };

  const back = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Step 2: Academic Qualifications</h3>
      <form onSubmit={continueStep}>
        {/* Undergraduate Degree */}
        <div className="mb-3">
          <label className="form-label">Undergraduate Degree</label>
          <input
            type="text"
            className="form-control"
            value={values.undergraduate || ""}
            onChange={handleChange("undergraduate")}
            required
          />
        </div>

        {/* Master's Degree */}
        <div className="mb-3">
          <label className="form-label">Master's Degree (if any)</label>
          <input
            type="text"
            className="form-control"
            value={values.masters || ""}
            onChange={handleChange("masters")}
          />
        </div>

        {/* PhD */}
        <div className="mb-3">
          <label className="form-label">PhD (if any)</label>
          <input
            type="text"
            className="form-control"
            value={values.phd || ""}
            onChange={handleChange("phd")}
          />
        </div>

        {/* Field of Study */}
        <div className="mb-3">
          <label className="form-label">Field of Study</label>
          <input
            type="text"
            className="form-control"
            value={values.field || ""}
            onChange={handleChange("field")}
            required
          />
        </div>

        {/* Institution */}
        <div className="mb-3">
          <label className="form-label">University/Institution</label>
          <input
            type="text"
            className="form-control"
            value={values.institution || ""}
            onChange={handleChange("institution")}
            required
          />
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={back}>
            Previous
          </button>
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default Step2AcademicQualifications;
