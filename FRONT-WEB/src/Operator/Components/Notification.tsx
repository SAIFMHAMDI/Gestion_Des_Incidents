import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as IoIcons from 'react-icons/io';
import { API_LINK } from "../../global/config";
import './Notification.css';
import ChildModal from './Reclamation';
import { Col, Row } from 'react-bootstrap';

interface Record {
  id: number;
  description: string;
  image : string ;
  signature : string;
  date_feedback : string ;
}

const NotificationList = () => {
  const [data, setData] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedNotification, setSelectedNotification] = useState<Record | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_LINK}/feedback`)
      .then((response) => {
        setData(response.data.data);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [page]);

  const handleNotificationClick = (record: Record) => {
    setSelectedNotification(record);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNotification(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  return (
    <div className='container-f'>
    <div className='container-notification' >
       
        <b className='Notif-1'>Feedbacks :</b>
  
      <div className="notification-list">
      <blockquote>Latest:</blockquote>
        {data.map((record) => (
          <div key={record.id} className="notification" onClick={() => handleNotificationClick(record)}>
           <div className=" NotifIcon col-md-1"> <IoIcons.IoMdNotifications/></div>   
          <div className="description-notif">{record.description} </div>  
         <div className="date">  { formatDate(record.date_feedback)}</div>    
           
          </div>
          
        ))}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Feedback Details</h2>
            {selectedNotification && (
              <div>
                <p><b>ID:</b> {selectedNotification.id}</p>
                <p className="descrip"><b>Description: </b> {selectedNotification.description}</p>
                
             
                <button onClick={handleCloseModal}>Close</button>         
                <ChildModal notificationId={selectedNotification.id} />
              </div>
            )}
          </div>
        </div>
      )}
      
    </div>
    </div>
  );
};

export default NotificationList;
