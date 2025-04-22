import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";
import MultiStepForm from "./MultiStepForm";
import Dashboard from "./Applicants/Dashboard";
import Announcements from "./Applicants/Announcements";

function App() {
  return (
    <div className="app-container" style={{ padding: "20px" }}>
      <Routes>
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/application" element={<MultiStepForm />} />
        <Route path="/announcements" element={<Announcements />} />{" "}
        <Route path="/" element={<Navigate to="/Registration" replace />} />
      </Routes>
    </div>
  );
}

export default App;
