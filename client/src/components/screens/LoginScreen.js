import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const handleSubmti = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });

      // console.log(data);

      localStorage.setItem("authToken", data.token);
      history.push("/");
    } catch (error) {
      // console.log("error", error.response);

      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="col-md-4  mx-auto mt-5">
      <h2 className="text-center">Login</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmti}>
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          vallue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <label htmlFor="exampleFormControlInput1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          vallue={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <br />

        <div className=" d-grid gap-2">
          <input type="submit" className="btn btn-primary" value="Login" />
        </div>
      </form>{" "}
      <br />
      <p className="text-center">
        Not registered yet? <Link to="/register">Register</Link>
      </p>
      <p className="text-center">
        Forgot password? <Link to="/forgotpassword">Reset </Link>
      </p>
    </div>
  );
};

export default LoginScreen;
