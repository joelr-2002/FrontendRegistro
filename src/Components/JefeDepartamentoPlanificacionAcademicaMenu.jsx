import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faCalendarTimes, faSection, faListAlt, faCheckToSlot } from "@fortawesome/free-solid-svg-icons";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import Regresar from "./utils/Regresar";

const regresar = () => {
  window.history.back();
}

//Opciones Menú
const OpcionesMenu = (props) => {
  return (
    <>
    <Col>
      <Link to={props.ruta} style={{ textDecoration: "none", height: "500px" }}>
        <div className="opciones-menu opciones ">
          <Row>
            <Col>
            <FontAwesomeIcon icon={props.icono} size="1.8x" />
            </Col>
          </Row>
          <Row>
          {props.opcion}
          </Row>
          <br></br>
        </div>
      </Link>
    </Col>
  </>
  );
};

const JefeDepartamentoPlanificacionAcademica = () => {
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
        urlLogo= "../../assets/unah_logo.png"
    />
      <div className="containerP menu-container ">
        <Regresar/>
        <Row className="mb-3">
          <Col>
            <h2 style={{ fontFamily: "Heebo", fontWeight: 700 }}>
              Planificación Académica
            </h2>
          </Col>
        </Row>
        <Row className="mb-3">
          <OpcionesMenu
            icono={faCheckToSlot}
            opcion="Crear Secciones"
            ruta="/jefe-departamento/crear-seccion"
          />
          <OpcionesMenu
            icono={faListAlt}
            opcion="Ver Secciones"
            ruta="/jefe-departamento/secciones"
          />
        </Row>
        <button className="btn btn-danger btn-w" onClick={regresar}>
          Regresar
        </button>
      </div>
    </>
  );
};

export default JefeDepartamentoPlanificacionAcademica;
