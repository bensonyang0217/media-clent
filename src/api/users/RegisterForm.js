import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles.css";
const RegisterForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const registerUrl =
    "https://media-api-v2-f4hfj5ldpa-de.a.run.app/api/user/register";
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !username || !password) {
      setError("All fields are required!");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      const response = await axios.post(registerUrl, {
        name,
        username,
        password,
      });
      console.log(response.data);
      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.error
          : "Register failed!";
      setError(errorMessage);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Register</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default RegisterForm;
