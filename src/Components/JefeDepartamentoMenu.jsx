import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarTimes, faTasks, faCheckToSlot, faHistory, faStar, faSignal, faKey } from "@fortawesome/free-solid-svg-icons";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import Cookies from "js-cookie";
import apiurl from "../utils/apiurl";

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

const JefeDepartamentoMenu = () => {

  const [user, setUser] = useState({});

  useEffect(() => {
    const CargarUsuario = () => {

      //fetch para obtener datos de usuario con numero de empleado (se obtiene de la cookie nEmpleado)
      fetch(apiurl + "/api/v1/docentes/info-inicio-jefe", {
        headers: {
          "x-token": "bearer " + Cookies.get("x-token"),
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data.data[0]);
          console.log(user);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    CargarUsuario();
  }, []);

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
      <div className="containerP menu-container">
        <Row className="mb-3">
          <Col>
            <h2 style={{ fontFamily: "Heebo", fontWeight: 700 }}>
              Jefe de Departamento
            </h2>
            <h5>
              Bienvenido {user.NOMBRE}
            </h5>
            <h5>
              Facultad: {user.FACULTAD}
            </h5>
            <h5>
                Carrera: {user.CARRERA}
            </h5>
            <h5>
                Centro Universitario: {user.CENTRO}
            </h5>
          </Col>
        </Row>
        <Row className="mb-3">
          <OpcionesMenu
            icono={faTasks}
            opcion="Secciones"
            ruta="/jefe-departamento/planificacion-academica-menu"
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

export default JefeDepartamentoMenu;
