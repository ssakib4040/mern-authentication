import React from "react";

import { Link } from "react-router-dom";
import axios from "axios";

const ResetPasswordScreen = ({ match, history }) => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");

      setError("Password didn't matched");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        `/api/auth/resetpassword/${match.params.resetToken}`,
        { password }
      );

      setSuccess(data.data);

      setTimeout(() => {
        setSuccess("");
        history.push("/");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="col-md-4  mx-auto mt-5 ">
      <form onSubmit={handleSubmit}>
        <h2 className="text-center">Forgot Password</h2>
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

        <label htmlFor="exampleFormControlInput1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
          required
        />
        <br />

        <div className="d-grid gap-2">
          <input
            type="submit"
            className="btn btn-primary"
            value="Reset Password"
          />
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordScreen;
