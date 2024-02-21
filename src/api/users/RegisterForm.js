import axios from "axios";
import React, { useState } from "react";
import "../../styles.css";
const RegisterForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const registerUrl = process.env.REACT_APP_API_URL + "/api/user/register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(registerUrl, {
        name,
        username,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Register failed!";
      setError(errorMessage);
    }
  };

  return (
    <div className="form-container">
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
