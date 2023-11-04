import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

//Opciones Menú
const OpcionesMenu = (props) => {

 

  return (
    <>
      <Col>
        <Link to="/formulario-aspirantes" style={{textDecoration: 'none'}}>
          <div className="opciones-menu">
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
                        background-color: #99d8dd;
                    }
                    .login-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        
                        
                    }
                `}
      </style>

      <div className="menu-container">
        <div className="login-content">
          <Row className="mb-3">
            <Col>
              <h2 style={{ fontFamily: "Heebo", fontWeight: 700 }}>
                Administrador
              </h2>
            </Col>
          </Row>
          <Row className="mb-3">
            <OpcionesMenu
              icono={faArrowLeft}
              opcion="Lista"
              ruta="/formulario-aspirantes"
            />
            <OpcionesMenu
              icono={faArrowLeft}
              opcion="Lista"
              ruta="/formulario-aspirantes"
            />
            <OpcionesMenu
              icono={faArrowLeft}
              opcion="Lista"
              ruta="/formulario-aspirantes"
            />
          </Row>
        </div>
      </div>
    </>
  );
};

export default AdministradorMenu;
