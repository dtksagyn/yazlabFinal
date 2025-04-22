import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [formData, setFormData] = useState({
    idNumber: "",
    fullName: "",
    email: "",
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
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email is invalid";
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

      // --- BACKEND CODE (COMMENTED OUT UNTIL CONNECTED) ---
      /*
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
      */

      // Mocking successful registration response
      navigate("/login", {
        state: {
          message: "Registration successful! Please log in.",
          registeredEmail: formData.email,
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

            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                name="fullName"
                type="text"
                className={`form-control ${
                  errors.fullName ? "is-invalid" : ""
                }`}
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <div className="invalid-feedback">{errors.fullName}</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                name="email"
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
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
