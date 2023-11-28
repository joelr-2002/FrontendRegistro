import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  
} from "react-bootstrap";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import apiurl from "../utils/apiurl";
import Cookies from "js-cookie";
import Atras from "./utils/Regresar.jsx";
import { Link } from "react-router-dom";

const EstudianteClases = () => {
  const [clases, setClases] = useState([]);

  
  useEffect(() => {
    fetch(apiurl + "/api/v1/estudiante/matricula", {
      method: "GET",
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setClases(data.clases)
        console.log(data)
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <style>
        {`
          body {
              background-color: #5cb3c1 !important;
          }
          .login-container {
              display: flex;
              justify-content: center;
              align-items: center;
          }
        `}
      </style>
      <NavbarLoggedInComponent urlLogo="./../assets/unah_logo.png" />
      <div className="containerP menu-container ">
        <Atras />
        <Row className="mb-3">
          <Col>
            <h2 style={{ fontFamily: "Heebo", fontWeight: 700 }}>Clases</h2>
          </Col>
        </Row>

        <Row>
          {clases.map((clase) => (
            <Col key={clase.id} xs={12} sm={6} md={4} lg={3}>
              <Link to={"/estudiantes/clase/"+clase.ID} style={{ textDecoration: "none", height: "500px" }}>
              <Card className="mb-3">
                <Card.Header className="titulo-card">
                <Card.Title >{clase.ASIGNATURA}</Card.Title>
                <Card.Title >{clase.SECCION}</Card.Title>
                </Card.Header>
                
                <Card.Body>
                  <Card.Text>{clase.DOCENTE}</Card.Text>
                  
                </Card.Body>
              </Card>
              
              </Link>
              
            </Col>
          ))}
          
        </Row>
      </div>
    </>
  );
};

export default EstudianteClases;
