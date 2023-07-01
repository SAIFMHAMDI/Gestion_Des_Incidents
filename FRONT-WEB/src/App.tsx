import React, { Children } from "react";
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";


import "./Admin/Components/LoginAdmin.css";
import Navbar from "./Admin/Components/Navbar";
import Inscription from "./Admin/Components/Inscription";
import Techninciens from "./Admin/Components/Techniciens";

import Operateur from "./Admin/Components/Operateur";


import LoginOperateur from "./Operator/Components/LoginOperateur";
import ListMission from "./Operator/Components/ListMission";

import NavbarOperator from "./Operator/Components/NavbarOperator";


import NotificationList from "./Operator/Components/Notification";
import NotificationAdmin from "./Admin/Components/NotificationAdmin";

import MyChart from "./Admin/Components/ChartLine";
import Discution from "./Admin/Components/Disscution";
import ResetPassword from "./Operator/Components/ResetPassword";
import ChangePassword from "./Operator/Components/ChangePassword";
import CardsDashboard from "./Admin/Components/CardsDashboard";
import Disscution from "./Admin/Components/Disscution";







const App = () => {
  const router = createBrowserRouter([
 
   
    {
      path:"reset-password",
      element:<ResetPassword /> 
    },
    {
      path:"change-password",
      element:<ChangePassword /> 
    },
    {
      path:"/",
      element: <LoginOperateur />
    }
  
    
  
    ,{
      path: "/home",
      element: <Navbar />, 
      children: [
        {
          path:"dashboard",
          element:< CardsDashboard/> 
        },
      
        {
          
          
          path: "inscription",
          element: <Inscription />,
        },
        {
          path: "techniciens",
          element: <Techninciens />,
        },
        {
          path: "operator",
          element: <Operateur/>,
        },
        {
          path:"notifications",
          element:<NotificationAdmin />
        },
       
      
        {
          path:"discussion",
          element:<Disscution />
        },
     
      
      ],
    },
    {
      path:"/operator",
      element:<NavbarOperator />,
      children: [
        {
          path:"list-mission",
          element:<ListMission />
        },
      
        {
          path:"notification",
          element:<NotificationList />
        },
        {
          path:"dashboard",
          element:< CardsDashboard/> 
        },
        
  
      ]
    },
  ]);
  return (
    
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
};

export default App;
