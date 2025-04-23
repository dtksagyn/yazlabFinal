import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [formData, setFormData] = useState({
    idNumber: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    phoneNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.idNumber) newErrors.idNumber = "ID Number is required";
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.birthDate) newErrors.birthDate = "Date of Birth is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const verifyIdWithEDevlet = async (idNumber) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (idNumber.length === 11) {
          resolve({ valid: true });
        } else {
          resolve({ valid: false, message: "Invalid ID number" });
        }
      }, 1000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Mocking backend API call
      const verification = await verifyIdWithEDevlet(formData.idNumber);
      if (!verification.valid) {
        throw new Error(verification.message || "ID verification failed");
      }

      // --- FIXED BACKEND REQUEST ---
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tcNo: formData.idNumber,
          name: formData.firstName,
          surname: formData.lastName,
          birthYear: new Date(formData.birthDate).getFullYear(),
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      // Redirect after success
      navigate("/login", {
        state: {
          message: "Registration successful! Please log in.",
          idNumber: formData.idNumber,
        },
      });
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Create your account</h2>
          <p className="text-center text-muted">
            Please register with your official ID information
          </p>

          {apiError && <div className="alert alert-danger">{apiError}</div>}

          <form onSubmit={handleSubmit}>
            {/* ID Number */}
            <div className="mb-3">
              <label className="form-label">Turkish ID Number</label>
              <input
                name="idNumber"
                type="text"
                className={`form-control ${
                  errors.idNumber ? "is-invalid" : ""
                }`}
                value={formData.idNumber}
                onChange={handleChange}
                maxLength="11"
                pattern="\d{11}"
                title="11-digit Turkish ID number"
              />
              {errors.idNumber && (
                <div className="invalid-feedback">{errors.idNumber}</div>
              )}
              <div className="form-text">
                Will be verified with e-Devlet system
              </div>
            </div>

            {/* First Name */}
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                name="firstName"
                type="text"
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                name="lastName"
                type="text"
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>

            {/* Birth Date */}
            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <input
                name="birthDate"
                type="date"
                className={`form-control ${
                  errors.birthDate ? "is-invalid" : ""
                }`}
                value={formData.birthDate}
                onChange={handleChange}
              />
              {errors.birthDate && (
                <div className="invalid-feedback">{errors.birthDate}</div>
              )}
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                name="phoneNumber"
                type="tel"
                className={`form-control ${
                  errors.phoneNumber ? "is-invalid" : ""
                }`}
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <div className="invalid-feedback">{errors.phoneNumber}</div>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                name="password"
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Verifying...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
