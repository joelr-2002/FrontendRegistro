import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Form,
  Button,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarLoggedComponente from "./NavbarLoggedComponente";
import Cookies from "js-cookie";
import apiurl from "../utils/apiurl";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";
import Atras from "./utils/Regresar"

const EvaluacionDocenteForm = (props) => {
  const [evaluacion, setEvaluacion] = useState({
    areaPersonal: "",
    areaProfesional: "",
    areaAcademica: "",
    observaciones: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvaluacion({
      ...evaluacion,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    
  
    const dataEv = {
      id: props.idSeccion,
      observaciones: evaluacion.observaciones,
      area_personal: parseInt(evaluacion.areaPersonal),
      area_profesional: parseInt(evaluacion.areaProfesional),
      area_academico: parseInt(evaluacion.areaAcademica),
    };

    console.log(dataEv)
  
    fetch(apiurl + "/api/v1/estudiante/evaluacion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": "bearer " + Cookies.get("x-token"),
      },
      body: JSON.stringify(dataEv),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Formulario enviado Correctamente");
      })
      .catch((err) => {
        console.error(err);
        alert("Formulario no enviado");
      });
  };
  

  return (
    <>
      <Container className="containerP">
        <Atras/>
        <Row className="mb-3">
          <Col>
            <h2
              style={{
                fontFamily: "Heebo",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Evaluación Docente
            </h2>
          </Col>
        </Row>
        <Form>
          <div className="row">
            <div className="col-md-12">
              <Form.Group controlId="areaPersonal">
                <Row style={{ padding: "10px" }}>
                  <Col md={2}>
                    <Form.Label>Área Personal</Form.Label>
                  </Col>
                  <Col md={10}>
                    <Form.Control
                      as="select"
                      name="areaPersonal"
                      value={evaluacion.areaPersonal}
                      onChange={handleChange}
                    >
                      <option
                        value=""
                        disabled={evaluacion.areaPersonal !== ""}
                      >
                        SELECCIONE UNA OPCIÓN
                      </option>
                      <option value={1}>MUY MALO</option>
                      <option value={2}>MALO</option>
                      <option value={3}>BUENO</option>
                      <option value={4}>MUY BUENO</option>
                      <option value={5}>EXCELENTE</option>
                    </Form.Control>
                  </Col>
                </Row>
              </Form.Group>
            </div>
            <div className="col-md-12">
              <Form.Group controlId="areaProfesional">
                <Row style={{ padding: "10px" }}>
                  <Col md={2}>
                    <Form.Label>Área Profesional</Form.Label>
                  </Col>
                  <Col md={10}>
                    <Form.Control
                      as="select"
                      name="areaProfesional"
                      value={evaluacion.areaProfesional}
                      onChange={handleChange}
                    >
                      <option
                        value=""
                        disabled={evaluacion.areaProfesional !== ""}
                      >
                        SELECCIONE UNA OPCIÓN
                      </option>
                      <option value={1}>MUY MALO</option>
                      <option value={2}>MALO</option>
                      <option value={3}>BUENO</option>
                      <option value={4}>MUY BUENO</option>
                      <option value={5}>EXCELENTE</option>
                    </Form.Control>
                  </Col>
                </Row>
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Form.Group controlId="areaAcademica">
                <Row style={{ padding: "10px" }}>
                  <Col md={2}>
                    <Form.Label>Área Académica</Form.Label>
                  </Col>
                  <Col md={10}>
                    <Form.Control
                      as="select"
                      name="areaAcademica"
                      value={evaluacion.areaAcademica}
                      onChange={handleChange}
                    >
                      <option
                        value=""
                        disabled={evaluacion.areaAcademica !== ""}
                      >
                        SELECCIONE UNA OPCIÓN
                      </option>
                      <option value={1}>MUY MALO</option>
                      <option value={2}>MALO</option>
                      <option value={3}>BUENO</option>
                      <option value={4}>MUY BUENO</option>
                      <option value={5}>EXCELENTE</option>
                    </Form.Control>
                  </Col>
                </Row>
              </Form.Group>
            </div>
            <div className="col-md-12">
              <Form.Group controlId="observaciones">
                <Row style={{ padding: "10px" }}>
                  <Col>
                    <Form.Label>Observaciones</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="observaciones"
                      value={evaluacion.observaciones}
                      onChange={handleChange}
                      style={{ resize: "none" }}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </div>
          </div>
          <div className="row" style={{ padding: "10px" }}>
            <div className="col-md-6">
              <Button
                href="/estudiantes/evaluacion-docente"
                className="btn-seccionesNoMargin"
                type="button"
                disabled={
                  evaluacion.areaAcademica == "" ||
                  evaluacion.areaProfesional == "" ||
                  evaluacion.areaPersonal == "" ||
                  evaluacion.observaciones == ""
                }
                onClick={handleSubmit}
              >
                Enviar Evaluación
              </Button>
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
};

const EvaluacionDocentes = () => {


  const [clases, setClases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSeccion, setSelectedSeccion] = useState(null);
  

  useEffect(() => {
    fetch(apiurl + "/api/v1/estudiante/secciones", {
      headers: {
        "x-token": "bearer " + Cookies.get("x-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setClases(data.data);
      })
      .catch((error) => console.log(error));
  }, []);


  const evaluado = clases.every((clase) => clase.ESTADO_EVALUACION === 1);

  // Redirigir si es necesario
  useEffect(() => {
    if (evaluado) {
      window.location.href = '/estudiantes/notas';
    }
  }, []);

  console.log(clases);
  const handleOpenModal = (idSeccion) => {
    setSelectedSeccion(idSeccion);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedSeccion(null);
    setShowModal(false);
  };

  return (
    <>
      <NavbarLoggedComponente urlLogo="../../assets/unah_logo.png"></NavbarLoggedComponente>
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
            {clases.map((clase, index) => (
              <tr key={index}>
                <td>{clase.ID_SECCION}</td>
                <td>{clase.NOMBRE_ASIGNATURA}</td>
                <td>-</td>
                <td>
                  {clase.ESTADO_EVALUACION === 0 ? (
                    <>
                      <Button
                        className="btn-seccionesNoMargin"
                        onClick={() => handleOpenModal(clase.ID_SECCION)}
                      >
                        Por Evaluar{" "}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="btn-seccionesNoMargin" disabled>
                        Evaluado{" "}
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title className="titulos textcenter"></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EvaluacionDocenteForm idSeccion={selectedSeccion} />
          </Modal.Body>
        </Modal>

        
      </Container>
    </>
  );
};

export default EvaluacionDocentes;
