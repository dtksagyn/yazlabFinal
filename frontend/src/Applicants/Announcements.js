import React from "react";
import { useNavigate } from "react-router-dom";

const Announcements = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleApplyClick = () => {
    // Navigate to MultiStepForm page when the user clicks "Apply"
    navigate("/application");
  };

  return (
    <div className="container mt-4">
      <h2>Announcements</h2>

      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Doctorate Application</h5>
          <p className="card-text">
            Applications are now open for the 2025 academic year. Applicants
            must hold a master's degree in a relevant field.
          </p>
          <button className="btn btn-primary" onClick={handleApplyClick}>
            Apply
          </button>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Doçent Position</h5>
          <p className="card-text">
            The university is accepting applications for the Doçent academic
            rank. Experience and publications are required.
          </p>
          <button className="btn btn-primary" onClick={handleApplyClick}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
