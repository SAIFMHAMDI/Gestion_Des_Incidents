import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonRow,
  IonCol,
  IonIcon,
} from "@ionic/react";
import { useState, useRef, useEffect } from "react";
import { API_LINK } from "./config";
import axios from "axios";
import { Preferences } from "@capacitor/preferences";
import { chatbubbleEllipsesOutline } from "ionicons/icons";

interface IMessage {
  id: number;

  content: string;
  dateEnvoie: string;
}

const Chat: React.FC = () => {

  //const [data, setData] = useState<any>([]);
  const [currentUserObj, setcurrentUserObj] = useState<any>([]);

  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState<string>("");


  const messageContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_LINK}/envoie_message/${currentUserObj.id}/57`,
        { content: input }
      );
      setMessages([...messages, response.data.message]);
      setInput("");

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    
  };

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
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
    //localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);


  const fetchMessages =async ()=>{
    let user_obj: any = await Preferences.get({ key: 'user_obj' });
    if(user_obj==null || user_obj==undefined){ return ;}
    user_obj = JSON.parse(user_obj.value);
    setcurrentUserObj(user_obj);
    axios.get(`${API_LINK}/messages/${user_obj.id}/57`).then((response) => {

      console.log(response.data.data.length + " / "+ messages.length);
      if(response.data.data.length!=messages.length){
        setMessages(response.data.data);
        console.log(response.data.data);
      }

    }).catch((error) => {
      console.log(error);
    });
  }
  useEffect(() => {
    fetchMessages();

    const interval = setInterval(fetchMessages, 5000);
    // Clear the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons color="meduim" slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Chat</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="chat-container">
          <div
            className="message-container chat-container-top " ref={messageContainerRef} style={{
              paddingTop: '10px'
            }}>
            {messages.map((message: any) => (
              <div key={message.id} className={message.id_admin == 0 ? "sent" : "received"}>
                <div style={{
                  display: 'flex',
                  marginBottom:'10px'
                }}>
                  <div style={{
                        fontWeight: '600'
                  }}>{message.user_name}</div>
                  <div style={{
                    marginLeft: 'auto'
                  }}><span style={{
                    fontSize: '11px',
                    opacity: '0.8'
                  }}>
                    {formatDate(message.date_envoie)}
                  </span></div>
                </div>
                <div className="text">{message.content}</div>

              </div>
            ))}
            {
              messages.length==0 ?
              <div style={{
                textAlign: 'center',
                color: '#9f9f9f',
                marginTop: '150px'
              }}>
                <div><IonIcon style={{
                      fontSize: '80px'
                }} icon={chatbubbleEllipsesOutline}></IonIcon></div>
                <span>No messages</span>
              </div>
              
              :
              <></>
            }

          </div>

          <form className="chat-form" onSubmit={handleSubmit}>
            <IonRow>
              <IonCol size="9">
                <input
                  type="text"
                  placeholder="Message..."
                  value={input}
                  onChange={handleInputChange}
                  className="chat-input chat-container-bottom"
                />
              </IonCol>
              <IonCol size="3">
                <button type="submit" className="send-button">
                  Send
                </button>
              </IonCol>
            </IonRow>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Chat;
