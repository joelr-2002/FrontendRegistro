import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import "../Styles/index.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OpcionesPeriodo = (props) => {
  return (
    <>
      <Col>
        <div className="opciones-menu opciones">{props.opcion}</div>
      </Col>
    </>
  );
};

//Se acortará el nombre de Administrador a Adm para mayor facilidad

const AdmPeriodo = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos a la API
    // y manejar la respuesta (por ejemplo, mostrar un mensaje de éxito)
  };


  const estiloBtn = {
    position: "fixed",
    right: "10%",
    color: "white"
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
      <NavbarLoggedInComponent urlLogo="../../assets/unah_logo.png">
        {" "}
      </NavbarLoggedInComponent>
      <div className="containerP text-center">
        <h2 className="titulos">Configuración de Periodos</h2>
        <div>
        <Row className="mb-12">
                <Link to="/administrador/actualizar-periodo" style={{ textDecoration: "none" }}>
                  <OpcionesPeriodo opcion="Semestral" />
                </Link>
              </Row>
              <Row className="mb-12">
                <Link to="/administrador/actualizar-periodo" style={{ textDecoration: "none" }}>
                  <OpcionesPeriodo opcion="Trimestral" />
                </Link>
              </Row>

              <div >
                <Link to="/administrador/nuevo-periodo">
                  <Button type="button" className="btnE1" style={estiloBtn}>Crear un Nuevo Periodo
                  </Button>
                </Link>
              </div>
        </div>
      </div>
    </>
  );
};

export default AdmPeriodo;
