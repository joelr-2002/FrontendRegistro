import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faRulerHorizontal } from "@fortawesome/free-solid-svg-icons";
import { faFileCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import NavbarLoggedInComponent from './NavbarLoggedComponente';



//Opciones Menú
const OpcionesMenu = (props) => {
  return (
    <>
      <Col>
        <Link to={props.ruta} style={{ textDecoration: "none" }}>
          <div className="opciones-menu opciones">
            <FontAwesomeIcon icon={props.icono} size="1.8x" /> 
            <br></br>{props.opcion}
          </div>
        </Link>
      </Col>
    </>
  );
};

//Se acortará el nombre de Administrador a Adm para mayor facilidad
const AdmMenu = () => {
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

      <div className="containerP menu-container ">
        <Row className="mb-3">
          <Col>
            <h2 className="titulos">
              Administrador
            </h2>
          </Col>
        </Row>
        <Row className="mb-3">
          <OpcionesMenu
            icono={faFileCircleCheck}
            opcion="Notas"
            ruta="/administrador/habilitar-notas"
          />
          <OpcionesMenu
            icono={faChalkboardUser}
            opcion="Docentes"
            ruta="/administrador/creacion-docente"
          />
          <OpcionesMenu
            icono={faUsers}
            opcion="Aspirantes"
            ruta="/formulario-aspirantes"
          />
        </Row>
        <Row className="mb-3">
          <OpcionesMenu
            icono={faRulerHorizontal}
            opcion="Planificación Académica"
            ruta="/administrador/habilitar-notas"
          />
          <OpcionesMenu
            icono={faFileCircleExclamation}
            opcion="Cancelaciones Excepcionales"
            ruta="/administrador/creacion-docente"
          />
          <OpcionesMenu
            icono={faBuildingColumns}
            opcion="Matrícula"
            ruta="/formulario-aspirantes"
          />
        </Row>
      </div>
    </>
  );
};

export default AdmMenu;
