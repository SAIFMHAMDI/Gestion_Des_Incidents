import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  IonInput,
  IonPage,
  IonContent,
  IonButton,
  IonToolbar,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  useIonToast,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import axios from "axios";
import { API_LINK } from "./config";
import './Home.css'
const ChangePwd: React.FC = () => {
  const history = useHistory();
  const [password,setPassword]= useState('');
  const [email, setEmail] = useState('');
  const [code,setCode]= useState('');
  const [confirmpassword,setConfirmpassword]= useState('');
  const [loginError, setloginError] = useState(0);
  const [loginErrorMessage, setloginErrorMessage] = useState("");
  const [present] = useIonToast();


  const presentToast = (position: "bottom"|"top"|"middle") => {
    present({
      message: "passwords do not match ",
      duration: 1500,
      position: position,
    });
  };

  
  const presentToast1 = (position: "bottom"|"top"|"middle") => {
    present({
      message: "server error ",
      duration: 1500,
      position: position,
    });
  };


  const handlePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(code.trim()==""){
      setloginError(1);
      setloginErrorMessage("code required.");

  
      return;
    } else if(password.trim()==""){
      setloginError(2);
      setloginErrorMessage(" password required.");

  
      return;
    }else if(confirmpassword.trim()==""){
      setloginError(3);
      setloginErrorMessage("confrim your new password.");

  
      return;
    } 
    else if (password !== confirmpassword) { 
  presentToast("top");

  
      return;
    }
    let email = localStorage.getItem("email");
    let formData = {
      email: email,
      password: password,
      code: code,
    };

    try {
      const response = await axios.post(`${API_LINK}/changepwd`, formData);

      console.log(response.data);
      // do something with response, such as store user data in state
      history.push("/login");
    } catch (error) {
      console.error(error);
      presentToast1("bottom");
    }
  };
  const handleback=()=>{
    history.goBack();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons onClick={handleback} color="meduim" slot="start">
            <IonIcon icon={chevronBackOutline} slot="end" />
          </IonButtons>
          <IonTitle>Reset Password</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="container-input">
          <form className="container-form" onSubmit={handlePassword}>
            <div className="input-form">
              <IonInput
                type="text"
                label="code"
                labelPlacement="floating"
                helperText="Enter your code"
                value={code}
                onIonInput={(e: any) => setCode(e.target.value)}
              ></IonInput>
              
          {loginError === 1 && (
            <div className="error-message">{loginErrorMessage}</div>
          )}
            
              <IonInput
                type="password"
                label="password"
                labelPlacement="floating"
                helperText="Enter your password"
                value={password}
                onIonInput={(e: any) => setPassword(e.target.value)}
              ></IonInput>
                 {loginError === 2 && (
            <div className="error-message">{loginErrorMessage}</div>
          )}
              <IonInput
                type="password"
                label="password"
                labelPlacement="floating"
                helperText="confirm your password"
                value={confirmpassword}
                onIonInput={(e: any) => setConfirmpassword(e.target.value)}
              ></IonInput>
                 {loginError === 3 && (
            <div className="error-message">{loginErrorMessage}</div>
          )}
                </div>

            <IonButton type="submit" className="Resetbutton" fill="outline" expand="block">
              Confirm
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ChangePwd;
