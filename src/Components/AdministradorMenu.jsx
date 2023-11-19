import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faUsers,
  faBuildingColumns,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

import NavbarLoggedInComponent from "./NavbarLoggedComponente";

//Opciones Menú
const OpcionesMenu = (props) => {
  return (
    <>
      <Col>
        <Link to={props.ruta} style={{ textDecoration: "none" }}>
          <div className="opciones-menu opciones" onClick={props.onClick}>
            <FontAwesomeIcon icon={props.icono} size="1.8x" />
            <br></br>
            {props.opcion}
          </div>
        </Link>
      </Col>
    </>
  );
};

//Se acortará el nombre de Administrador a Adm para mayor facilidad
const AdmMenu = () => {
  const [modalShow, setModalShow] = useState(false);

  const handleModalOpen = () => {
    setModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
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

      <div className="containerP menu-container ">
        <Row className="mb-3">
          <Col>
            <h2 className="titulos">Administrador</h2>
          </Col>
        </Row>
        <Row className="mb-3">
          <OpcionesMenu
            icono={faBuildingColumns}
            opcion="Periodo"
            ruta="/administrador/periodo"
          />

          <OpcionesMenu
            icono={faChalkboardUser}
            opcion="Docentes"
            ruta="/administrador/creacion-docente"
          />
        </Row>
        <Row>
          <OpcionesMenu
            icono={faUsers}
            opcion="Aspirantes"
            ruta="/administrador/aspirantes"
          />
          <OpcionesMenu
            icono={faGraduationCap}
            opcion="Estudiantes"
            onClick={handleModalOpen}
          />
        </Row>

        <Modal show={modalShow} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Estudiantes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Contenido del modal */}
            <p>Seleccione una acción</p>
          </Modal.Body>
          <Modal.Footer>
            <Link
              to="/administrador/descargar-estudiantes"
              style={{ textDecoration: "none" }}
            >
              <Button variant="secondary">Descargar CSV de Estudiantes</Button>
            </Link>

            <Link
              to="/administrador/subir-estudiantes"
              style={{ textDecoration: "none" }}
            >
              <Button variant="primary">Subir CSV de Estudiantes</Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default AdmMenu;
