import React, { useState, useEffect } from "react";
import NavbarLoggedComponente from "./NavbarLoggedComponente";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Card,
  Carousel,
} from "react-bootstrap";
import "../Styles/index.css";
import { Link } from "react-router-dom";
import apiurl from "../utils/apiurl";
import Cookies from "js-cookie";
import Atras from "./utils/Regresar.jsx";

const EstudiantePerfil = () => {
  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [nCuenta, setNCuenta] = useState("");
  const [centro, setCentro] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fotos, setFotos] = useState([
    { URL: "#" },
    { URL: "#" },
    { URL: "#" },
  ]);

  useEffect(() => {
    fetch(apiurl + "/api/v1/estudiante/perfil", {
      method: "GET",
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNombre(data.perfil[0].NOMBRE_ALUMNO);
        setCarrera(data.perfil[0].CARRERA);
        setNCuenta(data.perfil[0].N_CUENTA);
        setCentro(data.perfil[0].CENTRO);
        setDescripcion(data.perfil[0].DESCRIPCION);

        setFotos(data.fotos);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <style>
        {`
              body {
                background-size: cover;
                background-image: linear-gradient(#99d8dd, #5cb3c1) !important;
                background-repeat: no-repeat;
                background-color: #5cb3c1 !important;
              }
            `}
      </style>
      <NavbarLoggedComponente urlLogo="../../assets/unah_logo.png"></NavbarLoggedComponente>
      <Container className="containerP">
        <Atras />
        <Row className="mb-3">
          <Col>
            <h2
              style={{
                fontFamily: "Heebo",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Perfil{" "}
            </h2>
          </Col>
        </Row>

        <Row>
          <Col className="centrado" md={4}>
            {fotos.length > 1 ? (
              <div className="carousel-container">
                <Carousel interval={null} nextIcon={null} prevIcon={null}>
                  {fotos.map((foto, index) => (
                    <Carousel.Item key={index}>
                      <div className="foto-circulo">
                      <img
                        crossOrigin="anonymous"
                        className="img-fluid rounded-circle"
                        src={apiurl + foto.URL}
                        alt={`Foto ${index + 1}`}
                      />

                      </div>
                      
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            ) : (
              <div className="foto-circulo">
                <img
                  crossOrigin="anonymous"
                  alt="Foto"
                  className="img-fluid rounded-circle"
                  src={apiurl + fotos[0].URL}
                />
              </div>
            )}
          </Col>
          <Col md={8}>
            <Card>
              <Card.Body>
                <div className="perfil">
                  <p>
                    <strong>NOMBRE:</strong> {nombre}
                  </p>
                  <p>
                    <strong>NÚMERO DE CUENTA:</strong> {nCuenta}
                  </p>
                  <p>
                    <strong>CENTRO:</strong> {centro}
                  </p>
                  <p>
                    <strong>CARRERA:</strong> {carrera}
                  </p>

                  <p>
                    <strong>DESCRIPCIÓN:</strong> {descripcion}
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br></br>
        <Row className="justify-content-center">
          <Col md={1}>
            <Link
              to="./../editar-perfil"
              style={{ textDecoration: "none", justifyContent: "center" }}
            >
              <Button className="btn-seccionesNoMargin">Editar</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EstudiantePerfil;
