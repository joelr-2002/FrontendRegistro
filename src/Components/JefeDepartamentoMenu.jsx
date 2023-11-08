import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarTimes, faTasks, faCheckToSlot, faHistory, faStar, faSignal, faKey } from "@fortawesome/free-solid-svg-icons";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";

//Opciones Menú
const OpcionesMenu = (props) => {
  return (
    <>
    <Col>
      <Link to={props.ruta} style={{ textDecoration: "none" }}>
        <div className="opciones-menu opciones">
          <FontAwesomeIcon icon={props.icono} size="1.8x" />
          <br></br>
          {props.opcion}
        </div>
      </Link>
    </Col>
  </>
  );
};

const EstudianteMenu = () => {
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
    <NavbarLoggedInComponent
        urlLogo= "./assets/unah_logo.png"
    />
      <div className="containerP menu-container ">
        <Row className="mb-3">
          <Col>
            <h2 style={{ fontFamily: "Heebo", fontWeight: 700 }}>
              Jefe de Departamento
            </h2>
            <h2>
                Facultad: --placeholder--
            </h2>
          </Col>
        </Row>
        <Row className="mb-3">
          <OpcionesMenu
            icono={faTasks}
            opcion="Planificación académica"
            ruta="/estudiantes/evaluacion-docente"
          />
          <OpcionesMenu
            icono={faCheckToSlot}
            opcion="Evaluación Docente"
            ruta="/estudiantes/cancelaciones"
          />
          <OpcionesMenu
            icono={faHistory}
            opcion="Historial Estudiantil"
            ruta="/estudiantes/cancelaciones"
          />
        </Row>
        <Row className="mb-3">
          <OpcionesMenu
            icono={faStar}
            opcion="Calficaciones por docente"
            ruta="/estudiantes/evaluacion-docente"
          />
          <OpcionesMenu
            icono={faSignal}
            opcion="Estadísticas"
            ruta="/estudiantes/cancelaciones"
          />
          <OpcionesMenu
            icono={faKey}
            opcion="Reiniciar Clave Docente"
            ruta="/estudiantes/cancelaciones"
          />
        </Row>
      </div>
    </>
  );
};

export default EstudianteMenu;
