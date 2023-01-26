import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/book/login", {
        name,
        email,
        password,
      });
      console.log(data);
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="form contact-form" onSubmit={handleSubmit}>
      <h5>login</h5>
      <div className="form-row">
        <label htmlFor="username" className="form-label">
          username
        </label>
        <input
          type="text"
          className="form-input username-input"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="email" className="form-label">
          email
        </label>
        <input
          type="email"
          className="form-input email-input"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="password" className="form-label">
          password
        </label>
        <input
          type="password"
          className="form-input password-input"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-block">
        submit
      </button>
    </form>
  );
};

export default Register;
