import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Spinner } from 'react-bootstrap';

const LoginAdmin: React.FC = () => {

  const [IsLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');

  const [login, setLogin] = useState("");
  const [loginError, setloginError] = useState(2);
  const [loginErrorMessage, setloginErrorMessage] = useState("");
  
  const GoLogin = () => {
    setloginError(0);
    setloginErrorMessage("");
    if (login.trim() === "") {
      setloginError(3);
      setloginErrorMessage("Adresse mail requise.");
    } else if (password.trim() === "") {
      setloginError(4);
      setloginErrorMessage("Mot de passe requis.");
    }
    setIsLoading(true);
  }

  return (
    <div className="Container">
      <div className="login_left">
        <Col className="login_container">
      
          <h1 className="login_title">Login</h1>
        
       

        
          <span  className="login_subtitle">
            Saisir votre email et mot de passe pour se connecter :
          </span>

          <input
            className='login-input'
            type="email"
            placeholder="E-mail"
            id="email"
            value={login}
            onChange={(e)=> setLogin(e.target.value)}
          />
          {loginError===3 ? <span className="form_error_message">{loginErrorMessage}</span> : null}
          <div className='spacer-20'></div>
          <input
            className='login-input'
            type="password"
            id="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
          {loginError===4 ? <span className="form_error_message">{loginErrorMessage}</span> : null}
          {loginError!=4 && loginError!=3 && loginError!=2 ? <span className="form_error_message">{loginErrorMessage}</span> : null}
          <div className='spacer-20'></div>
          {IsLoading ? 
            <Spinner animation="border" variant="info">
              <span className="visually-hidden">Loading...</span>
            </Spinner> :
            <button className="login-btn" onClick={e=> GoLogin()}>Se connecter</button>
          }

             
        </Col>

      </div>
     
    </div>
  );
};

export default LoginAdmin;
