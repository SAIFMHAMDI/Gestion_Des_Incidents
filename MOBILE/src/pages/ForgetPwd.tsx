import "./ExploreContainer.css";
import React, { useState } from "react";
import {
  IonInput,
  IonPage,
  IonContent,
  IonButton,
  IonHeader,
  IonButtons,
  IonTitle,
  IonToolbar,
  IonIcon,
  useIonToast,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { chevronBackOutline } from "ionicons/icons";
import axios from "axios";
import { API_LINK } from "./config";
import "./Home.css"

for (let key in localStorage) {
  console.log(`${key}: ${localStorage.getItem(key)}`);
}
const ForgetPwd: React.FC = () => {
  const [email, setEmail] = useState('');
 

  const history = useHistory();

  const [present] = useIonToast();
  const presentToast = (position: "top") => {
    present({
      message: "email sent ! ",
      duration: 1500,
      position: position,
    });
  };
 
  const presentToast1 = (position: "top") => {
    present({
      message: "unknown email account ! ",
      duration: 1500,
      position: position,
    });
  };

  const handleEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_LINK}/ResetPwd`, { email });
      console.log(response.data);
      // do something with response, such as store user data in state
     
    
      console.log(email);
      presentToast("top");
      localStorage.setItem('email', email); 
      history.push("/ChangePwd");
    } catch (error) {
      console.error(error);
      presentToast1("top");
    }
  };

  const handleback = () => {
    history.goBack();
  };

  return (
    <IonPage>
    
      <IonHeader>
        <IonToolbar>
          <IonButtons color="meduim" slot="start">
            <IonButton onClick={handleback}>
              <IonIcon icon={chevronBackOutline} slot="end" />
            </IonButton>
          </IonButtons>
          <IonTitle>Reset Password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container-input1">
          <form className="container-form1" onSubmit={handleEmail}>
            <div className="input-form1">
              <IonInput
                type="email"
                label="Email"
                value={email}
                labelPlacement="floating"
                helperText="Enter a valid email"
             
                onIonInput={(e: any) => setEmail(e.target.value)}
              ></IonInput>
          
            </div>
            <IonButton
              className="Resetbutton"
              fill="outline"
              type="submit"
              expand="block"
            >
              Get your code
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgetPwd;
