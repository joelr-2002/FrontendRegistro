import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faCalendarTimes,
  faLandmark,
  faBook
} from "@fortawesome/free-solid-svg-icons";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";

//Opciones Menú
const OpcionesMenu = (props) => {
  return (
    <>
      <Col>
        <Link
          to={props.ruta}
          style={{ textDecoration: "none", height: "500px" }}
        >
          <div className="opciones-menu opciones active:animate-[ping_0.5s_ease-in-out_infinite]">
            <Row>
              <Col>
                <FontAwesomeIcon icon={props.icono} size="1.8x" />
              </Col>
            </Row>
            <Row>{props.opcion}</Row>
            <br></br>
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
      <NavbarLoggedInComponent urlLogo="./assets/unah_logo.png" />
      <div className="containerP menu-container ">
        <Row className="mb-3">
          <Col>
            <h2 style={{ fontFamily: "Heebo", fontWeight: 700 }}>
              Estudiantes
            </h2>
          </Col>
        </Row>
        <Row className="mb-3">
          <OpcionesMenu
            icono={faGraduationCap}
            opcion="Notas"
            ruta="/estudiantes/evaluacion-docente"
          />
          <OpcionesMenu
            icono={faCalendarTimes}
            opcion="Cancelaciones"
            ruta="/estudiantes/cancelaciones"
          />
        </Row>
        <Row className="mb-3">
          <OpcionesMenu
            icono={faLandmark}
            opcion="Matrícula"
            ruta="/estudiantes/matricula"
          />

          <OpcionesMenu
            icono={faBook}
            opcion="Clases"
            ruta="/estudiantes/clases"
          />
        </Row>
      </div>
    </>
  );
};

export default EstudianteMenu;
