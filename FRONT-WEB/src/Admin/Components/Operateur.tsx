import { useReducer, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Techniciens.css";
import axios from "axios";
import { API_LINK } from "../../global/config";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Modal from '@mui/material/Modal';

import { ToastContainer,toast } from 'react-toastify';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface Record {
  id: string;
  Name: string;
  email: string;
  telephone: string;
}

const PAGE_SIZE = 8;

const Operateur = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Record[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<Record[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentUpdateId, setCurrentUpdateId] = useState("");
  const [dependencyValue, setDependencyValue] = useState(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [IsLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<number>(2);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filterData = (value: string) => {
    setSearchValue(value);
    const newData = data.filter((record) => {
      const Name = record.Name.toLowerCase();
      const email = record.email.toLowerCase();
      const telephone = record.telephone.toLowerCase();
      const search = value.toLowerCase();
      return (
        Name.includes(search) ||
        email.includes(search) ||
        telephone.includes(search)
      );
    });
    setFilteredData(newData);
    setTotalPages(Math.ceil(newData.length / PAGE_SIZE));
    setPage(1);
  };

  useEffect(() => {
    axios
      .get(`${API_LINK}/ListOperateur?page=${page}`)
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dependencyValue]);

  useEffect(() => {
    setFilteredData(data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE));
    setTotalPages(Math.ceil(data.length / PAGE_SIZE));
  }, [data, page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    
    setPage(value);
  };

 
  const handleDeleteClick = (id:any) => {
    axios
      .delete(`${API_LINK}/operateurDelete/${id}`)
      .then((response) => {
        setDependencyValue(!dependencyValue);
        console.log(response);
      })
      
      .catch((error) => {
        console.log(error);
      });
 
  };
  
  const updateById = (id:any) => {

    setLoading(true);

    const formData = {
      Name: name,
      email: email,
      telephone: telephone,
      password: password,
    };

    axios
      .post(`${API_LINK}/updateOperateur/${id}`, formData)
      
      .then((response) => {
        setDependencyValue(!dependencyValue)
        console.log(response);
        console.log(formData);

        setLoginError(response.data.code);
        console.log(response.data.code);
        setLoginErrorMessage(response.data.message);

        setLoading(false);
     
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    }
  return (
    <div>
    <div className="container-operateur">
      <div className="search-operateur">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => filterData(e.target.value)}
          placeholder="Search by email or name"
        />
      </div>
      <form>
      <table className="table">
        <thead style={{backgroundColor: '#f8f8f8', color: '#333', fontSize: '16px', fontWeight: 'bold'}}>
          <tr>
            <th>Name</th>
            <th>E-mail</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
        {data &&
              Array.isArray(data) &&
              data.length > 0 &&
              filteredData.map((Record) =>  (
              <tr key={Record.id}>
                <td>{Record.Name}</td>
                <td>{Record.email}</td>
                <td>{Record.telephone}</td>
                <td>
                  <Button
                    variant="contained"
                    onClick={()=>{handleOpen();setCurrentUpdateId(Record.id)}}
                   
                  >
                  &nbsp;   &nbsp; Edit &nbsp;&nbsp;
                  </Button>
                </td>
                <td>
                <Button
                      variant="outlined"
                      onClick={() => handleDeleteClick(Record.id)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      </form>
       <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
    
    </div>
    <div>
      
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
       
        <Row>
      <Col className="Update-operateur" sm={6}>
      <button className="close-button" onClick={handleClose}>x</button >
        <form onSubmit={updateById} >

          <span className="Inscription_subtitle">Update Operator</span>
          <input
            required
            type="text"
            className="Inscription-input"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="spacer-20"></div>
          <input
            required
            type="email"
            className="Inscription-input"
            placeholder="Email adress"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="spacer-20"></div>
          <input
            required
            type="text"
            className="Inscription-input"
            placeholder="Telephone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />

          <div className="spacer-20"></div>

          <input
            required
            type="password"
            className="Inscription-input"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="spacer-20"></div>

          {Loading ? (
            <Spinner animation="border" variant="info">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <button type="submit" className="inscription-btn"
            onClick={()=> {
              updateById(currentUpdateId);
            handleClose()
            }}
            >
              Update
            </button>
          )}
        </form>
      </Col>
      <ToastContainer />
    </Row>
     
      </Modal>
    </div>
</div>
  );
};

export default Operateur;
