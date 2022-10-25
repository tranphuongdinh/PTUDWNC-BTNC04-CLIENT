import { Button } from "@mui/material";
import jwt from "jsonwebtoken";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState("");
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.replace("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        handleLogout();
      } else {
        setUser(user);
      }
    } else {
      handleLogout();
    }
  }, []);

  return (
    <div className="infoBox">
      <h1>YOUR INFO</h1>
      <p>
        Name: <strong>{user.name}</strong>
      </p>
      <p>
        Email: <strong>{user.email}</strong>
      </p>

      <Button variant="contained" onClick={handleLogout} style={{ margin: "20px auto", display: "block" }}>
        LOGOUT
      </Button>
    </div>
  );
};

export default Home;
