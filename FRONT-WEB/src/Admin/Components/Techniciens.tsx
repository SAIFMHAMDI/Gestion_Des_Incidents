import { useEffect, useState } from "react";
import "./Techniciens.css";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import Spinner from "react-bootstrap/Spinner";
import { API_LINK } from "../../global/config";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import React from "react";

interface Record {
  id: string;
  nom: string;
  prenom: string;
  code_postal: string;
  telephone: string;
  email: string;
  image : string
}
const PAGE_SIZE = 8;
const Techniciens = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Record[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<Record[]>(data);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [IsLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [currentUpdateId, setCurrentUpdateId] = useState("");
  const [dependencyValue, setDependencyValue] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [code_postal, setcode_postal] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, settelephone] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setloginError] = useState(2);
  const [loginErrorMessage, setloginErrorMessage] = useState("");
 

  const filterData = (value: string) => {
    setSearchValue(value);
    const newData = data.filter((record) => {
      const Name = record.nom.toLowerCase();
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
      .get(`${API_LINK}/ListTechniciens?page=${page}`)
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



  const handleDeleteClick = (id: any) => {
    console.log(id);
    axios
      .delete(`${API_LINK}/technicienDelete/${id}`)
      .then((response)=>{
        setDependencyValue(!dependencyValue)
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateById = (id:any) => {
  

    setIsLoading(true);

    let formData = {
      nom: nom,
      prenom: prenom,
      code_postal: code_postal,
      telephone: telephone,
      password: password,
      email: email,
    };
   
    

    axios
      .post(`${API_LINK}/updateTechnicien/${id}`, formData)
      .then((response) => {
        setDependencyValue(!dependencyValue)
        console.log(formData);

        setloginError(response.data.code);
        setloginErrorMessage(response.data.message);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });

    navigate("/home/techniciens");
    setLoading(true);
  };
    

  return (
    <div>
      <div className="container_tech">

        <div className="search">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => filterData(e.target.value)}
            placeholder="Search by email or name"
          />
        </div>
        <form>
        <table className="table">
          <thead style={{backgroundColor: '#f8f8f8', color: '#333', fontSize: '16px', fontWeight: 'bold', borderRadius:'20px'}}>
            <tr>
              <th>Name</th>
              <th>Family Name</th>
              <th>Postal Code</th>
              <th>Phone</th>
              <th>E-mail</th> 
              
            </tr>
          </thead>
      
          <tbody>
            {data &&
              Array.isArray(data) &&
              data.length > 0 &&
              filteredData.map((Record) => (
                <tr key={Record.id}>
                  <td>{Record.nom}</td>
                  <td>{Record.prenom}</td>
                  <td>{Record.code_postal}</td>
                  <td>{Record.telephone}</td>
                  <td>{Record.email}</td>
                  <td>
                    <Button variant="contained" onClick={()=>{handleOpen();setCurrentUpdateId(Record.id)}}>
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
            <Col className="UpdateTechnicien" sm={6}>
              <button className="close-button" onClick={handleClose}>x</button >
              <form  onSubmit={updateById} >
                <span className="Inscription_subtitle">Update Technician</span>
                <input
                  required
                  type="text"
                  className="Inscription-input"
                  placeholder="Nom"
                  value={nom}
                  onChange={(e) => setnom(e.target.value)}
                />

                <div className="spacer-20"></div> 

                <input
                  required
                  type="text"
                  className="Inscription-input"
                  placeholder="Prenom"
                  value={prenom}
                  onChange={(e) => setprenom(e.target.value)}
                />

                <div className="spacer-20"></div>
                <input
                  required
                  type="text"
                  className="Inscription-input"
                  placeholder="Code Postal"
                  value={code_postal}
                  onChange={(e) => setcode_postal(e.target.value)}
                />

                <div className="spacer-20"></div>
                <input
                  required
                  type="text"
                  className="Inscription-input"
                  placeholder="Telephone"
                  value={telephone}
                  onChange={(e) => settelephone(e.target.value)}
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
                  type="password"
                  className="Inscription-input"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              
                {IsLoading ? (
                  <Spinner animation="border" variant="info">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  <button
                    type="submit"
                    className="inscription-btn"
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

export default Techniciens;
