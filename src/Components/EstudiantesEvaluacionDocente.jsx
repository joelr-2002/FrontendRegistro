import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import NavbarLoggedInComponent from "./NavbarLoggedComponente";

const EvaluacionDocenteForm = () => {
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
    // Aquí puedes realizar alguna acción con la evaluación, como enviarla a un servidor.
    console.log("Evaluación:", evaluacion);
  };

  return (
    <>
      <NavbarLoggedInComponent urlLogo="../../assets/unah_logo.png">
        {" "}
      </NavbarLoggedInComponent>
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
              Evaluación Docente
            </h2>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
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
                      <option value="MALO">MALO</option>
                      <option value="BUENO">BUENO</option>
                      <option value="MUY BUENO">MUY BUENO</option>
                      <option value="EXCELENTE">EXCELENTE</option>
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
                      <option value="MALO">MALO</option>
                      <option value="BUENO">BUENO</option>
                      <option value="MUY BUENO">MUY BUENO</option>
                      <option value="EXCELENTE">EXCELENTE</option>
                    </Form.Control>
                  </Col>
                </Row>
              </Form.Group>
            </div>
          </div>
          <div className="row" >
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
                      <option value="MALO">MALO</option>
                      <option value="BUENO">BUENO</option>
                      <option value="MUY BUENO">MUY BUENO</option>
                      <option value="EXCELENTE">EXCELENTE</option>
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
                href="/estudiantes/notas"
                variant="primary"
                type="submit"
                disabled={
                  evaluacion.areaAcademica == "" ||
                  evaluacion.areaProfesional == "" ||
                  evaluacion.areaPersonal == "" ||
                  evaluacion.observaciones == ""
                }
              >
                Enviar Evaluación
              </Button>
            </div>
            <div className="col-md-6">
              <Button href="/estudiantes" variant="secondary" type="submit">
                Regresar
              </Button>
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default EvaluacionDocenteForm;
