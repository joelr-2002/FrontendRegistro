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

  const [configuracion, setConfiguracion] = useState(
    "Configuración de Periodo"
  );

  const handleTabClick = (pestañaConfi) => {
    setConfiguracion(pestañaConfi);
  };

  const estiloBtn = {
    position: "fixed",
    right: "10%",
    margin: "20px", // Ajusta el margen según tus preferencias
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
        <h2 className="titulos">Administrador</h2>
        <div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                className={`nav-link ${
                  configuracion === "Configuración de Periodo" ? "active" : ""
                }`}
                onClick={() => handleTabClick("Configuración de Periodo")}
              >
                Configuración de Periodo
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  configuracion === "Configuración de Admisiones"
                    ? "active"
                    : ""
                }`}
                onClick={() => handleTabClick("Configuración de Admisiones")}
              >
                Configuración de Admisiones
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className={`tab-pane ${
                configuracion === "Configuración de Periodo" ? "active" : ""
              }`}
              id="periodo"
            >
              <Row className="mb-12">
                <OpcionesPeriodo opcion="Semestral" />
              </Row>
              <Row className="mb-12">
                <OpcionesPeriodo opcion="Trimestral" />
              </Row>

              <div style={estiloBtn}>
              <Link to="/administrador/nuevo-periodo">
                <button>Crear un Nuevo Periodo</button>
              </Link>
            </div>
            </div>
            
            <div
              className={`tab-pane ${
                configuracion === "Configuración de Admisiones" ? "active" : ""
              }`}
              id="admisiones"
            >
              Matricula
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmPeriodo;
