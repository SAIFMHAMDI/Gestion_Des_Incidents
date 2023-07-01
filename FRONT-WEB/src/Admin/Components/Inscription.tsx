import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import './LoginAdmin.css';
import { Navigate, useNavigate } from "react-router-dom";
import { API_LINK } from "../../global/config";

const Inscription = () => {
  const [IsLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(false);
  // operateur....

  const [Name, setName] = useState("");
  const [mail, setmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setpass] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");



  // technicien....

  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [code_postal, setcode_postal] = useState("");

  const [telephone, settelephone] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setloginError] = useState(2);
  const [loginErrorMessage, setloginErrorMessage] = useState("");

  const Navigate = useNavigate();

 

  const GoLogin = () => {
    if(file===""){
      setloginErrorMessage("Select a photo.");
      return ;
    }

    setloginError(0);
    setloginErrorMessage("");
   
    const parsedPhone = parseInt(telephone.trim());
  
    if (nom.trim() === "") {
      setloginError(1);
      setloginErrorMessage("Nom requis.");
      return;
    } else if (prenom.trim() === "") {
      setloginError(2);
      setloginErrorMessage("Prenom requis.");
      return;
    } else if (email.trim() === "") {
      setloginError(3);
      setloginErrorMessage("Adresse mail requise.");
      return;
    } else if (password.trim() === "") {
      setloginError(4);
      setloginErrorMessage("Mot de passe requis.");
      return;
    }  else if (password.trim().length < 8) {
      setloginError(31);
      setloginErrorMessage("The password must contain at least 8 characters long.");
     
      return;
    }
    else if (code_postal.trim() === "") {
      setloginError(5);
      setloginErrorMessage("Code postal requis.");
      return;
    } else if (telephone.trim() === "") {
      setloginError(6);
      setloginErrorMessage("Telephone requis.");
      return;
    }    else  if (!email.trim().includes('@') || !email.trim().includes('.') || email.trim().indexOf('@') > email.trim().lastIndexOf('.')) {
      setloginError(23);
      setloginErrorMessage("Please enter a valid email address.");
      return;
    
    
  } else
  if (isNaN(parsedPhone) || parsedPhone.toString().length !== 8) {
    setloginError(22);
    setloginErrorMessage("Please enter a valid phone number with 8 digits.");
    return;
  }

    setLoading(true);

    let formDataTechnicien = new FormData();
    formDataTechnicien.append("nom", nom);
    formDataTechnicien.append("prenom", prenom);
    formDataTechnicien.append("code_postal", code_postal);
    formDataTechnicien.append("telephone", telephone);
    formDataTechnicien.append("password", password);
    formDataTechnicien.append("email", email);
    formDataTechnicien.append("file", file);

    axios
      .post(`${API_LINK}/AccountTechnicien`, formDataTechnicien)
      .then((response) => {
        console.log(response);
            
        if(response.data.result_code===1){
          setloginError(20);
          setloginErrorMessage(" Account with the provided email or telephone already exists.");
          setIsLoading(false);
         }else{
            
          setIsLoading(false);
         }
         Navigate("/home/techniciens");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  

  const GoInscrire = () => {
    setloginError(0);
    setloginErrorMessage("");
    const parsedPhone = parseInt(phone.trim());
    const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    if (Name.trim() === "") {
      setloginError(8);
      setloginErrorMessage("Name requis.");
      return;
    } else if (mail.trim() === "") {
      setloginError(9);
      setloginErrorMessage("Email requis.");
      return;
    } else if (phone.trim() === "") {
      setloginError(10);
      setloginErrorMessage("Phone requis.");
      return;
    } else if (pass.trim() === "") {
      setloginError(11);
      setloginErrorMessage(" Mot de passe requis.");
      return;
      } else if (pass.trim().length <8 ) {
        setloginError(30);
        setloginErrorMessage("The password must contain at least 8 characters long.");
        return;
      }
      else  if (!mail.trim().includes('@') || !mail.trim().includes('.') || mail.trim().indexOf('@') > mail.trim().lastIndexOf('.')) {
        setloginError(24);
        setloginErrorMessage("Please enter a valid email address.");
        return;
      
      
    } else
    if (isNaN(parsedPhone) || parsedPhone.toString().length !== 8) {
      setloginError(21);
      setloginErrorMessage("Please enter a valid phone number with 8 digits.");
      return;
    }
    let formDataOperateur = {
        Name: Name,
        email: mail,
        telephone: phone,
        password: pass,
        file:file,
        fileName:fileName
      };
    axios
      .post(`${API_LINK}/AccountOperateur`, formDataOperateur)
      .then((response) => {
        console.log( response.data.result_code);
        
       if(response.data.result_code===1){
        setloginError(12);
        setloginErrorMessage(" Account with the provided email or telephone already exists.");
        setIsLoading(false);
       }else{
        Navigate("/home/operator");
        setIsLoading(false);
       }

        
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });

  };
  const handleImage = (e : any) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFileName(uploadedFile.name);
  };
  return (
    
    <Row>
      <Col size="8" >
      <div className="left-column-tech" >
        <span className="Inscription_subtitle">ADD TECHNICIAN</span>
        <input
          type="text"
          className="Inscription-input"
          placeholder="name"
          value={nom}
          onChange={(e) => setnom(e.target.value)}
        />
        {loginError === 1 ? (
          <span className="form_error_message">{loginErrorMessage}</span>
        ) : (
          <></>
        )}
        <div className="spacer-20"></div>

        <input
          type="text"
          className="Inscription-input"
          placeholder="family name"
          value={prenom}
          onChange={(e) => setprenom(e.target.value)}
        />
        {loginError === 2 ? (
          <span className="form_error_message">{loginErrorMessage}</span>
        ) : (
          <></>
        )}
        <div className="spacer-20"></div>
        <input
          type="text"
          className="Inscription-input"
          placeholder="Postal Code"
          value={code_postal}
          onChange={(e) => setcode_postal(e.target.value)}
        />
        {loginError === 5 ? (
          <span className="form_error_message">{loginErrorMessage}</span>
        ) : (
          <></>
        )}
        <div className="spacer-20"></div>
        <input
          type="text"
          min="10000000" max="99999999"
          className="Inscription-input"
          placeholder="phone number"
          value={telephone}
          onChange={(e) => settelephone(e.target.value)}
        />
        {loginError === 6 ? (
          <span className="form_error_message">{loginErrorMessage}</span>
        ) : (
          <></>
        )}
          {loginError === 22 ? (
          <span className="form_error_message">{loginErrorMessage}</span>
        ) : (
          <></>
        )}
        <div className="spacer-20"></div>

    

        <input
          type="email"
          className="Inscription-input"
          placeholder="email adress"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        {loginError === 3 ? (
          <span className="form_error_message">{loginErrorMessage}</span>
        ) : (
          <></>
        )}
          {loginError === 23 ? (
          <span className="form_error_message">{loginErrorMessage}</span>
        ) : (
          <></>
        )}
        <div className="spacer-20"></div>

        <input
          type="password"
          className="Inscription-input"
          placeholder="***********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="spacer-20"></div>
          <input
                id="myFileInput"
                type="file"
                
                className="Inscription-input"
                onChange={handleImage}
              />
        <div className="spacer-20"></div>
        {loginError === 4 ? (
          <span className="form_error_message">{loginErrorMessage}</span>
        ) : (
          <></>
        )}
         {loginError === 31 ? (
          <span className="form_error_message">{loginErrorMessage}</span>
        ) : (
          <></>
        )}

        {loginError == 20 ? (
          <span className="form_error_message">{loginErrorMessage}</span>
        ) : (
          <></>
        )}
        <div className="spacer-20"></div>
        

        {Loading ? (
          <Spinner animation="border" variant="info">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <button className="inscription-btn" onClick={(e) => GoLogin()}>
          Sign Up
          </button>
        )}
       
        </div>
      </Col>








      <Col  size="4" >
      <div className="right-column-tech">
        <span className="Inscription_subtitle">ADD OPERATOR</span>
        <input
          type="text"
          className="Inscription-input"
          placeholder="name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
        {loginError === 8 ? (
          <span className="form_error_message">{loginErrorMessage}</span>
        ) : (
          <></>
        )}
        <div className="spacer-20"></div>

        <input required
          type="email"
          className="Inscription-input"
          placeholder="email adress"
          value={mail}
          onChange={(e) => setmail(e.target.value)}
        />
        {loginError === 9 ? (
          <span className="form_error_message">{loginErrorMessage}</span>
        ) : (
          <></>
        )}
        {loginError === 24 ? (
          <span className="form_error_message">{loginErrorMessage}</span>
        ) : (
          <></>
        )}

        <div className="spacer-20"></div>
        <input
          type="text"
          min="10000000" max="99999999"
          className="Inscription-input"
          placeholder="phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {loginError === 10 ? (
          <span className="form_error_message">{loginErrorMessage}</span>
        ) : (
          <></>
        )}
          {loginError === 21 ? (
          <span className="form_error_message">{loginErrorMessage}</span>
        ) : (
          <></>
        )}

        <div className="spacer-20"></div>

        <input
          type="password"
          className="Inscription-input"
          placeholder="***********"
          value={pass}
          onChange={(e) => setpass(e.target.value)}
        />
        {loginError === 11 ? (
          <span className="form_error_message">{loginErrorMessage}</span>
        ) : (
          <></>
        )}
          {loginError === 30 ? (
          <span className="form_error_message">{loginErrorMessage}</span>
        ) : (
          <></>
        )}

        {loginError == 12 ? (
          <span className="form_error_message">{loginErrorMessage}</span>
        ) : (
          <></>
        )}
        <div className="spacer-20"></div>
      
        {IsLoading ? (
          <Spinner animation="border" variant="info">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <button className="inscription-btn" onClick={(e) => GoInscrire()}>
           Sign Up
          </button>
        )}
        </div>
      </Col>
    </Row>
  );
};

export default Inscription;
