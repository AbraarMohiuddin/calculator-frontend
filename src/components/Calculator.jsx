import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL =
  "https://calculatorbutterfly2025api.azurewebsites.net/api/calculator";

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
        background: "linear-gradient(135deg, #74ebd5 0%, #9face6 100%)",
        padding: "20px",
      }}
    >
      <h2 style={{ color: "#ffffff", marginBottom: "20px" }}>
        ✨ Calculator ✨
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          background: "#ffffff",
          width: "320px",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="Enter first number"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#74ebd5")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />

        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            cursor: "pointer",
            backgroundColor: "#f9f9f9",
            transition: "background-color 0.3s ease",
          }}
          onFocus={(e) => (e.target.style.backgroundColor = "#e0f7fa")}
          onBlur={(e) => (e.target.style.backgroundColor = "#f9f9f9")}
        >
          <option value="add">➕ Add</option>
          <option value="subtract">➖ Subtract</option>
          <option value="multiply">✖️ Multiply</option>
          <option value="divide">➗ Divide</option>
        </select>

        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Enter second number"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#74ebd5")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />

        <button
          onClick={handleCalculation}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#74ebd5",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#66d3c6")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#74ebd5")}
        >
          Calculate
        </button>

        {result !== null && (
          <h3 style={{ color: "#4caf50", margin: "10px 0" }}>
            Result: {result}
          </h3>
        )}
        {error && (
          <h3 style={{ color: "#e53935", margin: "10px 0" }}>{error}</h3>
        )}
      </div>
    </div>
  );
};

export default Calculator;
