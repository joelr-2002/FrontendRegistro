import React, { useState, useEffect } from "react";
import { Modal, Table, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";
import Atras from "./utils/Regresar";
import apiurl from "../utils/apiurl";
import Cookies from "js-cookie";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import FileSaver from 'file-saver';

import carga from '../data/carga.json'

//Se acortará el nombre de Coordinador a Coord para mayor facilidad
const CoordCargaA = () => {
  const [dataPlanificacion, setDataPlanificacion] = useState(null)
  const [claseAMostrar, setClaseAMostrar] = useState('')

  const descargarEnPDF = () => {
    fetch(apiurl + '/api/v1/docentes/descargar-planificacion/pdf',{
      method: 'GET',
      headers: {
        'x-token': 'bearer ' + Cookies.get('x-token')
    }}
    )
    .then((res) => res.blob())
    .then((blob) => {
      FileSaver.saveAs(blob, 'planificacion.pdf');
    }
      )
    .catch((err) => console.log(err))
  }

  const descargarEnEXCEL = () => {
    fetch(apiurl + '/api/v1/docentes/descargar-planificacion/excel', {
      method: 'GET',
      headers: {
        'x-token': 'bearer ' + Cookies.get('x-token')
      }
    })
      .then((res) => res.blob())
      .then((blob) => {
        // //handleExcelResponse(blob);
        FileSaver.saveAs(blob, 'planificacion.xlsx');
      })
      .catch((err) => console.log(err));
  };
  
  useEffect(() => {
    fetch(apiurl + '/api/v1/docentes/visualizar-planificacion',{
      method: 'GET',
      headers: {
        'x-token': 'bearer ' + Cookies.get('x-token')
    }}
    )
    .then((res) => res.json())
    .then((data) => {
      if (claseAMostrar === '') {
        setDataPlanificacion(null)
      } else {
        const dataAGuardar = dataPlanificacion.filter((item) => item.ASIGNATURA === claseAMostrar)
      }
    })
    .catch((err) => console.log(err))
  }, [claseAMostrar])

  const handleSubmit = (e) => {
    e.preventDefault()
    setClaseAMostrar(e.target[0].value)
  }

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
              className={'text-lg'}
              style={{
                fontFamily: "Heebo",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              CARGA ACADEMICA
            </h2>

            {/* <h2
              className={'text-sm'}
              style={{
                fontFamily: "Heebo",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              PERIODO {currentLoad.periodo} - AÑO {currentLoad.anio}
            </h2> */}
          </Col>
        </Row>

        <Row className="m-3">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Row>
                <Col sm={6}>
                  <Form.Control
                    type="text"
                    placeholder="Buscar"
                  />
                </Col>
                <Col sm={1}>
                <Button className="btn-seccionesNoMargin" type="submit">
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                </Col>
                <Col sm={5}>
                  <Row>
                    <Col> <Form.Label> Registros por pagina: </Form.Label> </Col>
                    <Col>
                      <Form.Select aria-label="Default select example">
                        <option value="5"> 5 </option>
                        <option value="10"> 10 </option>
                        <option value="20"> 20 </option>
                        <option value="50"> 50 </option>
                        <option value="100"> 100 </option>
                        <option value="todos"> todos </option>
                      </Form.Select>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form.Group>
          </Form>

          <Col className={'mt-3'}>
            <Row>
              <a href='#'> Descargar carga PDF </a>
            </Row>
            <Row>
              <a href='#'> Descargar carga Excel </a>
            </Row>
          </Col>
        </Row>

        {
          dataPlanificacion === null
            ? (
              <Row className="text-center">
                <h1 className="text-lg"> Ninguna clase seleccionada </h1>
              </Row>
            )
            : (
              <Row className="m-3">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th> SECCION </th>
                      <th> ASIGNATURA </th>
                      <th> EMPLEADO </th>
                      <th> CANTIDAD ESTUDIANTES </th>
                      <th> CUPOS </th>
                      <th> EDIFICIO </th>
                      <th> AULA </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dataPlanificacion.map((item, index) => (
                          <tr key={item.N_SECCION + index}>
                            <td> {item.N_SECCION} </td>
                            <td> {item.CODIGO_ASIGNATURA} - {item.ASIGNATURA} </td>
                            <td> {item.N_EMPLEADO} - {item.DOCENTE} </td>
                            <td> {item.MATRICULADOS} </td>
                            <td> {item.CUPOS} </td>
                            <td> {item.EDIFICIO} </td>
                            <td> {item.AULA} </td>
                          </tr>
                        )
                      )
                    }
                  </tbody>
                </Table>
              </Row>
            )
        }
      </div>
    </>
  );
};

export default CoordCargaA;
