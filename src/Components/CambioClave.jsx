import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import NavbarComponente from "./NavbarComponente";
import apiurl from "../utils/apiurl";
import { useSearchParams } from "react-router-dom";

const CambioClave = () => {
  const [contrasenia, setContrasenia] = useState("");
  const [contraseniaVerificacion, setContraseniaVerificacion] = useState("");
  const [contraseniaError, setContraseniaError] = useState(null);
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

 //recibe el token de la url
 useEffect(() => {
  const tokenUrl = searchParams.get("token");
  setToken(tokenUrl);
  console.log(tokenUrl);
}, [searchParams]);

  const validarContrasenia = (contrasenia) => {
    const pattern = /^[a-zA-Z0-9]{8,40}$/;
    return pattern.test(contrasenia);
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    setContraseniaError(false);

    if (!validarContrasenia(contrasenia)) {
        setContraseniaError(true);
        setContraseniaVerificacion("");
        alert("La contraseña debe contener minusculas, mayusculas, un numero y con un minimo de 8 caracteres");
        setIsLoading(false);

    }else if(contrasenia!==contraseniaVerificacion){

        setContraseniaError(true);
        setContraseniaVerificacion("");
        alert("Las contraseñas deben ser las mismas");
        setIsLoading(false);

    }else{
        setContraseniaError(false);
        console.log("bien")
    }
    
    if(contraseniaError===false){
      setIsLoading(true);
        const fetchCambioClave = async () => {
            try{
              const response = await fetch(apiurl + "/api/v1/docentes/restablecer-cuenta/?token=" + token + "&contrasenia=" + contrasenia, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const responseJSON = await response.json();
              console.log(responseJSON);
              if (responseJSON.mensaje === "CONTRASEÑA RESTABLECIDA CORRECTAMENTE") {
                alert("Contraseña cambiada con exito");
                window.location.href = "/";
              } else {
                alert(responseJSON.mensaje);
              }
            }
            catch(error){
              console.log("Error: " + error);
            }
        }
        fetchCambioClave();
    }
    
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
      <NavbarComponente urlLogo="../../assets/unah_logo.png" />
      <div
        className="inscripcion-container text-center"
        style={{ position: "relative" }}
      >
        <h2 style={{ fontFamily: "Heebo", fontWeight: 700 }}>
          Cambio de Clave
        </h2>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="forPrimerNombre">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su nueva contraseña"
                  value={contrasenia}
                  onChange={(e) => setContrasenia(e.target.value)}
                  isInvalid={contraseniaError===true}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formPrimerApellido">
                <Form.Label>Verificación de Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Verifique su contraseña"
                  value={contraseniaVerificacion}
                  onChange={(e) => setContraseniaVerificacion(e.target.value)}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <br></br>
          <Button
            className="btn-seccionesNoMargin"
            type="submit"
            onClick={handleSubmit}
            Disabled={isLoading}
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Cambiar Clave'}
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CambioClave;
