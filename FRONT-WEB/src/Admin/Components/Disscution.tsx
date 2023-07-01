import React, { useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { API_LINK } from '../../global/config';
import axios from 'axios';
import './Discussion.css'
interface IMessage {
  id: number;

  content: string;
  dateEnvoie: string;
}
const  Disscution =()=>{
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>(() => {
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages) {
      return JSON.parse(storedMessages);
    }
    return [];
  });



  const messageContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let id_technicien = localStorage.getItem("id");

    try {
      const response = await axios.post(
        `${API_LINK}/envoie_message/`,
        { content: input }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    const newMessage: IMessage = {
      id: messages.length + 1,

      content: input,
      dateEnvoie: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  return (
    <div>
      <Row>
      <Col size={2}>
        sdqd
        </Col>
       
        <Col size = {10}>
        <div>
        <div className="chat-container">
          <div
            className="message-container chat-container-top "
            ref={messageContainerRef}
          >
            {messages.map((message) => (
              <div key={message.id} className="sent">
                <span className="text">{message.content}</span>
                <span className="date-envoi">
                  {formatDate(message.dateEnvoie)}
                </span>
              </div>
            ))}
          
          </div>

          <form className="chat-form" onSubmit={handleSubmit}>
            <Row>
              <Col size="9">
                <input
                  type="text"
                  placeholder="Aa"
                  value={input}
                  onChange={handleInputChange}
                  className="chat-input chat-container-bottom"
                />
              </Col>
              <Col size="3">
                <button type="submit" className="send-button">
                  Send
                </button>
              </Col>
            </Row>
          </form>
        </div>
      </div>
        </Col>
      </Row>
    </div>
  )
}

export default Disscution
