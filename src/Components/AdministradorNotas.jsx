import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComponente from "./NavbarComponente";

const AdministradorNotas = () => {
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
      <NavbarComponente />
      <div className="containerP">
        <Row className="mb-3">
          <Col>
            <h2 className="titulos">Notas</h2>
          </Col>
        </Row>
        <div>Habilitar subida de notas para los docentes</div>
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

export default AdministradorNotas;
