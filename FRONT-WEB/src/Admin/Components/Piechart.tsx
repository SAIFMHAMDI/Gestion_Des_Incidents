import React,{useState,useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { API_LINK } from '../../global/config';
import './Charts.css';



ChartJS.register(ArcElement, Tooltip, Legend);
export default function Piechart() {
    const [data0,setData0] = useState(0);
    const [data1,setData1] = useState(0);
    const [data2,setData2] = useState(0);
    const [data3,setData3] = useState(0);
 const data = {
  labels: [ 'ON HOLD', 'IN PROGRESS', 'DONE'],
  datasets: [
    {
      label: '# of Missions',
      data: [data1, data2,data3],
      backgroundColor: [
       
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
   
      ],
      borderColor: [
        
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      
      ],
      borderWidth: 1,
    },
  ],
};


  
    useEffect(() => {
        axios
          .get(`${API_LINK}/all-missions`)
          .then((response) => {
            setData0(response.data.data);
            console.log(response.data.data);
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);


      useEffect(() => {
        axios
          .get(`${API_LINK}/onhold-missions`)
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
          .get(`${API_LINK}/inprogress-missions`)
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
          .get(`${API_LINK}/done-missions`)
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
     <div className='Piechart-container'> <Pie data={data} /> </div>
   
    );
  }
