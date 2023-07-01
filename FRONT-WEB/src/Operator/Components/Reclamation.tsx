import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { API_LINK } from "../../global/config";
import '../../Operator/Components/Notification.css';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  interface ChildModalProps {
    notificationId: number;
  }
  
const ChildModal=({ notificationId }: ChildModalProps)=> {



 
  const [reclamation,setReclamation] = useState("");
  const [loginError, setloginError] = useState(2);
  const [loginErrorMessage, setloginErrorMessage] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
     
    };
    const handleClose = () => {
      setOpen(false);
    };


    const handleSend = () =>{

      setIsLoading(true);
      let formData = {
        reclamation: reclamation,
      
      
      };

      axios
        .post(`${API_LINK}/Reclamation/${notificationId}`, formData)
        .then((response) => {
          console.log(response);
          console.log(formData);
  
          setloginError(response.data.code);
          setloginErrorMessage(response.data.message);
  
          setIsLoading(true);
        })
        .catch((error) => {
          console.log(error);
        
        });

    } 
  
  return (
    <React.Fragment>
        <button className='reclamation-btn' onClick={handleOpen}>Reclamation</button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 400 , height : 250}}>
            <form onSubmit={handleSend}>
          <textarea
                  required
                  rows= {6} cols= {40}
                  className="reclamation-input"
                  placeholder="Write Here.."
                  value={reclamation}
                  onChange={(e) => setReclamation(e.target.value)}
                />
            <button className= 'send-btn' onSubmit={(e) => {
                      e.preventDefault();
                      handleSend();  }} >Send</button>
            <button className='close-btn' onClick={handleClose}>Close </button>
            </form>
          </Box>
        </Modal>
      </React.Fragment>
  )};

  export default ChildModal;