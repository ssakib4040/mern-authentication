import React from "react";

import axios from "axios";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/auth/forgotpassword", { email });

      setSuccess(data.data);

      setTimeout(() => {
        setSuccess("");
        setEmail("");
      }, 5000);
    } catch (error) {
      setError(error.response.data.message);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="col-md-4  mx-auto mt-5 ">
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

      <form onSubmit={handleSubmit}>
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        <div className="d-grid gap-2">
          <input
            type="submit"
            className="btn btn-primary"
            value="Send confirmation email"
          />
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordScreen;
