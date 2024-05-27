import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Login">
      <h1>Login</h1>
      <form action="POST">
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </form>
      <input type="submit" onClick={handleSubmit} />
      <span>
        Dont have an account? <Link to="/signup">Sign in</Link>
      </span>
    </div>
  );
};

export default Login;
