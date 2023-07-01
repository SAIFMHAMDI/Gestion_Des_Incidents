import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';  
import * as FiIcons from 'react-icons/fi';
import * as BsIcons from 'react-icons/bs';
import {Box,Typography,colors} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useNavigate } from "react-router-dom";
import "../../Admin/Components/Navbar.css";
import { IconContext } from "react-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MyChart from "../../Admin/Components/ChartLine";



export default function Navbar() {

  const [sidebar, setSidebar] = useState(false);
  const [open, setOpen] = useState(false);
  const  navigate= useNavigate();

  const showSidebar = () => setSidebar(!sidebar);




  return (
    <>
    
      <IconContext.Provider value={{ color: "#E6E6FA"  }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items"  onClick={showSidebar} >
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img  className="image"/>
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h6"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                Admin
                </Typography>
              
              </Box>
            </Box>
            <li className="nav-text">
              <Link to="/operator/dashboard" className="nav-link">
                <AiIcons.AiFillHome />
                <span className="nav-item">Dashboard</span>
              </Link>
            </li>
           

          
          
       
            <li className="nav-text">
              <Link to="/operator/notification" className="nav-link">
                <MdIcons.MdNotifications />
                <span className="nav-item">Notifications</span>
              </Link>
            </li>


            <li className="nav-text">
              <Link to="/operator/list-mission" className="nav-link">
                <BsIcons.BsPersonLinesFill/>
                <span className="nav-item">Missions</span>
              </Link>
            </li>
       

            <li className="nav-Logout">
              <Link to="/" className="nav-link">
                <FiIcons.FiLogOut />
         
                <a
                  href="#"
                  
                  onClick={(e) => {
                    localStorage.clear();
                    e.preventDefault();
                    confirmAlert({
                      title: "Log Out",
                      message: "Do you want to disconnect ??",
                      buttons: [
                        {
                          label: "Yes",
                          onClick: () => {
                          
                            navigate("/");
                          },
                        },
                        {
                          label: "No",
                          onClick: () => {
                            return;
                          },
                        },
                      ],
                    });
                  }}
                >
                 Logout
                </a>
              </Link>
            </li>
            
          </ul>

        
        </nav>
        
      </IconContext.Provider>
      <Outlet />
    
    </>
    
  );

 
}



