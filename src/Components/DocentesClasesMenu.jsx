import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher, faCalendarTimes } from "@fortawesome/free-solid-svg-icons";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import apiurl from "../utils/apiurl";
import Cookies from "js-cookie";

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

const regresar = () => {
  window.history.back();
}

const DocentesMenu = () => {

    //fetch para obtener las clases del docente
    const [clases, setClases] = useState([]);
    const [docenteData, setDocenteData] = useState([]);
    const [idDocente, setIdDocente] = useState("");
    const [idSeccion, setIdSeccion] = useState("");
    
    useEffect(() => {
        fetch(apiurl + `/api/v1/docentes/secciones`, {
          headers: {
            "x-token": "bearer " + Cookies.get("x-token"),
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setClases(data.data);
          })
          .catch((error) => {
            console.error("Error al obtener las clases del docente:", error);
          });
      }, []);

  const handleClaseSeleccionada = (e) => {
    setIdSeccion(e.target.value);
  };

  useEffect(() => {
    Cookies.set("idSeccion", idSeccion);
  }, [idSeccion]);

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
      <div className="containerP menu-container ">
        <Row className="mb-3">
          <Col>
            <h2 style={{ fontFamily: "Heebo", fontWeight: 700 }}>
              Clases
            </h2>
            <select name="selectClase" id="selectClase" onChange={handleClaseSeleccionada}>
              <option value="0">Seleccione una clase</option>
              {clases.map((clase) => {
                return (
                  <option value={clase.ID_SECCION}>
                    {clase.NOMBRE_SECCION} {clase.NOMBRE_ASIGNATURA}
                  </option>
                );
              })}
            </select>
          </Col>
        </Row>
        <Row className="mb-3">
          <OpcionesMenu
            icono={faChalkboardTeacher}
            opcion="Ingresar Notas"
            ruta="/docentes/notas"
          />
        </Row>
        <div
            style={
              {
                marginTop: "-25px",
              }
            } 
            className="d-flex justify-content-center col-12 col-md-12">
            <button className="btn btn-outline-danger mt-4" onClick={regresar}>
                Atrás
              </button>
            </div>
      </div>
    </>
  );
};

export default DocentesMenu;
