import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Row, Col, Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_LINK } from "../../global/config";
import "./LoginOperateur.css";

const LoginOperateur = () => {
  const [IsLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [loginError, setloginError] = useState(0);
  const [loginErrorMessage, setloginErrorMessage] = useState("");

  // Check if user is already logged in on mount

  const GoLogin = () => {
    if (email.length === 0) {
      setloginError(1);
      setloginErrorMessage("Email is required.");
      setIsLoading(false);
      return;
    }

    if (password.length === 0) {
      setloginError(2);
      setloginErrorMessage("Password is required.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    let formData = {
      email: email,
      password: password,
    };

    axios
      .post(`${API_LINK}/loginverif`, formData)
      .then((response) => {
        console.log(response);

        localStorage.setItem("id", response.data.user[0].id);
        localStorage.setItem("role", response.data.user[0].role);
        if (response.data.user[0].role === 1) {
          navigate("/home/dashboard");
        } else {
          navigate("/operator/dashboard");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setloginError(3);
        setloginErrorMessage("Incorrect email or password.");
      });
  };

  return (
    <div className="Container">
      <div className="login_left">
        <Col className="login_container">
          <h1 className="login_title">Login</h1>

          <span className="login_subtitle">
            Enter your email and password to login :
          </span>

          <input
            required
            className="login-input"
            type="email"
            placeholder="E-mail"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {loginError === 1 && (
            <div className="error-message">{loginErrorMessage}</div>
          )}

          <div className="spacer-20"></div>
          <input
            required
            className="login-input"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {loginError === 2 && (
            <div className="error-message">{loginErrorMessage}</div>
          )}
          {loginError === 3 && (
            <div className="error-message">{loginErrorMessage}</div>
          )}
          <div className="spacer-20"></div>
          {IsLoading ? (
            <Spinner animation="border" variant="info">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <button className="login-btn" onClick={(e) => GoLogin()}>
              Log In
            </button>
          )}
          <Link to="/reset-password" className="ResetLink">
            Forget Password ?
          </Link>
        </Col>
      </div>
    </div>
  );
};

export default LoginOperateur;
