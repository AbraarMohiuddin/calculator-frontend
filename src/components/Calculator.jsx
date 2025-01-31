import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://localhost:7268/api/calculator";

const Calculator = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculation = async () => {
    try {
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/${operation}`, {
        params: { num1, num2 },
      });
      setResult(response.data.result);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      setResult(null);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        textAlign: "center",
        backgroundColor: "grey",
      }}
    >
      <h2>Calculator</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          background: "#fff",
          width: "300px",
        }}
      >
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="Enter first number"
        />
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="add">+</option>
          <option value="subtract">-</option>
          <option value="multiply">×</option>
          <option value="divide">÷</option>
        </select>
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Enter second number"
        />
        <button onClick={handleCalculation}>Calculate</button>

        {result !== null && <h3>Result: {result}</h3>}
        {error && <h3 style={{ color: "red" }}>{error}</h3>}
      </div>
    </div>
  );
};

export default Calculator;
