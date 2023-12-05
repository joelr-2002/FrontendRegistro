import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBuildingColumns,
  faScroll,
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
          onClick={props.onCLick}
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

//Se acortará el nombre de Coordinador a Coord para mayor facilidad
const CoordMenu = () => {
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

      <div className="containerP menu-container ">
        <Row className="mb-3">
          <Col>
            <h2 className="titulos">Coordinador</h2>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Link to="/docentes">
              <Button
                className="btn-seccionesNoMargin opciones"
                style={{
                  backgroundColor: "#ebf0f3",
                  border: "none",
                  fontWeight: "700",
                  fontFamily: "Heebo",
                  marginTop: "10px",
                  marginBottom: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                Ingresar como docente
              </Button>
            </Link>
          </Col>
          <Col></Col>
        </Row>
        <Row className="mb-3">
          <OpcionesMenu
            icono={faBuildingColumns}
            opcion="Carga Académica"
            ruta="/coordinador/carga-academica"
          />

          <OpcionesMenu
            icono={faUsers}
            opcion="Estudiantes"
            ruta="/coordinador/estudiantes"
          />
        </Row>
        <Row>
          <OpcionesMenu
            icono={faScroll}
            opcion="Solicitudes"
            ruta="/coordinador/solicitudes"
          />
            <Col></Col>
        </Row>
      </div>
    </>
  );
};

export default CoordMenu;
