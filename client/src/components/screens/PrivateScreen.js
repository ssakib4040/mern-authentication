import React from "react";
import axios from "axios";

import { Alert, Button } from "react-bootstrap";

const PrivateScreen = ({ history }) => {
  const [error, setError] = React.useState("");
  const [privateData, setPrivateData] = React.useState("");

  React.useEffect(() => {
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.post("/api/private", {}, config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized, please login");
      }
    };

    fetchPrivateData();
  }, []);

  return (
    <div className="mt-3">
      {error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Alert variant="success">
          {privateData}{" "}
          <Button
            variant="danger"
            onClick={() => {
              localStorage.removeItem("authToken", null);
              history.push("/");
            }}
          >
            Logout
          </Button>{" "}
        </Alert>
      )}
    </div>
  );
};

export default PrivateScreen;
