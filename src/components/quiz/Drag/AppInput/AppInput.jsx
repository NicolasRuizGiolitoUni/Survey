import React, { useState } from "react";
import "./AppInput.css";

const AppInput = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input) return;

    onSubmit(input);

    setInput("");
  };

  return (
    <div className="container-input">
      <input
        type="text"
        className="input"
        placeholder="Enter the app name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="button-input" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
};

export default AppInput;
