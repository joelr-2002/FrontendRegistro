import React, { useState, useEffect } from "react";
import { Modal, Table, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import Atras from "./utils/Regresar";

import estudiantes from "../data/estudiantes.json";

//Se acortará el nombre de Coordinador a Coord para mayor facilidad
const CoordEstudiantes = () => {
  const [currentStudent, setCurrentStudent] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // La misma logica funcionaria para el numero de cuenta
    const studentFound = estudiantes.find(
      (student) =>
        student.nombreCompleto.toLocaleLowerCase() ===
        e.target[0].value.toLowerCase()
    );
    if (studentFound !== undefined) {
      setCurrentStudent(studentFound);
    } else {
      setCurrentStudent(null);
    }

    e.target[0].value = "";
  };

  const handleChange = ({ target }) => {
    console.log(target.value);
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

      <div className="containerP">
        <Atras />
        <Row className="mb-3">
          <Col>
            <h2
              style={{
                fontFamily: "Heebo",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Estudiantes
            </h2>
          </Col>
        </Row>
        

        <Row className="m-3">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Buscar"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Row>

        {currentStudent === null ? (
          <Row className="text-center">
            <h1 className="text-lg"> Ningun estudiante seleccionado </h1>
          </Row>
        ) : (
          <>
            <Row className="text-center my-4">
              <Col>
                <h2 className="text-sm">
                  {" "}
                  <span className="font-bold"> CUENTA: </span>{" "}
                  {currentStudent.cuenta}{" "}
                </h2>
                <h2 className="text-sm">
                  {" "}
                  <span className="font-bold"> NOMBRE: </span>{" "}
                  {currentStudent.nombreCompleto}{" "}
                </h2>
                <h2 className="text-sm">
                  {" "}
                  <span className="font-bold"> CENTRO: </span>{" "}
                  {currentStudent.centro}{" "}
                </h2>
              </Col>

              <Col>
                <h2 className="text-sm">
                  {" "}
                  <span className="font-bold"> INDICE GLOBAL: </span>{" "}
                  {currentStudent.indiceGlobal}{" "}
                </h2>
                <h2 className="text-sm">
                  {" "}
                  <span className="font-bold"> INDICE PERIODO: </span>{" "}
                  {currentStudent.indicePeriodo}{" "}
                </h2>
              </Col>
            </Row>

            <Row className="m-3">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th> CODIGO </th>
                    <th> ASIGNATURA </th>
                    <th> UV </th>
                    <th> SECCION </th>
                    <th> AÑO </th>
                    <th> PERIODO </th>
                    <th> CALIFICACION </th>
                    <th> OBS </th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudent.historial.map((item) => (
                    <tr key={item.codigo}>
                      <td> {item.codigo} </td>
                      <td> {item.asignatura} </td>
                      <td> {item.uv} </td>
                      <td> {item.seccion} </td>
                      <td> {item.anio} </td>
                      <td> {item.periodo} </td>
                      <td> {item.calificacion} </td>
                      <td> {item.obs} </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          </>
        )}
      </div>
    </>
  );
};

export default CoordEstudiantes;
