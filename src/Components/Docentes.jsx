import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faCalendarTimes,
} from "@fortawesome/free-solid-svg-icons";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import Cookies from "js-cookie";
import apiurl from "../utils/apiurl";


const DocentesClases = () => {
  //fetch para obtener las clases del docente
  const [clases, setClases] = useState([]);
  const [docenteData, setDocenteData] = useState([]);
  const [idDocente, setIdDocente] = useState("");
  const [idSeccion, setIdSeccion] = useState("");
  
 useEffect (() => {
    fetch(apiurl + `/api/v1/docentes/secciones`, {
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setClases(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al obtener las clases del docente:", error);
      });
  },[]);

  

  const handleClaseSeleccionada = (e) => {
    setIdSeccion(e.target.value);
  };

  useEffect(() => {
    Cookies.set("idSeccion", idSeccion);
  }, [idSeccion]);

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
        <Row className="mb-3">
          <Col>
            <h2 style={{ fontFamily: "Heebo", fontWeight: 700 }}>Clases</h2>
          </Col>
        </Row>

        <Row>
          
          {clases!=="" && clases.map((clase) => (
            <Col key={clase.id} xs={12} sm={6} md={4} lg={3}>
              <Link
                to={"/docente/clase/" + clase.ID_SECCION}
                style={{ textDecoration: "none", height: "500px" }}
              >
                <Card className="mb-3">
                  <Card.Header className="titulo-card">
                    <Card.Title
                      style={{
                        height: "80px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {clase.NOMBRE_ASIGNATURA}
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{clase.NOMBRE_SECCION}</Card.Text>
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

export default DocentesClases;
