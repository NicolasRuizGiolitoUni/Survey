import React, { useState } from "react";
import "./AppInput.css";

const AppInput = ({ onSubmit }) => {
  const [input, setInput] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!input || !reason) return; // Ensure both fields are filled.

    onSubmit(input, reason); // Pass both the app name and reason.

    setInput(""); // Reset input fields after submission.
    setReason("");
  };

  return (
    <div className="container-input">
      <input
        type="text"
        className="input-text"
        placeholder="Enter the app name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="text"
        className="input-text"
        placeholder="Enter the reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <button className="button-input" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
};

export default AppInput;
