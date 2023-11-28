import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarTimes,
  faTasks,
  faCheckToSlot,
  faHistory,
  faStar,
  faSignal,
  faKey,
  faNoteSticky,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import Cookies from "js-cookie";
import apiurl from "../utils/apiurl";

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

const JefeDepartamentoMenu = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const CargarUsuario = () => {
      //fetch para obtener datos de usuario con numero de empleado (se obtiene de la cookie nEmpleado)
      fetch(apiurl + "/api/v1/docentes/info-inicio-jefe", {
        headers: {
          "x-token": "bearer " + Cookies.get("x-token"),
        },
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
      <NavbarLoggedInComponent urlLogo="../../assets/unah_logo.png" />
      <div className="containerP menu-container">
        <Row className="mb-3">
          <Col>
            <h2 style={{ fontFamily: "Heebo", fontWeight: 700 }}>
              Jefe de Departamento
            </h2>
            <h5>Bienvenido {user.NOMBRE}</h5>
            <h5>Facultad: {user.FACULTAD}</h5>
            <h5>Carrera: {user.CARRERA}</h5>
            <h5>Centro Universitario: {user.CENTRO}</h5>
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
            icono={faTasks}
            opcion="Secciones"
            ruta="/jefe-departamento/planificacion-academica-menu"
          />
          <OpcionesMenu
            icono={faCheckToSlot}
            opcion="Evaluación Docente"
            ruta="/jefe-departamento/evaluacion-docente"
          />
          <OpcionesMenu
            icono={faHistory}
            opcion="Historial Estudiantil"
            ruta="/jefe-departamento/historial-academico"
          />
        </Row>
        <Row className="mb-3">
          <OpcionesMenu
            icono={faNoteSticky}
            opcion="Calficaciones por docente"
            ruta="/jefe-departamento/calificaciones-docente"
          />
          <OpcionesMenu
            icono={faChartSimple}
            opcion="Estadísticas"
            ruta="/jefe-departamento/estadistica"
          />
          <OpcionesMenu
            icono={faKey}
            opcion="Reiniciar Clave Docente"
            ruta="/jefe-departamento/restablecer-clave-docente"
          />
        </Row>
       
      </div>
    </>
  );
};

export default JefeDepartamentoMenu;
