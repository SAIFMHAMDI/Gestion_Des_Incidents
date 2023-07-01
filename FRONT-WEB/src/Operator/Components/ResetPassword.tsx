import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Row, Col, Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_LINK } from "../../global/config";
import './LoginOperateur.css';


const ResetPassword = () => {

  const [IsLoading, setIsLoading] = useState(false);
 
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
 
  const [loginError, setloginError] = useState(0);
  const [loginErrorMessage, setloginErrorMessage] = useState("");


  



  const SendMail = () => {
   localStorage.setItem("email",email);

    if(email.length===0 ){
      setloginError(1);
      setloginErrorMessage("email required.");
    setIsLoading(false);
    return;
  }

    setIsLoading(true);
    let formData = {
      email: email,
     
  
    };

    axios
      .post(`${API_LINK}/forgetpassword`, formData
       
      )
      .then((response) => {
        console.log(response);

     
        navigate("/change-password");
        toast("E-mail Sent");
       
    
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setloginError(2);
        setloginErrorMessage("Invalid email account  .");
      setIsLoading(false);
      });


    
         
  };
//   useEffect(() => {
  
//   }, []);

  return (
    <div className="Container">
      <div className="login_left">
        <Col className="Reset_container">
          <h1 className="login_title">Reset Password</h1>

          <span className="Reset_subtitle">
            Enter your email  :
          </span> 
          <input required
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
           {loginError === 2 && (
            <div className="error-message">{loginErrorMessage}</div>
          )}

          <div className="spacer-20"></div>
          {IsLoading ? (
            <Spinner animation="border" variant="info">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <button className="login-btn" onClick={(e) => SendMail()} >
                Get your code
            </button>
          )}
    
        </Col>
      </div>

     

    </div>

  );
};

export default ResetPassword;
