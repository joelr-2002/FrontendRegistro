import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarLoggedInComponent from './NavbarLoggedComponente';

const AdministradorMatricula = () => {
  const [habilitadoNotas, setHabilitadoNotas] = useState(false);
  //La variable hanilitadoNotas indicará si está habilitado o no la subida de notas para los docentes
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
      <NavbarLoggedInComponent urlLogo="../../assets/unah_logo.png"> </NavbarLoggedInComponent>
      <div className="containerP">
        <Row className="mb-3">
          <Col>
            <h2 className="titulos">Matricula</h2>
          </Col>
        </Row>
        <div>Habilitar matricula</div>
        <Button
          className="btn-habilitar"
          value={true}
          onClick={(e) => setHabilitadoNotas(e.target.value)}
        >
          Habilitar
        </Button>
        <Button
          className="btn-deshabilitar"
          value={false}
          onClick={(e) => setHabilitadoNotas(e.target.value)}
        >
          Deshabilitar
        </Button>
      </div>
    </>
  );
};

export default AdministradorMatricula;
