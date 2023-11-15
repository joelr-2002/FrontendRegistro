import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher, faCalendarTimes } from "@fortawesome/free-solid-svg-icons";
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

const DocentesMenu = () => {
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
              Docentes
            </h2>
          </Col>
        </Row>
        <Row className="mb-3">
          <OpcionesMenu
            icono={faChalkboardTeacher}
            opcion="Ingresar Notas"
            ruta="/docentes/notas"
          />
          <OpcionesMenu
            icono={faCalendarTimes}
            opcion="Clases"
            //ruta="/docentes/cancelaciones"
          />
        </Row>
      </div>
    </>
  );
};

export default DocentesMenu;
