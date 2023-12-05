import React, { useState, useEffect } from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import apiurl from "../utils/apiurl";
import Cookies from "js-cookie";
import Atras from "./utils/Regresar.jsx";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";

const EstudianteClase = () => {
  const { ID } = useParams();
  const [clase, setClase] = useState([]);
  const [urlVideo, setURLVideo] = useState("");

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
        setURLVideo(data.data[0].VIDEO);
      })
      .catch((error) => console.log(error));
  }, [ID]);

  return (
    <>
      {/* ... (código para estilos) */}
      <NavbarLoggedInComponent urlLogo="./../../assets/unah_logo.png" />
      <div className="containerP menu-container">
        <Atras />
        <Row className="mb-3">
          <Col>
            <h2 style={{ fontFamily: "Heebo", fontWeight: 700 }}>
              {clase.ASIGNATURA} - {clase.SECCION}
            </h2>
          </Col>
        </Row>

        <Row>
          <Col className="centrado" md={4}>
            <div className="foto-circulo">
              {/* Mostrar la foto del docente */}
              <img
                crossOrigin="anonymous"
                src={apiurl + clase.FOTO_EMPLEADO}
                alt="Foto del Empleado"
                className="img-fluid rounded-circle"
              />
            </div>
          </Col>
          <Col md={8}>
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
        <Row>
          {urlVideo && (
            <Card className="mt-4">
              <Card.Title>Video Introductorio</Card.Title>
              <Card.Body>
                <div
                  className="centrado"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <video controls width="400" height="300">
                    <source src={urlVideo} type="video/mp4" />
                  </video>
                </div>
              </Card.Body>
            </Card>
          )}
        </Row>
      </div>
    </>
  );
};

export default EstudianteClase;
