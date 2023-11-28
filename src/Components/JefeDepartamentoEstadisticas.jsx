import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  
} from "react-bootstrap";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import apiurl from "../utils/apiurl";
import Cookies from "js-cookie";
import Atras from "./utils/Regresar.jsx";
import { useParams } from 'react-router-dom';
import LineChart from "./utils/LineChartDocentesEvaluacion.jsx";
const JefeDepartamentoEstadistica = () => {

  
  const [estadisticas, setEstadisticas] = useState([]);

  
  useEffect(() => {
    fetch(apiurl + "/api/v1/docentes/estadisticas", {
      method: "GET",
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
       console.log(data);
       setEstadisticas(data.data);
      })
      .catch((error) => console.log(error));
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
      <NavbarLoggedInComponent urlLogo="./../assets/unah_logo.png" />
      <div className="containerP menu-container ">
        <Atras />
        <Row className="mb-3">
          <Col>
            <h2 style={{ fontFamily: "Heebo", fontWeight: 700 }}>Estadísticas</h2>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card style={{ width: '70%' ,  margin: 'auto' }}>
              <Card.Body>
                <Card.Title>Tasa de Rendimiento de Docentes</Card.Title>
                <LineChart data={estadisticas}/>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </div>
    </>
  );
};

export default JefeDepartamentoEstadistica;
