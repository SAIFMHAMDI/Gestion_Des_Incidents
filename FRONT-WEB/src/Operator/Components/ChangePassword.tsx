import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Row, Col, Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { API_LINK } from "../../global/config";
import "./LoginOperateur.css";
import "react-toastify/dist/ReactToastify.css";
const ChangePassword = () => {
  const [IsLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [loginError, setloginError] = useState(0);
  const [loginErrorMessage, setloginErrorMessage] = useState("");

  // Check if user is already logged in on mount

  const  ResetPassword = () => {
    setIsLoading(true);

    if (code.length === 0) {
      setloginError(2);
      setloginErrorMessage("code required.");
      setIsLoading(false);
      return;
    } else if (password.length === 0) {
      setloginError(4);
      setloginErrorMessage("password required.");
      setIsLoading(false);
      return;
    } else if (confirmPassword.length === 0) {
      setloginError(5);
      setloginErrorMessage("confirmation password required.");
      setIsLoading(false);
      return;
    } else if (password.trim().length < 8) {
      setloginError(15);
      setloginErrorMessage("The password must contain at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    // Check if the confirm password matches the new password
    else if (password !== confirmPassword) {
      setloginError(1);
      setloginErrorMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    let formData = {
      email: email,
      password: password,
      code: code,
    };
    axios.post(`${API_LINK}/resetpass`, formData)
    .then(response => {
   console.log(response.data.data)      
      navigate("/");
    })
    .catch(error => {
      console.error(error);
      setloginError(3);
      setloginErrorMessage("Incorrect code.");
    });
  };
  

  
  //   useEffect(() => {

  //   }, []);

  return (
    <div className="Container">
      <div className="login_left">
        <Col className="Reset_container">
          <h1 className="login_title">Reset Password</h1>

          <input
            required
            className="login-input"
            type="code"
            placeholder="code"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          {loginError === 2 && (
            <div className="error-message">{loginErrorMessage}</div>
          )}
          {loginError === 3 && (
            <div className="error-message">{loginErrorMessage}</div>
          )}

          <div className="spacer-20"></div>

          <input
            required
            className="login-input"
            type="password"
            placeholder="new password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError === 4 && (
            <div className="error-message">{loginErrorMessage}</div>
          )}
           {loginError === 15 && (
            <div className="error-message">{loginErrorMessage}</div>
          )}
          <div className="spacer-20"></div>
          <input
            required
            className="login-input"
            type="password"
            id="password"
            placeholder=" confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {loginError === 1 && (
            <div className="error-message">{loginErrorMessage}</div>
          )}
          {loginError === 5 && (
            <div className="error-message">{loginErrorMessage}</div>
          )}
          <div className="spacer-20"></div>
          {IsLoading ? (
            <Spinner animation="border" variant="info">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <button className="login-btn" onClick={(e) => ResetPassword()}>
              Confirm
            </button>
          )}
        </Col>
      </div>
      <ToastContainer />
    </div>
  );
};


export default ChangePassword;
