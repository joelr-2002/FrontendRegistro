import React from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import NavbarLoggedComponente from './NavbarLoggedComponente';

const notas = [
  { codigo_clase: 'MM-110', clase: 'Matemáticas', nota: 65, Estado: 'APR' },
  { codigo_clase: 'HH-110' ,clase: 'Historia', nota: 80, Estado: 'APR' },
  { codigo_clase: 'FF-101' ,clase: 'Ciencias', nota: 91, Estado: 'APR' },
];

const NotasEstudiante = () => {
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
              <td>{nota.codigo_clase}</td>
              <td>{nota.clase}</td>
              <td>{nota.nota}</td>
              <td>{nota.Estado}</td>
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
