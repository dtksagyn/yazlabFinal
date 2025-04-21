import React from "react";
import MultiStepForm from "./MultiStepForm";

function App() {
  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <h1 className="mb-4 text-primary text-center">
        KOU Academic Application
      </h1>
      <div className="w-100" style={{ maxWidth: "800px" }}>
        <MultiStepForm />
      </div>
    </div>
  );
}

export default App;
