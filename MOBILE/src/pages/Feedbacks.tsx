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
  IonRow,
  IonCol,
  IonGrid,
} from "@ionic/react";
import { documentOutline,imageOutline} from 'ionicons/icons';

import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { API_LINK } from "./config";


const Feedbacks: React.FC = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [signature, setSignature] = useState("");

  const [data, setData] = useState([]);

  const handleClick = () => {


    axios
      .post(`${API_LINK}/feedback/30/50`, { description, image, signature })
      .then((response) => {
        setData(response.data);
        console.log(response.data);

      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>FeedBacks</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="Feedback-container">
       
          <form >
          <div   className="input-Description">
            <IonInput
          
              type="text"
              label="Description"
              value={description}
              onIonInput={(e: any) => setDescription(e.target.value)}
              labelPlacement="floating"
              counter={true}
              maxlength={180}
            />
            </div>
           
            <IonRow>
              <IonCol size="2">
                <IonIcon icon={imageOutline} size="large"/> 
              </IonCol>
          <IonCol>
             <input type="file"
              onChange={(e: any) => setImage(e.target.value)} /> 
            </IonCol> 
     
            </IonRow>
          
          
           
            
          
            <IonRow>
              <IonCol size="2">
                <IonIcon icon={documentOutline} size="large"/> 
              </IonCol>
          <IonCol>
             <input type="file"
              onChange={(e: any) => setSignature(e.target.value)} /> 
            </IonCol> 
     
            </IonRow>
           
            <div>

              <IonButton
                className="uploadBtn"
                expand="block"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick();
                }}
              >
                Upload
              </IonButton>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Feedbacks;
