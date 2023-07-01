import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonMenuButton,
  IonButtons,
  IonImg,
  IonRow,
  IonCol,
  IonButton,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  useIonToast,
} from "@ionic/react";
import { mailUnreadOutline, callOutline, logOutOutline, star, informationCircle } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_LINK } from "./config";
import { useHistory } from 'react-router-dom';
import { Preferences } from "@capacitor/preferences";

import { PushNotificationSchema, PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
     
interface Record {
  id: string;
  nom: string;
  prenom: string;
  code_postal: string;
  telephone: string;
  email: string;
}

const Profile: React.FC = () => {
  const [data, setData] = useState<Record>({
    id: "",
    nom: "",
    prenom: "",
    code_postal: "",
    telephone: "",
    email: "",
  });
  const history = useHistory();
  const [present] = useIonToast();


  const [currentUserObj, setcurrentUserObj] = useState<any>([]);

  useEffect(() => {
    (async()=>{
      const user_obj:any = await Preferences.get({ key: 'user_obj' });
      setcurrentUserObj(JSON.parse(user_obj.value));
    })();
    
  }, [currentUserObj]);

  const logOut =async ()=>{
    // await Preferences.remove({ key: 'user_obj' });
  }

  const showToastMessage = (msg: any) => {
    present({
      message: msg,
      duration: 3000,
      position: "bottom",
    });
  };


  useEffect(()=>{
    if(currentUserObj && currentUserObj!=null && currentUserObj.id!=undefined){
      const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
     
      if (isPushNotificationsAvailable) {
      
      PushNotifications.checkPermissions().then((res) => {
        if (res.receive !== 'granted') {
          PushNotifications.requestPermissions().then((res) => {
            if (res.receive === 'denied') {
              showToastMessage('Push Notification permission denied');
            }
            else {
              //showToast('Push Notification permission granted');
              register();
            }
          });
        }
        else {
          register();
        }
      });
    }
    }

},[currentUserObj])

const register = () => {
    console.log('Initializing HomePage');




    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
        (token: Token) => {
          console.log(token);
          try {
            axios.post(`${API_LINK}/push_token/${currentUserObj.id}`,{push_token :token,device_type:'android'});
          } catch (error) {
            console.error(error);
          }
            //showToast('Push registration success');
        }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
        (error: any) => {
            alert('Error on registration: ' + JSON.stringify(error));
        }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
        (notification: PushNotificationSchema) => {
            //setnotifications(notifications => [...notifications, { id: notification.id, title: notification.title, body: notification.body, type: 'foreground' }])
        }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
            //setnotifications(notifications => [...notifications, { id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body, type: 'action' }])
        }
    );
}


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

{
  currentUserObj.id ?

<IonContent>
        <IonImg src={require("../photo/buildings.jpg")} />

        <IonRow>
          <IonCol size="4">
            <div className="photo-container">
              <IonImg
                src={`${API_LINK}/uploads/${currentUserObj.file}`}
                className="my-photo"
              />
            </div>
          </IonCol>
          <IonCol>
            <div className="name-container">
              <span>
                <b>
                  {currentUserObj.nom} {currentUserObj.prenom}
                </b>
              </span>
            </div>
          </IonCol>
        </IonRow>

        <IonCard className="profile-card">
        <IonCardHeader>
        <IonCardTitle>Informations : </IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
      <IonItem lines="inset">
            <IonIcon icon={mailUnreadOutline} slot="start"></IonIcon>
            <IonLabel>{currentUserObj.email}</IonLabel>
          </IonItem>

          <IonItem lines="inset">
            <IonIcon icon={callOutline} slot="start"></IonIcon>
            <IonLabel>{currentUserObj.telephone}</IonLabel>
          </IonItem>
         
          <IonButton
              className="logout"
              routerLink="/login"
              onClick={() => logOut()}
              routerDirection="forward"

              fill="outline"

              expand="block"
            >
              <IonIcon icon={logOutOutline} slot="start"></IonIcon>
              logout
            </IonButton>
      </IonCardContent>
    </IonCard>
    
       
      </IonContent>
  :
  <></>
}
      
    </IonPage>
  );
};

export default Profile;
