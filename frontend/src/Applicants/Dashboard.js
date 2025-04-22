import React, { useState } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import "./Dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const handleLogout = () => {
    alert("Logged out!");
    // Implement actual logout logic here
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <div
        className={`sidebar bg-primary text-white ${
          isSidebarOpen ? "open" : ""
        }`}
      >
        <h4 className="text-center mt-3">Name Surname</h4>

        <ul className="nav flex-column mt-2">
          <li className="nav-item">
            <a href="#" className="nav-link text-white">
              Profil
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white">
              Applications
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white">
              Result
            </a>
          </li>

          <li className="nav-item">
            <Link to="/announcements" className="nav-link text-white">
              Announcements
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="topbar d-flex justify-content-between align-items-center p-3 shadow-sm">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-primary me-3"
              onClick={toggleSidebar}
            >
              <FaBars />
            </button>
            <h4 className="m-0">Dashboard</h4>
          </div>
          <div className="profile-dropdown position-relative">
            <FaUserCircle
              size={30}
              className="text-primary cursor-pointer"
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="dropdown-menu show dropdown-end">
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="content p-4">
          <h5>Welcome to your applicant dashboard</h5>
          <p>Manage your profile, applications, and results here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
