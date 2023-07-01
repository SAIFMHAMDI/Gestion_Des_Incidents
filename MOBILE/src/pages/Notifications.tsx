import {
  IonPage,
  IonSplitPane,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRouterOutlet,
  IonInput,
  IonButton,
  IonIcon,
  IonMenuButton,
  IonButtons,
  IonToggle,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
} from "@ionic/react";
import * as IoIcons from 'react-icons/io';
import { RiSignalWifiOffLine } from "react-icons/ri";
import { API_LINK } from "./config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
import { Preferences } from "@capacitor/preferences";
import { chatbubbleEllipsesOutline, notificationsOutline } from "ionicons/icons";
interface Record {
  id: String;
  nom: string;
  adresse: string;
  fiche_technique : string;
  telephone : string;
  details : string ; 
  titre : string;
  date_insertion: string;
}



const Notification: React.FC = () => {
  const [toggleValue, setToggleValue] = useState(true);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Record | null>(null); 

    const [currentUserObj, setcurrentUserObj] = useState<any>([]);
 
    useEffect(() => {
      (async () => {
        let user_obj: any = await Preferences.get({ key: 'user_obj' });
  
        user_obj = JSON.parse(user_obj.value);
        setcurrentUserObj(user_obj);

        if(user_obj.acceptation==1){
          console.log(user_obj.acceptation + " TRUE");
          setToggleValue(true);
        }else{
          console.log(user_obj.acceptation + " FALSE");
          setToggleValue(false);
        }

        axios.get(`${API_LINK}/notifications/${user_obj.id}`).then((response) => {
          setData(response.data.data);
          console.log(response.data.data);
        }).catch((error) => {
          console.log(error);
        });
      })();
      
      /*
      axios
        .get(`${API_LINK}/notifications/50`)
        .then((response) => {
          setData(response.data.data);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
        */
    }, []);

  const handleToggleChange = async () => {

    let user_obj: any = await Preferences.get({ key: 'user_obj' });
    user_obj = JSON.parse(user_obj.value);

    setToggleValue(!toggleValue);
    if (!toggleValue){
    try {
      const response = await axios.post(`${API_LINK}/ToggleNotif/${currentUserObj.id}`, );
      console.log(response.data);

      user_obj.acceptation=1;
      Preferences.set({
        key: 'user_obj',
        value:  JSON.stringify(user_obj)
      });

    } catch (error) {
      console.error(error);
    }
  }else if (toggleValue) {
    try {
      const response = await axios.post(`${API_LINK}/ToggleNotifOff/${currentUserObj.id}`, );
      console.log(response.data);  
      user_obj.acceptation=0;
      Preferences.set({
        key: 'user_obj',
        value:  JSON.stringify(user_obj)
      });
    } catch (error) {
      console.error(error);
    }
  }};


  
  const formatDate = (dateString: string) => {

    const date: any = new Date(dateString);

    const options: any = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };

    return date.toLocaleString('fr-FR', options).replace(',', '');

  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButtons>
                  <IonMenuButton />
                </IonButtons>
              </IonCol>
              <IonCol>
                <IonToggle
                  className="toggle"
                  aria-label="Light toggle"
                  color="light"
                  checked={toggleValue}
                  onIonChange={handleToggleChange}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      {toggleValue ? (
        <IonContent>
     <>


    
      {data.map((message: any) => (
                   <IonItem key={message.id} detail={true}>
                   <IonLabel>
                     <h3>{message.titre}</h3>
                     <p>{message.message}</p>
                     <span style={{
                      fontSize: '11px',
                      color: '#ccc'
                     }}>{formatDate(message.date_notification)}</span>
                   </IonLabel>
                 </IonItem>
            ))}
            {
              data.length==0 ?
              <div style={{
                textAlign: 'center',
                color: '#9f9f9f',
                marginTop: '150px'
              }}>
                <div><IonIcon style={{
                      fontSize: '80px'
                }} icon={notificationsOutline}></IonIcon></div>
                <span>No notifications</span>
              </div>
              
              :
              <></>
            }

    </>
        </IonContent>
      ) : (
        <IonContent color="medium"> 
         <RiSignalWifiOffLine className="offline" />
        </IonContent>
      )}
    </IonPage>
  );
};

export default Notification;
