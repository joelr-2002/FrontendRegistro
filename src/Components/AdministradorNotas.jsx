import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarLoggedInComponent from './NavbarLoggedComponente';

//Avisa si las notas están habilitadas o deshabilitadas
const EstadoN = (props) => {
  let estado;
   
  if(props.estado ? estado="Habilitadas" : estado="Inhabilitadas")
  console.log(estado)
  return (
    <div>
      <br></br>
      Las subida de notas estan {estado}
    </div>
   
    );
};

//Se acortará el nombre de Administrador a Adm para mayor facilidad

const AdmNotas = () => {
  const [habilitadoNotas, setHabilitadoNotas] = useState(false);
  //La variable hanilitadoNotas indicará si está habilitado o no la subida de notas para los docentes
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
      <div className="containerP">
        <Row className="mb-3">
          <Col>
            <h2 className="titulos">Notas</h2>
          </Col>
        </Row>
        <div>Habilitar que los docentes puedan subir notas</div>
          <div><EstadoN estado={habilitadoNotas}/></div>
        <Button
          className="btn-seccionesNoMargin"
          value={true}
          onClick={(e1) => setHabilitadoNotas(e1.target.value)}
        >
          Habilitar
        </Button>
        <Button
          className="btn-seccionesNoMargin"
          value={false}
          onClick={(e2) => setHabilitadoNotas(e2.target.value)}
        >
          Deshabilitar
        </Button>
      </div>
    </>
  );
};

export default AdmNotas;
