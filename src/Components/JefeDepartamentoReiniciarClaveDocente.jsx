import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import apiurl from "../utils/apiurl";
import { useSearchParams } from "react-router-dom";
import Regresar from "./utils/Regresar";
import Cookies from "js-cookie";

const CambioClave = () => {
  const [dni, setDni] = useState("");
  const [docenteInfo, setDocenteInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const [lastRequestTime, setLastRequestTime] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verificar si ya se ha enviado una solicitud en el último minuto
    if (lastRequestTime && Date.now() - lastRequestTime < 12000) {
      alert("Espere 2 minutos antes de enviar otra solicitud, le restan " + (120 - (Date.now() - lastRequestTime) / 1000) + " segundos");
      return;
    }
  
    console.log("Enviar formulario");
    console.log("DNI:", dni);
    setIsLoading(true);
  
    const fetchCambioClave = async () => {
      try {
        const response = await fetch(apiurl + "/api/v1/docentes/restablecer-clave?DNI=" + dni, {
          method: "POST",
          headers: {
            "x-token": "bearer " + Cookies.get("x-token"),
          },
        });
        const responseJSON = await response.json();
        console.log(responseJSON);
        if (responseJSON.mensaje === "Encontrado con exito") {
          alert("Se ha enviado un enlace al docente");
          setDocenteInfo(responseJSON.data);
          setIsLoading(false);
          setLastRequestTime(Date.now()); // Actualizar el tiempo de la última solicitud exitosa
        } else {
          alert(responseJSON.message);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    };
    fetchCambioClave();
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
      <NavbarLoggedInComponent urlLogo="../../assets/unah_logo.png" />
      <div
        className="inscripcion-container text-center"
        style={{ position: "relative" }}
      >
        <Regresar />
        <h2 style={{ fontFamily: "Heebo", fontWeight: 700 }}>
          Reiniciar Clave Docente
        </h2>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="forDni">
                <Form.Label>DNI</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el DNI del docente a cambiar la clave"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                />

                {docenteInfo[0]?.NOMBRE && (
                  
                  <div style={{ marginTop : '25px'}}>

                    <p>CORREO ENVIADO:</p>
                    <p>Nombre: {docenteInfo[0].NOMBRE}</p>
                    <p>Correo: {docenteInfo[0].CORREO}</p>
                  </div>
                )}

              </Form.Group>
            </Col>
          </Row>
          <br></br>
          <Button
            className="btn-seccionesNoMargin"
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Reiniciar Clave'}
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CambioClave;
