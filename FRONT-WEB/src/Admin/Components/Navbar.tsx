import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import "./Navbar.css";
import { IconContext } from "react-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MyChart from "./ChartLine";



export default function Navbar() {

  const [sidebar, setSidebar] = useState(false);
  const [open, setOpen] = useState(false);
 const  navigate= useNavigate();

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    console.log("View entred");

    if (localStorage.getItem("id") === null) {
      navigate("/");
    } 
  }, [])


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
              <Link to="/home/dashboard" className="nav-link">
                <AiIcons.AiFillHome />
                <span className="nav-item">Dashboard</span>
              </Link>
            </li>
           

            <li className="nav-text">
              <Link to="/home/inscription" className="nav-link">
                <IoIcons.IoMdPersonAdd/>
                <span className="nav-item">Profile Form</span>
              </Link>
            </li>

          
            <li className="nav-text">
              <Link to="/home/discussion" className="nav-link">
                <AiIcons.AiFillMessage />
                <span className="nav-item">Message</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/home/notifications" className="nav-link">
                <MdIcons.MdNotifications />
                <span className="nav-item">Notifications</span>
              </Link>
            </li>


            <li className="nav-text">
              <Link to="/home/techniciens" className="nav-link">
                <BsIcons.BsPersonLinesFill/>
                <span className="nav-item">Technicians</span>
              </Link>
            </li>
            
            <li className="nav-text">
              <Link to="/home/operator" className="nav-link">
                <MdIcons.MdWifiTethering/>
                <span className="nav-item">Operators</span>
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



