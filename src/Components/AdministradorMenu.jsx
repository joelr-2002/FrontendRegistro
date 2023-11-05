import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import NavbarComponente from './NavbarComponente';

//Opciones Menú
const OpcionesMenu = (props) => {
  return (
    <>
      <Col>
        <Link to={props.ruta} style={{ textDecoration: "none" }}>
          <div className="opciones-menu opciones">
            <FontAwesomeIcon icon={props.icono} size="1x" /> {props.opcion}
          </div>
        </Link>
      </Col>
    </>
  );
};

const AdministradorMenu = () => {
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
            icono={faArrowLeft}
            opcion="Habilitar Notas"
            ruta="/administrador/habilitar-notas"
          />
          <OpcionesMenu
            icono={faArrowLeft}
            opcion="Docentes"
            ruta="/administrador/creacion-docente"
          />
          <OpcionesMenu
            icono={faArrowLeft}
            opcion="Lista"
            ruta="/formulario-aspirantes"
          />
        </Row>
        <Row className="mb-3">
          <OpcionesMenu
            icono={faArrowLeft}
            opcion="Habilitar Notas"
            ruta="/administrador/habilitar-notas"
          />
          <OpcionesMenu
            icono={faArrowLeft}
            opcion="Docentes"
            ruta="/administrador/creacion-docente"
          />
          <OpcionesMenu
            icono={faArrowLeft}
            opcion="Lista"
            ruta="/formulario-aspirantes"
          />
        </Row>
      </div>
    </>
  );
};

export default AdministradorMenu;
