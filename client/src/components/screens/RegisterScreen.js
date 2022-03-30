import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setError("");
      }, 5000);

      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });

      console.log(data);

      localStorage.setItem("authToken", data.token);
      history.push("/");
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="col-md-4  mx-auto mt-5">
      <h2 className="text-center">Register</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />

        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <label htmlFor="exampleFormControlInput1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <label htmlFor="exampleFormControlInput1" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />

        <div className=" d-grid gap-2">
          <input type="submit" className="btn btn-primary" value="Register" />
        </div>
      </form>{" "}
      <br />
      <p className="text-center">
        Already registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterScreen;
