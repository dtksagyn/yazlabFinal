import React from "react";

function Step1PersonalInfo({ nextStep, handleChange, values }) {
  const continueStep = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Step 1: Personal Information</h3>
      <form onSubmit={continueStep}>
        {/* Full Name */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            value={values.fullName || ""}
            onChange={handleChange("fullName")}
            required
          />
        </div>

        {/* Title/Position */}
        <div className="mb-3">
          <label className="form-label">Title/Position</label>
          <select
            className="form-select"
            value={values.title || ""}
            onChange={handleChange("title")}
            required
          >
            <option value="">Select</option>
            <option value="Dr. Öğr. Üyesi">Dr. Öğr. Üyesi</option>
            <option value="Doçent">Doçent</option>
            <option value="Profesör">Profesör</option>
          </select>
        </div>

        {/* TR ID Number */}
        <div className="mb-3">
          <label className="form-label">TR ID Number</label>
          <input
            type="text"
            className="form-control"
            maxLength="11"
            value={values.trId || ""}
            onChange={handleChange("trId")}
            required
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            value={values.dob || ""}
            onChange={handleChange("dob")}
            required
          />
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label className="form-label me-3">Gender:</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="Male"
                checked={values.gender === "Male"}
                onChange={handleChange("gender")}
              />
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="Female"
                checked={values.gender === "Female"}
                onChange={handleChange("gender")}
              />
              <label className="form-check-label">Female</label>
            </div>
          </div>
        </div>

        {/* Nationality */}
        <div className="mb-3">
          <label className="form-label">Nationality</label>
          <select
            className="form-select"
            value={values.nationality || ""}
            onChange={handleChange("nationality")}
            required
          >
            <option value="">Select</option>
            <option value="Turkish">Turkish</option>
            <option value="Foreign">Foreign</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Next
        </button>
      </form>
    </div>
  );
}

export default Step1PersonalInfo;
