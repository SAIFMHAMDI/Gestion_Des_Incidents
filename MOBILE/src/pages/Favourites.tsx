import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import axios from "axios";
import { API_LINK } from "./config";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenuButton,
  IonButtons,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonModal,
  IonCol,
  IonRow,
  IonGrid,
  useIonToast,
  IonInput
} from "@ionic/react";
import { attachOutline, callOutline, documentOutline, homeOutline, imageOutline, mailUnreadOutline, phoneLandscapeOutline, phonePortraitOutline, starOutline } from "ionicons/icons";
import { Preferences } from '@capacitor/preferences';
import SignatureCanvas from 'react-signature-canvas'

export interface Record {
  id: string;
  nom: string;
  adresse: string;
  fiche_technique: string;
  telephone: string;
  details: string;
  titre: string;
  date_insertion: string;
}



const Favorites: React.FC = () => {
  const [data, setData] = useState<Record[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [selectedNotificationFeedBack, setSelectedNotificationFeedBack] = useState<any>(null);
  const [isAccepting, setIsAccepting] = useState(false);
  let canvsRef: any = useRef(null);
  const [currentUserObj, setcurrentUserObj] = useState<any>([]);

  const [present] = useIonToast();
  const modal = useRef<HTMLIonModalElement>(null);
  const modalFeedBack = useRef<HTMLIonModalElement>(null);
  const page = useRef(undefined);

  const [isOpen, setisOpen] = useState(false);
  const [isOpenFeedBack, setisOpenFeedBack] = useState(false);
  const [presentingElement, setPresentingElement] = useState<HTMLElement | undefined>(undefined);


  /*
  FOR FEEDBACK
  */
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [signature, setSignature] = useState("");
  /*
  ###############
  */
  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  useEffect(() => {
    (async () => {
      let user_obj: any = await Preferences.get({ key: 'user_obj' });
      user_obj = JSON.parse(user_obj.value);
      setcurrentUserObj(user_obj);
      axios.get(`${API_LINK}/getFavoris/${user_obj.id}`).then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
      }).catch((error) => {
        console.log(error);
      });
    })();
  }, []);

  const handleNotificationClick = (record: Record) => {
    setisOpen(true);
    setSelectedNotification(record);
    //setShowModal(true);
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };


  const showToastMessage = (msg: any) => {
    present({
      message: msg,
      duration: 3000,
      position: "bottom",
    });
  };

  const acceptMission = (missionId: any, technicienId: any) => {
    setIsAccepting(true);

    axios.put(`${API_LINK}/accept_mission/${missionId}/${technicienId}`).then(response => {
      if (response.data.result_code != 1) {
        showToastMessage(response.data.result_message);
      } else {
        showToastMessage(response.data.result_message);

        const updatedData = [...data];
        const acceptedNotificationIndex = updatedData.findIndex((record) => record.id === selectedNotification?.id);
        if (acceptedNotificationIndex !== -1) {
          updatedData[acceptedNotificationIndex] = response.data.data;
        } else {
          console.log("INDEX NOT found");
        }
        setData(updatedData);
        setSelectedNotification(response.data.data);
        console.log(updatedData);

      }
    }).catch(error => {
      console.error(error);
      showToastMessage(error);
    });
  };





  const feedBack = (missionId: any, technicienId: any) => {

    const formData = new FormData();
    if(image===""){
      showToastMessage("Selectionnez une image");
      return ;
    }
    formData.append('image', image);
    formData.append('signature', canvsRef.toDataURL());
    formData.append('description', description);

    axios.post(`${API_LINK}/feedback/${technicienId}/${missionId}`, formData).then(response => {
      if (response.data.result_code != 1) {
        showToastMessage(response.data.result_message);
      } else {
        showToastMessage(response.data.result_message);

        const updatedData = [...data];
          const acceptedNotificationIndex = updatedData.findIndex((record) => record.id === missionId);
          let tmp: any;
          if (acceptedNotificationIndex !== -1) {
            tmp = Object.assign({}, data[acceptedNotificationIndex]);
            tmp['feedback'] = response.data.data;
            tmp['etat'] = 'DONE';

            console.log(tmp.is_favorite);
            updatedData[acceptedNotificationIndex] = tmp;

          } else {
            console.log("INDEX NOT found");
          }

          setData(updatedData);
          setSelectedNotification(tmp);
          setisOpenFeedBack(false);
          

        /*const updatedData = [...data];
        const acceptedNotificationIndex = updatedData.findIndex((record) => record.id === selectedNotification?.id);
        if (acceptedNotificationIndex !== -1) {
          updatedData[acceptedNotificationIndex] = response.data.data;
        } else {
          console.log("INDEX NOT found");
        }
        setData(updatedData);
        setSelectedNotification(response.data.data);
        console.log(updatedData);*/
        

      }
    }).catch(error => {
      console.error(error);
      showToastMessage(error);
    });

  }

  const selectUploadFile = () => { }

  const handleFeedbackImageChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  const handleFeedbackSignatureChange = (event: any) => {
    setSignature(event.target.files[0]);
  };

  const handleFavorite = (id_incident: any, id_technicien: any, add_remove: boolean) => {
    console.log("ADD REMOVE", add_remove);
    axios.post(`${API_LINK}/addFavoris/${id_technicien}/${id_incident}/${add_remove}`)
      .then((response) => {

        if (response.data.result) {
          const updatedData = [...data];
          const acceptedNotificationIndex = updatedData.findIndex((record) => record.id === id_incident);
          let tmp: any;
          if (acceptedNotificationIndex !== -1) {
            tmp = Object.assign({}, data[acceptedNotificationIndex]);
            tmp['is_favorite'] = add_remove;

            console.log(tmp.is_favorite);
            updatedData[acceptedNotificationIndex] = tmp;

          } else {
            console.log("INDEX NOT found");
          }

          setData(updatedData);
          setSelectedNotification(tmp);
          console.log("#############################################");
          console.log(tmp);

        } else {
          showToastMessage(response.data.result_message);
        }
        //setData(response.data.data);
        //console.log(response.data.data);


      }).catch((error) => {
        console.log(error);
        showToastMessage(error);
      });
  };


  return (
    <IonPage ref={page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons color="meduim" slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Missions</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="content-grey-bg" >
        <div className="container-f" style={{

        }}>
          <div className="container-notification">
            <h1 style={{
              marginLeft: '10px'
            }}>Favorites:</h1>


            {data && data.map((record) => (


              <IonCard onClick={() => handleNotificationClick(record)}>
                <IonCardHeader>
                  <IonCardTitle style={{ color: '#450374' }}>{record.titre}</IonCardTitle>
                  <IonCardSubtitle style={{ display: 'flex' }}><span>Mission N° {record.id}</span><span style={{ marginLeft: 'auto' }}>{formatDate(record.date_insertion)}</span></IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent style={{ color: '#000' }}>
                  Details: {record.details}
                </IonCardContent>
              </IonCard>
            ))}

            {
              /*
              ##########################################################"
              MODAL DETAILS INCIDENT
              */
            }
            {
              selectedNotification != null && (
                <IonModal
                  ref={modal}
                  mode='ios'
                  isOpen={isOpen}
                  trigger="open-modal"
                  canDismiss={true}
                  onDidDismiss={() => {
                    setisOpen(false);
                  }}
                  presentingElement={presentingElement}
                  initialBreakpoint={selectedNotification.feedback == null ? 0.5 : 1}
                  breakpoints={selectedNotification.feedback == null ? [0, 0.5] : [0, 1]}
                >
                  <IonHeader>
                    <IonToolbar>
                      <IonTitle>Incident N° {selectedNotification.id}</IonTitle>
                      <IonButtons slot="end">
                        <IonButton onClick={() => {
                          setisOpen(false);
                          modal.current?.dismiss();
                        }}>Fermer</IonButton>
                      </IonButtons>
                    </IonToolbar>
                  </IonHeader>
                  {
                    selectedNotification.feedback == null ?

                      <IonContent>
                        <IonCardContent style={{ padding: '0px', marginTop: '20px' }} className="incident-container-content-first">
                          <IonItem lines={"none"}>
                            <IonIcon style={{}} icon={phonePortraitOutline} slot="start"></IonIcon>
                            <IonLabel style={{}} >{selectedNotification.telephone}</IonLabel>
                          </IonItem>
                          <IonItem lines="none">
                            <IonIcon style={{}} icon={homeOutline} slot="start"></IonIcon>
                            <IonLabel style={{}}>{selectedNotification.adresse}</IonLabel>
                          </IonItem>
                          <IonItem lines="none">
                            <IonIcon style={{}} icon={attachOutline} slot="start"></IonIcon>
                            <IonLabel style={{}}>{selectedNotification.fiche_technique}</IonLabel>
                          </IonItem>
                        </IonCardContent>
                        <IonGrid>
                          <IonRow>
                            {
                              selectedNotification.etat == 'ON HOLD' ?
                                <IonCol size="10"><IonButton onClick={() => {
                                  acceptMission(selectedNotification.id, currentUserObj.id);

                                }} expand="block" size="default">Accepter</IonButton></IonCol>
                                :
                                selectedNotification.etat === 'IN PROGRESS' && selectedNotification.accepted_by == currentUserObj.id ?
                                  <IonCol size="10"><IonButton expand="block" size="default" onClick={() => {
                                    //acceptMission(selectedNotification.id, currentUserObj.id);
                                    setSelectedNotificationFeedBack(selectedNotification);
                                    setisOpen(false);
                                    setisOpenFeedBack(true);
                                  }}>Feedback</IonButton></IonCol>
                                  :
                                  selectedNotification.etat === 'DONE' && selectedNotification.accepted_by == currentUserObj.id ?
                                    <IonCol size="10"><IonButton expand="block" size="default" onClick={() => {
                                      //acceptMission(selectedNotification.id, currentUserObj.id);
                                      setSelectedNotificationFeedBack(selectedNotification);
                                      setisOpen(false);
                                      setisOpenFeedBack(true);
                                    }}>Voir détails</IonButton></IonCol>
                                    :
                                    <IonCol size="10"><IonButton expand="block" disabled={true} size="default">Accepter</IonButton></IonCol>
                            }
                            <IonCol size="2"><IonButton expand="block" onClick={() => handleFavorite(selectedNotification.id, currentUserObj.id, !selectedNotification.is_favorite)} className={selectedNotification.is_favorite === true ? 'hz-favorite' : ''} size="default"><IonIcon style={{}} icon={starOutline} size="large"></IonIcon></IonButton></IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonContent>
                      :

                      <IonContent>

                        <IonGrid>
                          <IonRow>
                            <IonCol size="12">
                              <h1>Détails : </h1>
                              <p>{selectedNotification.feedback.description}</p>
                            </IonCol>

                            <IonCol size="6">
                              <img src={API_LINK + '/uploads/' + selectedNotification.feedback.image} style={{ width: '100%', height: '200px', objectFit: 'cover', backgroundColor: '#f1f1f1', border: '1px solid #e3e3e3' }} />
                            </IonCol>
                            <IonCol size="6" >
                              <img src={API_LINK + '/uploads/' + selectedNotification.feedback.signature} style={{ width: '100%', height: '200px', objectFit: 'contain', backgroundColor: '#f1f1f1', border: '1px solid #e3e3e3',objectPosition: 'center' }} />
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonContent>
                  }

                </IonModal>
              )
            }


            {
              /*
              ##########################################################"
              MODAL FEEDBACK
              */
            }
            {
              selectedNotificationFeedBack != null && (
                <IonModal
                  ref={modalFeedBack}
                  mode='ios'
                  isOpen={isOpenFeedBack}
                  trigger="open-modal"
                  canDismiss={true}
                  onDidDismiss={() => {
                    setisOpenFeedBack(false);
                  }}
                  presentingElement={presentingElement}
                  initialBreakpoint={1}
                  breakpoints={[0, 1]}
                >
                  <IonHeader>
                    <IonToolbar>
                      <IonTitle>Incident N° {selectedNotificationFeedBack.id}</IonTitle>
                      <IonButtons slot="end">
                        <IonButton onClick={() => {
                          setisOpenFeedBack(false);
                          modalFeedBack.current?.dismiss();
                        }}>Fermer</IonButton>
                      </IonButtons>
                    </IonToolbar>
                  </IonHeader>
                  <IonContent>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12">

                          <div className="input-Description">
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
                              <IonIcon icon={imageOutline} size="large" />
                            </IonCol>
                            <IonCol size="10">
                              <input type="file"
                                onChange={handleFeedbackImageChange}
                                  /*onChange={(e: any) => setImage(e.target.value)} */ />
                            </IonCol>

                          </IonRow>





                          <IonRow>
                            <IonCol size="12">
                              <h6>Signature client :</h6>
                              <SignatureCanvas 
                               ref={(ref) => { canvsRef = ref }}
                              penColor='black'
                                canvasProps={{ width: window.innerWidth - 30, height: 200, className: 'sigCanvas' }} />
                            </IonCol>


                          </IonRow>

                        </IonCol>
                        <IonCol size="12"><IonButton onClick={() => feedBack(selectedNotificationFeedBack.id, currentUserObj.id)} expand="block" size="default">Accepter</IonButton></IonCol>

                      </IonRow>
                    </IonGrid>
                  </IonContent>
                </IonModal>
              )
            }


          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
