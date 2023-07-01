import './Home.css';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { IonInput, IonPage, IonContent, IonButton, useIonToast } from '@ionic/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_LINK } from './config';
import { Preferences } from '@capacitor/preferences';

const Home: React.FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setloginError] = useState(0);
  const [loginErrorMessage, setloginErrorMessage] = useState("");
  const history = useHistory(); 
  const [present] = useIonToast();



  useEffect(()=>{

    (async () => {
      let user_obj: any = await Preferences.get({ key: 'user_obj' });

      if (user_obj !== null && user_obj.value!=null) {
        history.push("/Menu/profile");
        return;
      }
    })();
  
  },[]);
  
  const showToastMessage = (msg: any) => {
    present({
      message: msg,
      duration: 3000,
      position: "bottom",
    });
  };

  const  handleLogin = async (e: any) => {
    e.preventDefault();
    if (email.trim() === "") {
      setloginError(1);
      setloginErrorMessage("email required.");
      return;
    } else if (password.trim() === "") {
      setloginError(2);
      setloginErrorMessage("password required.");
      return;
    }

    axios.post(`${API_LINK}/logintechnicien`, {
      email,
      password
    }).then(response => {

      if (response.data.msg_code !== 4) {
        showToastMessage(response.data.msg);
      } else {
        Preferences.set({
          key: 'user_obj',
          value:  JSON.stringify(response.data.user)
        });
        history.push('/Menu/profile');
      }
    }).catch(error => {
      console.error(error);
      showToastMessage(error);
    });
  };



  return (
    <IonPage>
      <IonContent >
        <div className='span'><span><b>Welcome,</b></span></div>
        <div className='span1'><span ><b>Sign in to continue!</b></span></div>
        <div className='container-input'>


          <form className='container-form' onSubmit={handleLogin}>
            <div className='input-form'>
              <IonInput
                type="email"
                label="Email"
                value={email}
                labelPlacement="floating"
                helperText="Enter a valid email"
                errorText="Invalid email"
                onIonInput={(e: any) => setEmail(e.target.value)}
              >
              </IonInput>
              {loginError === 1 && (
                <div className="error-message">{loginErrorMessage}</div>
              )}
              <IonInput
                type="password"
                label="Password"
                value={password}
                labelPlacement="floating"
                helperText="Enter a valid password"
                onIonInput={(e: any) => setPassword(e.target.value)}
              ></IonInput>
              {loginError === 2 && (
                <div className="error-message">{loginErrorMessage}</div>
              )}
            </div>
            <div className='forget-pwd'>  <Link to="/ForgetPwd" >Forget password?</Link></div>
            <IonButton color='tertiary' type="button" onClick={(e) => {
              handleLogin(e);
            }} className='login_btn' expand="block" >Login</IonButton>
          </form>

        </div>
      </IonContent>
    </IonPage>

  );
}

export default Home