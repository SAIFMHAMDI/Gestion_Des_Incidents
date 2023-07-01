import React from 'react'
import axios from 'axios';
import * as GoIcons from "react-icons/go";
import * as BsIcons from "react-icons/bs";
import { API_LINK } from '../../global/config';
import { useState,useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import './Charts.css';
import MyChart from './ChartLine';

const CardsDashboard=() =>{
    const [data,setData]=useState(0);
    const [data1,setData1]=useState(0);
    const [data2,setData2]=useState(0);
    const [data3,setData3]=useState(0);


    useEffect(() => {
        axios
          .get(`${API_LINK}/all-technicien`)
          .then((response) => {
            setData(response.data.data);
            console.log(response.data.data);
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

      
    useEffect(() => {
        axios
          .get(`${API_LINK}/all-operateur`)
          .then((response) => {
            setData1(response.data.data);  
            console.log(response.data.data);
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

      useEffect(() => {
        axios
          .get(`${API_LINK}/all-missions`)
          .then((response) => {
            setData2(response.data.data);  
            console.log(response.data.data);
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);


      useEffect(() => {
        axios
          .get(`${API_LINK}/dispo-technicien`)
          .then((response) => {
            setData3(response.data.data);  
            console.log(response.data.data);
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
  return (
    <div className='container1'>
      <Row>
          <Col className='card-dash'>
              <div className='card-tech'>
                <Row>
                <Col className='data col-md-6'>{data}<div className='description'>Technicians</div></Col>   
                <Col className='icon'><GoIcons.GoPerson /></Col>
           
                </Row>
                  

              </div>
          </Col>

          <Col className='card-dash'>
          <div className='card-tech'>
                 
                  <Row>
                <Col className='data col-md-6'>{data1}<div className='description'>Operators</div></Col>    &nbsp;
                <Col className='icon'> <BsIcons.BsFillBuildingFill /> </Col>
           
                </Row>
              </div>
          </Col>

          <Col className='card-dash' >
          <div className='card-tech'>
                 
                 <Row>
               <Col className='data col-md-6'>{data2}<div className='description'>  Missions </div></Col>  
               <Col className='icon'> <BsIcons.BsFillBagFill /> </Col>
          
               </Row>
             </div>

          </Col>

          <Col className='card-dash'>
  <div className='card-tech'>
                <Row>
                <Col className='data col-md-6'>{data3}<div className='description'>Available</div></Col>   
                <Col className='icon'><GoIcons.GoPerson /></Col>
           
                </Row>
                  

              </div>
          </Col> 
   
      </Row>
       <MyChart />
       </div>
  )
}

export default CardsDashboard;