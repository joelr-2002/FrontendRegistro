import React, { useState, useEffect } from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import apiurl from "../utils/apiurl";
import Cookies from "js-cookie";
import Atras from "./utils/Regresar.jsx";
import { useParams } from "react-router-dom";

const EstudianteClase = () => {
  const { ID } = useParams();
  const [clase, setClase] = useState([]);


  useEffect(() => {
    fetch(apiurl + "/api/v1/docentes/perfil-docente/?seccion=" + ID, {
      method: "GET",
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setClase(data.data[0]);
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
      <NavbarLoggedInComponent urlLogo="./../../assets/unah_logo.png" />
      <div className="containerP menu-container ">
        <Atras />
        <Row className="mb-3">
          <Col>
            <h2 style={{ fontFamily: "Heebo", fontWeight: 700 }}>{clase.ASIGNATURA} - {clase.SECCION}</h2>
          </Col>
        </Row>

        <Row>
        <Col className="centrado" md={4}>
            <div className="foto-circulo">
              <img
                src={apiurl + clase.FOTO_EMPLEADO}
                alt="Foto del Docente"
                className="img-fluid rounded-circle"
                crossOrigin="anonymous"
              />
            </div>
          </Col>
          <Col  md={8}>
            <Card>
              <Card.Body>
                <Card.Title>Información del Docente</Card.Title>
                <div className="docente-info">
                  <p>
                    <strong>CORREO ELECTRÓNICO:</strong>{" "}
                    {clase.CORREOELECTRONICO}
                  </p>
                  <p>
                    <strong>DEPARTAMENTO:</strong> {clase.DEPARTAMENTO}
                  </p>
                  <p>
                    <strong>NOMBRE DEL DOCENTE:</strong> {clase.NOMBRE_DOCENTE}
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          
        </Row>
      </div>
    </>
  );
};

export default EstudianteClase;
