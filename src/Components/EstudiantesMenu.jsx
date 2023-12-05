import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faScroll,
  faLandmark,
  faBook,
  faRectangleList,
  faUser,
  faMessage,
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
          <div className="opciones-menu opciones animate__animated">
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
        
        <a href="/estudiantes/chat">
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
          <Row>
            <Col>
          <button style={{ border: 'none', background: 'none', color: '#01587a', fontFamily: 'heebo', fontWeight: '500', textDecoration: 'none' }}>
            <FontAwesomeIcon className='anim' icon={faMessage} size='2xl' />
          </button>
          </Col>
          <Col >
            <h6 style={{ fontFamily: "Heebo", fontWeight: 300, color: '#01587a' }}>Mensajería</h6>
          </Col>
          </Row>
        </div>
        </a>

        <Row className="mb-3">
          <Col>
            <h2 style={{ fontFamily: "Heebo", fontWeight: 700 }}>
              Estudiantes
            </h2>
          </Col>
        </Row>
        <Row className="mb-3">
          <OpcionesMenu
            icono={faUser}
            opcion="Perfil"
            ruta="/estudiantes/perfil"
          />

          <OpcionesMenu
            icono={faBook}
            opcion="Clases"
            ruta="/estudiantes/clases"
          />

          <OpcionesMenu
            icono={faLandmark}
            opcion="Matrícula"
            ruta="/estudiantes/matricula"
          />
        </Row>

        <Row className="mb-3">
          <OpcionesMenu
            icono={faGraduationCap}
            opcion="Notas"
            ruta="/estudiantes/evaluacion-docente"
          />
          <OpcionesMenu
            icono={faScroll}
            opcion="Solicitudes"
            ruta="/estudiantes/solicitudes"
          />
          <OpcionesMenu
            icono={faRectangleList}
            opcion="Certificado Académico"
            ruta="/estudiantes/certificado"
          />
        </Row>
      </div>
    </>
  );
};

export default EstudianteMenu;
