import React, { useState, useEffect } from "react";
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import NavbarLoggedComponente from './NavbarLoggedComponente';
import Cookies from "js-cookie";
import apiurl from "../utils/apiurl";

const notas = "";

const NotasEstudiante = () => {

  const [notas, setNotas] = useState([]);

  useEffect(() => {
    fetch(
      apiurl +
        "/api/v1/estudiante/notas",
      {
        headers: {
          "x-token": "bearer " + Cookies.get("x-token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setNotas(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  
  return (
    <>
    <NavbarLoggedComponente urlLogo="../../assets/unah_logo.png">
    </NavbarLoggedComponente>
    <Container className="containerP">
    <Row className="mb-3">
          <Col>
            <h2
              style={{
                fontFamily: "Heebo",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Calificaciones del Período
            </h2>
          </Col>
        </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Clase</th>
            <th>Nota</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((nota, index) => (
            <tr key={index}>
              <td>{nota.SECCION_NOMBRE}</td>
              <td>{nota.NOMBRE_ASIGNATURA}</td>
              <td>{nota.CALIFICACION}</td>
              <td>{nota.CALIFICACION >= 65 ? "Aprobado" : nota.CALIFICACION === null ? "Sin Evaluar" : nota.CALIFICACION === 0 ? "NSP" : "Reprobado"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="col-md-4">
            <Button href='/estudiantes' variant="secondary" type="submit">
              Regresar
            </Button>
      </div>
    </Container>
    </>
  );
};

export default NotasEstudiante;
