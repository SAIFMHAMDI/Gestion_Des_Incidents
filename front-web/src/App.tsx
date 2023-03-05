import React from "react";
import {BrowserRouter,BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginAdmin from "./Admin/LoginAdmin";
import './App.css';


const App: React.FC = ()=>{
    return (
        <div className="App">
            <BrowserRouter>
            

                <Routes>
                    <Route path="/" element={<LoginAdmin />}/>
                </Routes>
             
                
            </BrowserRouter>
            
        </div>
    );
};

export default App;