import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './Charts.css';
import { API_LINK } from '../../global/config';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Piechart from './Piechart';
import { Col, Row } from 'react-bootstrap';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
  
);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        generateLabels: function(chart ) {
          const data = chart.data;
          if (data.labels.length && data.datasets.length) {
            return data.labels.map(function(label , index ) {
              const dataset = data.datasets[0];
              const backgroundColor = dataset.backgroundColor[index];
              return {
                text: label,
                fillStyle: backgroundColor,
                strokeStyle: backgroundColor,
                lineWidth: 1,
                hidden: false,
                index: index
              };
            });
          }
          return [];
        }
      }
    },
   
  },
};




const labels = ['ALL','ON HOLD','IN PROGRESS','DONE'];
const colors = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)'];

export default function MyChart() {
  const [data,setData] = useState(0);
  const [data1,setData1] = useState(0);
  const [data2,setData2] = useState(0);
  const [data3,setData3] = useState(0);
  useEffect(() => {
    axios
      .get(`${API_LINK}/all-missions`)
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

  
  const DataSet = {
    labels,
    
    datasets: [
      {
        
        data: [data, data1, data2, data3],
        backgroundColor: colors,
      },
    ],
  };
  
  return (
  
   <Row>
    
    <div className='chart-container'>
       <Bar options={options} data={DataSet} />
    </div>
    
    <div><Piechart /> </div>
    
   
     </Row>
  
  );

} 